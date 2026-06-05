'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin-server'
import type { VehicleInsert, VehicleUpdate } from '@/types/database'

export async function toggleSoldAction(id: string, currentValue: boolean) {
  const supabase = createAdminClient()
  const newValue = !currentValue
  const { error } = await supabase
    .from('vehicles')
    .update({ is_sold: newValue, ...(newValue && { is_featured: false }) })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/autos')
}

export async function uploadImagesAction(formData: FormData): Promise<string[]> {
  const supabase = createAdminClient()
  const files = formData.getAll('images') as File[]
  const slug = formData.get('slug') as string

  const urls: string[] = []
  for (const file of files) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const path = `${slug}/${filename}`

    const buffer = await file.arrayBuffer()
    const { error } = await supabase.storage
      .from('vehicle-images')
      .upload(path, buffer, { contentType: file.type, upsert: false })

    if (error) throw new Error(`Error subiendo imagen: ${error.message}`)

    const { data: publicData } = supabase.storage
      .from('vehicle-images')
      .getPublicUrl(path)

    urls.push(publicData.publicUrl)
  }

  return urls
}

export async function createVehicleAction(data: VehicleInsert) {
  const supabase = createAdminClient()
  const { data: vehicle, error } = await supabase
    .from('vehicles')
    .insert(data)
    .select()
    .single()
  if (error) throw new Error(error.message)
  revalidatePath('/admin/autos')
  revalidatePath('/catalogo')
  return vehicle
}

export async function updateVehicleAction(id: string, data: VehicleUpdate): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('vehicles')
    .update(data)
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/autos')
  revalidatePath('/catalogo')
}

export async function deleteVehicleAction(id: string, imageUrls: string[]): Promise<void> {
  const supabase = createAdminClient()

  // Extract storage paths from public URLs and remove images (best-effort)
  if (imageUrls.length > 0) {
    const paths = imageUrls
      .map((url) => {
        const marker = '/vehicle-images/'
        const idx = url.indexOf(marker)
        return idx !== -1 ? url.slice(idx + marker.length) : null
      })
      .filter((p): p is string => p !== null)

    if (paths.length > 0) {
      // Ignore storage errors — images may not exist
      await supabase.storage.from('vehicle-images').remove(paths)
    }
  }

  const { error } = await supabase.from('vehicles').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/autos')
  revalidatePath('/catalogo')
}

export async function softDeleteVehicleAction(id: string): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('vehicles')
    .update({ is_deleted: true })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/autos')
}

export async function setVehicleTagsAction(vehicleId: string, tagIds: number[]): Promise<void> {
  const supabase = createAdminClient()
  const { error: deleteError } = await supabase
    .from('vehicle_tags')
    .delete()
    .eq('vehicle_id', vehicleId)
  if (deleteError) throw new Error(deleteError.message)

  if (tagIds.length > 0) {
    const rows = tagIds.map((tag_id) => ({ vehicle_id: vehicleId, tag_id }))
    const { error: insertError } = await supabase.from('vehicle_tags').insert(rows)
    if (insertError) throw new Error(insertError.message)
  }
}

export async function deleteImagesAction(imageUrls: string[]): Promise<void> {
  if (imageUrls.length === 0) return
  const supabase = createAdminClient()

  const paths = imageUrls
    .map((url) => {
      const marker = '/vehicle-images/'
      const idx = url.indexOf(marker)
      return idx !== -1 ? url.slice(idx + marker.length) : null
    })
    .filter((p): p is string => p !== null)

  if (paths.length > 0) {
    await supabase.storage.from('vehicle-images').remove(paths)
  }
}

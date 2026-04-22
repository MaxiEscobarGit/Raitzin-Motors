import { createClient } from '@/lib/supabase/server'
import type { VehicleInsert, VehicleUpdate } from '@/types/database'

export async function getAllVehiclesAdmin() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      marcas (id, nombre),
      tipo_vehiculo (id, nombre)
    `)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createVehicle(vehicle: VehicleInsert) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicle)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateVehicle(id: string, vehicle: VehicleUpdate) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vehicles')
    .update(vehicle)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteVehicle(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('vehicles').delete().eq('id', id)
  if (error) throw error
}

export async function toggleVehicleSold(id: string, is_sold: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('vehicles')
    .update({ is_sold })
    .eq('id', id)
  if (error) throw error
}

export async function toggleVehicleFeatured(id: string, is_featured: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('vehicles')
    .update({ is_featured })
    .eq('id', id)
  if (error) throw error
}

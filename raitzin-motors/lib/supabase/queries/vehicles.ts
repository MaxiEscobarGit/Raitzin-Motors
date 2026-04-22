import { createClient } from '@/lib/supabase/server'

export async function getFeaturedVehicles() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      marcas (id, nombre, logo_url),
      tipo_vehiculo (id, nombre),
      tags (id, nombre)
    `)
    .eq('is_featured', true)
    .eq('is_sold', false)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) throw error
  return data
}

export async function getVehicleBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('vehicles')
    .select(`
      *,
      marcas (id, nombre, logo_url),
      tipo_vehiculo (id, nombre),
      tags (id, nombre)
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getVehicles(params?: {
  id_marca?: number
  id_tipo?: number
  year_min?: number
  year_max?: number
  precio_min?: number
  precio_max?: number
  km_max?: number
  page?: number
  pageSize?: number
}) {
  const supabase = await createClient()
  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 12

  let query = supabase
    .from('vehicles')
    .select(
      `*,
      marcas (id, nombre, logo_url),
      tipo_vehiculo (id, nombre),
      tags (id, nombre)`,
      { count: 'exact' }
    )
    .eq('is_sold', false)
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (params?.id_marca) query = query.eq('id_marca', params.id_marca)
  if (params?.id_tipo) query = query.eq('id_tipo', params.id_tipo)
  if (params?.year_min) query = query.gte('year', params.year_min)
  if (params?.year_max) query = query.lte('year', params.year_max)
  if (params?.precio_min) query = query.gte('precio_contado', params.precio_min)
  if (params?.precio_max) query = query.lte('precio_contado', params.precio_max)
  if (params?.km_max) query = query.lte('km', params.km_max)

  const { data, count, error } = await query
  if (error) throw error
  return { data: data ?? [], count: count ?? 0 }
}

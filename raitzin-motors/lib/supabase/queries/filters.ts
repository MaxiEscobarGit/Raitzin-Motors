import { createClient } from '@/lib/supabase/server'

export async function getMarcas() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('marcas')
    .select('*')
    .order('nombre')
  if (error) throw error
  return data
}

export async function getTipos() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tipo_vehiculo')
    .select('*')
    .order('nombre')
  if (error) throw error
  return data
}

export async function getTags() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('nombre')
  if (error) throw error
  return data
}

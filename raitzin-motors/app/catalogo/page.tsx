import { createClient } from '@/lib/supabase/server'
import { mapVehicle } from '@/lib/catalog-helpers'
import CatalogClient from './CatalogClient'

export const metadata = {
  title: 'Catálogo — Raitzin Motors',
  description: 'Explorá nuestro stock de autos usados y semi-nuevos en Bariloche.',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function CatalogoPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const supabase = await createClient()

  const [
    { data: vehiclesRaw },
    { data: marcasData },
    { data: tiposData },
    { data: yearsData },
    { data: fuelsData },
    { data: tagsData },
  ] = await Promise.all([
    supabase
      .from('vehicles')
      .select(`*, marcas(nombre), tipo_vehiculo(nombre), vehicle_tags(tag_id)`)
      .eq('is_sold', false)
      .order('created_at', { ascending: false }),
    supabase.from('marcas').select('id, nombre').order('nombre'),
    supabase.from('tipo_vehiculo').select('id, nombre').order('nombre'),
    supabase.from('vehicles').select('year').eq('is_sold', false).order('year', { ascending: false }),
    supabase.from('vehicles').select('fuel').eq('is_sold', false),
    supabase.from('tags').select('id, nombre').order('nombre'),
  ])

  const allTags = tagsData ?? []

  const vehicles = (vehiclesRaw ?? []).map(mapVehicle)

  const toOption = (s: string) => ({ value: s, label: s })

  const marcas = (marcasData ?? []).map(m => toOption(m.nombre))
  const tipos = (tiposData ?? []).map(t => toOption(t.nombre))
  const years = [...new Set((yearsData ?? []).map(r => r.year).filter(Boolean))]
    .map(y => toOption(String(y)))
  const fuels = [...new Set((fuelsData ?? []).map(r => r.fuel).filter(Boolean))]
    .sort()
    .map(toOption)

  const initialFilters = {
    search: typeof sp.search === 'string' ? sp.search : '',
    marca:  typeof sp.marca  === 'string' ? sp.marca  : '',
    tipo:   typeof sp.tipo   === 'string' ? sp.tipo   : '',
    year:   typeof sp.year   === 'string' ? sp.year   : '',
    fuel:   typeof sp.fuel   === 'string' ? sp.fuel   : '',
  }

  // Translate tag slug (e.g. "con-pocos-km") → tag nombre (e.g. "Con pocos km")
  const slugifyTag = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const tagSlug = typeof sp.tag === 'string' ? sp.tag : ''
  const initialTag = tagSlug
    ? (allTags.find(t => slugifyTag(t.nombre) === tagSlug)?.nombre ?? '')
    : ''

  return <CatalogClient vehicles={vehicles} marcas={marcas} tipos={tipos} years={years} fuels={fuels} tags={allTags} allTags={allTags} initialFilters={initialFilters} initialTag={initialTag} />
}

import { createClient } from '@/lib/supabase/server'
import type { Vehicle } from '@/lib/catalog-helpers'
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vehicles: Vehicle[] = (vehiclesRaw ?? []).map((v: any) => ({
    id: v.id,
    marca: v.marcas?.nombre ?? '',
    model: v.model ?? '',
    year: v.year ?? 0,
    km: v.km ?? 0,
    tipo: v.tipo_vehiculo?.nombre ?? '',
    fuel: v.fuel ?? '',
    transmission: v.transmission ?? '',
    traccion: v.traccion ?? '',
    motor: v.motor ?? '',
    color: v.color ?? '',
    interior: v.interior ?? '',
    estado: v.estado ?? 3,
    estado_vehiculo: v.estado_vehiculo ?? undefined,
    precio_contado: v.precio_contado ?? 0,
    precio_financiado: v.precio_financiado ?? null,
    cuotas: v.cuotas ?? null,
    valor_cuota: v.valor_cuota ?? null,
    currency: v.currency ?? 'ARS',
    vehicle_tags: (v.vehicle_tags ?? []).map((vt: { tag_id: number }) => ({ tag_id: vt.tag_id })),
    is_featured: v.is_featured ?? false,
    is_sold: v.is_sold ?? false,
    description: v.description ?? null,
    images: v.images ?? [],
  }))

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

  return <CatalogClient vehicles={vehicles} marcas={marcas} tipos={tipos} years={years} fuels={fuels} tags={allTags} allTags={allTags} initialFilters={initialFilters} />
}

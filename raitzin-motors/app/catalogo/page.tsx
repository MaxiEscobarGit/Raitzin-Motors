import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { mapVehicle } from '@/lib/catalog-helpers'
import CatalogClient from './CatalogClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Catálogo de Autos Usados en Bariloche',
  description: 'Explorá el stock completo de autos usados y seminuevos de Raitzin Motors en San Carlos de Bariloche. Filtrá por marca, tipo, año y combustible.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar'}/catalogo`,
  },
  openGraph: {
    title: 'Catálogo de Autos Usados en Bariloche — Raitzin Motors',
    description: 'Explorá el stock completo de autos usados y seminuevos en San Carlos de Bariloche. Filtrá por marca, tipo, año y combustible.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar'}/catalogo`,
    locale: 'es_AR',
    type: 'website',
  },
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
      .eq('is_deleted', false)
      .order('is_sold', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase.from('marcas').select('id, nombre').order('nombre'),
    supabase.from('tipo_vehiculo').select('id, nombre').order('nombre'),
    supabase.from('vehicles').select('year').eq('is_deleted', false).order('year', { ascending: false }),
    supabase.from('vehicles').select('fuel').eq('is_deleted', false),
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

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient as createAnonClient } from "@supabase/supabase-js"
import type { Vehicle, Tag } from "@/lib/catalog-helpers"
import { VehiclePageClient } from "./VehiclePageClient"

type Props = { params: Promise<{ slug: string }> }

function getSupabase() {
  return createAnonClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapVehicle(v: any): Vehicle {
  return {
    id: v.id,
    slug: v.slug ?? '',
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
  }
}

export async function generateStaticParams() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('vehicles')
    .select('slug')
    .eq('is_sold', false)
  return (data ?? []).map(v => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = getSupabase()
  const { data: v } = await supabase
    .from('vehicles')
    .select('*, marcas(nombre), tipo_vehiculo(nombre)')
    .eq('slug', slug)
    .single()

  if (!v) return {}

  const marca = v.marcas?.nombre ?? ''
  const title = `${marca} ${v.model} ${v.year} | Raitzin Motors`
  const description = `${marca} ${v.model} ${v.year}, ${v.km?.toLocaleString('es-AR')} km, ${v.fuel}. ${v.description ?? 'Disponible en Raitzin Motors, Bariloche.'}`

  return {
    title,
    description,
    openGraph: {
      title: `${marca} ${v.model} ${v.year}`,
      description: `${v.km?.toLocaleString('es-AR')} km · ${v.fuel} · ${v.transmission}`,
      images: v.images?.[0] ? [v.images[0]] : [],
    },
  }
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params
  const supabase = getSupabase()

  const [{ data: raw }, { data: tagsData }, ] = await Promise.all([
    supabase
      .from('vehicles')
      .select('*, vehicle_tags(tag_id), marcas(nombre), tipo_vehiculo(nombre), estado_vehiculo(nombre)')
      .eq('slug', slug)
      .single(),
    supabase.from('tags').select('id, nombre').order('nombre'),
  ])

  if (!raw) notFound()

  const vehicle = mapVehicle(raw)
  const allTags: Tag[] = tagsData ?? []

  const { data: relatedRaw } = await supabase
    .from('vehicles')
    .select('*, vehicle_tags(tag_id), marcas(nombre), tipo_vehiculo(nombre)')
    .eq('is_sold', false)
    .neq('id', raw.id)
    .eq('id_tipo', raw.id_tipo)
    .order('created_at', { ascending: false })
    .limit(3)

  const related = (relatedRaw ?? []).map(mapVehicle)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${vehicle.marca} ${vehicle.model} ${vehicle.year}`,
    brand: { '@type': 'Brand', name: vehicle.marca },
    modelDate: String(vehicle.year),
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: vehicle.km, unitCode: 'KMT' },
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    color: vehicle.color,
    image: vehicle.images?.[0],
    offers: {
      '@type': 'Offer',
      price: vehicle.precio_contado,
      priceCurrency: vehicle.currency,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'AutoDealer',
        name: 'Raitzin Motors',
        address: 'San Carlos de Bariloche, Argentina',
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VehiclePageClient vehicle={vehicle} related={related} allTags={allTags} />
    </>
  )
}

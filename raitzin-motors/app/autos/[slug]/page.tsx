import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { createClient as createAnonClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { mapVehicle, type Tag } from "@/lib/catalog-helpers"
import { VehiclePageClient } from "./VehiclePageClient"
import { SoldVehiclePage } from "@/components/vehicle/SoldVehiclePage"

type Props = { params: Promise<{ slug: string }> }

// generateStaticParams runs at build time without request context,
// so we use the anon client directly to avoid cookies() issues.
function buildTimeClient() {
  return createAnonClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function generateStaticParams() {
  const supabase = buildTimeClient()
  const { data } = await supabase.from('vehicles').select('slug')
  return (data ?? []).map(v => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
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
  const supabase = await createClient()

  const { data: raw } = await supabase
    .from('vehicles')
    .select('*, vehicle_tags(tag_id), marcas(nombre), tipo_vehiculo(nombre), estado_vehiculo(nombre)')
    .eq('slug', slug)
    .single()

  if (!raw) notFound()

  const vehicle = mapVehicle(raw)

  // Fetch tags in all cases (needed for both normal and sold page)
  const { data: tagsData } = await supabase
    .from('tags')
    .select('id, nombre')
    .order('nombre')

  const allTags: Tag[] = tagsData ?? []

  // Sold or deleted — show the sold page with similar vehicles
  if (vehicle.is_sold || vehicle.is_deleted) {
    const { data: similarRaw } = await supabase
      .from('vehicles')
      .select('*, vehicle_tags(tag_id), marcas(id, nombre), tipo_vehiculo(id, nombre)')
      .eq('is_sold', false)
      .eq('is_deleted', false)
      .neq('id', raw.id)
      .order('created_at', { ascending: false })
      .limit(3)

    const similar = (similarRaw ?? []).map(mapVehicle)

    return <SoldVehiclePage vehicle={vehicle} similar={similar} allTags={allTags} />
  }

  // Normal available vehicle page
  const { data: relatedRaw } = await supabase
    .from('vehicles')
    .select('*, vehicle_tags(tag_id), marcas(nombre), tipo_vehiculo(nombre)')
    .eq('is_sold', false)
    .eq('is_deleted', false)
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

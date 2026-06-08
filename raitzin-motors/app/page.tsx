import type { Metadata } from "next"
import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ReviewsSection } from "@/components/reviews-section"
import { SearchSection } from "@/components/search-section"
import { TagsSection } from "@/components/tags-section"
import { ServicesSection } from "@/components/services-section"
import { VehiclesSection } from "@/components/vehicles-section"
import { ContactSection } from "@/components/contact-section"
import { createClient } from "@/lib/supabase/server"
import { generateSlug, type Vehicle } from "@/lib/catalog-helpers"

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
  description: 'Comprá o vendé tu auto con Raitzin Motors, la concesionaria de confianza en San Carlos de Bariloche. Financiación, permuta y más de 35 años de experiencia.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar',
  },
  openGraph: {
    title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
    description: 'Comprá o vendé tu auto con Raitzin Motors, la concesionaria de confianza en San Carlos de Bariloche. Financiación, permuta y más de 35 años de experiencia.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar',
    siteName: 'Raitzin Motors',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
    description: 'Comprá o vendé tu auto con Raitzin Motors, la concesionaria de confianza en San Carlos de Bariloche.',
  },
}

const autoDealerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: 'Raitzin Motors',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar',
  telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5492944295668'}`,
  description: 'Concesionaria de autos usados y seminuevos en San Carlos de Bariloche, Patagonia, Argentina. Más de 35 años de experiencia en compra, venta, permuta y financiación.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Carlos de Bariloche',
    addressRegion: 'Río Negro',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -41.1335,
    longitude: -71.3103,
  },
  sameAs: ['https://www.instagram.com/raitzinmotors'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
}

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: marcasData },
    { data: tiposData },
    { data: yearsData },
    { data: fuelsData },
    { data: destacadosData },
    { data: tagsData },
  ] = await Promise.all([
    supabase.from('marcas').select('nombre').order('nombre'),
    supabase.from('tipo_vehiculo').select('nombre').order('nombre'),
    supabase.from('vehicles').select('year').eq('is_sold', false).eq('is_deleted', false).order('year', { ascending: false }),
    supabase.from('vehicles').select('fuel').eq('is_sold', false).eq('is_deleted', false),
    supabase
      .from('vehicles')
      .select('*, marcas(nombre), tipo_vehiculo(nombre), vehicle_tags(tag_id)')
      .eq('is_featured', true)
      .eq('is_sold', false)
      .eq('is_deleted', false)
      .limit(6),
    supabase.from('tags').select('id, nombre').order('nombre'),
  ])

  const toOption = (s: string) => ({ value: s, label: s })
  const marcas = (marcasData ?? []).map(m => toOption(m.nombre))
  const tipos  = (tiposData ?? []).map(t => toOption(t.nombre))
  const years  = [...new Set((yearsData ?? []).map(r => r.year).filter(Boolean))].map(y => toOption(String(y)))
  const fuels  = [...new Set((fuelsData ?? []).map(r => r.fuel).filter(Boolean))].sort().map(toOption)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destacados: Vehicle[] = (destacadosData ?? []).map((v: any) => ({
    id: v.id,
    slug: v.slug ?? generateSlug(v.marcas?.nombre ?? '', v.model ?? '', v.year ?? 0),
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
    is_deleted: v.is_deleted ?? false,
    description: v.description ?? null,
    images: v.images ?? [],
  }))

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(autoDealerJsonLd) }}
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <TagsSection tags={tagsData ?? []} />
      </Suspense>
      <SearchSection marcas={marcas} tipos={tipos} years={years} fuels={fuels} />
      <VehiclesSection vehicles={destacados} allTags={tagsData ?? []} />
      <ServicesSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  )
}

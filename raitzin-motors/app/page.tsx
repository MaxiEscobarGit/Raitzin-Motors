import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ReviewsSection } from "@/components/reviews-section"
import { SearchSection } from "@/components/search-section"
import { TagsSection } from "@/components/tags-section"
import { ServicesSection } from "@/components/services-section"
import { VehiclesSection } from "@/components/vehicles-section"
import { ContactSection, Footer } from "@/components/contact-section"
import { createClient } from "@/lib/supabase/server"
import type { Vehicle } from "@/lib/catalog-helpers"

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
    supabase.from('vehicles').select('year').eq('is_sold', false).order('year', { ascending: false }),
    supabase.from('vehicles').select('fuel').eq('is_sold', false),
    supabase
      .from('vehicles')
      .select('*, marcas(nombre), tipo_vehiculo(nombre), vehicle_tags(tag_id)')
      .eq('is_featured', true)
      .eq('is_sold', false)
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

  return (
    <main>
      <Navbar />
      <HeroSection />
      <TagsSection />
      <SearchSection marcas={marcas} tipos={tipos} years={years} fuels={fuels} />
      <VehiclesSection vehicles={destacados} allTags={tagsData ?? []} />
      <ServicesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

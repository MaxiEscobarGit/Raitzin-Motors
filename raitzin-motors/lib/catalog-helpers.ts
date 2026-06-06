// lib/catalog-helpers.ts

export const PAGE_SIZE = 16

export const NAVY = "#1E2167"
export const NAVY_DARK = "#151849"
export const BURGUNDY = "#8B1A1A"
export const SKY_BLUE = "#7EB8D4"
export const WHATSAPP = "#25D366"
export const SECTION_BG = "#F4F8FB"
export const SEARCH_BG = "#EBF4FA"
export const MUTED = "#5A6A7A"


export function generateSlug(marca: string, model: string, year: number): string {
  return `${marca}-${model}-${year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatPrice(price: number, currency: "ARS" | "USD"): string {
  if (currency === "USD") return `USD ${price.toLocaleString("es-AR")}`
  return `$ ${price.toLocaleString("es-AR")}`
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("es-AR")} km`
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5492944295668'

export function generateWALink(
  marca: string,
  model: string,
  year: number,
  price: number,
  currency: "ARS" | "USD"
): string {
  const text = `Hola! Me interesa el ${marca} ${model} ${year} (${formatPrice(price, currency)}). ¿Está disponible?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

export type Tag = { id: number; nombre: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapVehicle(v: any): Vehicle {
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
    is_deleted: v.is_deleted ?? false,
    solo_financiado: v.solo_financiado ?? false,
    description: v.description ?? null,
    images: v.images ?? [],
  }
}

export function getVehicleTags(vehicle: Vehicle, allTags: Tag[]): string[] {
  return (vehicle.vehicle_tags ?? [])
    .map(vt => allTags.find(t => t.id === vt.tag_id)?.nombre ?? '')
    .filter(Boolean)
}

export type Vehicle = {
  id: string
  slug: string
  marca: string
  model: string
  year: number
  km: number
  tipo: string
  fuel: string
  transmission: string
  traccion: string
  motor: string
  color: string
  interior: string
  estado: number
  estado_vehiculo?: { nombre: string }
  precio_contado: number
  precio_financiado: number | null
  cuotas: number | null
  valor_cuota: number | null
  currency: "ARS" | "USD"
  vehicle_tags?: { tag_id: number }[]
  is_featured: boolean
  is_sold: boolean
  is_deleted: boolean
  solo_financiado: boolean
  description: string | null
  images: string[]
}

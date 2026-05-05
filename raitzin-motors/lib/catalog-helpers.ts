// lib/catalog-helpers.ts

export const NAVY = "#1E2167"
export const NAVY_DARK = "#151849"
export const BURGUNDY = "#8B1A1A"
export const SKY_BLUE = "#7EB8D4"
export const WHATSAPP = "#25D366"
export const SECTION_BG = "#F4F8FB"
export const SEARCH_BG = "#EBF4FA"
export const MUTED = "#5A6A7A"


export function formatPrice(price: number, currency: "ARS" | "USD"): string {
  if (currency === "USD") return `USD ${price.toLocaleString("es-AR")}`
  return `$ ${price.toLocaleString("es-AR")}`
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("es-AR")} km`
}

export function generateWALink(
  marca: string,
  model: string,
  year: number,
  price: number,
  currency: "ARS" | "USD"
): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const text = `Hola! Me interesa el ${marca} ${model} ${year} (${formatPrice(price, currency)}). ¿Está disponible?`
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

export type Tag = { id: number; nombre: string }

export function getVehicleTags(vehicle: Vehicle, allTags: Tag[]): string[] {
  return (vehicle.vehicle_tags ?? [])
    .map(vt => allTags.find(t => t.id === vt.tag_id)?.nombre ?? '')
    .filter(Boolean)
}

export type Vehicle = {
  id: string
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
  description: string | null
  images: string[]
}

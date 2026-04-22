import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: 'ARS' | 'USD'): string {
  const formatted = new Intl.NumberFormat('es-AR').format(price)
  return currency === 'USD' ? `USD ${formatted}` : `$ ${formatted}`
}

export function formatKm(km: number): string {
  return `${new Intl.NumberFormat('es-AR').format(km)} km`
}

export function generateSlug(marca: string, model: string, year: number): string {
  return `${marca}-${model}-${year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function generateWhatsAppLink(
  marca: string,
  model: string,
  year: number,
  price: number,
  currency: 'ARS' | 'USD'
): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const formattedPrice = formatPrice(price, currency)
  const text = encodeURIComponent(
    `Hola! Me interesa ${marca} ${model} ${year} (${formattedPrice}). ¿Está disponible?`
  )
  return `https://wa.me/${number}?text=${text}`
}

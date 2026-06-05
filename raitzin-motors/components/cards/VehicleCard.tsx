import Image from 'next/image'
import Link from 'next/link'
import { Gauge, Calendar, Fuel, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { VehicleWithRelations } from '@/types/database'

interface Props {
  vehicle: VehicleWithRelations
}

function formatPrice(price: number | null, currency: string): string {
  if (!price) return '-'
  const formatted = price.toLocaleString('es-AR')
  return currency === 'USD' ? `USD ${formatted}` : `$ ${formatted}`
}

function formatKm(km: number): string {
  return km.toLocaleString('es-AR') + ' km'
}

export function VehicleCard({ vehicle }: Props) {
  const thumbUrl = vehicle.images?.[0] ?? null
  const brandName = vehicle.marcas?.nombre ?? ''
  const title = `${brandName} ${vehicle.model} ${vehicle.year}`.trim()

  return (
    <Link
      href={`/autos/${vehicle.slug}`}
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm',
        'border border-gray-100 transition-all duration-300',
        'hover:shadow-lg hover:-translate-y-1',
        vehicle.is_sold && 'opacity-80',
      )}
      aria-label={`Ver detalles de ${title}`}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {thumbUrl ? (
          <Image
            src={thumbUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
            quality={80}
            loading="lazy"
            className={cn(
              'object-cover transition-transform duration-300 group-hover:scale-105',
              vehicle.is_sold && 'grayscale'
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-gray-300 text-xs">Sin imagen</span>
          </div>
        )}

        {/* Sold overlay */}
        {vehicle.is_sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span
              className="px-4 py-1.5 rounded-full text-white text-sm font-bold tracking-wide uppercase rotate-[-8deg]"
              style={{ backgroundColor: '#8B1A1A' }}
            >
              VENDIDO
            </span>
          </div>
        )}

        {/* Featured badge */}
        {vehicle.is_featured && !vehicle.is_sold && (
          <div className="absolute top-2 left-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-white"
              style={{ backgroundColor: '#1E2167' }}
            >
              <Star className="w-3 h-3 fill-[#7EB8D4] text-[#7EB8D4]" />
              Destacado
            </span>
          </div>
        )}

        {/* Currency / price badge top-right */}
        {vehicle.precio_contado && !vehicle.is_sold && (
          <div className="absolute top-2 right-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: '#8B1A1A' }}
            >
              {formatPrice(vehicle.precio_contado, vehicle.currency)}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#7EB8D4' }}>
            {brandName || '\u00A0'}
          </p>
          <h3
            className="text-base font-bold leading-snug line-clamp-1"
            style={{ color: '#1E2167' }}
          >
            {vehicle.model} {vehicle.year}
          </h3>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Gauge size={13} />
            {formatKm(vehicle.km)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} />
            {vehicle.year}
          </span>
          {vehicle.fuel && (
            <span className="inline-flex items-center gap-1">
              <Fuel size={13} />
              {vehicle.fuel}
            </span>
          )}
        </div>

        {/* Price row */}
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            {vehicle.precio_contado ? (
              <p
                className="text-lg font-bold leading-none"
                style={{ color: '#8B1A1A' }}
              >
                {formatPrice(vehicle.precio_contado, vehicle.currency)}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">Consultar precio</p>
            )}
            {vehicle.precio_financiado && (
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                {vehicle.precio_financiado}
              </p>
            )}
          </div>

          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors"
            style={{ backgroundColor: '#1E2167', color: '#FFFFFF' }}
          >
            Ver más
          </span>
        </div>
      </div>
    </Link>
  )
}

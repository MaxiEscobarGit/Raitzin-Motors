'use client'

import Image from "next/image"
import Link from "next/link"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  formatPrice, formatKm, generateWALink, getVehicleTags,
  type Vehicle, type Tag,
} from "@/lib/catalog-helpers"

type VehicleCardProps = {
  vehicle: Vehicle
  allTags: Tag[]
}

export function VehicleCard({ vehicle, allTags }: VehicleCardProps) {
  return (
    <article className="relative bg-white rounded-[14px] overflow-hidden border border-gray-200 shadow-sm transition-all duration-[220ms] ease-out flex flex-col hover:border-sky-blue hover:shadow-[0_8px_32px_rgba(30,33,103,0.13)] hover:-translate-y-[3px]">
      {/* Stretch link — covers entire card */}
      <Link
        href={`/autos/${vehicle.slug}`}
        className="absolute inset-0 z-[1]"
        aria-label={`Ver ficha de ${vehicle.marca} ${vehicle.model} ${vehicle.year}`}
      />

      {/* Image area */}
      <div className="relative h-44 shrink-0 bg-section-bg overflow-hidden z-[2] pointer-events-none">
        {vehicle.is_sold && (
          <div className="absolute inset-0 bg-black/45 z-[2] flex items-center justify-center">
            <span className="bg-burgundy text-white font-extrabold text-lg px-7 py-2 rounded-lg -rotate-[10deg]">
              VENDIDO
            </span>
          </div>
        )}
        {vehicle.is_featured && !vehicle.is_sold && (
          <div className="absolute top-2.5 left-2.5 z-[3] bg-[#1E2167] text-[#7EB8D4] text-[10px] font-bold px-[10px] py-[3px] rounded-full tracking-wide">
            DESTACADO
          </div>
        )}
        {(() => {
          const tags = getVehicleTags(vehicle, allTags)
          const visibleTag = tags[0]
          const extraCount = tags.length - 1
          if (!visibleTag || vehicle.is_sold) return null
          return (
            <div className="absolute top-2 right-2 z-[3] hidden sm:flex gap-1 items-center">
              <span className="bg-white/90 backdrop-blur-sm text-[#1E2167] text-xs font-medium px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                {visibleTag}
              </span>
              {extraCount > 0 && (
                <span className="bg-white/90 backdrop-blur-sm text-gray-500 text-xs px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                  +{extraCount}
                </span>
              )}
            </div>
          )
        })()}
        {vehicle.images && vehicle.images.length > 0 ? (
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.marca} ${vehicle.model} ${vehicle.year} — Raitzin Motors Bariloche`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#EBF4FA] to-[#D6EAF4] flex flex-col items-center justify-center gap-2">
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
              <rect x="4" y="16" width="48" height="18" rx="5" fill="#7EB8D4" opacity="0.3"/>
              <rect x="10" y="8" width="32" height="14" rx="4" fill="#7EB8D4" opacity="0.5"/>
              <circle cx="14" cy="34" r="5" fill="#1E2167" opacity="0.25"/>
              <circle cx="42" cy="34" r="5" fill="#1E2167" opacity="0.25"/>
              <rect x="22" y="10" width="10" height="8" rx="2" fill="#fff" opacity="0.6"/>
            </svg>
            <span className="text-[10px] text-muted-foreground font-mono">foto del vehículo</span>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="relative z-[2] px-4 pt-2 pb-3 flex flex-col gap-1 pointer-events-none">
        <div>
          <div className="text-[17px] font-bold text-navy leading-tight line-clamp-2">{vehicle.marca} {vehicle.model}</div>
          <div className="text-[13px] text-muted-foreground mt-0 truncate">{vehicle.year} · {formatKm(vehicle.km)}</div>
        </div>
        <div className="pt-1.5 border-t border-gray-100 flex justify-between items-center">
          <div className="min-w-0">
            <div className="text-base sm:text-[20px] font-extrabold text-burgundy whitespace-nowrap">
              {(vehicle.solo_financiado || !vehicle.precio_contado) ? '¡Financialo!' : formatPrice(vehicle.precio_contado, vehicle.currency)}
            </div>
            {vehicle.cuotas && (
              <div className="text-[11px] text-muted-foreground">
                o {vehicle.cuotas} cuotas de {formatPrice(vehicle.valor_cuota!, "ARS")}
              </div>
            )}
          </div>
          <a
            href={generateWALink(vehicle.marca, vehicle.model, vehicle.year, vehicle.precio_contado, vehicle.currency, vehicle.solo_financiado)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="hidden lg:flex items-center gap-1.5 bg-whatsapp text-white px-[14px] py-2 rounded-full text-[13px] font-semibold no-underline relative z-[3] pointer-events-auto"
          >
            <WhatsAppIcon size={15} />
            Consultar
          </a>
        </div>
      </div>
    </article>
  )
}

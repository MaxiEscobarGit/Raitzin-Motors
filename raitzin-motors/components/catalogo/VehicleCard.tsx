'use client'

import Image from "next/image"
import Link from "next/link"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  formatPrice, formatKm, generateWALink, getVehicleTags,
  type Vehicle, type Tag,
} from "@/lib/catalog-helpers"
import { TagBadge } from "./VehicleBadges"

type VehicleCardProps = {
  vehicle: Vehicle
  onSelect?: (v: Vehicle) => void
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
      <div className="relative h-[190px] bg-section-bg overflow-hidden z-[2] pointer-events-none">
        {vehicle.is_sold && (
          <div className="absolute inset-0 bg-black/45 z-[2] flex items-center justify-center">
            <span className="bg-burgundy text-white font-extrabold text-lg px-7 py-2 rounded-lg -rotate-[10deg]">
              VENDIDO
            </span>
          </div>
        )}
        {vehicle.is_featured && (
          <div className="absolute top-2.5 left-2.5 z-[3] bg-amber-400 text-white text-[10px] font-bold px-[10px] py-[3px] rounded-full">
            DESTACADO
          </div>
        )}
        {vehicle.images && vehicle.images.length > 0 ? (
          <Image
            src={vehicle.images[0]}
            alt={`${vehicle.marca} ${vehicle.model} ${vehicle.year}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAARC AABAAEDASIA"
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
      <div className="relative z-[2] px-4 pt-[14px] pb-4 flex flex-col gap-2 flex-1 pointer-events-none">
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="text-[17px] font-bold text-navy leading-tight">{vehicle.marca} {vehicle.model}</div>
            <div className="text-[13px] text-muted-foreground mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{vehicle.year} · {formatKm(vehicle.km)}</div>
          </div>
          <TagBadge tags={getVehicleTags(vehicle, allTags)} className="hidden lg:flex gap-2 flex-wrap" />
        </div>
        <div className="mt-auto pt-2.5 border-t border-gray-100 flex justify-between items-center">
          <div>
            <div className="text-[20px] font-extrabold text-burgundy">{formatPrice(vehicle.precio_contado, vehicle.currency)}</div>
            {vehicle.cuotas && (
              <div className="text-[11px] text-muted-foreground">
                o {vehicle.cuotas} cuotas de {formatPrice(vehicle.valor_cuota!, "ARS")}
              </div>
            )}
          </div>
          <a
            href={generateWALink(vehicle.marca, vehicle.model, vehicle.year, vehicle.precio_contado, vehicle.currency)}
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

'use client'

import { useEffect } from "react"
import Image from "next/image"
import { Calendar, Gauge, Fuel, Settings, Wrench, Car, Palette, Armchair } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  formatPrice, formatKm, generateWALink, getVehicleTags,
  type Vehicle, type Tag,
} from "@/lib/catalog-helpers"
import { TagBadge, EstadoBadge } from "./VehicleBadges"

type VehicleModalProps = {
  vehicle: Vehicle | null
  onClose: () => void
  allTags: Tag[]
}

export function VehicleModal({ vehicle, onClose, allTags }: VehicleModalProps) {
  useEffect(() => {
    window.dispatchEvent(new Event('modal:open'))
    return () => window.dispatchEvent(new Event('modal:close'))
  }, [])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", h)
    return () => document.removeEventListener("keydown", h)
  }, [onClose])

  if (!vehicle) return null

  const specs: [React.ReactNode, string, string][] = [
    [<Calendar size={13} />, "Año", String(vehicle.year)],
    [<Gauge size={13} />, "Kilómetros", formatKm(vehicle.km)],
    [<Fuel size={13} />, "Combustible", vehicle.fuel],
    [<Settings size={13} />, "Transmisión", vehicle.transmission],
    [<Wrench size={13} />, "Motor", vehicle.motor],
    [<Car size={13} />, "Tracción", vehicle.traccion],
    [<Palette size={13} />, "Color", vehicle.color],
    [<Armchair size={13} />, "Interior", vehicle.interior],
  ]

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-[rgba(21,24,73,0.7)] backdrop-blur-[4px] flex items-center justify-center p-4"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-[20px] w-full max-w-[780px] max-h-[90vh] overflow-auto shadow-[0_32px_80px_rgba(0,0,0,0.3)]"
      >
        {/* Image area */}
        <div className="h-[280px] relative rounded-t-[20px] overflow-hidden bg-gradient-to-br from-[#EBF4FA] to-[#D6EAF4] flex items-center justify-center">
          {vehicle.images && vehicle.images.length > 0 ? (
            <Image
              src={vehicle.images[0]}
              alt={`${vehicle.marca} ${vehicle.model} ${vehicle.year}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 780px"
              priority
            />
          ) : (
            <div className="text-center">
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                <rect x="6" y="22" width="68" height="25" rx="7" fill="#7EB8D4" opacity="0.3"/>
                <rect x="14" y="11" width="46" height="20" rx="6" fill="#7EB8D4" opacity="0.5"/>
                <circle cx="20" cy="47" r="7" fill="#1E2167" opacity="0.25"/>
                <circle cx="60" cy="47" r="7" fill="#1E2167" opacity="0.25"/>
                <rect x="31" y="13" width="14" height="11" rx="3" fill="#fff" opacity="0.6"/>
              </svg>
              <div className="mt-2 text-[11px] text-muted-foreground font-mono">galería de fotos</div>
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border-none bg-white/90 cursor-pointer flex items-center justify-center text-lg text-navy"
          >
            ✕
          </button>
          {vehicle.is_featured && (
            <div className="absolute top-4 left-4 bg-amber-400 text-white text-[11px] font-bold px-3 py-1 rounded-full">
              DESTACADO
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <div className="flex gap-2 items-center mb-1.5">
                <TagBadge tags={getVehicleTags(vehicle, allTags)} />
                <span className="text-xs text-muted-foreground">{vehicle.tipo}</span>
              </div>
              <h2 className="text-[28px] font-extrabold text-navy m-0">{vehicle.marca} {vehicle.model}</h2>
              <p className="text-muted-foreground mt-1 text-[15px]">{vehicle.year} · {vehicle.color}</p>
            </div>
            <div className="text-right">
              <div className="text-[30px] font-extrabold text-burgundy">{formatPrice(vehicle.precio_contado, vehicle.currency)}</div>
              {vehicle.precio_financiado && (
                <div className="text-[13px] text-muted-foreground">Financiado: {formatPrice(vehicle.precio_financiado, "ARS")}</div>
              )}
              {vehicle.cuotas && (
                <div className="text-xs text-muted-foreground">{vehicle.cuotas} cuotas de {formatPrice(vehicle.valor_cuota!, "ARS")}</div>
              )}
            </div>
          </div>

          <div
            className="grid gap-3 my-6 bg-section-bg rounded-xl p-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))" }}
          >
            {specs.map(([icon, label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">{icon}{label}</span>
                <span className="text-sm text-navy font-semibold">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-5">
            <span className="text-[13px] text-muted-foreground font-medium">Condición:</span>
            <EstadoBadge estado={vehicle.estado} label={vehicle.estado_vehiculo?.nombre ?? 'Sin especificar'} />
          </div>

          {vehicle.description && (
            <p className="text-muted-foreground text-sm leading-[1.7] mb-6 border-t border-gray-100 pt-4">
              {vehicle.description}
            </p>
          )}

          <div className="flex gap-3 flex-wrap">
            <a
              href={generateWALink(vehicle.marca, vehicle.model, vehicle.year, vehicle.precio_contado, vehicle.currency)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-whatsapp text-white px-6 py-[14px] rounded-full text-[15px] font-bold no-underline"
            >
              <WhatsAppIcon size={20} />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

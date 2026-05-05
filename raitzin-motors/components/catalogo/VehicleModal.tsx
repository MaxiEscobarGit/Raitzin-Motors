'use client'

import { useEffect } from "react"
import { Calendar, Gauge, Fuel, Settings, Wrench, Car, Palette, Armchair } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  NAVY, BURGUNDY, SKY_BLUE, WHATSAPP, SECTION_BG, MUTED,
  formatPrice, formatKm, generateWALink, getVehicleTags,
  type Vehicle, type Tag,
} from "@/lib/catalog-helpers"

function TagBadge({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {tags.map(tag => (
        <span key={tag} style={{
          display: "inline-block", padding: "2px 10px", borderRadius: 99,
          fontSize: 11, fontWeight: 600,
          background: SKY_BLUE + "22", color: NAVY,
          border: `1px solid ${SKY_BLUE}55`,
          letterSpacing: "0.02em", whiteSpace: "nowrap",
        }}>{tag}</span>
      ))}
    </div>
  )
}

function EstadoBadge({ estado, label }: { estado: number; label: string }) {
  return (
    <span style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i <= estado ? BURGUNDY : "#E5E7EB", display: "inline-block" }}></span>
      ))}
      <span style={{ fontSize: 11, color: MUTED, marginLeft: 4 }}>{label}</span>
    </span>
  )
}

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
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(21,24,73,0.7)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 780,
        maxHeight: "90vh", overflow: "auto",
        boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
      }}>
        {/* Image area */}
        <div style={{
          height: 280,
          background: `linear-gradient(135deg, #EBF4FA 0%, #D6EAF4 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", borderRadius: "20px 20px 0 0",
          overflow: "hidden",
        }}>
          {vehicle.images && vehicle.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vehicle.images[0]}
              alt={`${vehicle.marca} ${vehicle.model}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                <rect x="6" y="22" width="68" height="25" rx="7" fill="#7EB8D4" opacity="0.3"/>
                <rect x="14" y="11" width="46" height="20" rx="6" fill="#7EB8D4" opacity="0.5"/>
                <circle cx="20" cy="47" r="7" fill="#1E2167" opacity="0.25"/>
                <circle cx="60" cy="47" r="7" fill="#1E2167" opacity="0.25"/>
                <rect x="31" y="13" width="14" height="11" rx="3" fill="#fff" opacity="0.6"/>
              </svg>
              <div style={{ marginTop: 8, fontSize: 11, color: MUTED, fontFamily: "monospace" }}>galería de fotos</div>
            </div>
          )}
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            width: 36, height: 36, borderRadius: "50%", border: "none",
            background: "rgba(255,255,255,0.9)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: NAVY,
          }}>✕</button>
          {vehicle.is_featured && (
            <div style={{ position: "absolute", top: 16, left: 16, background: "#F59E0B", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>DESTACADO</div>
          )}
        </div>

        <div style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <TagBadge tags={getVehicleTags(vehicle, allTags)} />
                <span style={{ fontSize: 12, color: MUTED }}>{vehicle.tipo}</span>
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, margin: 0 }}>{vehicle.marca} {vehicle.model}</h2>
              <p style={{ color: MUTED, margin: "4px 0 0", fontSize: 15 }}>{vehicle.year} · {vehicle.color}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: BURGUNDY }}>{formatPrice(vehicle.precio_contado, vehicle.currency)}</div>
              {vehicle.precio_financiado && <div style={{ fontSize: 13, color: MUTED }}>Financiado: {formatPrice(vehicle.precio_financiado, "ARS")}</div>}
              {vehicle.cuotas && <div style={{ fontSize: 12, color: MUTED }}>{vehicle.cuotas} cuotas de {formatPrice(vehicle.valor_cuota!, "ARS")}</div>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px,1fr))", gap: 12, margin: "24px 0", background: SECTION_BG, borderRadius: 12, padding: 20 }}>
            {specs.map(([icon, label, value]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 11, color: MUTED, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>{icon}{label}</span>
                <span style={{ fontSize: 14, color: NAVY, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}>Condición:</span>
            <EstadoBadge estado={vehicle.estado} label={vehicle.estado_vehiculo?.nombre ?? 'Sin especificar'} />
          </div>

          {vehicle.description && (
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, marginBottom: 24, borderTop: "1px solid #F0F0F0", paddingTop: 16 }}>{vehicle.description}</p>
          )}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href={generateWALink(vehicle.marca, vehicle.model, vehicle.year, vehicle.precio_contado, vehicle.currency)}
              target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: WHATSAPP, color: "#fff", padding: "14px 24px", borderRadius: 99, fontSize: 15, fontWeight: 700, textDecoration: "none" }}
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

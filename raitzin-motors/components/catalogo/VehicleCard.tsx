'use client'

import { useState } from "react"
import { Fuel, Settings, Car } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  NAVY, BURGUNDY, SKY_BLUE, WHATSAPP, SECTION_BG, MUTED,
  formatPrice, formatKm, generateWALink, getVehicleTags,
  type Vehicle, type Tag,
} from "@/lib/catalog-helpers"

function TagBadge({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="hidden lg:flex gap-2 flex-wrap">
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

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 11, color: MUTED,
      background: SECTION_BG, padding: "3px 8px", borderRadius: 6,
    }}>
      {icon}{children}
    </span>
  )
}

type VehicleCardProps = {
  vehicle: Vehicle
  onSelect: (v: Vehicle) => void
  allTags: Tag[]
}

export function VehicleCard({ vehicle, onSelect, allTags }: VehicleCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      onClick={() => onSelect(vehicle)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 14, overflow: "hidden", cursor: "pointer",
        border: `1px solid ${hovered ? SKY_BLUE : "#E5E7EB"}`,
        boxShadow: hovered ? "0 8px 32px rgba(30,33,103,0.13)" : "0 2px 8px rgba(30,33,103,0.06)",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: 190, background: SECTION_BG, overflow: "hidden" }}>
        {vehicle.is_sold && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: BURGUNDY, color: "#fff", fontWeight: 800, fontSize: 18, padding: "8px 28px", borderRadius: 8, transform: "rotate(-10deg)" }}>VENDIDO</span>
          </div>
        )}
        {vehicle.is_featured && (
          <div style={{ position: "absolute", top: 10, left: 10, zIndex: 3, background: "#F59E0B", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>DESTACADO</div>
        )}
        {vehicle.images && vehicle.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.marca} ${vehicle.model}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(135deg, #EBF4FA 0%, #D6EAF4 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8,
          }}>
            <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
              <rect x="4" y="16" width="48" height="18" rx="5" fill="#7EB8D4" opacity="0.3"/>
              <rect x="10" y="8" width="32" height="14" rx="4" fill="#7EB8D4" opacity="0.5"/>
              <circle cx="14" cy="34" r="5" fill="#1E2167" opacity="0.25"/>
              <circle cx="42" cy="34" r="5" fill="#1E2167" opacity="0.25"/>
              <rect x="22" y="10" width="10" height="8" rx="2" fill="#fff" opacity="0.6"/>
            </svg>
            <span style={{ fontSize: 10, color: MUTED, fontFamily: "monospace" }}>foto del vehículo</span>
          </div>
        )}
      </div>

      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: NAVY, lineHeight: 1.2 }}>{vehicle.marca} {vehicle.model}</div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{vehicle.year} · {formatKm(vehicle.km)}</div>
          </div>
          <TagBadge tags={getVehicleTags(vehicle, allTags)} />
        </div>
        <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: BURGUNDY }}>{formatPrice(vehicle.precio_contado, vehicle.currency)}</div>
            {vehicle.cuotas && <div style={{ fontSize: 11, color: MUTED }}>o {vehicle.cuotas} cuotas de {formatPrice(vehicle.valor_cuota!, "ARS")}</div>}
          </div>
          <a
            href={generateWALink(vehicle.marca, vehicle.model, vehicle.year, vehicle.precio_contado, vehicle.currency)}
            target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="hidden lg:flex"
            style={{
              alignItems: "center", gap: 6,
              background: WHATSAPP, color: "#fff",
              padding: "8px 14px", borderRadius: 99,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
            }}
          >
            <WhatsAppIcon size={15} />
            Consultar
          </a>
        </div>
      </div>
    </article>
  )
}

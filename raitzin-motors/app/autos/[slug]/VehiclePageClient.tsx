'use client'

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Gauge, Fuel, Settings, Wrench, Car, Palette, Armchair, ChevronRight, ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { WhatsAppFloat } from "@/components/WhatsAppFloat"
import { VehicleCard } from "@/components/catalogo/VehicleCard"
import { TagBadge, EstadoBadge } from "@/components/catalogo/VehicleBadges"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import {
  formatPrice, formatKm, generateWALink, getVehicleTags,
  type Vehicle, type Tag,
} from "@/lib/catalog-helpers"

type Props = {
  vehicle: Vehicle
  related: Vehicle[]
  allTags: Tag[]
}

export function VehiclePageClient({ vehicle, related, allTags }: Props) {
  const [activeImg, setActiveImg] = useState(0)
  const tags = getVehicleTags(vehicle, allTags)

  const prevImg = () => setActiveImg(i => (i - 1 + vehicle.images.length) % vehicle.images.length)
  const nextImg = () => setActiveImg(i => (i + 1) % vehicle.images.length)

  const touchStartX = useRef<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || vehicle.images.length <= 1) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) delta > 0 ? nextImg() : prevImg()
    touchStartX.current = null
  }

  const specs: [React.ReactNode, string, string][] = [
    [<Calendar size={22} key="year" />, "Año", String(vehicle.year)],
    [<Gauge size={22} key="km" />, "Kilómetros", formatKm(vehicle.km)],
    [<Fuel size={22} key="fuel" />, "Combustible", vehicle.fuel],
    [<Settings size={22} key="trans" />, "Transmisión", vehicle.transmission],
    [<Wrench size={22} key="motor" />, "Motor", vehicle.motor],
    [<Car size={22} key="traccion" />, "Tracción", vehicle.traccion],
    [<Palette size={22} key="color" />, "Color", vehicle.color],
    [<Armchair size={22} key="interior" />, "Interior", vehicle.interior],
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-[84px] pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground py-4 mb-2">
          <Link href="/" className="hover:text-navy transition-colors">Inicio</Link>
          <ChevronRight size={13} className="opacity-50" />
          <Link href="/catalogo" className="hover:text-navy transition-colors">Vehículos</Link>
          <ChevronRight size={13} className="opacity-50" />
          <span className="text-navy font-medium truncate">{vehicle.marca} {vehicle.model} {vehicle.year}</span>
        </nav>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12">

          {/* Left: Gallery */}
          <div className="flex flex-col gap-3">
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#EBF4FA] to-[#D6EAF4]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {vehicle.is_sold && (
                <div className="absolute inset-0 bg-black/45 z-10 flex items-center justify-center">
                  <span className="bg-burgundy text-white font-extrabold text-2xl px-10 py-3 rounded-xl -rotate-[10deg]">
                    VENDIDO
                  </span>
                </div>
              )}
              {vehicle.images && vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              {vehicle.images && vehicle.images.length > 0 ? (
                <Image
                  src={vehicle.images[activeImg]}
                  alt={`${vehicle.marca} ${vehicle.model} ${vehicle.year}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                    <rect x="6" y="22" width="68" height="25" rx="7" fill="#7EB8D4" opacity="0.3"/>
                    <rect x="14" y="11" width="46" height="20" rx="6" fill="#7EB8D4" opacity="0.5"/>
                    <circle cx="20" cy="47" r="7" fill="#1E2167" opacity="0.25"/>
                    <circle cx="60" cy="47" r="7" fill="#1E2167" opacity="0.25"/>
                    <rect x="31" y="13" width="14" height="11" rx="3" fill="#fff" opacity="0.6"/>
                  </svg>
                  <span className="text-sm text-muted-foreground">Sin fotos disponibles</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.images && vehicle.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {vehicle.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      i === activeImg ? "border-navy shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-4">
            {/* Tags & tipo */}
            <div className="flex flex-wrap items-center gap-2">
              <TagBadge tags={tags} />
              {vehicle.tipo && (
                <span className="text-[12px] text-muted-foreground bg-gray-100 px-3 py-0.5 rounded-full">
                  {vehicle.tipo}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-extrabold text-navy leading-tight">
                {vehicle.marca} {vehicle.model}
              </h1>
              <p className="text-muted-foreground mt-1 text-[15px]">
                {vehicle.year} · {formatKm(vehicle.km)}
              </p>
            </div>

            {/* Estado */}
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-muted-foreground">Condición:</span>
              <EstadoBadge
                estado={vehicle.estado}
                label={vehicle.estado_vehiculo?.nombre ?? 'Sin especificar'}
              />
            </div>

            {/* Price */}
            <div className="border-t border-gray-100 pt-4">
              <div className="text-4xl font-extrabold text-burgundy">
                {formatPrice(vehicle.precio_contado, vehicle.currency)}
              </div>
              {vehicle.precio_financiado && (
                <div className="text-[13px] text-muted-foreground mt-1">
                  Financiado: {formatPrice(vehicle.precio_financiado, 'ARS')}
                </div>
              )}
              {vehicle.cuotas && vehicle.valor_cuota && (
                <div className="text-[13px] text-muted-foreground">
                  {vehicle.cuotas} cuotas de {formatPrice(vehicle.valor_cuota, 'ARS')}
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-1">
              <a
                href={generateWALink(vehicle.marca, vehicle.model, vehicle.year, vehicle.precio_contado, vehicle.currency)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-4 rounded-full text-[15px] font-bold transition-colors no-underline"
              >
                <WhatsAppIcon size={20} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-10">
          <h2 className="text-2xl font-extrabold text-[#1E2167] mb-6">Detalle técnico</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden border border-gray-200 gap-px bg-gray-200">
            {specs.map(([icon, label, value]) => (
              <div
                key={label}
                className="flex flex-col p-5 bg-white hover:bg-[#EEF4F8] transition-colors"
              >
                <span className="text-[#7EB8D4]">{icon}</span>
                <span className="uppercase text-[11px] text-gray-400 tracking-widest mt-2">{label}</span>
                <span className="font-bold text-[#1E2167] text-[17px] mt-1">{value || '—'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        {vehicle.description && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column */}
            <div className="flex flex-col justify-center">
              <div className="border-l-2 border-[#8B1A1A] pl-3 mb-4">
                <span className="uppercase tracking-widest text-[11px] text-[#8B1A1A] font-semibold">
                  Descripción
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#1E2167] mb-3">
                Sobre este vehículo
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Inspeccionado, garantizado y listo para entregar. 
                <br></br>
                Consultanos a nuestro WhatsApp por este modelo.
              </p>
            </div>
            {/* Right column */}
            <div className="flex items-center">
              <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-navy mb-5">Vehículos similares</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(v => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  onSelect={() => {}}
                  allTags={allTags}
                />
              ))}
            </div>
          </div>
        )}

        {/* Back to catalog */}
        <div className="mt-10 text-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-burgundy transition-colors no-underline border-b-2 border-navy/20 hover:border-burgundy pb-0.5"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </div>

      <WhatsAppFloat />
    </div>
  )
}

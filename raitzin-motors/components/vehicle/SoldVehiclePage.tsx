'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { VehicleCard } from '@/components/catalogo/VehicleCard'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { generateWALink, type Vehicle, type Tag } from '@/lib/catalog-helpers'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

function generateSoldWALink(marca: string, model: string, year: number): string {
  const text = `Hola! Vi que el ${marca} ${model} ${year} ya fue vendido, ¿tienen algo similar disponible?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

interface Props {
  vehicle: Vehicle
  similar: Vehicle[]
  allTags: Tag[]
}

export function SoldVehiclePage({ vehicle, similar, allTags }: Props) {
  const mainImage = vehicle.images?.[0] ?? null

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero section — sold state */}
      <div className="pt-[84px] pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center py-16">

          {/* Check icon */}
          <div className="flex justify-center mb-5">
            <CheckCircle
              className="w-20 h-20"
              style={{ color: '#22c55e' }}
              aria-hidden="true"
            />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-5">
            <span
              className="px-4 py-1 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: '#8B1A1A' }}
            >
              Vendido
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: '#1E2167' }}>
            Este {vehicle.marca} {vehicle.model} ya encontró dueño
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-lg mb-8">
            Pero tenemos más opciones esperándote
          </p>

          {/* Grayscale image */}
          {mainImage && (
            <div className="relative mx-auto max-w-lg rounded-xl overflow-hidden mb-8">
              <Image
                src={mainImage}
                alt={`${vehicle.marca} ${vehicle.model} ${vehicle.year} — vendido`}
                width={600}
                height={400}
                className="w-full object-cover"
                style={{ filter: 'grayscale(100%)' }}
                priority
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{ backgroundColor: 'rgba(0,0,0,0.40)' }}
                aria-hidden="true"
              />
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#1E2167] hover:bg-[#151849] transition-colors"
            >
              Ver catálogo completo
            </Link>

            <a
              href={generateSoldWALink(vehicle.marca, vehicle.model, vehicle.year)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#8B1A1A] hover:bg-[#6B1414] transition-colors"
            >
              <WhatsAppIcon size={18} />
              Consultanos por WhatsApp
            </a>
          </div>
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <div className="max-w-5xl mx-auto mt-4">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#1E2167' }}>
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} allTags={allTags} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

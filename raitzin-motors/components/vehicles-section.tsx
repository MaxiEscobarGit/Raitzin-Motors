'use client'

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type Vehicle, type Tag } from "@/lib/catalog-helpers"
import { VehicleCard } from "@/components/catalogo/VehicleCard"
import { VehicleModal } from "@/components/catalogo/VehicleModal"

type VehiclesSectionProps = {
  vehicles: Vehicle[]
  allTags: Tag[]
}

export function VehiclesSection({ vehicles, allTags }: VehiclesSectionProps) {
  const [selected, setSelected] = useState<Vehicle | null>(null)

  return (
    <>
    <section id="vehiculos" className="py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-3">
            Autos Destacados
          </h2>
          <p className="text-[#5A6A7A] text-lg">
            Stock seleccionado — actualizado esta semana
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-16 text-[#5A6A7A]">
            <p className="text-lg">No hay vehículos destacados en este momento.</p>
            <p className="mt-2">
              <Link href="/catalogo" className="text-[#8B1A1A] font-medium underline underline-offset-4">
                Ver todo el catálogo
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide mb-10">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex-shrink-0 snap-center w-[85vw] sm:w-[45vw] lg:w-[calc(25%-12px)]"
              >
                <VehicleCard
                  vehicle={vehicle}
                  onSelect={setSelected}
                  allTags={allTags}
                />
              </div>
            ))}
          </div>
        )}

        {vehicles.length > 0 && (
          <div className="text-center">
            <Button
              asChild
              variant="link"
              className="text-[#8B1A1A] hover:text-[#6B1414] text-lg font-medium"
            >
              <Link href="/catalogo" className="flex items-center gap-2">
                Ver todo el catálogo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>

    {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} allTags={allTags} />}
    </>
  )
}

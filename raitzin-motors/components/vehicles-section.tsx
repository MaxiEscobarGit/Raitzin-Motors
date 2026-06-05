'use client'

import { useRef, useState, useEffect, useCallback } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { type Vehicle, type Tag } from "@/lib/catalog-helpers"
import { VehicleCard } from "@/components/catalogo/VehicleCard"

type VehiclesSectionProps = {
  vehicles: Vehicle[]
  allTags: Tag[]
}

export function VehiclesSection({ vehicles, allTags }: VehiclesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [vehicles, updateArrows])

  const CARD_WIDTH = 320
  const GAP = 16

  function scrollPrev() {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: -(CARD_WIDTH + GAP), behavior: 'smooth' })
  }

  function scrollNext() {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: CARD_WIDTH + GAP, behavior: 'smooth' })
  }

  return (
    <>
    <section id="vehiculos" className="py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy font-sans mb-3">
            Autos Destacados
          </h2>
          <p className="text-text-secondary text-lg">
            Stock seleccionado — actualizado esta semana
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-16 text-text-secondary">
            <p className="text-lg">No hay vehículos destacados en este momento.</p>
            <p className="mt-2">
              <Link href="/catalogo" className="text-burgundy font-medium underline underline-offset-4">
                Ver todo el catálogo
              </Link>
            </p>
          </div>
        ) : (
          <div className="relative mb-10">
            {/* Flecha izquierda — solo desktop */}
            <button
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label="Anterior"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg
                items-center justify-center transition-opacity
                disabled:opacity-40 disabled:cursor-default hover:enabled:shadow-xl"
            >
              <ChevronLeft size={20} color="#1E2167" />
            </button>

            {/* Overflow mask — oculta el scroll sin cortar las cards */}
            <div className="overflow-hidden md:mx-14">
              {/* Track scrolleable */}
              <div
                ref={scrollRef}
                onScroll={updateArrows}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
              >
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex-shrink-0 snap-center w-[85vw] sm:w-[45vw] lg:w-80"
                  >
                    <VehicleCard
                      vehicle={vehicle}
                      allTags={allTags}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha derecha — solo desktop */}
            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label="Siguiente"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg
                items-center justify-center transition-opacity
                disabled:opacity-40 disabled:cursor-default hover:enabled:shadow-xl"
            >
              <ChevronRight size={20} color="#1E2167" />
            </button>
          </div>
        )}

        {vehicles.length > 0 && (
          <div className="text-center">
            <Button
              asChild
              variant="link"
              className="text-burgundy hover:text-[#6B1414] text-lg font-medium"
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
    </>
  )
}

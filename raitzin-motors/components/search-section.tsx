'use client'

import { useRouter } from 'next/navigation'
import { FilterBar, type Filters } from '@/components/catalogo/FilterBar'

type Option = { value: string; label: string }

type SearchSectionProps = {
  marcas: Option[]
  tipos: Option[]
  years: Option[]
  fuels: Option[]
}

const EMPTY_FILTERS: Filters = { search: '', marca: '', tipo: '', year: '', fuel: '', sort: 'newest' }

export function SearchSection({ marcas, tipos, years, fuels }: SearchSectionProps) {
  const router = useRouter()

  function handleApply(filters: Filters) {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.marca)  params.set('marca', filters.marca)
    if (filters.tipo)   params.set('tipo', filters.tipo)
    if (filters.year)   params.set('year', filters.year)
    if (filters.fuel)   params.set('fuel', filters.fuel)
    router.push(`/catalogo${params.size ? '?' + params.toString() : ''}`)
  }

  return (
    <section id="buscar" className="py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-3">
            ¿Qué auto estás buscando?
          </h2>
          <p className="text-[#5A6A7A] text-lg">
            Encontrá tu próximo vehículo en segundos
          </p>
        </div>
        <FilterBar
          filters={EMPTY_FILTERS}
          onApply={handleApply}
          marcas={marcas}
          tipos={tipos}
          years={years}
          fuels={fuels}
        />
      </div>
    </section>
  )
}

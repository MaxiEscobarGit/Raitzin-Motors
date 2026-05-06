'use client'

import { useState, useEffect } from "react"
import { SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { CustomSelect } from "./CustomSelect"

export type Filters = {
  search: string
  marca: string
  tipo: string
  year: string
  fuel: string
  sort: string
}

type Option = { value: string; label: string }

type FilterBarProps = {
  filters: Filters
  onApply: (filters: Filters) => void
  marcas: Option[]
  tipos: Option[]
  years: Option[]
  fuels: Option[]
  showFilters?: boolean
  onToggleFilters?: () => void
  activeFiltersCount?: number
}

const SORTS = [
  { value: "newest", label: "Más recientes" }, { value: "price_asc", label: "Menor precio" },
  { value: "price_desc", label: "Mayor precio" }, { value: "km_asc", label: "Menos km" },
]

const searchInputClass = "w-full h-11 pl-[38px] pr-[14px] border-[1.5px] border-gray-300 rounded-[10px] text-sm text-navy bg-white outline-none transition-colors duration-150 focus:border-sky-blue"

function SearchIcon() {
  return (
    <svg
      className="absolute left-[13px] top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

function BuscarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

export function FilterBar({ filters, onApply, marcas, tipos, years, fuels, showFilters, onToggleFilters, activeFiltersCount = 0 }: FilterBarProps) {
  const [pending, setPending] = useState<Filters>(filters)

  useEffect(() => { setPending(filters) }, [filters])

  const hasAny = Object.entries(pending).some(([k, v]) => k !== "sort" && v !== "")

  function apply() { onApply(pending) }
  function clear() {
    const clean: Filters = { search: "", marca: "", tipo: "", year: "", fuel: "", sort: "newest" }
    setPending(clean)
    onApply(clean)
  }

  return (
    <>
      {/* Mobile layout */}
      <div className="lg:hidden relative">
        {/* Row: search input + Filtros button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={pending.search}
              onChange={e => setPending(p => ({ ...p, search: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && apply()}
              className={searchInputClass}
            />
          </div>
          <button
            onClick={onToggleFilters}
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 h-11 px-[14px] rounded-[10px] text-[13px] font-semibold cursor-pointer transition-all duration-150 border-[1.5px]",
              showFilters ? "border-navy bg-navy text-white" : "border-gray-300 bg-white text-navy"
            )}
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeFiltersCount > 0 && (
              <span className={cn(
                "rounded-full text-[11px] font-bold px-1.5 py-px",
                showFilters ? "bg-white text-navy" : "bg-navy text-white"
              )}>
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Collapsible filters panel — floats above content on mobile */}
        {showFilters && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-[100] bg-white rounded-xl p-4 border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col gap-[10px]">
            {/* Wrapper divs break the flex-basis:150px behavior of CustomSelect in column context */}
            <div><CustomSelect placeholder="Todas las marcas" options={marcas} value={pending.marca} onChange={v => setPending(p => ({ ...p, marca: v }))} /></div>
            <div><CustomSelect placeholder="Tipo de vehículo" options={tipos} value={pending.tipo} onChange={v => setPending(p => ({ ...p, tipo: v }))} /></div>
            <div><CustomSelect placeholder="Año" options={years} value={pending.year} onChange={v => setPending(p => ({ ...p, year: v }))} /></div>
            <div><CustomSelect placeholder="Ordenar por" options={SORTS} value={pending.sort} onChange={v => setPending(p => ({ ...p, sort: v }))} /></div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={apply}
                className="flex-1 h-11 bg-burgundy text-white border-none rounded-full text-sm font-bold cursor-pointer flex items-center justify-center gap-2"
              >
                <BuscarIcon />
                Buscar
              </button>
              {hasAny && (
                <button
                  onClick={clear}
                  className="h-11 px-4 border-[1.5px] border-burgundy rounded-full text-[13px] text-burgundy bg-white cursor-pointer font-semibold"
                >
                  ✕ Limpiar
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block bg-search-bg rounded-2xl px-6 py-5">
        <div className="flex flex-wrap gap-[10px] items-center">
          <div className="relative flex-[1_1_220px] min-w-[200px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={pending.search}
              onChange={e => setPending(p => ({ ...p, search: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && apply()}
              className={searchInputClass}
            />
          </div>
          <CustomSelect placeholder="Todas las marcas" options={marcas} value={pending.marca} onChange={v => setPending(p => ({ ...p, marca: v }))} />
          <CustomSelect placeholder="Tipo de vehículo" options={tipos} value={pending.tipo} onChange={v => setPending(p => ({ ...p, tipo: v }))} />
          <CustomSelect placeholder="Año" options={years} value={pending.year} onChange={v => setPending(p => ({ ...p, year: v }))} />
          <CustomSelect placeholder="Ordenar por" options={SORTS} value={pending.sort} onChange={v => setPending(p => ({ ...p, sort: v }))} />
          <button
            onClick={apply}
            className="h-11 px-[22px] bg-burgundy hover:bg-[#6B1414] text-white border-none rounded-full text-sm font-bold cursor-pointer flex items-center gap-2 transition-colors duration-150 whitespace-nowrap"
          >
            <BuscarIcon />
            Buscar
          </button>
          {hasAny && (
            <button
              onClick={clear}
              className="h-11 px-4 border-[1.5px] border-burgundy rounded-full text-[13px] text-burgundy bg-white cursor-pointer font-semibold"
            >
              ✕ Limpiar
            </button>
          )}
        </div>
      </div>
    </>
  )
}

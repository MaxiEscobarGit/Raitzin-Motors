'use client'

import { useState, useEffect } from "react"
import { SlidersHorizontal } from "lucide-react"
import { CustomSelect } from "./CustomSelect"
import { BURGUNDY, NAVY, MUTED, SKY_BLUE, SEARCH_BG } from "@/lib/catalog-helpers"

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
      <div className="lg:hidden" style={{ position: "relative" }}>
        {/* Row: search input + Filtros button */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={pending.search}
              onChange={e => setPending(p => ({ ...p, search: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && apply()}
              style={{
                height: 44, padding: "0 14px 0 38px",
                border: `1.5px solid #D1D5DB`, borderRadius: 10,
                fontSize: 14, color: NAVY, background: "#fff",
                fontFamily: "inherit", outline: "none", width: "100%",
                transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = SKY_BLUE)}
              onBlur={e => (e.target.style.borderColor = "#D1D5DB")}
            />
          </div>
          <button
            onClick={onToggleFilters}
            style={{
              flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
              height: 44, padding: "0 14px",
              border: `1.5px solid ${showFilters ? NAVY : "#D1D5DB"}`,
              borderRadius: 10,
              fontSize: 13, fontWeight: 600,
              color: showFilters ? "#fff" : NAVY,
              background: showFilters ? NAVY : "#fff",
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            <SlidersHorizontal size={15} />
            Filtros
            {activeFiltersCount > 0 && (
              <span style={{
                background: showFilters ? "#fff" : NAVY,
                color: showFilters ? NAVY : "#fff",
                borderRadius: 99, fontSize: 11, fontWeight: 700,
                padding: "1px 6px",
              }}>{activeFiltersCount}</span>
            )}
          </button>
        </div>

        {/* Collapsible filters panel — floats above content on mobile */}
        {showFilters && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 100,
            background: "#fff", borderRadius: 12, padding: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {/* Wrapper divs break the flex-basis:150px behavior of CustomSelect in column context */}
            <div><CustomSelect placeholder="Todas las marcas" options={marcas} value={pending.marca} onChange={v => setPending(p => ({ ...p, marca: v }))} /></div>
            <div><CustomSelect placeholder="Tipo de vehículo" options={tipos} value={pending.tipo} onChange={v => setPending(p => ({ ...p, tipo: v }))} /></div>
            <div><CustomSelect placeholder="Año" options={years} value={pending.year} onChange={v => setPending(p => ({ ...p, year: v }))} /></div>
            <div><CustomSelect placeholder="Ordenar por" options={SORTS} value={pending.sort} onChange={v => setPending(p => ({ ...p, sort: v }))} /></div>
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button
                onClick={apply}
                style={{
                  flex: 1, height: 44,
                  background: BURGUNDY, color: "#fff",
                  border: "none", borderRadius: 99,
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                Buscar
              </button>
              {hasAny && (
                <button
                  onClick={clear}
                  style={{
                    height: 44, padding: "0 16px",
                    border: `1.5px solid ${BURGUNDY}`, borderRadius: 99,
                    fontSize: 13, color: BURGUNDY, background: "#fff",
                    cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
                  }}
                >✕ Limpiar</button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block" style={{ background: SEARCH_BG, borderRadius: 16, padding: "20px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 200 }}>
            <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={pending.search}
              onChange={e => setPending(p => ({ ...p, search: e.target.value }))}
              onKeyDown={e => e.key === "Enter" && apply()}
              style={{
                height: 44, padding: "0 14px 0 38px",
                border: `1.5px solid #D1D5DB`, borderRadius: 10,
                fontSize: 14, color: NAVY, background: "#fff",
                fontFamily: "inherit", outline: "none", width: "100%",
                transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = SKY_BLUE)}
              onBlur={e => (e.target.style.borderColor = "#D1D5DB")}
            />
          </div>
          <CustomSelect placeholder="Todas las marcas" options={marcas} value={pending.marca} onChange={v => setPending(p => ({ ...p, marca: v }))} />
          <CustomSelect placeholder="Tipo de vehículo" options={tipos} value={pending.tipo} onChange={v => setPending(p => ({ ...p, tipo: v }))} />
          <CustomSelect placeholder="Año" options={years} value={pending.year} onChange={v => setPending(p => ({ ...p, year: v }))} />
          <CustomSelect placeholder="Ordenar por" options={SORTS} value={pending.sort} onChange={v => setPending(p => ({ ...p, sort: v }))} />
          <button
            onClick={apply}
            style={{
              height: 44, padding: "0 22px",
              background: BURGUNDY, color: "#fff",
              border: "none", borderRadius: 99,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8,
              transition: "background 0.15s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#6B1414")}
            onMouseLeave={e => (e.currentTarget.style.background = BURGUNDY)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            Buscar
          </button>
          {hasAny && (
            <button
              onClick={clear}
              style={{
                height: 44, padding: "0 16px",
                border: `1.5px solid ${BURGUNDY}`, borderRadius: 99,
                fontSize: 13, color: BURGUNDY, background: "#fff",
                cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
              }}
            >✕ Limpiar</button>
          )}
        </div>
      </div>
    </>
  )
}

'use client'

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { FilterBar, type Filters } from "@/components/catalogo/FilterBar"
import { TagsPills } from "@/components/catalogo/TagsPills"
import { VehicleCard } from "@/components/catalogo/VehicleCard"
import { VehicleModal } from "@/components/catalogo/VehicleModal"
import { Pagination } from "@/components/catalogo/Pagination"
import { NAVY_DARK, SKY_BLUE, WHATSAPP, MUTED, NAVY, getVehicleTags, type Vehicle, type Tag } from "@/lib/catalog-helpers"

const PAGE_SIZE = 9

type Option = { value: string; label: string }

type InitialFilters = { search: string; marca: string; tipo: string; year: string; fuel: string }

type CatalogClientProps = {
  vehicles: Vehicle[]
  marcas: Option[]
  tipos: Option[]
  years: Option[]
  fuels: Option[]
  tags: Tag[]
  allTags: Tag[]
  initialFilters?: InitialFilters
}

export default function CatalogClient({ vehicles, marcas, tipos, years, fuels, tags, allTags, initialFilters }: CatalogClientProps) {
  const [filters, setFilters] = useState<Filters>({
    search: initialFilters?.search ?? "",
    marca:  initialFilters?.marca  ?? "",
    tipo:   initialFilters?.tipo   ?? "",
    year:   initialFilters?.year   ?? "",
    fuel:   initialFilters?.fuel   ?? "",
    sort: "newest",
  })
  const [activeTag, setActiveTag] = useState("")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Vehicle | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = [filters.marca, filters.tipo, filters.year, filters.fuel].filter(Boolean).length

  const filtered = useMemo(() => {
    let list = [...vehicles]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(v => `${v.marca} ${v.model}`.toLowerCase().includes(q))
    }
    if (filters.marca) list = list.filter(v => v.marca === filters.marca)
    if (filters.tipo) list = list.filter(v => v.tipo === filters.tipo)
    if (filters.year) list = list.filter(v => String(v.year) === filters.year)
    if (filters.fuel) list = list.filter(v => v.fuel === filters.fuel)
    if (activeTag) list = list.filter(v => getVehicleTags(v, allTags).includes(activeTag))

    if (filters.sort === "price_asc") list.sort((a, b) => (a.currency === b.currency ? a.precio_contado - b.precio_contado : a.currency === "USD" ? 1 : -1))
    else if (filters.sort === "price_desc") list.sort((a, b) => (a.currency === b.currency ? b.precio_contado - a.precio_contado : a.currency === "USD" ? -1 : 1))
    else if (filters.sort === "km_asc") list.sort((a, b) => a.km - b.km)
    else list.sort((a, b) => b.year - a.year)

    return list
  }, [filters, activeTag, vehicles])

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleFiltersChange(f: Filters) {
    setFilters(f)
    setPage(1)
    setShowFilters(false)
  }
  function handleTagChange(t: string) {
    setActiveTag(t)
    setPage(1)
  }

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "92px 24px 64px" }}>
        {/* Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
          <FilterBar
            filters={filters} onApply={handleFiltersChange}
            marcas={marcas} tipos={tipos} years={years} fuels={fuels}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(f => !f)}
            activeFiltersCount={activeFiltersCount}
          />
          <TagsPills activeTag={activeTag} onChange={handleTagChange} tags={tags} />
        </div>

        {/* Results header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ fontSize: 14, color: MUTED }}>
            {filtered.length === 0
              ? "No se encontraron vehículos"
              : `${filtered.length} vehículo${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
            {activeTag && <span> · <strong style={{ color: NAVY }}>{activeTag}</strong></span>}
          </p>
          {filtered.length > 0 && (
            <span style={{ fontSize: 13, color: MUTED }}>
              Página {page} de {Math.ceil(filtered.length / PAGE_SIZE)}
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: MUTED }}>
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><Search size={48} color={MUTED} strokeWidth={1.5} /></div>
            <p style={{ fontSize: 18, fontWeight: 600, color: NAVY }}>No encontramos vehículos con esos filtros</p>
            <p style={{ marginTop: 8 }}>Probá con otra combinación o consultanos por WhatsApp</p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hola! Estoy buscando un vehículo y no encontré lo que quería en el catálogo.")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24,
                background: WHATSAPP, color: "#fff", padding: "12px 24px",
                borderRadius: 99, fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}
            >
              Consultar disponibilidad
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {paginated.map(v => (
              <VehicleCard key={v.id} vehicle={v} onSelect={setSelected} allTags={allTags} />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }) }}
        />
      </div>

      {/* Footer strip */}
      <div style={{ background: NAVY_DARK, color: "rgba(255,255,255,0.5)", textAlign: "center", padding: "20px 24px", fontSize: 13 }}>
        © 2026 Raitzin Motors · Bariloche, Argentina ·{" "}
        <a href={`https://wa.me/${waNumber}`} style={{ color: SKY_BLUE, textDecoration: "none", marginLeft: 4 }}>WhatsApp</a> ·{" "}
        <a href="https://instagram.com/raitzin" style={{ color: SKY_BLUE, textDecoration: "none", marginLeft: 4 }}>@raitzin</a>
      </div>

      {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} allTags={allTags} />}
    </div>
  )
}

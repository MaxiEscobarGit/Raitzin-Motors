'use client'

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { FilterBar, type Filters } from "@/components/catalogo/FilterBar"
import { TagsPills } from "@/components/catalogo/TagsPills"
import { VehicleCard } from "@/components/catalogo/VehicleCard"
import { VehicleModal } from "@/components/catalogo/VehicleModal"
import { Pagination } from "@/components/catalogo/Pagination"
import { PAGE_SIZE, getVehicleTags, type Vehicle, type Tag } from "@/lib/catalog-helpers"

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
  // const [selected, setSelected] = useState<Vehicle | null>(null)
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
  const igHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-6 pt-[92px] pb-16">
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-7">
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
        <div className="flex justify-between items-center mb-5">
          <p className="text-sm text-muted-foreground">
            {filtered.length === 0
              ? "No se encontraron vehículos"
              : `${filtered.length} vehículo${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
            {activeTag && <span> · <strong className="text-navy">{activeTag}</strong></span>}
          </p>
          {filtered.length > 0 && (
            <span className="text-[13px] text-muted-foreground">
              Página {page} de {Math.ceil(filtered.length / PAGE_SIZE)}
            </span>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="mb-4 flex justify-center">
              <Search size={48} strokeWidth={1.5} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-navy">No encontramos vehículos con esos filtros</p>
            <p className="mt-2">Probá con otra combinación o consultanos por WhatsApp</p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hola! Estoy buscando un vehículo y no encontré lo que quería en el catálogo.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-whatsapp text-white px-6 py-3 rounded-full text-sm font-semibold no-underline"
            >
              Consultar disponibilidad
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {paginated.map(v => (
              <VehicleCard key={v.id} vehicle={v} allTags={allTags} />
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
      <div className="bg-navy-dark text-white/50 text-center px-6 py-5 text-[13px]">
        © 2026 Raitzin Motors · Bariloche, Argentina ·{" "}
        <a href={`https://wa.me/${waNumber}`} className="text-sky-blue no-underline ml-1">WhatsApp</a> ·{" "}
        <a href={`https://instagram.com/${igHandle}`} className="text-sky-blue no-underline ml-1">@{igHandle}</a>
      </div>

      {/* VehicleModal disabled — card click now navigates to /autos/[slug] */}
      {/* {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} allTags={allTags} />} */}
    </div>
  )
}

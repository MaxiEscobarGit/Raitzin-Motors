"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { type Tag } from "@/lib/catalog-helpers"

type TagsSectionProps = {
  tags: Tag[]
}

type BentoSlot = {
  gridRow: string
  gridColumn: string
  textSize: string
}

const BENTO_LAYOUT: Record<string, BentoSlot> = {
  "camioneta de batalla":  { gridRow: "1 / 3", gridColumn: "1 / 3", textSize: "text-xl" },
  "0 km":                  { gridRow: "1",     gridColumn: "3 / 5", textSize: "text-lg" },
  "buen valor de reventa": { gridRow: "1 / 3", gridColumn: "5 / 7", textSize: "text-xl" },
  "con pocos km":          { gridRow: "2",     gridColumn: "3",     textSize: "text-base" },
  "economico":             { gridRow: "2",     gridColumn: "4",     textSize: "text-base" },
  "inedito":               { gridRow: "3",     gridColumn: "1 / 4", textSize: "text-lg" },
  "facil mantenimiento":   { gridRow: "3",     gridColumn: "4 / 7", textSize: "text-lg" },
}

function toSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
}

function normalizeForBento(nombre: string): string {
  return nombre
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function TagsSection({ tags }: TagsSectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTag = searchParams.get("tag")

  if (!tags || tags.length === 0) return null

  const bentoTags = tags.filter((tag) => normalizeForBento(tag.nombre) in BENTO_LAYOUT)
  const extraTags = tags.filter((tag) => !(normalizeForBento(tag.nombre) in BENTO_LAYOUT))

  const isLastAlone = extraTags.length % 2 === 1

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#7EB8D4] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Filtrá por categoría</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-2">
            Quiero un auto...
          </h2>
          <p className="text-[#5A6A7A] text-base">
            Encontrá el que se adapta a vos
          </p>
        </div>

        {/* MOBILE: 2-column simple grid */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {tags.map((tag, index) => {
            const slug = toSlug(tag.nombre)
            const isActive = activeTag === slug
            const isLast = index === tags.length - 1
            const spanLast = tags.length % 2 === 1 && isLast

            return (
              <button
                key={tag.id}
                onClick={() => router.push(`/catalogo?tag=${slug}`)}
                aria-label={`Ver autos: ${tag.nombre}`}
                className={cn(
                  "h-20 rounded-2xl cursor-pointer shadow-sm",
                  "flex items-center justify-center",
                  "border-2 transition-all duration-200",
                  "font-bold text-base text-center",
                  spanLast && "col-span-2 max-w-[200px] mx-auto w-full",
                  isActive
                    ? "bg-[#1E2167] border-[#1E2167] text-white"
                    : "bg-white border-transparent text-[#1E2167] hover:border-[#1E2167] hover:bg-[#1E2167]/5",
                )}
              >
                <span className="px-3 leading-snug">{tag.nombre}</span>
              </button>
            )
          })}
        </div>

        {/* DESKTOP: Bento grid */}
        <div
          className="hidden md:grid grid-cols-6 border-2 border-gray-200 rounded-3xl overflow-hidden"
          style={{ gridAutoRows: "100px" }}
        >
          {bentoTags.map((tag) => {
            const key = normalizeForBento(tag.nombre)
            const slot = BENTO_LAYOUT[key]
            const slug = toSlug(tag.nombre)
            const isActive = activeTag === slug

            return (
              <button
                key={tag.id}
                onClick={() => router.push(`/catalogo?tag=${slug}`)}
                aria-label={`Ver autos: ${tag.nombre}`}
                style={{
                  gridRow: slot.gridRow,
                  gridColumn: slot.gridColumn,
                }}
                className={cn(
                  "flex items-center justify-center",
                  "cursor-pointer transition-colors duration-200",
                  "border-b border-r border-gray-200",
                  "font-bold whitespace-nowrap",
                  slot.textSize,
                  isActive
                    ? "bg-[#1E2167] text-white"
                    : "bg-white text-[#1E2167] hover:bg-[#1E2167]/5",
                )}
              >
                <span className="px-4 leading-snug text-center whitespace-normal">
                  {tag.nombre}
                </span>
              </button>
            )
          })}
        </div>

        {/* Extra tags (not in bento map) — simple 2-col row below */}
        {extraTags.length > 0 && (
          <div className="hidden md:grid grid-cols-2 gap-3 mt-3">
            {extraTags.map((tag, index) => {
              const slug = toSlug(tag.nombre)
              const isActive = activeTag === slug
              const isLast = index === extraTags.length - 1
              const spanLast = isLastAlone && isLast

              return (
                <button
                  key={tag.id}
                  onClick={() => router.push(`/catalogo?tag=${slug}`)}
                  aria-label={`Ver autos: ${tag.nombre}`}
                  className={cn(
                    "h-20 rounded-2xl cursor-pointer shadow-sm",
                    "flex items-center justify-center",
                    "border-2 transition-all duration-200",
                    "font-bold text-base text-center",
                    spanLast && "col-span-2 max-w-[200px] mx-auto w-full",
                    isActive
                      ? "bg-[#1E2167] border-[#1E2167] text-white"
                      : "bg-white border-transparent text-[#1E2167] hover:border-[#1E2167] hover:bg-[#1E2167]/5",
                  )}
                >
                  <span className="px-3 leading-snug">{tag.nombre}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

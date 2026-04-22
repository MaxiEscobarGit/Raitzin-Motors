"use client"

import { useRouter } from "next/navigation"

const tags = [
  { label: "Con pocos km", value: "con-pocos-km" },
  { label: "0 km", value: "0-km" },
  { label: "Camioneta de batalla", value: "camioneta-de-batalla" },
  { label: "Buen valor de reventa", value: "buen-valor-de-reventa" },
  { label: "Fácil mantenimiento", value: "facil-mantenimiento" },
  { label: "Inédito", value: "inedito" },
]

export function TagsSection() {
  const router = useRouter()

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-8">
          Quiero un auto...
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => router.push(`/catalogo?tag=${tag.value}`)}
              className="px-6 py-3 rounded-full border border-[#1E2167] text-[#1E2167] bg-white text-base font-medium transition-colors duration-200 hover:bg-[#1E2167] hover:text-white cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

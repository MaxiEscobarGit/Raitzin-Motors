'use client'

import { cn } from "@/lib/utils"

type TagsPillsProps = {
  activeTag: string
  onChange: (tag: string) => void
  tags: { id: number; nombre: string }[]
}

export function TagsPills({ activeTag, onChange, tags }: TagsPillsProps) {
  if (tags.length === 0) return null
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap items-center [scrollbar-width:none]">
      <span className="text-[13px] text-muted-foreground font-medium whitespace-nowrap flex-shrink-0">Quiero:</span>
      {tags.map(tag => (
        <button
          key={tag.id}
          onClick={() => onChange(activeTag === tag.nombre ? "" : tag.nombre)}
          className={cn(
            "px-4 py-[6px] rounded-full border-[1.5px] text-[13px] font-medium cursor-pointer transition-all duration-150 whitespace-nowrap flex-shrink-0 min-h-[36px]",
            activeTag === tag.nombre
              ? "border-navy bg-navy text-white"
              : "border-gray-300 bg-white text-navy"
          )}
        >
          {tag.nombre}
        </button>
      ))}
    </div>
  )
}

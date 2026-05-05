'use client'

import { NAVY, MUTED } from "@/lib/catalog-helpers"

type TagsPillsProps = {
  activeTag: string
  onChange: (tag: string) => void
  tags: { id: number; nombre: string }[]
}

export function TagsPills({ activeTag, onChange, tags }: TagsPillsProps) {
  if (tags.length === 0) return null
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap"
      style={{ alignItems: "center", scrollbarWidth: "none" }}
    >
      <span style={{ fontSize: 13, color: MUTED, fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}>Quiero:</span>
      {tags.map(tag => (
        <button key={tag.id} onClick={() => onChange(activeTag === tag.nombre ? "" : tag.nombre)} style={{
          padding: "6px 16px", borderRadius: 99,
          border: `1.5px solid ${activeTag === tag.nombre ? NAVY : "#D1D5DB"}`,
          background: activeTag === tag.nombre ? NAVY : "#fff",
          color: activeTag === tag.nombre ? "#fff" : NAVY,
          fontSize: 13, fontWeight: 500, cursor: "pointer",
          transition: "all 0.15s", fontFamily: "inherit", minHeight: 36,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>{tag.nombre}</button>
      ))}
    </div>
  )
}

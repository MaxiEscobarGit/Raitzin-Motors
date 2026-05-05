'use client'

import { useState, useEffect, useRef } from "react"
import { NAVY, MUTED, SKY_BLUE, SECTION_BG } from "@/lib/catalog-helpers"

type Option = { value: string; label: string }

type CustomSelectProps = {
  placeholder: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function CustomSelect({ placeholder, options, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const selected = options.find(o => o.value === value)

  return (
    <div ref={ref} style={{ position: "relative", flex: "1 1 150px", minWidth: 140 }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", height: 44,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 14px",
          background: "#fff",
          border: `1.5px solid ${open ? SKY_BLUE : "#D1D5DB"}`,
          borderRadius: 10,
          fontSize: 14, color: selected ? NAVY : MUTED,
          fontFamily: "inherit", cursor: "pointer",
          outline: "none",
          transition: "border-color 0.15s",
          boxShadow: open ? `0 0 0 3px ${SKY_BLUE}22` : "none",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="12" height="8" viewBox="0 0 12 8" fill="none"
          style={{ flexShrink: 0, marginLeft: 8, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="M1 1l5 5 5-5" stroke={MUTED} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 300,
          background: "#fff",
          border: `1.5px solid #E5E7EB`,
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(30,33,103,0.14)",
          overflow: "hidden",
          minWidth: 180,
        }}>
          {/* "All" option */}
          <div
            onClick={() => { onChange(""); setOpen(false) }}
            style={{
              padding: "11px 16px", fontSize: 14, cursor: "pointer",
              background: value === "" ? SKY_BLUE : "#fff",
              color: value === "" ? "#fff" : MUTED,
              fontWeight: value === "" ? 600 : 400,
              transition: "background 0.1s",
            }}
            onMouseEnter={e => { if (value !== "") (e.currentTarget as HTMLDivElement).style.background = SECTION_BG }}
            onMouseLeave={e => { if (value !== "") (e.currentTarget as HTMLDivElement).style.background = "#fff" }}
          >
            {placeholder}
          </div>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              style={{
                padding: "11px 16px", fontSize: 14, cursor: "pointer",
                background: value === opt.value ? SKY_BLUE : "#fff",
                color: value === opt.value ? "#fff" : NAVY,
                fontWeight: value === opt.value ? 600 : 400,
                transition: "background 0.1s",
                borderTop: "1px solid #F3F4F6",
              }}
              onMouseEnter={e => { if (value !== opt.value) (e.currentTarget as HTMLDivElement).style.background = SECTION_BG }}
              onMouseLeave={e => { if (value !== opt.value) (e.currentTarget as HTMLDivElement).style.background = "#fff" }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

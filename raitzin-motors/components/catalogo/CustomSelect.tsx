'use client'

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

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
    <div ref={ref} className="relative flex-[1_1_150px] min-w-[140px]">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          "w-full h-11 flex items-center justify-between px-[14px] bg-white rounded-[10px] text-sm cursor-pointer outline-none transition-all duration-150 border-[1.5px]",
          open ? "border-sky-blue ring-[3px] ring-sky-blue/15" : "border-gray-300",
          selected ? "text-navy" : "text-muted-foreground"
        )}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="12" height="8" viewBox="0 0 12 8" fill="none"
          className={cn("flex-shrink-0 ml-2 transition-transform duration-200", open ? "rotate-180" : "")}
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[300] bg-white border-[1.5px] border-gray-200 rounded-xl shadow-[0_8px_32px_rgba(30,33,103,0.14)] overflow-hidden min-w-[180px]">
          {/* "All" option */}
          <div
            onClick={() => { onChange(""); setOpen(false) }}
            className={cn(
              "px-4 py-[11px] text-sm cursor-pointer transition-colors duration-100",
              value === "" ? "bg-sky-blue text-white font-semibold" : "bg-white text-muted-foreground font-normal hover:bg-section-bg"
            )}
          >
            {placeholder}
          </div>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={cn(
                "px-4 py-[11px] text-sm cursor-pointer transition-colors duration-100 border-t border-gray-100",
                value === opt.value ? "bg-sky-blue text-white font-semibold" : "bg-white text-navy font-normal hover:bg-section-bg"
              )}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

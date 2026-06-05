'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tag {
  id: number
  nombre: string
}

interface Props {
  tags: Tag[]
  selectedIds: number[]
  onChange: (selectedIds: number[]) => void
}

export function TagSelector({ tags, selectedIds, onChange }: Props) {
  function toggle(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((t) => t !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3">Seleccioná uno o más tags (opcional)</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = selectedIds.includes(tag.id)
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggle(tag.id)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                selected
                  ? 'bg-[#1E2167] text-white border-[#1E2167]'
                  : 'bg-white text-[#1E2167] border-[#1E2167] hover:bg-[#1E2167]/5',
              )}
            >
              {selected && <Check className="w-3.5 h-3.5" />}
              {tag.nombre}
            </button>
          )
        })}
        {tags.length === 0 && (
          <p className="text-sm text-gray-400">No hay tags disponibles.</p>
        )}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { GripVertical, X } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortableImage = {
  /** Unique string id — use crypto.randomUUID() or Date.now() for new images */
  id: string
  /** Present for newly selected images (not yet uploaded) */
  file?: File
  /** Present for images already stored in Supabase Storage */
  url?: string
  /** data URL (blob:) for new images, or the public Storage URL for existing ones */
  preview: string
}

interface SortableImageGridProps {
  images: SortableImage[]
  onChange: (reorderedImages: SortableImage[]) => void
  onRemove: (id: string) => void
  disabled?: boolean
}

// ─── SortableImageItem ────────────────────────────────────────────────────────

interface SortableImageItemProps {
  image: SortableImage
  index: number
  onRemove: (id: string) => void
  disabled?: boolean
}

function SortableImageItem({ image, index, onRemove, disabled }: SortableImageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100',
        isDragging && 'opacity-50 ring-2 ring-[#7EB8D4] z-10',
      )}
    >
      <Image
        src={image.preview}
        alt={`Imagen ${index + 1}`}
        fill
        className="object-cover"
        unoptimized={!!image.file}
      />

      {/* Drag handle — top left */}
      {!disabled && (
        <button
          type="button"
          aria-label="Arrastrar para reordenar"
          {...attributes}
          {...listeners}
          className="absolute top-1.5 left-1.5 p-0.5 rounded text-white drop-shadow-md cursor-grab active:cursor-grabbing touch-none"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >
          <GripVertical size={16} />
        </button>
      )}

      {/* Remove button — top right */}
      <button
        type="button"
        aria-label="Eliminar imagen"
        onClick={() => onRemove(image.id)}
        disabled={disabled}
        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white
          rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
      >
        <X size={12} />
      </button>

      {/* "Principal" badge — index 0 only, bottom left */}
      {index === 0 && (
        <span
          className="absolute bottom-1.5 left-1.5 text-[10px] px-2 py-0.5 rounded-full font-semibold text-white"
          style={{ backgroundColor: '#1E2167' }}
        >
          Principal
        </span>
      )}

      {/* Order number — bottom right */}
      <span
        className="absolute bottom-1.5 right-1.5 w-5 h-5 flex items-center justify-center
          rounded-full bg-black/50 text-white text-[10px] font-semibold"
      >
        {index + 1}
      </span>
    </div>
  )
}

// ─── SortableImageGrid ────────────────────────────────────────────────────────

export function SortableImageGrid({
  images,
  onChange,
  onRemove,
  disabled = false,
}: SortableImageGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require a small drag distance before activating to avoid accidental drags on mobile
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id)
      const newIndex = images.findIndex((img) => img.id === over.id)
      onChange(arrayMove(images, oldIndex, newIndex))
    }
  }

  if (images.length === 0) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {images.map((img, index) => (
            <SortableImageItem
              key={img.id}
              image={img}
              index={index}
              onRemove={onRemove}
              disabled={disabled}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

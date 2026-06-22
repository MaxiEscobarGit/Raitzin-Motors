'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div
        className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center bg-gray-100"
        aria-label="Sin imágenes disponibles"
      >
        <p className="text-sm text-gray-400">Sin imágenes</p>
      </div>
    )
  }

  function prev() {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }

  function next() {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') setLightboxOpen(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black group cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Ver imagen ${activeIndex + 1} de ${images.length} en pantalla completa`}
      >
        <Image
          src={images[activeIndex]}
          alt={`${alt} — imagen ${activeIndex + 1}`}
          fill
          unoptimized
          quality={85}
          className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            <ZoomIn size={12} />
            Ampliar
          </span>
        </div>

        {/* Navigation arrows — only shown when > 1 image */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                bg-black/50 text-white flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                bg-black/50 text-white flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={cn(
                'relative shrink-0 w-20 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all bg-black',
                i === activeIndex
                  ? 'border-[#7EB8D4] ring-1 ring-[#7EB8D4]'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <Image
                src={src}
                alt={`${alt} — miniatura ${i + 1}`}
                fill
                unoptimized
                quality={60}
                className="object-contain"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes en pantalla completa"
        >
          {/* Inner container — stops propagation so clicks on the image don't close */}
          <div
            className="relative w-full max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video">
              <Image
                src={images[activeIndex]}
                alt={`${alt} — imagen ${activeIndex + 1}`}
                fill
                unoptimized
                quality={90}
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Imagen anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                    bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Imagen siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                    bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="mt-2 text-center text-white/60 text-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </div>

          {/* Close hint */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar galería"
            className="absolute top-4 right-4 text-white/70 hover:text-white text-sm"
          >
            ESC para cerrar
          </button>
        </div>
      )}
    </div>
  )
}

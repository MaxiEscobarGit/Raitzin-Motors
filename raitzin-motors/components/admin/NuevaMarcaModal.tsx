'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Loader2 } from 'lucide-react'
import { createMarcaAction } from '@/app/admin/autos/actions'

interface NuevaMarcaModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (marca: { id: number; nombre: string }) => void
}

export function NuevaMarcaModal({ isOpen, onClose, onCreated }: NuevaMarcaModalProps) {
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset state whenever the modal opens and autofocus the input
  useEffect(() => {
    if (isOpen) {
      setNombre('')
      setError(null)
      setLoading(false)
      // Defer focus so the element is visible in the DOM first
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  async function handleGuardar() {
    const trimmed = nombre.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)

    try {
      const nuevaMarca = await createMarcaAction(trimmed)
      onCreated(nuevaMarca)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la marca. Intentá de nuevo.')
      setLoading(false)
    }
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nueva-marca-titulo"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            id="nueva-marca-titulo"
            className="text-base font-semibold"
            style={{ color: '#1E2167' }}
          >
            Nueva marca
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Cerrar"
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100
              transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={16} />
          </button>
        </div>

        {/* Input */}
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && nombre.trim() && !loading) handleGuardar()
            }}
            disabled={loading}
            placeholder="Ej: Toyota, Ford, Renault..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none
              transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-100
              disabled:opacity-50 disabled:bg-gray-50"
          />
          {error && (
            <p className="mt-2 text-xs text-red-600">{error}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200
              text-gray-600 bg-white hover:bg-gray-50 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGuardar}
            disabled={loading || !nombre.trim()}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white
              transition-all hover:brightness-90 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
            style={{ backgroundColor: '#8B1A1A' }}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar marca'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

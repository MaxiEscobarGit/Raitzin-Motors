'use client'

import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  reset,
}: {
  reset?: () => void
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#8B1A1A]/10 flex items-center justify-center">
          <AlertTriangle size={36} className="text-[#8B1A1A]" aria-hidden="true" />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E2167] mb-3">
        Algo salió mal
      </h1>
      <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
        Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#1E2167] hover:bg-[#151849] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
          >
            <RefreshCw size={16} />
            Intentar de nuevo
          </button>
        )}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-[#1E2167] border-2 border-[#1E2167] hover:bg-[#1E2167] hover:text-white transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

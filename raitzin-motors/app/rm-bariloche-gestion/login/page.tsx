'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Car } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [contraseña, setContraseña] = useState('')
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const [estado, setEstado] = useState<'idle' | 'loading' | 'error' | 'bloqueado'>('idle')
  const [mensajeError, setMensajeError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!contraseña) return

    setEstado('loading')
    setMensajeError('')

    try {
      const res = await fetch('/api/rm-gestion/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: contraseña }),
      })

      const data = await res.json()

      if (res.ok) {
        // Redirigir al panel
        router.push('/rm-bariloche-gestion')
        router.refresh()
        return
      }

      if (res.status === 429) {
        setEstado('bloqueado')
        setMensajeError(data.error ?? 'Demasiados intentos. Intentá más tarde.')
        return
      }

      // Error de credenciales
      setEstado('error')
      const intentosRestantes = data.intentosRestantes
      if (typeof intentosRestantes === 'number' && intentosRestantes > 0) {
        setMensajeError(
          `Contraseña incorrecta. Te ${intentosRestantes === 1 ? 'queda' : 'quedan'} ${intentosRestantes} intento${intentosRestantes !== 1 ? 's' : ''}.`
        )
      } else {
        setMensajeError(data.error ?? 'Contraseña incorrecta.')
      }
    } catch {
      setEstado('error')
      setMensajeError('Error de conexión. Intentá de nuevo.')
    }
  }

  const esBloqueado = estado === 'bloqueado'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#1E2167' }}
    >
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className="px-8 pt-8 pb-6 text-center"
            style={{ backgroundColor: '#151849' }}
          >
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{ backgroundColor: '#1E2167' }}
            >
              <Car className="w-7 h-7" style={{ color: '#7EB8D4' }} />
            </div>
            <h1 className="text-white text-xl font-bold tracking-wide">
              Raitzin Motors
            </h1>
            <p className="text-sm mt-1" style={{ color: '#7EB8D4' }}>
              Panel de administración
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} noValidate>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
                style={{ color: '#1E2167' }}
              >
                Contraseña
              </label>

              {/* Campo de contraseña */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={mostrarContraseña ? 'text' : 'password'}
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  disabled={estado === 'loading' || esBloqueado}
                  placeholder="Ingresá tu contraseña"
                  className="w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm outline-none transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor:
                      estado === 'error' || esBloqueado ? '#8B1A1A' : '#D1D5DB',
                    boxShadow:
                      estado === 'error' || esBloqueado
                        ? '0 0 0 1px #8B1A1A'
                        : undefined,
                  }}
                  autoComplete="current-password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setMostrarContraseña((v) => !v)}
                  disabled={estado === 'loading' || esBloqueado}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400
                    hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
                  aria-label={mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {mostrarContraseña ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Mensaje de error */}
              {(estado === 'error' || esBloqueado) && mensajeError && (
                <p
                  className="mt-2 text-xs font-medium rounded-md px-3 py-2"
                  style={{ color: '#8B1A1A', backgroundColor: '#FEF2F2' }}
                >
                  {mensajeError}
                </p>
              )}

              {/* Botón de ingreso */}
              <button
                type="submit"
                disabled={estado === 'loading' || esBloqueado || !contraseña}
                className="mt-5 w-full py-2.5 px-4 rounded-lg text-white text-sm font-semibold
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  hover:brightness-90 active:scale-[0.98]"
                style={{ backgroundColor: '#8B1A1A' }}
              >
                {estado === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Ingresando...
                  </span>
                ) : (
                  'Ingresar'
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#7EB8D4' }}>
          Solo para uso interno de Raitzin Motors
        </p>
      </div>
    </div>
  )
}

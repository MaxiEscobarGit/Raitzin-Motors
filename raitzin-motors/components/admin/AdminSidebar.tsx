'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Car,
  PlusCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exactMatch: true,
  },
  {
    href: '/admin/autos',
    label: 'Vehículos',
    icon: Car,
    exactMatch: true,
  },
  {
    href: '/admin/autos/nuevo',
    label: 'Nuevo vehículo',
    icon: PlusCircle,
    exactMatch: true,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [cerrando, setCerrando] = useState(false)

  function esActivo(href: string, exactMatch: boolean) {
    if (exactMatch) return pathname === href
    return pathname.startsWith(href)
  }

  async function handleLogout() {
    setCerrando(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      setCerrando(false)
    }
  }

  return (
    <>
      {/* Botón hamburguesa (mobile) */}
      <button
        onClick={() => setMenuAbierto(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-white shadow-lg"
        style={{ backgroundColor: '#1E2167' }}
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay (mobile) */}
      {menuAbierto && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 flex flex-col',
          'transform transition-transform duration-300 ease-in-out',
          'md:relative md:translate-x-0 md:z-auto md:flex',
          menuAbierto ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ backgroundColor: '#151849' }}
      >
        {/* Header del sidebar */}
        <div
          className="flex items-center justify-between px-5 py-5 border-b"
          style={{ borderColor: '#1E2167' }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#7EB8D4' }}>
              Panel Admin
            </p>
            <p className="text-white font-bold text-sm leading-tight mt-0.5">
              Raitzin Motors
            </p>
          </div>

          {/* Cerrar (mobile) */}
          <button
            onClick={() => setMenuAbierto(false)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navLinks.map(({ href, label, icon: Icon, exactMatch }) => {
            const activo = esActivo(href, exactMatch)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuAbierto(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                  'transition-all duration-150 group',
                  activo
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
                style={
                  activo
                    ? { backgroundColor: '#1E2167', color: 'white' }
                    : undefined
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {activo && <ChevronRight className="w-3 h-3 opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Botón de cerrar sesión */}
        <div
          className="px-3 py-4 border-t"
          style={{ borderColor: '#1E2167' }}
        >
          <button
            onClick={handleLogout}
            disabled={cerrando}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium
              text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{cerrando ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
          </button>
        </div>
      </aside>
    </>
  )
}

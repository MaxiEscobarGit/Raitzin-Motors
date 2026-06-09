import Link from 'next/link'
import { Car, CheckCircle, XCircle, PlusCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

async function obtenerEstadisticas() {
  const supabase = await createClient()

  const { count: total } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('is_deleted', false)

  const { count: disponibles } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('is_deleted', false)
    .eq('is_sold', false)

  const { count: vendidos } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true })
    .eq('is_deleted', false)
    .eq('is_sold', true)

  return {
    total: total ?? 0,
    disponibles: disponibles ?? 0,
    vendidos: vendidos ?? 0,
  }
}

export default async function AdminDashboardPage() {
  const stats = await obtenerEstadisticas()

  const tarjetas = [
    {
      label: 'Total de vehículos',
      valor: stats.total,
      icon: Car,
      color: '#1E2167',
      bgColor: '#EEF2FF',
    },
    {
      label: 'Disponibles',
      valor: stats.disponibles,
      icon: CheckCircle,
      color: '#15803D',
      bgColor: '#F0FDF4',
    },
    {
      label: 'Vendidos',
      valor: stats.vendidos,
      icon: XCircle,
      color: '#8B1A1A',
      bgColor: '#FEF2F2',
    },
  ]

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: '#1E2167' }}>
          Bienvenido, Francisco
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Desde acá podés gestionar el stock de vehículos de Raitzin Motors.
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {tarjetas.map(({ label, valor, icon: Icon, color, bgColor }) => (
          <div
            key={label}
            className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4"
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
              style={{ backgroundColor: bgColor }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                {label}
              </p>
              <p className="text-3xl font-bold mt-0.5" style={{ color }}>
                {valor}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA principal */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold" style={{ color: '#1E2167' }}>
            ¿Tenés un auto nuevo para publicar?
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Cargá los datos, fotos y precio para que aparezca en el catálogo.
          </p>
        </div>
        <Link
          href="/rm-bariloche-gestion/autos/nuevo"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold
            whitespace-nowrap transition-all hover:brightness-90 active:scale-[0.98]"
          style={{ backgroundColor: '#8B1A1A' }}
        >
          <PlusCircle className="w-4 h-4" />
          Agregar nuevo vehículo
        </Link>
      </div>
    </div>
  )
}

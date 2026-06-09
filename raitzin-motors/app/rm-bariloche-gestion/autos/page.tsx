import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { getAllVehiclesAdmin } from '@/lib/supabase/queries/admin'
import { VehiclesTable } from '@/components/admin/VehiclesTable'

export default async function AdminAutosPage() {
  const vehicles = await getAllVehiclesAdmin()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1E2167' }}>
            Vehículos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {vehicles.length} vehículo{vehicles.length !== 1 ? 's' : ''} en total
          </p>
        </div>
        <Link
          href="/rm-bariloche-gestion/autos/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold
            transition-all hover:brightness-90 active:scale-[0.98]"
          style={{ backgroundColor: '#8B1A1A' }}
        >
          <PlusCircle className="w-4 h-4" />
          Nuevo vehículo
        </Link>
      </div>

      <VehiclesTable vehicles={vehicles ?? []} />
    </div>
  )
}

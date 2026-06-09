import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getMarcas, getTiposVehiculo, getTags } from '@/lib/supabase/queries/admin'
import { VehicleForm } from '@/components/admin/VehicleForm'

export default async function NuevoAutoPage() {
  const [marcas, tipos, tags] = await Promise.all([getMarcas(), getTiposVehiculo(), getTags()])

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/rm-bariloche-gestion/autos"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a vehículos
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: '#1E2167' }}>
          Nuevo vehículo
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Completá los datos del vehículo para publicarlo en el catálogo.
        </p>
      </div>

      <VehicleForm marcas={marcas ?? []} tipos={tipos ?? []} tags={tags ?? []} />
    </div>
  )
}

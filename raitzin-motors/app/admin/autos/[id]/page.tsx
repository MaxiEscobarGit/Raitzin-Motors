import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getVehicleById, getMarcas, getTiposVehiculo } from '@/lib/supabase/queries/admin'
import { VehicleEditForm } from '@/components/admin/VehicleEditForm'

export default async function EditarAutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [vehicle, marcas, tipos] = await Promise.all([
    getVehicleById(id),
    getMarcas(),
    getTiposVehiculo(),
  ])

  if (!vehicle) redirect('/admin/autos')

  const vehicleWithRelations = vehicle as typeof vehicle & {
    marcas: { id: number; nombre: string } | null
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/autos"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a vehículos
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: '#1E2167' }}>
          Editar vehículo &mdash;{' '}
          {vehicleWithRelations.marcas?.nombre} {vehicle.model} {vehicle.year}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Modificá los datos del vehículo. Los cambios se guardan al presionar &quot;Guardar cambios&quot;.
        </p>
      </div>
      <VehicleEditForm
        vehicle={vehicle}
        marcas={marcas ?? []}
        tipos={tipos ?? []}
      />
    </div>
  )
}

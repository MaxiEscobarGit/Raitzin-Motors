'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pencil, CheckCircle, XCircle, Car, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toggleSoldAction, softDeleteVehicleAction } from '@/app/admin/autos/actions'
import type { VehicleWithRelations } from '@/types/database'

function formatPrice(price: number | null, currency: string): string {
  if (!price) return '-'
  const formatted = price.toLocaleString('es-AR')
  return currency === 'USD' ? `USD ${formatted}` : `$ ${formatted}`
}

function formatKm(km: number): string {
  return km.toLocaleString('es-AR') + ' km'
}

interface Props {
  vehicles: VehicleWithRelations[]
}

export function VehiclesTable({ vehicles }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  if (vehicles.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <Car className="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 font-medium">No hay vehículos cargados</p>
        <p className="text-gray-400 text-sm mt-1">
          Usá el botón "Nuevo vehículo" para agregar el primero.
        </p>
      </div>
    )
  }

  async function handleToggle(id: string, currentValue: boolean) {
    setLoadingId(id)
    try {
      await toggleSoldAction(id, currentValue)
    } catch {
      // La revalidación de Next.js remonta el componente, resetea el estado
    } finally {
      setLoadingId(null)
    }
  }

  function openDeleteModal(id: string) {
    setSelectedVehicleId(id)
    setIsDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false)
    setSelectedVehicleId(null)
  }

  async function handleConfirmDelete() {
    if (!selectedVehicleId) return
    setDeleteLoadingId(selectedVehicleId)
    try {
      await softDeleteVehicleAction(selectedVehicleId)
      setIsDeleteModalOpen(false)
      setSelectedVehicleId(null)
    } catch {
      // error silencioso — la acción lanza si falla
    } finally {
      setDeleteLoadingId(null)
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB' }}>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Imagen</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Marca</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Modelo</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Año</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Precio contado</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">KM</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vehicles.map((v) => {
                const isToggleLoading = loadingId === v.id
                const isDeleteLoading = deleteLoadingId === v.id
                const thumbUrl = v.images?.[0] ?? null

                return (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    {/* Imagen */}
                    <td className="px-4 py-3">
                      <div
                        className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-gray-100 shrink-0
                          flex items-center justify-center"
                      >
                        {thumbUrl ? (
                          <Image
                            src={thumbUrl}
                            alt={`${v.marcas?.nombre ?? ''} ${v.model}`}
                            width={60}
                            height={60}
                            quality={70}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Car className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                    </td>

                    {/* Marca */}
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {v.marcas?.nombre ?? '-'}
                    </td>

                    {/* Modelo */}
                    <td className="px-4 py-3 text-gray-700">{v.model}</td>

                    {/* Año */}
                    <td className="px-4 py-3 text-gray-700">{v.year}</td>

                    {/* Precio */}
                    <td className="px-4 py-3 font-medium" style={{ color: '#8B1A1A' }}>
                      {formatPrice(v.precio_contado, v.currency)}
                    </td>

                    {/* KM */}
                    <td className="px-4 py-3 text-gray-600">{formatKm(v.km)}</td>

                    {/* Estado (badge) */}
                    <td className="px-4 py-3">
                      {v.is_sold ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: '#FEF2F2', color: '#8B1A1A' }}
                        >
                          <XCircle className="w-3 h-3" />
                          Vendido
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: '#F0FDF4', color: '#15803D' }}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Disponible
                        </span>
                      )}
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/autos/${v.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                            border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          Editar
                        </Link>

                        <button
                          onClick={() => handleToggle(v.id, v.is_sold)}
                          disabled={isToggleLoading || isDeleteLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          style={
                            v.is_sold
                              ? { backgroundColor: '#F0FDF4', color: '#15803D' }
                              : { backgroundColor: '#FEF2F2', color: '#8B1A1A' }
                          }
                        >
                          {isToggleLoading
                            ? 'Guardando...'
                            : v.is_sold
                            ? 'Marcar disponible'
                            : 'Marcar vendido'}
                        </button>

                        {/* Botón eliminar — solo visible en autos vendidos */}
                        {v.is_sold && (
                          <button
                            onClick={() => openDeleteModal(v.id)}
                            disabled={isToggleLoading || isDeleteLoading}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                              border border-red-200 text-red-600 hover:bg-red-50 transition-colors
                              disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={`Eliminar ${v.marcas?.nombre ?? ''} ${v.model}`}
                          >
                            <Trash2 className="w-3 h-3" />
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={isDeleteModalOpen} onOpenChange={closeDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle style={{ color: '#1E2167' }}>
              ¿Eliminar este vehículo?
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm leading-relaxed pt-1">
              El vehículo desaparecerá del panel pero su página web se mantendrá activa
              para preservar el SEO.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2 pt-2">
            <button
              onClick={closeDeleteModal}
              disabled={deleteLoadingId !== null}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border border-gray-200
                text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deleteLoadingId !== null}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#8B1A1A' }}
            >
              {deleteLoadingId !== null ? 'Eliminando...' : 'Sí, eliminar'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { VehicleWithRelations } from '@/types/database'
import type { VehicleFilters } from './useFilters'
import { PAGE_SIZE } from '@/constants/vehicle'

export function useVehicles(filters: VehicleFilters) {
  const [vehicles, setVehicles] = useState<VehicleWithRelations[]>([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const page = filters.page

        let query = supabase
          .from('vehicles')
          .select(
            `*,
            marcas (id, nombre, logo_url),
            tipo_vehiculo (id, nombre),
            tags (id, nombre)`,
            { count: 'exact' }
          )
          .eq('is_sold', false)
          .order('created_at', { ascending: false })
          .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

        if (filters.id_marca) query = query.eq('id_marca', filters.id_marca)
        if (filters.id_tipo) query = query.eq('id_tipo', filters.id_tipo)
        if (filters.year_min) query = query.gte('year', filters.year_min)
        if (filters.year_max) query = query.lte('year', filters.year_max)
        if (filters.precio_min) query = query.gte('precio_contado', filters.precio_min)
        if (filters.precio_max) query = query.lte('precio_contado', filters.precio_max)
        if (filters.km_max) query = query.lte('km', filters.km_max)

        const { data, count, error } = await query
        if (error) throw error

        setVehicles((data ?? []) as VehicleWithRelations[])
        setCount(count ?? 0)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar vehículos'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles()
  }, [filters])

  return { vehicles, count, isLoading, error }
}

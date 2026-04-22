'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export interface VehicleFilters {
  id_marca?: number
  id_tipo?: number
  year_min?: number
  year_max?: number
  precio_min?: number
  precio_max?: number
  km_max?: number
  page: number
}

const PARAM_MAP: Record<keyof Omit<VehicleFilters, 'page'>, string> = {
  id_marca: 'marca',
  id_tipo: 'tipo',
  year_min: 'year_min',
  year_max: 'year_max',
  precio_min: 'precio_min',
  precio_max: 'precio_max',
  km_max: 'km_max',
}

export function useFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters: VehicleFilters = {
    id_marca: searchParams.get('marca') ? Number(searchParams.get('marca')) : undefined,
    id_tipo: searchParams.get('tipo') ? Number(searchParams.get('tipo')) : undefined,
    year_min: searchParams.get('year_min') ? Number(searchParams.get('year_min')) : undefined,
    year_max: searchParams.get('year_max') ? Number(searchParams.get('year_max')) : undefined,
    precio_min: searchParams.get('precio_min') ? Number(searchParams.get('precio_min')) : undefined,
    precio_max: searchParams.get('precio_max') ? Number(searchParams.get('precio_max')) : undefined,
    km_max: searchParams.get('km_max') ? Number(searchParams.get('km_max')) : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  }

  const setFilter = useCallback(
    (key: keyof Omit<VehicleFilters, 'page'>, value: number | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      const paramKey = PARAM_MAP[key]
      if (value !== undefined) {
        params.set(paramKey, String(value))
      } else {
        params.delete(paramKey)
      }
      params.set('page', '1')
      router.push(`/catalogo?${params.toString()}`)
    },
    [router, searchParams]
  )

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(page))
      router.push(`/catalogo?${params.toString()}`)
    },
    [router, searchParams]
  )

  const resetFilters = useCallback(() => {
    router.push('/catalogo')
  }, [router])

  return { filters, setFilter, setPage, resetFilters }
}

export const FUEL_TYPES = [
  { value: 'nafta', label: 'Nafta' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'gnc', label: 'GNC' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'electrico', label: 'Eléctrico' },
] as const

export const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatica', label: 'Automática' },
  { value: 'cvt', label: 'CVT' },
] as const

export const TRACCION_TYPES = [
  { value: '4x2', label: '4x2' },
  { value: '4x4', label: '4x4' },
  { value: 'awd', label: 'AWD' },
] as const

export const CURRENCIES = [
  { value: 'ARS', label: 'Pesos (ARS)' },
  { value: 'USD', label: 'Dólares (USD)' },
] as const

export const ESTADO_LABELS: Record<number, string> = {
  1: 'Regular',
  2: 'Bueno',
  3: 'Muy bueno',
  4: 'Excelente',
  5: 'Como nuevo',
}

export const VEHICLE_TYPES = [
  'Chico',
  'Sedán',
  'Deportivo',
  'SUV',
  'Pickup',
  'Inédito',
] as const

export const TAGS = [
  'Con pocos km',
  '0 km',
  'Camioneta de batalla',
  'Buen valor de reventa',
  'Fácil mantenimiento',
  'Inédito',
] as const

export const PAGE_SIZE = 12

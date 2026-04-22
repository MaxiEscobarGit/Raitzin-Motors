export type Database = {
  public: {
    Tables: {
      tipo_vehiculo: {
        Row: { id: number; nombre: string }
        Insert: { id?: number; nombre: string }
        Update: { id?: number; nombre?: string }
      }
      marcas: {
        Row: { id: number; nombre: string; logo_url: string | null }
        Insert: { id?: number; nombre: string; logo_url?: string | null }
        Update: { id?: number; nombre?: string; logo_url?: string | null }
      }
      tags: {
        Row: { id: number; nombre: string }
        Insert: { id?: number; nombre: string }
        Update: { id?: number; nombre?: string }
      }
      vehicles: {
        Row: {
          id: string
          id_tipo: number | null
          id_marca: number | null
          id_tag: number | null
          model: string
          year: number
          km: number
          motor: string | null
          fuel: string | null
          transmission: string | null
          traccion: string | null
          color: string | null
          interior: string | null
          estado: number
          precio_contado: number | null
          precio_financiado: number | null
          cuotas: number | null
          valor_cuota: number | null
          currency: 'ARS' | 'USD'
          description: string | null
          images: string[]
          slug: string
          is_sold: boolean
          is_featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          id_tipo?: number | null
          id_marca?: number | null
          id_tag?: number | null
          model: string
          year: number
          km: number
          motor?: string | null
          fuel?: string | null
          transmission?: string | null
          traccion?: string | null
          color?: string | null
          interior?: string | null
          estado: number
          precio_contado?: number | null
          precio_financiado?: number | null
          cuotas?: number | null
          valor_cuota?: number | null
          currency: 'ARS' | 'USD'
          description?: string | null
          images?: string[]
          slug: string
          is_sold?: boolean
          is_featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          id_tipo?: number | null
          id_marca?: number | null
          id_tag?: number | null
          model?: string
          year?: number
          km?: number
          motor?: string | null
          fuel?: string | null
          transmission?: string | null
          traccion?: string | null
          color?: string | null
          interior?: string | null
          estado?: number
          precio_contado?: number | null
          precio_financiado?: number | null
          cuotas?: number | null
          valor_cuota?: number | null
          currency?: 'ARS' | 'USD'
          description?: string | null
          images?: string[]
          slug?: string
          is_sold?: boolean
          is_featured?: boolean
          created_at?: string
        }
      }
    }
  }
}

// Convenience types
export type TipoVehiculo = Database['public']['Tables']['tipo_vehiculo']['Row']
export type Marca = Database['public']['Tables']['marcas']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']
export type Vehicle = Database['public']['Tables']['vehicles']['Row']
export type VehicleInsert = Database['public']['Tables']['vehicles']['Insert']
export type VehicleUpdate = Database['public']['Tables']['vehicles']['Update']

// Vehicle with joins
export type VehicleWithRelations = Vehicle & {
  marcas: Marca | null
  tipo_vehiculo: TipoVehiculo | null
  tags: Tag | null
}

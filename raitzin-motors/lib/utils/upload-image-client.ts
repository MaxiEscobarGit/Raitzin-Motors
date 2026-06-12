/**
 * uploadImageToStorage
 *
 * Sube una imagen directamente desde el navegador al bucket "vehicle-images"
 * usando el cliente Supabase con la anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY).
 * El archivo nunca transita por el servidor de Next.js, lo que evita el límite
 * de 10 MB de los Server Actions.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * POLÍTICA DE STORAGE REQUERIDA EN SUPABASE DASHBOARD
 * ─────────────────────────────────────────────────────────────────────────
 * Para que este upload funcione, crear la siguiente política en el bucket
 * "vehicle-images":
 *
 *   Dashboard → Storage → vehicle-images → Policies → New policy
 *
 *   Policy name:   Allow client-side admin uploads
 *   Operation:     INSERT
 *   Target roles:  anon
 *   WITH CHECK expression:
 *     bucket_id = 'vehicle-images'
 *     AND (storage.foldername(name))[1] = 'vehicles'
 *
 * Esto restringe el upload del anon key únicamente a la carpeta "vehicles/"
 * dentro del bucket. Todas las demás operaciones (UPDATE, DELETE, SELECT
 * fuera del bucket público) siguen requiriendo el service role key a través
 * del servidor.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { createClient } from '@/lib/supabase/client'

export async function uploadImageToStorage(
  file: File | Blob,
  slug: string,
  index: number,
): Promise<string> {
  const supabase = createClient()
  const timestamp = Date.now()
  const path = `vehicles/${slug}/${timestamp}-${index}.webp`

  const { error } = await supabase.storage
    .from('vehicle-images')
    .upload(path, file, { contentType: 'image/webp', upsert: false })

  if (error) throw new Error(`Error al subir la imagen ${index + 1}: ${error.message}`)

  const { data } = supabase.storage.from('vehicle-images').getPublicUrl(path)
  return data.publicUrl
}

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Cliente con service role key — bypassa RLS. Solo usar en Server Actions/Route Handlers de admin.
// Requiere SUPABASE_SERVICE_ROLE_KEY en .env.local (nunca NEXT_PUBLIC_)
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

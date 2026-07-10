/**
 * Backfill Cache-Control headers on all existing objects in the
 * "vehicle-images" Supabase Storage bucket.
 *
 * Run once:
 *   npx tsx --env-file=.env.local scripts/backfill-cache-control.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js'

const BUCKET = 'vehicle-images'
const CACHE_CONTROL = '31536000' // 1 year

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(url, key)

async function listAll(prefix: string): Promise<string[]> {
  const paths: string[] = []
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, { limit: 1000 })
  if (error) throw error
  for (const item of data ?? []) {
    const full = prefix ? `${prefix}/${item.name}` : item.name
    if (item.id) {
      paths.push(full)
    } else {
      // folder — recurse
      paths.push(...(await listAll(full)))
    }
  }
  return paths
}

async function main() {
  console.log(`Listing all objects in "${BUCKET}"...`)
  const paths = await listAll('')
  console.log(`Found ${paths.length} objects.\n`)

  let updated = 0
  let failed = 0

  for (const path of paths) {
    const { data: blob, error: dlErr } = await supabase.storage.from(BUCKET).download(path)
    if (dlErr || !blob) {
      console.error(`  SKIP ${path}: ${dlErr?.message ?? 'empty'}`)
      failed++
      continue
    }

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .update(path, blob, { cacheControl: CACHE_CONTROL, upsert: true })

    if (upErr) {
      console.error(`  FAIL ${path}: ${upErr.message}`)
      failed++
    } else {
      console.log(`  OK   ${path}`)
      updated++
    }
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`)
}

main().catch((e) => { console.error(e); process.exit(1) })

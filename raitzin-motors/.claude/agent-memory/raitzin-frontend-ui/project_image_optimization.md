---
name: Image optimization patterns
description: How image compression, Next.js Image, and Supabase Storage are wired together in the project
type: project
---

## Next.js Image configuration
`next.config.mjs` uses `remotePatterns` (NOT `unoptimized: true`) to allow Next.js to optimize
Supabase Storage images:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'buruewryhtceeetpxvgs.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

**Why:** `unoptimized: true` was the old placeholder — it disables all CDN optimization.
**How to apply:** Any `<Image>` pointing to Supabase Storage URLs should NOT use `unoptimized` (except blob: preview URLs in admin forms, which must stay `unoptimized`).

## Client-side compression utility
`lib/utils/compress-image.ts` — pure function, no 'use client' / 'use server' directive.

```ts
compressImage(file: File): Promise<File>
```
- Files < 300 KB are returned unchanged.
- Max side 1200 px, aspect ratio preserved.
- Output: WebP at quality 0.82.
- Revokes objectURL in `finally` to avoid memory leaks.

**Why:** Reduce Supabase Storage usage and upload time for large phone photos.

## VehicleForm image flow (submit sequence)
1. `'compressing'` — `compressImage()` called for each file, `compressedSizes` state updated
2. `'uploading'` — compressed files sent via `uploadImagesAction(FormData)`
3. `'saving'` — `createVehicleAction()` inserts record with image URLs

## Image quality settings per context
| Context | Component | width/height | quality | notes |
|---|---|---|---|---|
| Catalog grid | VehicleCard | 400x300 | 80 | `width`/`height` props |
| Vehicle detail main | ImageGallery | fill | 85 | `priority` on active image |
| Lightbox | ImageGallery | fill | 90 | inside dialog overlay |
| Thumbnails (gallery) | ImageGallery | fill | 60 | `sizes="64px"` |
| Admin table thumb | VehiclesTable | 60x60 | 70 | |
| Admin form previews | VehicleForm | fill | — | `unoptimized` (blob URLs) |

## Preview size display
`VehicleForm` shows file size under each preview thumbnail.
Before compression: `"2.4 MB"`. After submit+compress: `"2.4 MB → 180 KB"`.
State shape: `originalSizes: number[]`, `compressedSizes: (number | null)[]` — parallel arrays
that stay in sync with `imageFiles` and `imagePreviews` (all filtered together in `removeImage`).

## ImageGallery features
- `'use client'` — stateful (activeIndex, lightboxOpen)
- Lightbox with keyboard navigation (ArrowLeft/Right/Escape)
- Thumbnail strip below main image
- `sizes` prop used on main image: `"(max-width: 768px) 100vw, 60vw"`
- Empty state (no images) rendered gracefully

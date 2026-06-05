# Performance & SEO Agent — Memory

## Key File Paths
- `app/layout.tsx` — root metadata, font, lang attribute
- `app/page.tsx` — landing page (SSG, revalidate 3600), AutoDealer JSON-LD
- `app/catalogo/page.tsx` — catalog (ISR revalidate 60), metadata only
- `app/autos/[slug]/page.tsx` — vehicle detail (ISR revalidate 300), Car JSON-LD, generateMetadata, generateStaticParams
- `app/sitemap.ts` — async, pulls all vehicle slugs from Supabase
- `app/robots.ts` — disallows /admin/
- `next.config.mjs` — remotePatterns, serverActions bodySizeLimit 10mb
- `components/hero-section.tsx` — hero images with priority

## Confirmed Patterns

### Rendering Strategy (ISR)
- `/` → `export const revalidate = 3600`
- `/catalogo` → `export const revalidate = 60`
- `/autos/[slug]` → `export const revalidate = 300`
- `/admin` → CSR only, `robots: { index: false, follow: false }` in admin layout.tsx

### Metadata Template
- Root layout uses `title: { default: '...', template: '%s | Raitzin Motors' }`
- Per-page title on vehicle detail: `"${marca} ${model} ${year} | Raitzin Motors Bariloche"`
- All public pages need `alternates.canonical` using `NEXT_PUBLIC_SITE_URL`
- All OG blocks need `locale: 'es_AR'`, `siteName: 'Raitzin Motors'`
- Twitter card: `summary_large_image` on all public pages

### JSON-LD
- Landing `/`: AutoDealer schema injected as `<script type="application/ld+json">` inside `<main>`
- Vehicle `/autos/[slug]`: Car schema — `seller.address` MUST be a PostalAddress object (not a string)
- `availability` on Car offers uses `vehicle.is_sold` to toggle SoldOut/InStock

### Images
- Hero: two `<Image>` tags (mobile + desktop), both with `priority` and `fill`
- VehicleCard (catalogo): `fill`, `loading="lazy"`, `sizes="(max-width: 768px) 50vw, 25vw"`
- VehicleCard (cards/): `width={400} height={300}`, `loading="lazy"` implied by absence of priority
- Vehicle detail main image: `fill`, `priority`, `sizes="(max-width: 1024px) 100vw, 60vw"`
- Thumbnails: `fill`, `loading="lazy"`, `sizes="80px"`

### next.config.mjs
- Use wildcard `*.supabase.co` not hardcoded project ID — project ID was `buruewryhtceeetpxvgs`
- `serverActions.bodySizeLimit: '10mb'` required for image upload in admin

### Sitemap
- Must be `async` and fetch slugs from Supabase using anon client (no cookies/request context)
- Includes sold vehicles (they stay indexable for SEO value)
- `export const revalidate = 3600` on sitemap.ts

### Font
- `Plus_Jakarta_Sans` from `next/font/google` with `display: 'swap'` — confirmed correct

### Slug Structure
- Vehicle slugs: `marca-model-year` (e.g. `toyota-hilux-2022`)
- `generateSlug` is in `lib/catalog-helpers.ts` (NOT `lib/utils.ts` as CLAUDE.md suggests)

## Known Gaps / Future Work
- `VehicleCard` alt text uses `"${marca} ${model} ${year}"` — acceptable but could append "Raitzin Motors Bariloche"
- No web-vitals instrumentation installed yet
- No `@next/bundle-analyzer` configured yet
- Sold vehicle pages (`SoldVehiclePage`) have no dedicated metadata — they reuse the vehicle's generateMetadata which is fine

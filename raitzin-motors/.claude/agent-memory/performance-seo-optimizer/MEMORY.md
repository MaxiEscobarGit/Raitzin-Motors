# Performance & SEO Agent — Memory

## Key File Paths
- `app/layout.tsx` — root metadata, font, lang attribute
- `app/page.tsx` — landing page (SSG, revalidate 3600), AutoDealer JSON-LD
- `app/catalogo/page.tsx` — catalog (ISR revalidate 60), metadata only
- `app/autos/[slug]/page.tsx` — vehicle detail (ISR revalidate 300), Car JSON-LD, generateMetadata, generateStaticParams
- `app/autos/[slug]/VehiclePageClient.tsx` — client gallery, main image has priority + correct alt
- `app/nosotros/page.tsx` — (revalidate 86400), full OG + canonical + twitter
- `app/servicios/page.tsx` — (revalidate 86400), full OG + canonical + twitter
- `app/terminos/page.tsx` — (revalidate 86400), canonical + OG
- `app/privacidad/page.tsx` — (revalidate 86400), canonical + OG
- `app/sitemap.ts` — async, pulls all vehicle slugs from Supabase; includes nosotros, servicios, terminos, privacidad
- `app/robots.ts` — disallows /admin/
- `next.config.mjs` — remotePatterns, serverActions bodySizeLimit 10mb (in experimental block)
- `components/hero-section.tsx` — hero images with priority
- `components/catalogo/VehicleCard.tsx` — catalog card, lazy image with Bariloche alt text
- `components/vehicle/ImageGallery.tsx` — exists but NOT used; VehiclePageClient has its own inline gallery

## Confirmed Patterns

### Rendering Strategy
- `/` → `export const revalidate = 3600`
- `/catalogo` → `export const revalidate = 60`
- `/autos/[slug]` → `export const revalidate = 300`
- `/nosotros` → `export const revalidate = 86400`
- `/servicios` → `export const revalidate = 86400`
- `/terminos` → `export const revalidate = 86400`
- `/privacidad` → `export const revalidate = 86400`
- `/admin` → CSR only, `robots: { index: false, follow: false }` in admin layout.tsx

### Metadata Template
- Root layout uses `title: { default: '...', template: '%s | Raitzin Motors' }`
- Per-page title on vehicle detail: `"${marca} ${model} ${year} | Raitzin Motors Bariloche"`
- All public pages need `alternates.canonical` using `NEXT_PUBLIC_SITE_URL`
- All OG blocks need `locale: 'es_AR'`, `siteName: 'Raitzin Motors'`
- Twitter card: `summary_large_image` on landing, catalogo, vehicle detail, nosotros, servicios
- Legal pages (terminos, privacidad): OG + canonical only, no twitter card needed

### JSON-LD
- Landing `/`: AutoDealer schema injected as `<script type="application/ld+json">` inside `<main>`
- Vehicle `/autos/[slug]`: Car schema — `seller.address` MUST be a PostalAddress object (not a string)
- `availability` on Car offers uses `vehicle.is_sold` to toggle SoldOut/InStock

### Images
- Hero: two `<Image>` tags (mobile + desktop), both with `priority` and `fill`
- VehicleCard (catalogo): `fill`, `loading="lazy"`, `sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"`
- Vehicle detail main image (VehiclePageClient): `fill`, `priority`, `sizes="(max-width: 1024px) 100vw, 60vw"`
- Vehicle detail thumbnails: `fill`, `loading="lazy"`, `sizes="80px"`
- Nosotros hero images: `fill`, `priority` — correct LCP treatment
- Nosotros oficina.png (below fold): `fill`, `loading="lazy"` — fixed in full audit
- Alt text pattern: `"${marca} ${model} ${year} — Raitzin Motors Bariloche"` on all vehicle images

### next.config.mjs
- Use wildcard `*.supabase.co` not hardcoded project ID
- `experimental.serverActions.bodySizeLimit: '10mb'` required for image upload in admin
- `typescript.ignoreBuildErrors: true` is present — do not remove (intentional)

### Sitemap (app/sitemap.ts)
- Static pages: `/` (1.0), `/catalogo` (0.9), `/servicios` (0.7), `/nosotros` (0.6), `/terminos` (0.2), `/privacidad` (0.2)
- Vehicle pages: priority 0.8, changeFrequency weekly
- Filters `is_deleted = false` only (sold vehicles remain in sitemap for SEO value)
- `export const revalidate = 3600`

### Font
- `Plus_Jakarta_Sans` from `next/font/google` with `display: 'swap'` — confirmed correct

### Slug Structure
- Vehicle slugs: `marca-model-year` (e.g. `toyota-hilux-2022`)
- `generateSlug` is in `lib/catalog-helpers.ts` (NOT `lib/utils.ts`)

## Known Gaps / Future Work
- No web-vitals instrumentation installed yet
- No `@next/bundle-analyzer` configured yet
- `ImageGallery.tsx` component (components/vehicle/) is unused — superseded by inline gallery in VehiclePageClient
- VehiclesSection on landing uses horizontal scroll carousel (no setInterval) — no cleanup needed

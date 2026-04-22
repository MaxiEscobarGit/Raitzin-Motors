---
name: project_phase1_status
description: Current state of Phase 1 landing page — which components exist, where they live, and what they contain
type: project
---

Phase 1 (Landing page) is in progress as of 2026-04-16.

**Why:** The client (Francisco) has 60k+ Instagram followers but no web presence. The landing is the first conversion surface.

**How to apply:** When working on landing components, reference this to understand what already exists and avoid duplicating work.

## Component locations (actual, not planned)
Components are currently flat in `components/` root, NOT in subdirectories:
- `components/navbar.tsx` — exports `Navbar` (named)
- `components/hero-section.tsx` — exports `HeroSection` (named)
- `components/search-section.tsx` — exports `SearchSection` (named)
- `components/services-section.tsx` — exports `ServicesSection` (named)
- `components/vehicles-section.tsx` — exports `VehiclesSection` (named)
- `components/contact-section.tsx` — exports `ContactSection` and `Footer` (both named)

Subdirectories exist but contents are pending:
- `components/landing/`, `components/catalog/`, `components/vehicle/`, `components/cards/`, `components/admin/`, `components/layout/`

## app/page.tsx structure
Imports all flat components directly. Inline "Sobre Nosotros" section lives in page.tsx itself (not extracted to a component yet).

## Key notes
- `VehiclesSection` uses hardcoded mock data (3 vehicles) — will be replaced with Supabase data in a later pass
- `formatPrice` and `formatKm` now correctly imported from `@/lib/utils` in `vehicles-section.tsx` (duplicates removed)
- Mock vehicles have explicit `currency: "ARS" as const` field to match the `formatPrice(price, currency)` signature
- Navbar scroll effect: `isScrolled` → `border-b border-gray-200 shadow-sm` (subtle, not heavy shadow-md)
- Navbar desktop link color: `text-[#1E2167]` (navy), hover → `text-[#8B1A1A]` (burgundy)
- Hero image path: `/images/hero-ranger-mountains.jpg` — must exist in `public/images/`
- Hero uses `animate-in fade-in duration-700` (tw-animate-css), NOT `animate-fade-in` (which doesn't exist)
- Hero has 3 micro-stats bar anchored at bottom: "10+ Años en el mercado", "Semanal Stock actualizado", "Sí Permuta y financiación"
- WhatsApp links use `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` correctly — no hardcoded numbers
- Icon-only WhatsApp buttons require `aria-label="Consultar por WhatsApp"` for accessibility
- `ServicesSection` cards use `border-t-2 border-t-transparent hover:border-t-[#7EB8D4]` for sky-blue accent on hover
- `ServicesSection` body text uses `text-muted-foreground` (resolves to `#5A6A7A` via CSS var)
- `contact-section.tsx` exports both `ContactSection` and `Footer` — TODO comment added to split Footer to `components/layout/Footer.tsx`
- `globals.css` now includes `--navy-dark: #151849` in `:root` and `--color-navy-dark: var(--navy-dark)` in `@theme inline`
- SelectTriggers in `SearchSection` have explicit `aria-label` attributes for accessibility

---
name: project_phase1_status
description: Current state of Phase 1 landing page — which components exist, where they live, and what they contain
type: project
---

Phase 1 (Landing page) is in progress. Full audit conducted 2026-04-23 and all issues fixed.

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

## app/page.tsx structure (post-audit correct order)
Navbar → HeroSection → SearchSection → TagsSection → VehiclesSection → ServicesSection → ReviewsSection → ContactSection → Footer

Note: TagsSection is a "Quiero un auto..." pill filter navigator that routes to `/catalogo?tag=...`. It sits between Search and Vehicles.

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
- `ServicesSection` fully redesigned with GSAP scroll-driven animations (2026-05-19):
  - Desktop: sticky layout, 4×100vh total height, wheel spins 3 full rotations via ScrollTrigger scrub, each service fades in/out as its scroll segment passes
  - Mobile: normal flow grid (sm:grid-cols-2), wheel spins 2 rotations via ScrollTrigger scrub
  - Two separate section refs (`sectionDesktopRef`, `sectionMobileRef`) and two wheel refs (`wheelDesktopRef`, `wheelMobileRef`) to avoid duplicate ref on hidden/shown elements
  - GSAP imported dynamically (async) inside useEffect — never top-level — to avoid SSR issues
  - ScrollTrigger.getAll().forEach(t => t.kill()) cleanup in useEffect return
  - First service panel starts at opacity:1 (not 0) so content is visible on section entry
  - Realistic SVG wheel: tyre ring r=95, rim r=78, inner ring r=30, center dot r=10 (burgundy), 5 spokes at 0/72/144/216/288deg, 5 bolts at 36/108/180/252/324deg (r=45 from center, burgundy)
  - WheelSVG extracted as inner component accepting `svgRef` prop to allow reuse across both layouts
  - Card content no longer uses shadcn Card/CardContent — plain divs with `rounded-2xl border border-gray-100 p-8`
- `contact-section.tsx` exports both `ContactSection` and `Footer` — TODO comment added to split Footer to `components/layout/Footer.tsx`
- `globals.css` now includes `--navy-dark: #151849` in `:root` and `--color-navy-dark: var(--navy-dark)` in `@theme inline`
- SelectTriggers in `SearchSection` have explicit `aria-label` attributes for accessibility

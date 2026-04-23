---
name: design_system
description: Color tokens, typography, spacing, and Tailwind conventions for Raitzin Motors
type: reference
---

## Color tokens (defined as CSS vars in globals.css, exposed as Tailwind utilities via @theme inline)

| Purpose          | Hex       | Tailwind class         |
|------------------|-----------|------------------------|
| Navy (primary)   | #1E2167   | `bg-navy` / `text-navy` |
| Navy Dark (hero) | #151849   | use arbitrary `bg-[#151849]` |
| Sky Blue accent  | #7EB8D4   | `bg-pastel-blue` / `text-pastel-blue` |
| Burgundy (CTA)   | #8B1A1A   | `bg-burgundy` / `text-burgundy` |
| Section bg       | #F4F8FB   | `bg-section-bg` |
| Search card bg   | #EBF4FA   | `bg-search-card-bg` |
| WhatsApp green   | #25D366   | `bg-whatsapp` |
| White            | #FFFFFF   | `bg-white` / `text-white` |
| Text secondary   | #5A6A7A   | `text-text-secondary` |

shadcn/ui tokens: `--primary` = Burgundy, `--accent` = Sky Blue, `--secondary-foreground` = Navy.

## Typography
- `font-sans`: Inter (body)
- `font-serif`: Playfair Display (headings — use `font-serif` class)
- Heading pattern: `text-3xl md:text-4xl font-bold text-navy font-serif`
- Section subtitle pattern: `text-text-secondary text-lg`
- Price: `text-xl font-bold text-burgundy`

## Spacing conventions
- Section padding: `py-12 md:py-20` (landing) or `py-16 lg:py-24` (interior pages)
- Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Card gap: `gap-6`

## Component patterns
- Cards: `rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group`
- Image zoom on hover: `group-hover:scale-105 transition-transform duration-300`
- Primary CTA button: `bg-burgundy hover:bg-[#6B1414] text-white rounded-full`
- WhatsApp button: `bg-whatsapp hover:bg-[#20BD5A] text-white rounded-full`
- Outline button (dark): `border-navy text-navy hover:bg-navy hover:text-white rounded-full`

## Tailwind v4 note
This project uses Tailwind v4 with `@import 'tailwindcss'` in globals.css. Brand color utilities (`bg-navy`, `text-burgundy`, etc.) are registered via `@theme inline` block — they work as regular Tailwind utilities.

## Grid for 5-item service cards
Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` — never `lg:grid-cols-5` directly (too narrow at 1024px).

## Touch target minimum
All interactive elements (tag pills, mobile nav links, icon buttons) must have `min-h-[44px]`. Use `py-3.5` for pill buttons to achieve this.

## Known palette violation to avoid
Footer was accidentally using `#161A4D` instead of `#151849` (Navy Dark). Always use `#151849` for footer and hero dark backgrounds.

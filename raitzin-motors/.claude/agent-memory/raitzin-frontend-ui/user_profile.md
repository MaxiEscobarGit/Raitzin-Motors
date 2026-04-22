---
name: user_profile
description: Dev identity, role, and stack preferences for the Raitzin Motors project
type: user
---

Máximo Escobar is the developer building the Raitzin Motors showroom digital. He owns the full-stack implementation including frontend (Next.js + Tailwind + shadcn/ui) and backend (Supabase). The client is Francisco (raitzin.francisco@gmail.com).

Stack preferences:
- Next.js 15 App Router (components mention "Next.js 16" in prompt context — treat as Next.js 15 with latest conventions)
- Tailwind CSS v4 with CSS custom properties in globals.css (not tailwind.config.js)
- shadcn/ui new-york style
- lucide-react icons only
- Supabase for PostgreSQL + Storage

Development context:
- Components from v0 are used as a starting point — they're functional but may need refinement
- Components currently live flat in `components/` root (e.g., navbar.tsx, hero-section.tsx) rather than the planned subdirectory structure
- The project is in Phase 1 (Landing page) — Phase 2 onward is pending

---
name: sold_deleted_vehicle_logic
description: Soft-delete pattern, sold vehicle page, and admin modal for vehicles — architectural decisions and file locations
type: project
---

## Vehicle state machine

- `is_sold: false, is_deleted: false` → Disponible (shown in catalog, admin)
- `is_sold: true, is_deleted: false` → Vendido (shown in admin with badge, hidden from catalog)
- `is_deleted: true` → Eliminado (hidden from admin list, page URL still active for SEO)

**Why:** Physical deletes would break SEO for indexed URLs. Soft delete preserves the URL and keeps photos in Storage.

**How to apply:** Any query for the public catalog or featured vehicles must filter `.eq('is_deleted', false)`. Admin queries also filter `is_deleted = false`. `getVehicleBySlug` intentionally does NOT filter by `is_deleted` so the URL keeps working.

## Key files changed in this feature

- `types/database.ts` — `is_deleted` added to Row, Insert, Update for vehicles
- `lib/catalog-helpers.ts` — `is_deleted` added to `Vehicle` type and `mapVehicle()`
- `lib/supabase/queries/admin.ts` — `getAllVehiclesAdmin()` filters `is_deleted = false`; `softDeleteVehicle(id)` added
- `lib/supabase/queries/vehicles.ts` — `getFeaturedVehicles`, `getVehicles`, `getRelatedVehicles` all filter `is_deleted = false`; `getSimilarVehicles(excludeId, limit)` added
- `app/admin/autos/actions.ts` — `softDeleteVehicleAction(id)` added (uses adminClient, revalidates `/admin/autos`)
- `components/admin/VehiclesTable.tsx` — Delete button only shows on `is_sold: true` vehicles; uses shadcn Dialog for confirmation modal
- `components/vehicle/SoldVehiclePage.tsx` — NEW client component for sold/deleted vehicle pages
- `app/autos/[slug]/page.tsx` — Detects `is_sold || is_deleted` and renders `SoldVehiclePage` instead of `VehiclePageClient`

## Admin delete rule

The "Eliminar" button only appears on vehicles where `is_sold === true`. You cannot delete an available vehicle. This is enforced in `VehiclesTable.tsx` by rendering the button conditionally inside `{v.is_sold && ...}`.

## SoldVehiclePage component

Props: `{ vehicle: Vehicle, similar: Vehicle[], allTags: Tag[] }`

- Uses `Navbar` from `@/components/navbar`
- Uses `VehicleCard` from `@/components/catalogo/VehicleCard` (catalog version, takes `Vehicle` + `allTags`)
- Main image shown with CSS `filter: grayscale(100%)` and 40% black overlay
- WA link uses a custom message: "Hola! Vi que el [marca] [modelo] [año] ya fue vendido, ¿tienen algo similar disponible?"
- WA number comes from `process.env.NEXT_PUBLIC_WHATSAPP_NUMBER` — never hardcoded

## Two VehicleCard components — important distinction

- `components/cards/VehicleCard.tsx` — takes `VehicleWithRelations` from `types/database.ts`
- `components/catalogo/VehicleCard.tsx` — takes `Vehicle` from `lib/catalog-helpers.ts` + `allTags: Tag[]`

The vehicle detail page and `SoldVehiclePage` use the **catalogo** version.
Admin table uses the **cards** version.

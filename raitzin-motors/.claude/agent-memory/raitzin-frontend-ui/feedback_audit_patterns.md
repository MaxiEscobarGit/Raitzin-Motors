---
name: feedback_audit_patterns
description: Recurring bugs and patterns discovered during the full project audit (June 2026)
type: feedback
---

Always apply `is_deleted = false` to every public-facing Supabase query on `vehicles`.

**Why:** Soft-deleted vehicles (is_deleted = true) were leaking into the landing page year/fuel filter options and the featured vehicles section because the queries only filtered is_sold, not is_deleted. This caused deleted vehicles to populate search dropdowns.

**How to apply:** Every query on the `vehicles` table that is NOT inside `getAllVehiclesAdmin()` must chain `.eq('is_deleted', false)`. Check: landing page destacados, year options, fuel options, generateStaticParams in `/autos/[slug]/page.tsx`.

---

The admin layout MUST check the session cookie server-side and redirect to `/admin/login` if absent.

**Why:** The original `app/admin/layout.tsx` had no auth check — anyone knowing the URL could access the entire admin panel without logging in. The login page only sets a cookie but nothing enforced it on subsequent navigation.

**How to apply:** `app/admin/layout.tsx` must be an async Server Component that calls `await cookies()`, reads `admin-session`, compares it to `COOKIE_SECRET`, and calls `redirect('/admin/login')` if invalid.

---

Never mix Tailwind positional classes with conflicting inline style properties on the same element.

**Why:** `WhatsAppFloat` had `className="bottom-20 lg:bottom-6"` alongside `style={{ position: 'fixed', right: 24, ... }}` with no `bottom` in the inline style. The Tailwind `bottom` class was being overridden or ignored depending on specificity. Fixed by moving all layout to Tailwind classes.

**How to apply:** When using inline `style`, do not also put the same CSS property in the `className`. Pick one approach for each property.

---

`useSearchParams()` from `next/navigation` requires a `<Suspense>` boundary when used in a component rendered from a Server Component page.

**Why:** `TagsSection` uses `useSearchParams()` and is imported into the landing page Server Component. Without Suspense, Next.js can fail at build time or show a hydration warning.

**How to apply:** Wrap any component using `useSearchParams()` in `<Suspense fallback={null}>` at the import site in the Server Component page.

---

`setTimeout` calls inside `useEffect` auto-rotate patterns must be cleared on unmount.

**Why:** `ReviewsSection` had `setTimeout` inside `setInterval` without clearing the timeout on cleanup. If the component unmounted before the 300ms fade timeout fired, it would attempt state updates on an unmounted component.

**How to apply:** Store the `setTimeout` return value in a variable inside the effect, and call `clearTimeout` in the cleanup function alongside `clearInterval`.

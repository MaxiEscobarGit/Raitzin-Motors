@AGENTS.md
# Raitzin Motors — Showroom Digital

## Contexto del proyecto

Showroom digital para **Raitzin Motors**, agencia de compra-venta de autos usados y semi-nuevos con sede en Bariloche. El cliente tiene +60.000 seguidores en Instagram pero no tiene web propia. El objetivo es convertir seguidores en leads cualificados a través de un catálogo inteligente con integración WhatsApp.

**Cliente:** Francisco (raitzin.francisco@gmail.com)  
**Dev:** Máximo Escobar (maximojoaqui11@gmail.com)

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Estilos:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Storage)
- **Deploy:** Vercel
- **Iconos:** lucide-react

---

## Paleta de colores

```
Navy:      #1E2167  (primario, navbar, fondos oscuros)
Navy Dark: #151849  (hero, footer)
Sky Blue:  #7EB8D4  (acentos, highlights)
Burgundy:  #8B1A1A  (CTAs, botones principales, precios)
White:     #FFFFFF
```

---

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=   # Formato: 5492944XXXXXX (sin + ni espacios)
ADMIN_PASSWORD=                # Para el panel admin (Fase 4)
```

---

## Estructura de carpetas

raitzin-motors/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── catalogo/
│   │   └── page.tsx
│   ├── autos/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── not-found.tsx
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── autos/
│       │   ├── page.tsx
│       │   ├── nuevo/page.tsx
│       │   └── [id]/page.tsx
│       └── leads/
│           └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── SearchBar.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FeaturedVehicles.tsx
│   │   └── ContactSection.tsx
│   ├── catalog/
│   │   ├── FilterBar.tsx
│   │   ├── VehicleGrid.tsx
│   │   └── Pagination.tsx
│   ├── vehicle/
│   │   ├── ImageGallery.tsx
│   │   ├── VehicleSpecs.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── TasacionForm.tsx
│   ├── cards/
│   │   └── VehicleCard.tsx
│   └── admin/
│       ├── VehicleForm.tsx
│       ├── ImageUploader.tsx
│       └── StockTable.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── queries/
│   │       ├── vehicles.ts
│   │       ├── filters.ts
│   │       ├── admin.ts
│   │       └── index.ts
│   └── utils.ts
│
├── actions/
│   ├── vehicles.ts
│   ├── storage.ts
│   └── schemas/
│       └── vehicle.ts
│
├── hooks/
│   ├── useFilters.ts
│   └── useVehicles.ts
│
├── types/
│   └── database.ts        # generado con supabase gen types
│
├── constants/
│   └── vehicle.ts
│
├── public/
│   ├── logo.svg
│   └── og-image.jpg
│
└── CLAUDE.md
---

## Base de datos (Supabase)

### Tablas

```sql
tipo_vehiculo  (id, nombre)
-- valores: Chico, Sedán, Deportivo, SUV, Pickup, Inédito

marcas         (id, nombre, logo_url)

tags           (id, nombre)
-- valores: Con pocos km, 0 km, Camioneta de batalla,
--          Buen valor de reventa, Fácil mantenimiento, Inédito

vehicles (
  id uuid PK,
  id_tipo     → tipo_vehiculo(id),
  id_marca    → marcas(id),
  id_tag      → tags(id),          -- un tag por auto (por ahora)
  model, year, km,
  motor, fuel, transmission, traccion,
  color, interior,
  estado      INTEGER 1–5,         -- condición del vehículo
  precio_contado, precio_financiado,
  cuotas, valor_cuota,
  currency    'ARS' | 'USD',
  description, images text[],
  slug        UNIQUE,
  is_sold, is_featured,
  created_at
)
```

### Storage

- **Bucket:** `vehicle-images` (público)
- Ruta de imágenes: `vehicle-images/{vehicle_id}/{filename}`

### RLS

- Lectura pública en todas las tablas
- Escritura solo para `auth.role() = 'authenticated'` (panel admin)

---

## Helpers clave (`lib/utils.ts`)

```ts
formatPrice(price, currency)      // 28500000 → "$ 28.500.000" / "USD 12.000"
formatKm(km)                      // 45000 → "45.000 km"
generateSlug(marca, model, year)  // "Toyota", "Hilux", 2022 → "toyota-hilux-2022"
generateWhatsAppLink(marca, model, year, price, currency)
// → "https://wa.me/5492944XXXXXX?text=Hola!%20Me%20interesa..."
```

---

## Supabase clients

```ts
// Browser (componentes cliente)
import { createClient } from '@/lib/supabase/client'

// Server (page.tsx, layout.tsx, route handlers)
import { createClient } from '@/lib/supabase/server'
```

---

## Fases del proyecto

| Fase | Contenido | Estado |
|------|-----------|--------|
| 1 | Setup + Landing page (Hero, Servicios, Destacados, Contacto) | 🔄 En curso |
| 2 | Catálogo con filtros (marca, tipo, precio, km, año) + cards + paginación | ⏳ Pendiente |
| 3 | Ficha individual + galería HD + botón WhatsApp inteligente + mini-form tasación | ⏳ Pendiente |
| 4 | Panel admin — ABM de autos, upload imágenes, login protegido | ⏳ Pendiente |

---

## Decisiones técnicas

- **WhatsApp number** se guarda como env var, nunca hardcodeado ni en la BD
- **No hay registro de usuarios públicos** — solo Francisco accede al admin
- **Admin auth:** password simple por ahora (Fase 4), sin Supabase Auth complejo
- **`id_tag` es 1:1** por simplicidad — si se necesitan múltiples tags se migra a tabla pivot `vehicle_tags`
- **`leads`** (form de tasación) se agrega en Fase 3, no existe todavía en la BD
- **SEO:** cada auto tiene `slug` único, se generan metadatos dinámicos en `/autos/[slug]`
- **Moneda:** soporta ARS y USD — el precio se muestra según el `currency` del vehículo

---

## Convenciones

- Componentes en PascalCase, archivos en kebab-case para rutas
- Queries de Supabase centralizadas en `lib/supabase/queries.ts`, no inline en componentes
- Imágenes siempre a través de Supabase Storage, URLs guardadas en `vehicles.images[]`
- `cn()` de `lib/utils.ts` para clases condicionales con Tailwind

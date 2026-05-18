import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
]

const serviceItems = [
  'Compra de autos',
  'Venta de autos',
  'Financiamiento',
  'Tasación gratuita',
]

const INSTAGRAM_URL = 'https://www.instagram.com/raitzin.motors?igsh=dGZyd3c4bzhlOWR5'

function InstagramIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function WhatsAppIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  )
}

const linkClass =
  'text-sm text-white/60 hover:text-pastel-blue transition-colors duration-200 leading-relaxed'

const columnHeadingClass = 'text-xs font-semibold uppercase tracking-widest text-white/40 mb-5'

export function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=Hola%20Raitzin%20Motors%2C%20quiero%20consultar%20sobre%20un%20auto.`
    : '#'

  return (
    <footer className="bg-navy-dark">
      {/* Top divider accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-pastel-blue/40 to-transparent" />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

          {/* Column 1 — Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo raitzin.png"
                alt="Raitzin Motors"
                width={140}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Tu próximo auto te espera en Bariloche.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Raitzin Motors"
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg',
                  'bg-white/5 border border-white/10',
                  'text-white/60 hover:text-pastel-blue hover:border-pastel-blue/40 hover:bg-pastel-blue/10',
                  'transition-all duration-200'
                )}
              >
                <InstagramIcon size={16} className="text-white" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Raitzin Motors"
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg',
                  'bg-white/5 border border-white/10',
                  'hover:border-[#25D366]/40 hover:bg-[#25D366]/10',
                  'transition-all duration-200'
                )}
              >
                <WhatsAppIcon size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <p className={columnHeadingClass}>Navegación</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <p className={columnHeadingClass}>Servicios</p>
            <ul className="space-y-3">
              {serviceItems.map((item) => (
                <li key={item}>
                  <span className={cn(linkClass, 'cursor-default')}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div className="col-span-2 lg:col-span-1">
            <p className={columnHeadingClass}>Contacto</p>
            <ul className="space-y-4">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp"
                  className="flex items-center gap-3 group"
                >
                  <WhatsAppIcon size={16} className="text-[#25D366] shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className={cn(linkClass, 'group-hover:text-pastel-blue')}>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Raitzin Motors"
                  className="flex items-center gap-3 group"
                >
                  <InstagramIcon size={16} className="text-[#E1306C] shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className={cn(linkClass, 'group-hover:text-pastel-blue')}>
                    @raitzin.motors
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <MapPin
                    size={16}
                    className="text-pastel-blue shrink-0"
                    aria-hidden="true"
                  />
                  <span className={linkClass}>Vice Almte. O'Connor 970, San Carlos de Bariloche, Río Negro</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="overflow-hidden">
        <div className="text-[clamp(80px,12vw,180px)] font-extrabold bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-transparent select-none pointer-events-none leading-none tracking-tighter text-center w-full pb-4">
          Raitzin Motors
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/35 text-center sm:text-left">
              &copy; 2026 Raitzin Motors. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/terminos" scroll={true} className="text-xs text-white/35 hover:text-white/60 transition-colors">
                Términos y condiciones
              </Link>
              <Link href="/privacidad" scroll={true} className="text-xs text-white/35 hover:text-white/60 transition-colors">
                Política de privacidad
              </Link>
              <p className="text-xs text-white/25">Diseñado por Máximo Escobar</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

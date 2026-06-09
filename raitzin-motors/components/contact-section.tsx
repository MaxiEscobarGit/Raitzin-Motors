import { MapPin } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { MAPS_EMBED_URL } from "@/lib/constants"

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

const INSTAGRAM_URL = "https://www.instagram.com/raitzin.motors?igsh=dGZyd3c4bzhlOWR5"
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
const WA_URL = WA_NUMBER
  ? `https://wa.me/${WA_NUMBER}?text=Hola%20mi%20nombre%20es%0AEstoy%20interesado%20en%20`
  : "#"

export function ContactSection() {
  return (
    <section id="contacto" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E2167] mb-3">
            Contactanos
          </h2>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            De lunes a sábado, 9 a 18 hs.
          </p>
        </div>

        {/* Contact info — simple, no cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10 text-sm text-gray-600">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#1E2167] transition-colors"
          >
            <WhatsAppIcon size={18} className="text-[#25D366]" />
            WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#1E2167] transition-colors"
          >
            <InstagramIcon size={18} />
            @raitzin.motors
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#7EB8D4]" aria-hidden="true" />
            <span>
              Vice Almte. O&apos;Connor 970
              <br className="sm:hidden" />
              <span className="hidden sm:inline">, </span>
              San Carlos de Bariloche
              <span className="hidden sm:inline">, Río Negro</span>
            </span>
          </div>
        </div>

        {/* Primary WhatsApp CTA */}
        <div className="flex justify-center mb-12">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp ahora"
            className="inline-flex items-center gap-3 bg-[#8B1A1A] hover:bg-[#6B1414] text-white px-8 py-4 rounded-full text-base font-bold transition-colors shadow-lg shadow-[#8B1A1A]/30"
          >
            <WhatsAppIcon size={22} />
            Escribinos por WhatsApp
          </a>
        </div>

        {/* Google Maps */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
          <iframe
            src={MAPS_EMBED_URL}
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Raitzin Motors en Bariloche, Argentina"
          />
        </div>
      </div>
    </section>
  )
}

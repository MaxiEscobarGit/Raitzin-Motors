import { MessageCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contacto" className="py-12 md:py-20 bg-white border-t border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-3">
            Contactanos
          </h2>
          <p className="text-gray-500 text-lg">
            Estamos para ayudarte de lunes a sábado
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp */}
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1E2167] mb-4">
                <MessageCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E2167] mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Respuesta inmediata</p>
              <Button
                asChild
                className="bg-[#8B1A1A] hover:bg-[#6B1414] text-white rounded-full font-semibold"
              >
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%20mi%20nombre%20es%0AEstoy%20interesado%20en%20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Escribinos por WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Escribinos por WhatsApp
                </a>
              </Button>
            </div>

            {/* Ubicacion */}
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1E2167] mb-4">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1E2167] mb-2">Ubicación</h3>
              <p className="text-gray-600">Vice Almte. O'Connor 970, San Carlos de Bariloche, Río Negro</p>
              <p className="text-gray-600 text-sm mt-1">Lunes a Sábado 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2942.0!2d-71.2958077!3d-41.1336812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a7b007a003b4b%3A0xd8b7b43351813a1!2sRaitzin%20Motors!5e0!3m2!1ses!2sar!4v1703000000000!5m2!1ses!2sar"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicacion de Raitzin Motors en Bariloche, Argentina"
          />
        </div>
      </div>
    </section>
  )
}

// TODO: mover Footer a components/layout/Footer.tsx y reemplazar esta exportación por un import desde allí
export function Footer() {
  return (
    <footer className="bg-[#151849] py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Raitzin Motors. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Terminos y Condiciones
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Politica de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

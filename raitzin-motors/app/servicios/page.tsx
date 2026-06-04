import type { Metadata } from 'next'
import {
  ShoppingCart,
  CreditCard,
  ArrowLeftRight,
  Store,
  Check,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedDivider } from '@/components/ui/AnimatedDivider'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Servicios | Raitzin Motors',
  description:
    'Compra, venta, financiación, permutas y consignación de vehículos en Bariloche.',
}

interface ServiceBullet {
  label: string
}

interface ServiceCta {
  label: string
  message: string
}

interface Service {
  id: number
  sectionId: string
  icon: LucideIcon
  accent: string
  title: string
  bg: string
  paragraphs: string[]
  bulletTitle: string | null
  bullets: string[]
  paragraphsAfter?: string[]
  cta: ServiceCta
}

const services: Service[] = [
  {
    id: 1,
    sectionId: 'compra-venta',
    icon: ShoppingCart,
    accent: '#8B1A1A',
    title: 'Compra / Venta',
    bg: 'bg-white',
    paragraphs: [
      'Compramos tu vehículo de forma inmediata si necesitás venderlo ya!',
      'Además, todos nuestros autos tienen entrega inmediata: venís, probás, pagás y te lo llevás en el día.',
    ],
    bullets: [],
    bulletTitle: null,
    cta: {
      label: 'Consultanos por WhatsApp',
      message: 'Hola! Quiero consultar sobre compra/venta de vehículos',
    },
  },
  {
    id: 2,
    sectionId: 'financiacion',
    icon: CreditCard,
    accent: '#1E2167',
    title: 'Financiación',
    bg: 'bg-gray-50',
    paragraphs: ['Ofrecemos financiación propia hasta 12 meses, sin intermediación bancaria.'],
    bulletTitle: null,
    bullets: [
      'Entrega mínima: 60% del valor del vehículo',
      'Saldo: 40% financiado en cuotas fijas',
      'Requisitos: recibo de sueldo o garante',
    ],
    paragraphsAfter: [
      'La operación se realiza mediante pagarés, de manera simple, ágil y directa con nosotros.',
    ],
    cta: {
      label: 'Simular financiación',
      message: 'Hola! Quiero consultar sobre financiación',
    },
  },
  {
    id: 3,
    sectionId: 'permutas',
    icon: ArrowLeftRight,
    accent: '#8B1A1A',
    title: 'Permutas',
    bg: 'bg-white',
    paragraphs: [
      'Tomamos tu vehículo usado como parte de pago.',
      'Podés cambiarlo por uno de nuestra oferta, tanto de mayor como de menor valor.',
    ],
    bulletTitle: 'Recibimos unidades de todos los años; evaluamos principalmente:',
    bullets: [
      'Estado general y cuidado del vehículo',
      'Que la documentación esté en regla',
    ],
    cta: {
      label: 'Tasar mi vehículo',
      message: 'Hola! Quiero permutar mi vehículo',
    },
  },
  {
    id: 4,
    sectionId: 'consignacion',
    icon: Store,
    accent: '#1E2167',
    title: 'Consignación',
    bg: 'bg-gray-50',
    paragraphs: [
      'Si tenés tu vehículo sin uso, tenés que saber que su valor disminuye cada día que pasa.',
      'Traelo a Raitzin Motors! Nosotros lo exhibimos en nuestro playón de más de 30 autos y camionetas, lo ofrecemos a los más de 1000 clientes que tenemos en nuestra base de datos y hacemos todo lo posible para venderlo cuanto antes.',
      'Definimos juntos un precio acorde al mercado y al estado del vehículo, y nos encargamos de todo el proceso.',
    ],
    bullets: [],
    bulletTitle: null,
    cta: {
      label: 'Consignar mi vehículo',
      message: 'Hola! Quiero consignar mi vehículo',
    },
  },
]

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

function buildWaLink(message: string): string {
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
}

export default function ServiciosPage() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="bg-[#1E2167] py-20 px-6 pt-36">
        <div className="container mx-auto max-w-6xl text-center">
          <ScrollReveal direction="up" delay={0}>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Nuestros Servicios</h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <p className="text-xl text-white/80 mt-4">
              Todo lo que necesitás para tu próxima operación
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICE SECTIONS */}
      {services.map((service, sectionIndex) => {
        const ServiceIcon = service.icon
        const isEven = service.id % 2 === 0

        // Directions for odd sections: image left, text right
        // Directions for even sections: text left, image right
        const imageDirection = isEven ? ('right' as const) : ('left' as const)
        const textDirection = isEven ? ('left' as const) : ('right' as const)

        const imagePlaceholder = (
          <ScrollReveal direction={imageDirection} delay={0} className="w-full">
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3">
              <ServiceIcon className="w-16 h-16 text-gray-300" aria-hidden="true" />
              <p className="text-sm text-gray-400">Foto próximamente</p>
            </div>
          </ScrollReveal>
        )

        const textContent = (
          <div className="space-y-6">
            {/* Badge */}
            <ScrollReveal direction={textDirection} delay={100}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${service.accent}1A`,
                  color: service.accent,
                }}
              >
                <ServiceIcon className="w-4 h-4" aria-hidden="true" />
                {service.title}
              </div>
            </ScrollReveal>

            {/* Heading */}
            <ScrollReveal direction={textDirection} delay={200}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167]">{service.title}</h2>
            </ScrollReveal>

            {/* Paragraphs before bullets */}
            {service.paragraphs.map((p, i) => (
              <ScrollReveal key={i} direction={textDirection} delay={300}>
                <p className="text-gray-700 text-lg leading-relaxed">{p}</p>
              </ScrollReveal>
            ))}

            {/* Bullet title */}
            {service.bulletTitle && (
              <ScrollReveal direction={textDirection} delay={350}>
                <p className="text-gray-700 font-medium">{service.bulletTitle}</p>
              </ScrollReveal>
            )}

            {/* Bullets */}
            {service.bullets.length > 0 && (
              <ul className="space-y-2">
                {service.bullets.map((b, i) => (
                  <ScrollReveal key={i} direction={textDirection} delay={350 + i * 50}>
                    <li className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: service.accent }}
                        aria-hidden="true"
                      />
                      <span className="text-gray-700">{b}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            )}

            {/* Paragraphs after bullets */}
            {service.paragraphsAfter?.map((p, i) => (
              <ScrollReveal key={i} direction={textDirection} delay={450}>
                <p className="text-gray-700 text-lg leading-relaxed">{p}</p>
              </ScrollReveal>
            ))}

            {/* CTA */}
            <ScrollReveal direction={textDirection} delay={500}>
              <a
                href={buildWaLink(service.cta.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{ backgroundColor: service.accent }}
                aria-label={service.cta.label}
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {service.cta.label}
              </a>
            </ScrollReveal>
          </div>
        )

        return (
          <div key={service.id}>
            {/* Animated divider between sections (not before the first one) */}
            {sectionIndex > 0 && (
              <AnimatedDivider className="container mx-auto max-w-6xl px-6" />
            )}

            <section id={service.sectionId} className={`py-20 ${service.bg}`}>
              <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                  {isEven ? (
                    <>
                      {/* Even: text left, image right on desktop; image top on mobile */}
                      <div className="order-2 md:order-1">{textContent}</div>
                      <div className="order-1 md:order-2">{imagePlaceholder}</div>
                    </>
                  ) : (
                    <>
                      {/* Odd: image left, text right on desktop; image top on mobile */}
                      <div className="order-1">{imagePlaceholder}</div>
                      <div className="order-2">{textContent}</div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        )
      })}

      {/* FINAL CTA */}
      <section className="bg-[#1E2167] py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <ScrollReveal direction="up" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Tenés alguna consulta?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <p className="text-white/70 text-xl mb-8">Estamos para ayudarte en cada paso</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <a
              href={buildWaLink('Hola! Quiero hacer una consulta')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-xl"
              aria-label="Escribinos por WhatsApp"
            >
              <MessageCircle className="w-6 h-6" aria-hidden="true" />
              Escribinos ahora
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

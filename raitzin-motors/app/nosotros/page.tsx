import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { HeroAnimated } from "@/components/nosotros/HeroAnimated"
import { TeamSection } from "@/components/nosotros/TeamSection"
import { ValoresGrid } from "@/components/nosotros/ValoresGrid"

export const metadata: Metadata = {
  title: "Nosotros | Raitzin Motors",
  description:
    "Más de 35 años en el negocio de los fierros. Conocé la historia de Raitzin Motors, tu concesionaria de confianza en San Carlos de Bariloche, Patagonia.",
}


export default function NosotrosPage() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hola! Estoy viendo la página de Raitzin Motors y quería consultar."
  )}`

  return (
    <>
      <Navbar />
      <main>
        {/* ── 1. Hero ── */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0E1020]">
          {/* Background photo — mobile */}
          <Image
            src="/portada-mobile-nosotros.png"
            alt="Raitzin Motors — local en Bariloche"
            fill
            className="object-cover object-center block md:hidden"
            priority
          />
          {/* Background photo — desktop */}
          <Image
            src="/nosotros hero.jpg"
            alt="Raitzin Motors — local en Bariloche"
            fill
            className="object-cover object-center hidden md:block"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0E1020]/65" aria-hidden="true" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(126,184,212,0.07)_1px,transparent_1px),linear-gradient(to_right,rgba(126,184,212,0.07)_1px,transparent_1px)] bg-[size:64px_64px]"
            aria-hidden="true"
          />
          <HeroAnimated />
        </section>

        {/* ── 2. Historia ── */}
        <section className="bg-white py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-burgundy text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Nuestra historia
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-8 leading-tight">
                Hace más de 35 años haciendo lo que nos apasiona.
              </h2>
              <div className="space-y-5 text-gray-500 text-lg leading-relaxed">
                <p>
                  En Raitzin Motors hace más de 35 años nos dedicamos a la
                  compra y venta de autos usados en Bariloche. Somos
                  apasionados por los fierros, tanto autos como motos, y
                  trabajamos para que cada cliente se sienta cómodo,
                  acompañado y seguro al momento de cambiar su vehículo.
                </p>
                <p>
                  Sabemos que este rubro muchas veces genera desconfianza, por
                  eso nuestra prioridad es ofrecer transparencia, buena
                  atención y hacer las cosas de manera simple y clara.
                </p>
                <p>
                  Más que vender autos, buscamos que la gente disfrute el
                  proceso y vuelva a elegirnos.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 md:h-[480px] relative">
              <Image
                src="/oficina.png"
                alt="Oficina de Raitzin Motors"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── 3. El Equipo ── */}
        <TeamSection />

        {/* ── 4. Valores ── */}
        <section className="bg-section-bg py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-burgundy text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              Lo que nos define
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-12 text-center">
              Nuestros valores
            </h2>
            <ValoresGrid />
          </div>
        </section>

        {/* ── 6. CTA Final ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy py-32 px-6">
          <div
            className="absolute w-64 h-64 rounded-full bg-sky-blue/10 blur-3xl top-0 right-0 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute w-48 h-48 rounded-full bg-burgundy/20 blur-3xl bottom-0 left-0 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-5 text-balance">
              ¿Listo para encontrar tu próximo auto?
            </h2>
            <p className="text-white/65 text-xl mb-12">
              Explorá nuestro catálogo o escribinos directamente por WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center px-10 py-5 bg-burgundy hover:bg-[#a01e1e] text-white font-semibold rounded-full text-lg transition-colors duration-200"
              >
                Ver catálogo
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 text-lg transition-colors duration-200"
              >
                <WhatsAppIcon size={22} />
                Escribinos
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

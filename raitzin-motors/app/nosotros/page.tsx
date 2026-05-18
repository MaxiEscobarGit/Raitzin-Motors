import type { Metadata } from "next"
import Link from "next/link"
import { Eye, Zap, MapPin, Heart, Car, CreditCard, ArrowLeftRight, FileText } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { HeroAnimated } from "@/components/nosotros/HeroAnimated"

export const metadata: Metadata = {
  title: "Nosotros | Raitzin Motors",
  description:
    "Más de 35 años en el negocio de los fierros. Conocé la historia de Raitzin Motors, tu concesionaria de confianza en San Carlos de Bariloche, Patagonia.",
}

const team = [
  {
    num: "01",
    name: "Santiago",
    role: "Fundador y dueño",
    desc: "Lleva la agencia desde el día uno. Su mirada y experiencia están detrás de cada operación.",
    initial: "S",
    photoClass: "bg-gradient-to-br from-[#1E2167] to-[#2D3494]",
    borderClass: "",
  },
  {
    num: "02",
    name: "Felipe",
    role: "Vendedor",
    desc: "Fanático de los autos. La primera cara que ves al entrar: entiende lo que buscás y encuentra las mejores opciones.",
    initial: "F",
    photoClass: "bg-gradient-to-br from-[#1E2167] to-[#162052]",
    borderClass: "",
  },
  {
    num: "03",
    name: "Nacho",
    role: "Comodín del equipo",
    desc: "Atiende, vende, prepara autos y resuelve. Es quien deja cada vehículo del playón en perfectas condiciones.",
    initial: "N",
    photoClass: "bg-gradient-to-br from-[#0E1020] to-[#1E2167]",
    borderClass: "",
  },
  {
    num: "04",
    name: "Francisco",
    role: "E-Commerce y ventas online",
    desc: "Llevó la agencia al mundo digital. Si nos contactaste por la web, probablemente fue gracias a él.",
    initial: "F",
    photoClass: "bg-gradient-to-br from-navy to-sky-blue/40",
    borderClass: "border border-sky-blue",
  },
  {
    num: "05",
    name: "Mac",
    role: "Border Collie oficial",
    desc: "Especialista en recibir clientes y robarse todas las miradas. El alma del playón.",
    initial: "🐾",
    photoClass: "bg-gradient-to-br from-[#2D1B69] to-sky-blue/30",
    borderClass: "",
  },
]

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
          {/* Grid pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(126,184,212,0.07)_1px,transparent_1px),linear-gradient(to_right,rgba(126,184,212,0.07)_1px,transparent_1px)] bg-[size:64px_64px]"
            aria-hidden="true"
          />
          {/* Sky-blue radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-sky-blue/10 blur-[140px] pointer-events-none"
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
            {/* Photo placeholder */}
            <div className="rounded-2xl overflow-hidden h-80 md:h-[480px] bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center">
              <span className="text-white/25 text-sm font-medium tracking-wide">
                Foto próximamente
              </span>
            </div>
          </div>
        </section>

        {/* ── 3. Valores ── */}
        <section className="bg-section-bg py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-burgundy text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              Lo que nos define
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-16 text-center">
              Nuestros valores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                  <Eye size={22} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy text-xl">Transparencia</h3>
                <p className="text-gray-500 leading-relaxed">
                  Sin letra chica. Cada precio, cada kilómetro, cada detalle
                  del auto lo sabés antes de firmar.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                  <Zap size={22} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy text-xl">Rapidez</h3>
                <p className="text-gray-500 leading-relaxed">
                  Sabemos que tu tiempo vale. Operaciones ágiles, sin
                  burocracia innecesaria y con respuesta rápida.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy text-xl">
                  Raíces en Bariloche
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  Somos locales. Conocemos la ciudad, su gente y lo que
                  necesita alguien que vive y trabaja acá.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center text-burgundy">
                  <Heart size={22} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-navy text-xl">Pasión</h3>
                <p className="text-gray-500 leading-relaxed">
                  Los fierros no son solo un negocio para nosotros. Esta
                  pasión es la que nos hace dar siempre un poco más.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. El Equipo ── */}
        <section className="bg-white py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-burgundy text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              El equipo
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-20 text-center">
              Las personas detrás de Raitzin.
            </h2>

            <div className="flex flex-col">
              {team.map((person, i) => {
                const reversed = i % 2 !== 0
                return (
                  <div key={person.name}>
                    <div
                      className={`grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-20 items-center py-14 px-4 rounded-2xl hover:bg-section-bg transition-colors duration-300`}
                    >
                      {/* Photo */}
                      <div
                        className={`aspect-square w-full max-w-[280px] mx-auto lg:max-w-none rounded-2xl relative overflow-hidden ${person.photoClass} ${person.borderClass}${reversed ? " lg:order-last" : ""}`}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-8xl font-extrabold text-white/20 select-none pointer-events-none">
                          {person.initial}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="relative overflow-hidden py-4">
                        <span className="absolute -top-4 right-0 font-extrabold text-gray-100 leading-none select-none pointer-events-none" style={{ fontSize: "clamp(72px, 12vw, 120px)" }}>
                          {person.num}
                        </span>
                        <div className="relative z-10">
                          <p className="text-burgundy text-xs font-bold uppercase tracking-widest mb-3">
                            {person.role}
                          </p>
                          <h3 className="text-4xl font-extrabold text-navy mb-5">
                            {person.name}
                          </h3>
                          <p className="text-lg text-gray-500 max-w-md leading-relaxed">
                            {person.desc}
                          </p>
                        </div>
                      </div>
                    </div>

                    {i < team.length - 1 && (
                      <div
                        className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── 5. Servicios ── */}
        <section className="bg-section-bg py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-burgundy text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">
              ¿Qué hacemos?
            </p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-navy mb-16 text-center">
              Nuestros servicios
            </h2>
            <ul className="divide-y divide-gray-100">
              <li className="flex items-start gap-6 py-8 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy mt-0.5 group-hover:bg-navy group-hover:text-white transition-colors duration-200">
                  <Car size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">Compra y venta</p>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    Stock actualizado de autos usados y semi-nuevos. Encontrá el
                    tuyo o vendé el que tenés.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-6 py-8 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy mt-0.5 group-hover:bg-navy group-hover:text-white transition-colors duration-200">
                  <CreditCard size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">Financiación</p>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    Cuotas accesibles y planes a medida. Te ayudamos a encontrar
                    la opción que mejor se adapte a tus posibilidades.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-6 py-8 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy mt-0.5 group-hover:bg-navy group-hover:text-white transition-colors duration-200">
                  <ArrowLeftRight size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">Permuta</p>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    Entregá tu auto como parte de pago y llevate el que querés.
                    Simple y sin complicaciones.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-6 py-8 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-navy mt-0.5 group-hover:bg-navy group-hover:text-white transition-colors duration-200">
                  <FileText size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">Consignación</p>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    Dejamos tu auto a la venta en nuestro espacio. Vos no movés
                    un dedo, nosotros cerramos el trato.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-6 py-8 group">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center text-burgundy mt-0.5 group-hover:bg-burgundy group-hover:text-white transition-colors duration-200">
                  <Zap size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-navy text-lg">Compra inmediata</p>
                  <p className="text-gray-500 mt-1 leading-relaxed">
                    ¿Necesitás vender rápido? Te hacemos una oferta directa, sin
                    esperas y sin intermediarios.
                  </p>
                </div>
              </li>
            </ul>
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

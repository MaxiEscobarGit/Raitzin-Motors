"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { Car, Zap, CreditCard, RefreshCw } from "lucide-react"

const serviceButtons = [
  { icon: Car, label: "Comprá tu auto" },
  { icon: Zap, label: "Vendé tu auto" },
  { icon: CreditCard, label: "Financiá tu auto" },
  { icon: RefreshCw, label: "Cambiá tu auto" },
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      if (heroRef.current) {
        heroRef.current.style.transform = 'none'
      }
      return
    }

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={heroRef}
        className="absolute inset-0 scale-125 origin-top"
        style={{ willChange: "transform" }}
      >
        {/* Mobile */}
        <Image
          src="/portada-mobile.jpg"
          alt="Raitzin Motors"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[70%] md:hidden"
        />

        {/* Desktop */}
        <Image
          src="/portada.jpg"
          alt="Raitzin Motors"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center hidden md:block"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-sans leading-tight mb-6 text-balance animate-in fade-in duration-700">
          Comprá y vendé tu auto en Raitzin Motors
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Hace más de 35 años trabajando en Bariloche. Ayudamos a gente como vos a encontrar su próximo auto. 
          ¡Confianza, rapidez y buena onda!
        </p>
      </div>

      {/* Barra de servicios pegada al fondo */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex w-full bg-[#151849]">
        {serviceButtons.map(({ icon: Icon, label }, index) => (
          <a
            key={label}
            href="#servicios"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
            }}
            aria-label={`Ir a ${label}`}
            className={`flex flex-1 flex-col items-center justify-center py-6 text-white hover:bg-[#8B1A1A] transition-colors duration-300${index < serviceButtons.length - 1 ? " border-r border-white/20" : ""}`}
          >
            <Icon size={28} aria-hidden="true" />
            <span className="text-sm font-semibold mt-2 text-center">{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

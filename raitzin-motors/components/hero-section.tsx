"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { Car, Zap, CreditCard, RefreshCw } from "lucide-react"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

const serviceButtons = [
  { icon: Car, label: "Comprá tu auto", href: "/catalogo" },
  { icon: Zap, label: "Vendé tu auto", href: "/servicios#compra-venta" },
  { icon: CreditCard, label: "Financiá tu auto", href: "/servicios#financiacion" },
  { icon: RefreshCw, label: "Cambiá tu auto", href: "/servicios#permutas" },
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
          src="/portada-mobile2.png"
          alt="Raitzin Motors — Concesionaria de autos usados en Bariloche, Patagonia"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[70%] md:hidden"
        />

        {/* Desktop */}
        <Image
          src="/portada.jpg"
          alt="Raitzin Motors — Concesionaria de autos usados en San Carlos de Bariloche"
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
      <div className="relative z-10 w-full text-center sm:text-left sm:pl-10 lg:pl-16">
        <TextGenerateEffect
          words="Comprá y vendé tu auto"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-sans leading-tight mb-1 text-balance"
          duration={0.6}
        />
        
        <TextGenerateEffect
          words="en Raitzin Motors"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-sans leading-tight mb-3"
          duration={0.6}
        />

        <TextGenerateEffect
          words="Hace más de 35 años trabajando en Bariloche. Ayudamos a gente como vos a encontrar su próximo auto."
          className="text-lg sm:text-xl text-white max-w-2xl mb-10 leading-relaxed px-6 sm:px-0"
          duration={0.2}
          wordStagger={0.05}
        />

        <TextGenerateEffect
          words="¡Confianza, rapidez y buena onda!"
          className="text-lg sm:text-xl text-white max-w-2xl mb-10 leading-relaxed px-6 sm:px-0"
          duration={0.2}
          wordStagger={0.05}
        />
      </div>

      {/* Barra de servicios pegada al fondo */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex w-full bg-navy-dark">
        {serviceButtons.map(({ icon: Icon, label, href }, index) => {
          const cls = `flex flex-1 flex-col items-center justify-center py-6 text-white hover:bg-burgundy transition-colors duration-300${index < serviceButtons.length - 1 ? " border-r border-white/20" : ""}`
          const content = (<><Icon size={28} aria-hidden="true" /><span className="text-sm font-semibold mt-2 text-center">{label}</span></>)
          return href.startsWith('/') ? (
            <Link key={label} href={href} aria-label={`Ir a ${label}`} className={cls}>
              {content}
            </Link>
          ) : (
          <a
            key={label}
            href={href}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
            }}
            aria-label={`Ir a ${label}`}
            className={cls}
          >
            {content}
          </a>
          )
        })}
      </div>
    </section>
  )
}

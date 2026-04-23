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
    if (isMobile) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    document.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => document.removeEventListener("scroll", handleScroll)
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
        <Image
          src="/portada.jpg"
          alt="Raitzin Motors showroom"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center sm:object-top"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white font-sans leading-tight mb-6 text-balance animate-in fade-in duration-700">
          El auto que buscas, al precio que mereces.
        </h1>

        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Más de 10 años conectando familias argentinas con el auto ideal. Stock actualizado, financiación y permuta.
        </p>
      </div>

      {/* Service bar — pegada al fondo del hero */}
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

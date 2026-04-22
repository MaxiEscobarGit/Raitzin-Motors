"use client"

import Image from "next/image"
import { Car, Zap, CreditCard, RefreshCw } from "lucide-react"

const serviceButtons = [
  { icon: Car, label: "Comprá tu auto" },
  { icon: Zap, label: "Vendé tu auto" },
  { icon: CreditCard, label: "Financiá tu auto" },
  { icon: RefreshCw, label: "Cambiá tu auto" },
]

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/portada.jpeg"
        alt="Raitzin Motors"
        fill
        priority
        className="object-cover object-top md:object-center"
        sizes="100vw"
      />

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
            className={`flex flex-1 flex-col items-center justify-center py-6 text-white hover:bg-[#8B1A1A] transition-colors duration-300${index < serviceButtons.length - 1 ? " border-r border-white/20" : ""}`}
          >
            <Icon size={28} />
            <span className="text-sm font-semibold mt-2 text-center">{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

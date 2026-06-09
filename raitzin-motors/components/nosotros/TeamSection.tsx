"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const team = [
  {
    num: "01",
    name: "Santiago",
    role: "Fundador y dueño",
    desc: "Lleva la agencia desde el día uno. Su mirada y experiencia están detrás de cada operación.",
    initial: "S",
    photo: "/santiago.jpg",
    photoClass: "bg-gradient-to-br from-[#1E2167] to-[#2D3494]",
    borderClass: "",
  },
  {
    num: "02",
    name: "Felipe",
    role: "Vendedor",
    desc: "La primera cara que ves al entrar: entiende lo que buscás y encuentra las mejores opciones.",
    initial: "F",
    photo: "/felipe.jpg",
    photoClass: "bg-gradient-to-br from-[#1E2167] to-[#162052]",
    borderClass: "",
  },
  {
    num: "03",
    name: "Francisco",
    role: "E-Commerce y ventas online",
    desc: "Llevó la agencia al mundo digital. Si nos contactaste por la web, probablemente fue gracias a él.",
    initial: "F",
    photo: "/francisco.jpg",
    photoClass: "bg-gradient-to-br from-navy to-sky-blue/40",
    borderClass: "border border-sky-blue",
  },
  {
    num: "04",
    name: "Nacho",
    role: "Comodín del equipo",
    desc: "Comodín del equipo. Fanático de los autos. Atiende, vende, prepara autos y resuelve. Es quien deja cada vehículo del playón en perfectas condiciones.",
    initial: "N",
    photo: "/nacho.jpg",
    photoClass: "bg-gradient-to-br from-[#0E1020] to-[#1E2167]",
    borderClass: "",
  },
  {
    num: "05",
    name: "Mac",
    role: "Border Collie oficial",
    desc: "Especialista en recibir clientes y robarse todas las miradas. El alma del playón.",
    initial: "🐾",
    photo: "/mac.png",
    photoClass: "bg-gradient-to-br from-[#2D1B69] to-sky-blue/30",
    borderClass: "",
  },
]

function getState(
  progress: number,
  index: number,
  total: number,
  yOffset: number
): { opacity: number; y: number } {
  const seg = 1 / total
  const s = index * seg
  const e = (index + 1) * seg
  const m = (s + e) / 2

  if (index === 0) {
    if (progress <= m) return { opacity: 1, y: 0 }
    if (total === 1) return { opacity: 1, y: 0 }
    const t = Math.min(1, (progress - m) / (e - m))
    return { opacity: Math.max(0, 1 - t), y: -yOffset * t }
  }
  if (progress < s) return { opacity: 0, y: yOffset }
  if (progress <= m) {
    const t = (progress - s) / (m - s)
    return { opacity: t, y: yOffset * (1 - t) }
  }
  if (index === total - 1) return { opacity: 1, y: 0 }
  const t = Math.min(1, (progress - m) / (e - m))
  return { opacity: Math.max(0, 1 - t), y: -yOffset * t }
}

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            team.forEach((_, index) => {
              const el = document.getElementById(`team-card-${index}`)
              if (!el) return
              const { opacity, y } = getState(self.progress, index, team.length, 40)
              el.style.opacity = String(opacity)
              el.style.transform = `translateY(${y}px)`
            })
          },
        })
      })
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ height: `${team.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="pt-8 pb-4 sm:pt-16 sm:pb-8 px-6 text-center flex-shrink-0">
          <p className="text-burgundy text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            El equipo
          </p>
          <h2 className="hidden md:block text-4xl lg:text-5xl font-extrabold text-navy">
            Las personas detrás de Raitzin.
          </h2>
        </div>

        {/* Cards stack */}
        <div className="relative flex-1 max-w-6xl w-full mx-auto px-6">
          {team.map((person, i) => {
            const reversed = i % 2 !== 0
            return (
              <div
                key={person.name}
                id={`team-card-${i}`}
                className="absolute inset-0 flex items-start sm:items-center px-4 pt-4 sm:pt-0 overflow-hidden"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <div
                  className={`grid w-full ${reversed ? "lg:grid-cols-[1fr_400px]" : "lg:grid-cols-[400px_1fr]"} gap-6 sm:gap-10 lg:gap-20 items-center`}
                >
                  {/* Photo */}
                  <div
                    className={`aspect-square w-full max-w-[180px] sm:max-w-[260px] mx-auto lg:max-w-none rounded-2xl relative overflow-hidden ${person.photo ? "" : person.photoClass} ${person.borderClass}${reversed ? " lg:order-last" : ""}`}
                  >
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={`Foto de ${person.name}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-8xl font-extrabold text-white/20 select-none pointer-events-none">
                        {person.initial}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="relative overflow-hidden py-4">
                    <span
                      className="absolute -top-4 right-0 font-extrabold text-gray-100 leading-none select-none pointer-events-none"
                      style={{ fontSize: "clamp(72px, 12vw, 120px)" }}
                    >
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

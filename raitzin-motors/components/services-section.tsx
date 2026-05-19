"use client"

import { useEffect, useRef } from "react"
import { Zap, CreditCard, RefreshCw, Handshake, type LucideIcon } from "lucide-react"

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Zap,
    title: "Compra y venta inmediata",
    description: "Si estás apurado en vender tu auto, te compramos al instante.",
  },
  {
    icon: CreditCard,
    title: "Financiación",
    description: "Financiación propia a 12 meses sin bancos. Cuotas fijas y mínimos requisitos.",
  },
  {
    icon: RefreshCw,
    title: "Permuta",
    description: "Entregá tu auto en parte de pago y llevate el que más te guste. Simple y rápido.",
  },
  {
    icon: Handshake,
    title: "Consignación",
    description: "Dejanos tu auto y lo vendemos por vos. Sin complicaciones, sin esfuerzo.",
  },
]

const NAVY = "#1E2167"
const BURGUNDY = "#8B1A1A"

function WheelSVG({ svgRef, size = 220 }: { svgRef: React.RefObject<SVGSVGElement | null>; size?: number }) {
  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transformOrigin: "center center" }}
      className="drop-shadow-md"
      aria-hidden="true"
    >
      <path
        fill={NAVY}
        d="M256 21A235 235 0 0 0 21 256a235 235 0 0 0 235 235 235 235 0 0 0 235-235A235 235 0 0 0 256 21zm0 82c84.393 0 153 68.607 153 153s-68.607 153-153 153-153-68.607-153-153 68.607-153 153-153zm0 18c-20.417 0-39.757 4.52-57.09 12.602C210.457 166.482 230.218 208 256 208c25.823 0 44.926-41.65 56.752-74.555C295.505 125.462 276.284 121 256 121zm98.752 42.88c-27.714 21.143-61.142 52.79-53.17 77.327 7.981 24.564 53.508 29.858 88.459 30.936.628-5.294.959-10.678.959-16.143 0-35.642-13.755-68.012-36.248-92.12zm-197.729.243C134.663 188.204 121 220.477 121 256c0 5.55.34 11.018.988 16.39 34.833-.825 80.381-6.793 88.344-31.3 7.974-24.542-25.68-55.553-53.309-76.967zm70.188 43.643a9 9 0 0 0-5.035 1.714 9 9 0 0 0-1.99 12.57 9 9 0 0 0 12.57 1.993 9 9 0 0 0 1.992-12.572 9 9 0 0 0-7.537-3.705zm57.578 0a9 9 0 0 0-.637.004 9 9 0 0 0-6.9 3.7 9 9 0 0 0 1.992 12.573 9 9 0 0 0 12.57-1.992 9 9 0 0 0-1.99-12.57 9 9 0 0 0-5.035-1.715zM256 224a32 32 0 0 0-32 32 32 32 0 0 0 32 32 32 32 0 0 0 32-32 32 32 0 0 0-32-32zm-46.297 38.037a9 9 0 0 0-2.652.44 9 9 0 0 0-5.78 11.341 9 9 0 0 0 11.34 5.778 9 9 0 0 0 5.78-11.34 9 9 0 0 0-8.688-6.219zm92.856.008a9 9 0 0 0-8.95 6.21 9 9 0 0 0 5.78 11.34 9 9 0 0 0 11.34-5.777 9 9 0 0 0-5.78-11.341 9 9 0 0 0-2.39-.432zm-92.143 27.713c-21.59.104-50.24 16.832-72.424 31.928 19.029 34.168 52.46 59.164 92.143 66.837 9.99-33.39 18.42-78.618-2.446-93.777-4.854-3.527-10.737-5.02-17.273-4.988zm91.016.02c-6.58 0-12.492 1.516-17.346 5.042-20.895 15.181-11.863 60.106-2.088 93.678 39.687-7.715 73.108-32.76 92.1-66.973-22.006-15.224-50.935-31.747-72.666-31.748zM256 295.58a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9z"
      />
      {/* Center hub accent */}
      <circle cx="256" cy="256" r="14" fill={BURGUNDY} />
    </svg>
  )
}

export function ServicesSection() {
  const sectionDesktopRef = useRef<HTMLElement>(null)
  const sectionMobileRef = useRef<HTMLElement>(null)
  const wheelDesktopRef = useRef<SVGSVGElement>(null)
  const wheelMobileRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | undefined

    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const getState = (progress: number, index: number, total: number, yOffset: number) => {
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

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add("(min-width: 1024px)", () => {
          const section = sectionDesktopRef.current
          if (!section) return

          gsap.to(wheelDesktopRef.current, {
            rotateZ: 1080,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              services.forEach((_, index) => {
                const el = document.getElementById(`servicio-${index}`)
                if (!el) return
                const { opacity, y } = getState(self.progress, index, services.length, 40)
                el.style.opacity = String(opacity)
                el.style.transform = `translateY(${y}px)`
              })
            },
          })
        })

        mm.add("(max-width: 1023px)", () => {
          const section = sectionMobileRef.current
          if (!section) return

          gsap.to(wheelMobileRef.current, {
            rotateZ: 1080,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              services.forEach((_, index) => {
                const el = document.getElementById(`servicio-mobile-${index}`)
                if (!el) return
                const { opacity, y } = getState(self.progress, index, services.length, 20)
                el.style.opacity = String(opacity)
                el.style.transform = `translateY(${y}px)`
              })
            },
          })
        })
      })
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <>
      {/* MOBILE layout */}
      <section
        id="servicios"
        ref={sectionMobileRef}
        className="lg:hidden bg-white"
        style={{ height: `${services.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex flex-col pt-12">
          {/* Top: wheel */}
          <div className="flex flex-col items-center justify-center h-2/5">
            <WheelSVG svgRef={wheelMobileRef} size={160} />
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400 mt-3">
              NUESTROS SERVICIOS
            </p>
          </div>

          {/* Bottom: services */}
          <div className="relative h-3/5">
            {services.map((service, index) => (
              <div
                key={service.title}
                id={`servicio-mobile-${index}`}
                className="absolute inset-0 flex flex-col items-center justify-start pt-6 px-8 text-center"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <service.icon size={36} color={BURGUNDY} />
                <div className="w-12 h-0.5 bg-[#8B1A1A] my-3" />
                <h3 className="text-xl font-bold text-[#1E2167] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESKTOP sticky layout */}
      <section
        id="servicios"
        ref={sectionDesktopRef}
        className="hidden lg:block bg-white"
        style={{ height: `${services.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex">
          {/* Left column: wheel */}
          <div className="w-1/2 flex flex-col items-center justify-center gap-6 border-r border-gray-100">
            <WheelSVG svgRef={wheelDesktopRef} />
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#1E2167]/50">
              Nuestros Servicios
            </p>
          </div>

          {/* Right column: stacked service panels */}
          <div className="w-1/2 relative overflow-hidden">
            {services.map((service, index) => (
              <div
                key={service.title}
                id={`servicio-${index}`}
                className="absolute inset-0 flex flex-col justify-center px-16"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <service.icon className="w-12 h-12 text-[#8B1A1A] mb-5" />
                <div className="w-16 h-0.5 bg-[#8B1A1A] mb-6" />
                <h3 className="text-3xl font-extrabold text-[#1E2167] mb-4">{service.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed max-w-[400px]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

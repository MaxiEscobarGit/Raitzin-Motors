"use client"

import { useEffect, useRef } from "react"
import { Zap, CreditCard, RefreshCw, Handshake, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Zap,
    title: "Compra y venta inmediata",
    description: "Si estás apurado en vender tu auto, te compramos tu auto al instante.",
  },
  {
    icon: CreditCard,
    title: "Financiación",
    description: "Financiación propia a 12 meses sin bancos de por medio. Cuotas fijas y mínimos requisitos.",
  },
  {
    icon: RefreshCw,
    title: "Permuta",
    description: " Entregas tu auto en parte de pago, y te llevás el que más te guste.",
  },
  {
    icon: Handshake,
    title: "Consignación",
    description: "Dejanos tu auto y lo vendemos por vos. Sin complicaciones.",
  },
]

export function ServicesSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.style.transitionDelay = `${index * 0.20}s`
            card.classList.remove("opacity-0", "translate-y-10")
            card.classList.add("opacity-100", "translate-y-0")
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(card)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="servicios" className="py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-3">
            Nuestros Servicios
          </h2>
          <p className="text-gray-500 text-lg">
            Todo lo que necesitás para tu próxima compra
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => { cardRefs.current[index] = el }}
              className="opacity-0 translate-y-10 transition-all duration-[600ms] ease-out"
            >
              <Card className="bg-white border-[1.5px] border-[#e5e7eb] hover:border-[#1E2167] rounded-2xl transition-all duration-300 group h-full">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#7EB8D4]/20 mb-4">
                    <service.icon className="h-7 w-7 text-[#1E2167]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E2167] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

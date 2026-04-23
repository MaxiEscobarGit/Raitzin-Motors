"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Fabiana Bastidas",
    text: "Unos genios, todo muy claro y rápido... Excelente atención y muy atentos... Compramos una eco y nada que decir, impecable 💗",
    rating: 5,
  },
  {
    name: "Nicolas Rojas",
    text: "Excelente!!! Es la cuarta vez que compro. Muy buena agencia. Atención rápida, clara y profesional. Todo fue tal como lo acordado y el proceso fue simple y transparente. 100% recomendable. Gracias Santi!",
    rating: 5,
  },
  {
    name: "Mariana Garcia",
    text: "Amable y rápida atención, números claros (Más que importante). Facilidad en los trámites e información precisa.",
    rating: 5,
  },
  {
    name: "Emilio Valenzuela",
    text: "Excelente atención y autos en impecable estado. Me asesoraron de diez y todo fue claro y rápido. Súper confiables. Recomendadísimos.",
    rating: 5,
  },
  {
    name: "Claudia Abrea",
    text: "Muy buena atención, muy buen asesoramiento y predisposición. Los autos impecables!!! Gracias Felipe y Santiago",
    rating: 5,
  },
  {
    name: "Silvia Maldonado",
    text: "Excelente concesionario atención personalizada. Nosotros somos clientes y jamás un problema con los vehículos es el segundo que cambiamos con ellos. Recomendado 100x100",
    rating: 5,
  },
  {
    name: "Mariano Grzetic",
    text: "Confianza agilidad y transparencia. Hicimos la operación en 2 horas. El 6to auto que compramos. Gracias Santiago",
    rating: 5,
  },
  {
    name: "Florencia Barria",
    text: "En mi experiencia, excelente atención, comunicación y disposición!!! Compre mi auto y todo muy bien, excelente!!!",
    rating: 5,
  },
  {
    name: "Aldi Narvaez",
    text: "Excelente! nos hicieron sentir muy cómodos y satisfechos",
    rating: 5,
  },
  {
    name: "Valentina Vallone",
    text: "Hicieron que cambiar de auto sea fácil y no un problema!! Gracias los voy a recomendar 🐨...",
    rating: 5,
  },
  {
    name: "Francisco Dure de miguel",
    text: "Excelente servicio de todo el personal, desde el primer momento hasta el último tuvieron un trato increíble, con buena onda y profesionalismo. Mucha comodidad en la agencia con todos los trámites.",
    rating: 5,
  },
  {
    name: "Diego Villalobos",
    text: "Tanta trayectoria en el rubro se nota perfectamente a la hora de comprarles algún vehículo. Aguante Raitzin motors.",
    rating: 5,
  },
]

function getGroupSize(width: number): number {
  if (width < 768) return 1
  if (width < 1024) return 2
  return 4
}

function buildGroups(size: number): (typeof reviews)[] {
  const result = []
  for (let i = 0; i < reviews.length; i += size) {
    result.push(reviews.slice(i, i + size))
  }
  return result
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export function ReviewsSection() {
  const [groupSize, setGroupSize] = useState(4)
  const [currentGroup, setCurrentGroup] = useState(0)
  const [visible, setVisible] = useState(true)

  // Detect window size and update groupSize
  useEffect(() => {
    const update = () => {
      const newSize = getGroupSize(window.innerWidth)
      setGroupSize((prev) => {
        if (prev !== newSize) {
          setCurrentGroup(0)
        }
        return newSize
      })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const groups = buildGroups(groupSize)

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrentGroup((prev) => (prev + 1) % groups.length)
        setVisible(true)
      }, 300)
    }, 5000)
    return () => clearInterval(interval)
  }, [groups.length])

  const goTo = (index: number) => {
    if (index === currentGroup) return
    setVisible(false)
    setTimeout(() => {
      setCurrentGroup(index)
      setVisible(true)
    }, 300)
  }

  const group = groups[currentGroup] ?? []

  const gridCols =
    groupSize === 1 ? "grid-cols-1" :
    groupSize === 2 ? "grid-cols-2" :
    "grid-cols-4"

  return (
    <section id="nosotros" className="py-12 md:py-20 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-sm font-medium text-[#1E2167] uppercase tracking-wider mb-8">
          Lo que dicen nuestros clientes
        </h2>

        {/* Cards */}
        <div
          className={`grid ${gridCols} gap-4 mb-6 transition-opacity duration-300`}
          style={{ opacity: visible ? 1 : 0 }}
        >
          {group.map((review) => (
            <div
              key={review.name}
              className="flex flex-col bg-white rounded-2xl px-6 py-5 shadow-sm border-[1.5px] border-[#7EB8D4] h-full"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <GoogleIcon />
                  <span>Google</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-xs font-semibold text-[#1E2167] mt-3">{review.name}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {groups.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Grupo de reseñas ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentGroup ? "w-6 bg-[#1E2167]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Google button */}
        <div className="text-center">
          <a
            href="https://www.google.com/maps/place/Raitzin+Motors/@-41.1336812,-71.2983826,17z/data=!4m8!3m7!1s0x961a7b007a003b4b:0xd8b7b43351813a1!8m2!3d-41.1336812!4d-71.2958077!9m1!1b1!16s%2Fg%2F11vpl8hrj4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1E2167] text-sm font-medium text-[#1E2167] hover:bg-[#1E2167] hover:text-white transition-colors duration-200"
          >
            <GoogleIcon />
            Ver más reseñas en Google
          </a>
        </div>
      </div>
    </section>
  )
}

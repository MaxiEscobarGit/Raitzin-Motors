import { Eye, Zap, MapPin, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValorItem {
  icon: React.ReactNode
  title: string
  description: string
  iconClass: string
}

const valores: ValorItem[] = [
  {
    icon: <Eye size={22} aria-hidden="true" />,
    title: "Transparencia",
    description:
      "Sin letra chica. Cada precio, cada kilómetro, cada detalle del auto lo sabés antes de firmar.",
    iconClass: "bg-[#7EB8D4]/15 text-[#7EB8D4]",
  },
  {
    icon: <Zap size={22} aria-hidden="true" />,
    title: "Rapidez",
    description:
      "Sabemos que tu tiempo vale. Operaciones ágiles, sin burocracia innecesaria y con respuesta rápida.",
    iconClass: "bg-[#7EB8D4]/15 text-[#7EB8D4]",
  },
  {
    icon: <MapPin size={22} aria-hidden="true" />,
    title: "Raíces en Bariloche",
    description:
      "Somos locales. Conocemos la ciudad, su gente y lo que necesita alguien que vive y trabaja acá.",
    iconClass: "bg-[#7EB8D4]/15 text-[#7EB8D4]",
  },
  {
    icon: <Heart size={22} aria-hidden="true" />,
    title: "Pasión",
    description:
      "Los fierros no son solo un negocio para nosotros. Esta pasión es la que nos hace dar siempre un poco más.",
    iconClass: "bg-[#8B1A1A]/15 text-[#8B1A1A]",
  },
]

export function ValoresGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {valores.map((item, idx) => (
        <div
          key={item.title}
          className="relative group block p-1.5 sm:p-2 h-full w-full"
        >
          {/* Card */}
          <div
            className={cn(
              "relative z-20 rounded-xl sm:rounded-2xl w-full overflow-hidden",
              "bg-[#1E2167]",
              "border border-[#7EB8D4]/10 group-hover:border-[#7EB8D4]/40",
              "shadow-sm group-hover:shadow-[0_8px_32px_rgba(126,184,212,0.15)]",
              "translate-y-0 group-hover:-translate-y-1",
              "transition-all duration-300 ease-out",
              // Square via aspect-ratio — full height on the inner content box
              "aspect-square",
            )}
          >
            <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col gap-3 sm:gap-4 justify-center">
              {/* Icon */}
              <div
                className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  item.iconClass,
                )}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-white text-base sm:text-lg lg:text-xl leading-tight">
                {item.title}
              </h3>

              {/* Description — hidden on very small viewports, shown from sm up */}
              <p className="hidden sm:block text-white/65 text-sm lg:text-base leading-relaxed line-clamp-4">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

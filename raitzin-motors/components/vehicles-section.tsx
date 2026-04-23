import { MessageCircle, ArrowRight, Fuel, Gauge } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { formatPrice, formatKm, generateSlug } from "@/lib/utils"

const vehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Hilux SRV",
    year: 2022,
    price: 28500000,
    currency: "ARS" as const,
    km: 45000,
    fuel: "Diesel",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    brand: "Volkswagen",
    model: "Vento GLI",
    year: 2021,
    price: 18900000,
    currency: "ARS" as const,
    km: 32000,
    fuel: "Nafta",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    brand: "Chevrolet",
    model: "Tracker Premier",
    year: 2023,
    price: 24500000,
    currency: "ARS" as const,
    km: 18000,
    fuel: "Nafta",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop",
  },
]

export function VehiclesSection() {
  return (
    <section id="vehiculos" className="py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-3">
            Autos Destacados
          </h2>
          <p className="text-[#5A6A7A] text-lg">
            Stock seleccionado — actualizado esta semana
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide mb-10">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex-shrink-0 snap-center w-[85vw] sm:w-[45vw] lg:w-[calc(25%-12px)]"
            >
              <Card className="bg-white border-[1.5px] border-[#e5e7eb] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group h-full">
                <div className="relative overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-[#1E2167] text-white">
                    {vehicle.brand}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-[#1E2167]">{vehicle.model}</h3>
                      <p className="text-xs md:text-sm text-[#5A6A7A]">{vehicle.year}</p>
                    </div>
                    <p className="text-sm md:text-base lg:text-lg font-bold text-[#8B1A1A] mt-1">
                      {formatPrice(vehicle.price, vehicle.currency)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-xs md:text-sm text-[#5A6A7A]">
                      <Gauge className="h-4 w-4" />
                      {formatKm(vehicle.km)}
                    </div>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-[#5A6A7A]">
                      <Fuel className="h-4 w-4" />
                      {vehicle.fuel}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      asChild
                      className="flex-1 bg-[#1E2167] hover:bg-[#151849] text-white rounded-full"
                      aria-label={`Ver más sobre ${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                    >
                      {/* TODO: replace with real slug from Supabase vehicle data */}
                      <Link href={`/autos/${generateSlug(vehicle.brand, vehicle.model, vehicle.year)}`}>
                        Ver más
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full px-4"
                    >
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola!%20Me%20interesa%20el%20${vehicle.brand}%20${vehicle.model}%20${vehicle.year}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Consultar por WhatsApp sobre ${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="link"
            className="text-[#8B1A1A] hover:text-[#6B1414] text-lg font-medium"
          >
            <a href="/catalogo" className="flex items-center gap-2">
              Ver todo el catálogo
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

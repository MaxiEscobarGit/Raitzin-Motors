"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const marcas = ["Toyota", "Volkswagen", "Chevrolet", "Ford", "Fiat", "Renault", "Peugeot", "Honda"]
const tipos = ["Sedan", "SUV", "Pickup", "Hatchback", "Coupe", "Utilitario"]
const anos = Array.from({ length: 10 }, (_, i) => (2024 - i).toString())

export function SearchSection() {
  return (
    <section id="buscar" className="py-12 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E2167] font-sans mb-3">
            ¿Qué auto estás buscando?
          </h2>
          <p className="text-[#5A6A7A] text-lg">
            Encontrá tu próximo vehículo en segundos
          </p>
        </div>

        <div className="bg-[#EBF4FA] rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Marca */}
            <Select>
              <SelectTrigger aria-label="Filtrar por marca" className="w-full bg-white border-[#1E2167] h-12">
                <SelectValue placeholder="Todas las marcas" />
              </SelectTrigger>
              <SelectContent>
                {marcas.map((marca) => (
                  <SelectItem key={marca} value={marca.toLowerCase()}>
                    {marca}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Modelo */}
            <Select>
              <SelectTrigger aria-label="Filtrar por modelo" className="w-full bg-white border-[#1E2167] h-12">
                <SelectValue placeholder="Todos los modelos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los modelos</SelectItem>
              </SelectContent>
            </Select>

            {/* Tipo */}
            <Select>
              <SelectTrigger aria-label="Filtrar por tipo de vehículo" className="w-full bg-white border-[#1E2167] h-12">
                <SelectValue placeholder="Tipo de vehiculo" />
              </SelectTrigger>
              <SelectContent>
                {tipos.map((tipo) => (
                  <SelectItem key={tipo} value={tipo.toLowerCase()}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Precio desde */}
            <Select>
              <SelectTrigger aria-label="Filtrar por precio" className="w-full bg-white border-[#1E2167] h-12">
                <SelectValue placeholder="Precio desde" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000000">$ 5.000.000</SelectItem>
                <SelectItem value="10000000">$ 10.000.000</SelectItem>
                <SelectItem value="15000000">$ 15.000.000</SelectItem>
                <SelectItem value="20000000">$ 20.000.000</SelectItem>
                <SelectItem value="25000000">$ 25.000.000</SelectItem>
                <SelectItem value="30000000">$ 30.000.000</SelectItem>
                <SelectItem value="40000000">$ 40.000.000</SelectItem>
                <SelectItem value="50000000">$ 50.000.000</SelectItem>
              </SelectContent>
            </Select>

            {/* Ano */}
            <Select>
              <SelectTrigger aria-label="Filtrar por año" className="w-full bg-white border-[#1E2167] h-12">
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                {anos.map((ano) => (
                  <SelectItem key={ano} value={ano}>
                    {ano}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button
              className="h-12 bg-[#8B1A1A] hover:bg-[#6B1414] text-white rounded-full font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

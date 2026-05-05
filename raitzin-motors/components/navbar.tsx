"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Vehículos" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white border-b border-gray-200 shadow-md" : "bg-white shadow-none"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo raitzin.png"
              alt="Raitzin Motors"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1E2167] hover:text-[#8B1A1A] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="hidden sm:flex bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full gap-2"
              size="sm"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%20mi%20nombre%20es%0AEstoy%20interesado%20en%20`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                Consultanos
              </a>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1E2167]"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-[#1E2167] hover:bg-[#F4F8FB] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hola%20mi%20nombre%20es%0AEstoy%20interesado%20en%20`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultanos por WhatsApp"
              className="flex items-center gap-2 mx-4 mt-2 px-4 py-3 bg-[#25D366] text-white rounded-full justify-center font-medium min-h-[44px]"
            >
              <WhatsAppIcon size={16} />
              Consultanos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

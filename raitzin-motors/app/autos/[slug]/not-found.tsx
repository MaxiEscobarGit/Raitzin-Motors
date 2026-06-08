import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <Link href="/" className="inline-block">
          <Image
            src="/logo raitzin.png"
            alt="Raitzin Motors"
            width={100}
            height={34}
            className="h-9 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center py-20 gap-6">
        <div className="text-[120px] font-extrabold leading-none text-[#1E2167] opacity-[0.07] select-none" aria-hidden="true">
          404
        </div>

        <div className="-mt-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2167] mb-3">
            Este vehículo no está disponible
          </h1>
          <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
            Es posible que ya haya sido vendido o que el enlace sea incorrecto. Explorá el catálogo completo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#8B1A1A] hover:bg-[#6B1414] text-white text-sm font-semibold transition-colors no-underline"
          >
            Ver catálogo completo
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-[#1E2167] text-[#1E2167] hover:bg-[#1E2167] hover:text-white text-sm font-semibold transition-colors no-underline"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

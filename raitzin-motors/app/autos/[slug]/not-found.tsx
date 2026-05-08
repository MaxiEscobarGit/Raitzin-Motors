import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <div className="text-6xl font-extrabold text-navy opacity-20">404</div>
      <h1 className="text-2xl font-bold text-navy">Este vehículo no está disponible</h1>
      <p className="text-muted-foreground max-w-sm">
        Es posible que ya haya sido vendido o que el enlace sea incorrecto.
      </p>
      <Link
        href="/catalogo"
        className="bg-burgundy text-white px-8 py-3 rounded-full font-semibold hover:bg-[#6e1515] transition-colors no-underline"
      >
        Ver catálogo completo
      </Link>
    </div>
  )
}

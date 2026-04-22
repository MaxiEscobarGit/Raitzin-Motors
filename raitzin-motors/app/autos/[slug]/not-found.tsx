// app/autos/[slug]/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold text-navy">404</h1>
      <p className="text-gray-500">Este auto no existe o ya fue vendido.</p>
      <a href="/catalogo" className="text-burgundy underline">Ver catálogo</a>
    </div>
  )
}
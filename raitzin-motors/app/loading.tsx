export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#1E2167]/10" />
        <div className="absolute inset-0 rounded-full border-4 border-[#1E2167] border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-gray-400 font-medium tracking-wide">Cargando...</p>
    </div>
  )
}

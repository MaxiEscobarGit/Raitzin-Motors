import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Raitzin Motors',
  description: 'Leé los términos y condiciones de uso del sitio de Raitzin Motors, tu concesionaria de autos en Bariloche.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar'}/terminos`,
  },
  openGraph: {
    title: 'Términos y Condiciones — Raitzin Motors',
    description: 'Términos y condiciones de uso del sitio de Raitzin Motors, concesionaria en San Carlos de Bariloche.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar'}/terminos`,
    siteName: 'Raitzin Motors',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function TerminosPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1E2167] pt-28 pb-16">
        <div className="mx-auto max-w-[760px] px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            Términos y Condiciones
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <main className="mx-auto max-w-[760px] px-4 py-16">
        <p className="text-gray-400 text-sm mb-8">Última actualización: abril 2025</p>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Consideraciones generales</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Este sitio web es operado por Raitzin Motors, agencia de compra-venta de vehículos usados
            y semi-nuevos con sede en San Carlos de Bariloche, Argentina. Al ingresar y utilizar este
            sitio, el usuario acepta en su totalidad las presentes condiciones. Raitzin Motors se
            reserva el derecho de modificarlas en cualquier momento mediante su publicación
            actualizada en el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Información del sitio</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            El sitio tiene carácter exclusivamente informativo. Toda la información publicada —
            precios, descripciones, fotografías y especificaciones — es orientativa y no constituye
            oferta de venta ni tiene carácter contractual o pre-contractual. Se recomienda consultar
            con nuestro equipo para obtener información actualizada.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Precios y disponibilidad</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Los precios publicados están sujetos a modificación sin previo aviso. La disponibilidad
            de un vehículo no está garantizada hasta ser confirmada por Raitzin Motors. Raitzin
            Motors no se responsabiliza por errores tipográficos en precios o especificaciones
            técnicas.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Fotografías</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Las imágenes se exhiben con fines ilustrativos. Pueden existir diferencias entre las
            fotografías y las características reales del vehículo al momento de la consulta.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Contacto por WhatsApp</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Iniciar una conversación por WhatsApp no implica reserva, compromiso ni oferta
            vinculante de ninguna de las partes. La operación se formaliza únicamente mediante
            acuerdo presencial entre comprador y Raitzin Motors.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Propiedad intelectual</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            El contenido, diseño, textos, imágenes y marca de este sitio son propiedad de Raitzin
            Motors. Queda prohibida su reproducción, adaptación o distribución total o parcial sin
            autorización escrita previa.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Límite de responsabilidad</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Raitzin Motors no será responsable por daños directos o indirectos derivados del uso de
            este sitio, ni por la exactitud de la información aquí contenida. El uso del sitio es
            bajo exclusiva responsabilidad del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Hipervínculos</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Este sitio puede contener enlaces a sitios de terceros (Instagram, WhatsApp, Google
            Maps). Raitzin Motors no se responsabiliza por el contenido ni las políticas de dichos
            sitios.
          </p>
        </section>
      </main>
    </>
  )
}

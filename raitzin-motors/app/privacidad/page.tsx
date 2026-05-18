import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Raitzin Motors',
  description: 'Conocé cómo Raitzin Motors trata tus datos personales y la política de privacidad del sitio.',
}

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1E2167] pt-28 pb-16">
        <div className="mx-auto max-w-[760px] px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white">
            Política de Privacidad
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <main className="mx-auto max-w-[760px] px-4 py-16">
        <p className="text-gray-400 text-sm mb-8">Última actualización: abril 2025</p>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Datos que recopilamos</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Este sitio no cuenta con formularios de registro, suscripción ni base de datos de
            usuarios. Raitzin Motors no recopila nombre, email, teléfono ni ningún otro dato
            personal de forma automática a través del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Contacto por WhatsApp</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Al hacer clic en los botones de WhatsApp, el usuario es redirigido a la plataforma de
            Meta (WhatsApp), un servicio externo e independiente de Raitzin Motors. Los datos que
            el usuario comparta en esa conversación quedan sujetos exclusivamente a la Política de
            Privacidad de WhatsApp/Meta. Raitzin Motors utilizará esa información únicamente para
            responder la consulta del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Cookies</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Este sitio puede utilizar cookies técnicas estrictamente necesarias para su
            funcionamiento básico. No utilizamos cookies de seguimiento, publicidad ni análisis de
            comportamiento de terceros.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Dirección IP</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            El sitio puede registrar direcciones IP de los visitantes con fines estadísticos
            agregados, sin asociarlas a datos personales identificables.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Compartir información</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Raitzin Motors no vende, cede ni distribuye datos personales a terceros, salvo
            requerimiento expreso de autoridad judicial o gubernamental competente conforme a la
            legislación argentina vigente.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Modificaciones</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Raitzin Motors puede actualizar esta política en cualquier momento. La fecha de última
            actualización siempre estará visible al inicio de esta página. El uso continuado del
            sitio implica la aceptación de la versión vigente.
          </p>
        </section>

        <section>
          <h2 className="text-[#1E2167] font-bold text-lg mb-2 mt-8">Legislación aplicable</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed">
            Esta política se rige por la Ley 25.326 de Protección de Datos Personales de la
            República Argentina y demás normativa aplicable.
          </p>
        </section>
      </main>
    </>
  )
}

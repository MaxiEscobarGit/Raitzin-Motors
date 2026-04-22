import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
  description: 'Tu concesionaria de confianza en San Carlos de Bariloche, Argentina. Conectando familias con el auto ideal. Financiación, permuta y garantía.',
  keywords: ['autos usados', 'seminuevos', 'Bariloche', 'Argentina', 'concesionaria', 'financiación', 'permuta'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E2167',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

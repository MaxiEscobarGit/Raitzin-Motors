import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar'),
  title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
  description: 'Tu concesionaria de confianza en San Carlos de Bariloche, Argentina. Conectando familias con el auto ideal. Financiación, permuta y garantía.',
  keywords: [
    'autos usados Bariloche',
    'autos seminuevos Bariloche',
    'concesionaria Bariloche',
    'comprar auto San Carlos de Bariloche',
    'Raitzin Motors',
    'autos Patagonia',
    'financiación autos Río Negro',
    'permuta autos Bariloche',
    'vender auto Bariloche',
  ],
  openGraph: {
    title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
    description: 'Tu concesionaria de confianza en San Carlos de Bariloche. Stock actualizado, financiación y permuta.',
    url: '/',
    siteName: 'Raitzin Motors',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/portada.jpg',
        width: 1200,
        height: 630,
        alt: 'Raitzin Motors — Autos Usados y Seminuevos en Bariloche',
      },
    ],
  },
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
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}

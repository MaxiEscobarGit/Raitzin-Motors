import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { Footer } from '@/components/footer'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar'),
  title: {
    default: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
    template: '%s | Raitzin Motors',
  },
  description: 'Tu concesionaria de confianza en San Carlos de Bariloche, Argentina. Autos usados y seminuevos con financiación, permuta y garantía.',
  keywords: [
    'autos usados Bariloche',
    'autos seminuevos Bariloche',
    'concesionaria Bariloche',
    'comprar auto San Carlos de Bariloche',
    'compra venta autos San Carlos de Bariloche',
    'Raitzin Motors',
    'autos Patagonia',
    'financiación autos Río Negro',
    'permuta autos Bariloche',
    'vender auto Bariloche',
  ],
  openGraph: {
    title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
    description: 'Tu concesionaria de confianza en San Carlos de Bariloche. Stock actualizado, financiación y permuta.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar',
    siteName: 'Raitzin Motors',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Raitzin Motors - Showroom Digital Bariloche',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raitzin Motors | Autos Usados y Seminuevos en Bariloche',
    description: 'Tu concesionaria de confianza en San Carlos de Bariloche. Stock actualizado, financiación y permuta.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://raitzinmotors.com.ar',
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
    <html lang="es-AR" className={jakarta.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MZRWGB2M');`}
        </Script>

        {/* GA4 directo — OJO: si se configura un tag de GA4 en el panel de GTM con el
            mismo Measurement ID (G-N8TXB7HXSB), se van a duplicar los pageviews.
            En ese caso, eliminar este bloque y dejar solo el de GTM. */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N8TXB7HXSB" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N8TXB7HXSB');`}
        </Script>

        {/* Ahrefs Analytics */}
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="cqewdtKiPrPYfbwqtUnhkA" strategy="afterInteractive" />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MZRWGB2M"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
          </iframe>
        </noscript>
        {children}
        <Footer />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}

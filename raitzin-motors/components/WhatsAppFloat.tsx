'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()

  // On individual vehicle pages (/autos/*) on mobile the page renders its own
  // sticky CTA bar, so we hide the float button on small screens there to avoid overlap.
  const isVehiclePage = pathname?.startsWith('/autos/')

  useEffect(() => {
    const show = () => setHidden(false)
    const hide = () => setHidden(true)
    window.addEventListener('modal:open', hide)
    window.addEventListener('modal:close', show)
    return () => {
      window.removeEventListener('modal:open', hide)
      window.removeEventListener('modal:close', show)
    }
  }, [])

  if (hidden) return null

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5492944295668'
  const url = `https://wa.me/${number}?text=${encodeURIComponent('Hola! Estoy viendo su página y quería consultar.')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultanos por WhatsApp"
      className={[
        'fixed right-6 z-[999] w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]',
        // On vehicle pages, hide on mobile (page has its own sticky CTA bar); show on lg always
        isVehiclePage ? 'hidden lg:flex lg:bottom-6' : 'flex bottom-20 lg:bottom-6',
      ].join(' ')}
      style={{
        background: '#25D366',
        boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
      }}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}

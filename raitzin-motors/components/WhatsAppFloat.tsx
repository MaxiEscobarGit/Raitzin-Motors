'use client'

import { useState, useEffect } from 'react'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false)

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
      className="fixed right-6 bottom-20 lg:bottom-6 z-[999] w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
      }}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}

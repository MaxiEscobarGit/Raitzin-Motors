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

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const url = `https://wa.me/${number}?text=${encodeURIComponent('Hola! Estoy viendo su página y quería consultar.')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bottom-20 lg:bottom-6"
      style={{
        position: 'fixed',
        right: 24,
        zIndex: 999,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#fff',
      }}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}

import bcryptjs from 'bcryptjs'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

// Rate limiting en memoria: ip → { count, blockedUntil }
interface RateLimitEntry {
  count: number
  blockedUntil: number | null
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_INTENTOS = 5
const BLOQUEO_MS = 15 * 60 * 1000 // 15 minutos

function getIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}

function verificarRateLimit(ip: string): { bloqueado: boolean; mensaje?: string } {
  const ahora = Date.now()
  const entrada = rateLimitMap.get(ip)

  if (!entrada) return { bloqueado: false }

  // Si está bloqueado y el bloqueo sigue vigente
  if (entrada.blockedUntil && ahora < entrada.blockedUntil) {
    const minutosRestantes = Math.ceil((entrada.blockedUntil - ahora) / 60000)
    return {
      bloqueado: true,
      mensaje: `Demasiados intentos fallidos. Intentá de nuevo en ${minutosRestantes} minuto${minutosRestantes !== 1 ? 's' : ''}.`,
    }
  }

  // El bloqueo expiró, reiniciar
  if (entrada.blockedUntil && ahora >= entrada.blockedUntil) {
    rateLimitMap.delete(ip)
    return { bloqueado: false }
  }

  return { bloqueado: false }
}

function registrarIntentoFallido(ip: string): void {
  const entrada = rateLimitMap.get(ip) ?? { count: 0, blockedUntil: null }
  entrada.count += 1

  if (entrada.count >= MAX_INTENTOS) {
    entrada.blockedUntil = Date.now() + BLOQUEO_MS
  }

  rateLimitMap.set(ip, entrada)
}

function limpiarIntentos(ip: string): void {
  rateLimitMap.delete(ip)
}

export async function POST(request: NextRequest) {
  const ip = getIp(request)

  // Verificar rate limit
  const { bloqueado, mensaje } = verificarRateLimit(ip)
  if (bloqueado) {
    return Response.json({ error: mensaje }, { status: 429 })
  }

  // Parsear el body
  let password: string
  try {
    const body = await request.json()
    password = body.password
    if (!password || typeof password !== 'string') {
      return Response.json({ error: 'Contraseña requerida' }, { status: 400 })
    }
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 })
  }

  // Verificar variables de entorno
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  const cookieSecret = process.env.COOKIE_SECRET

  if (!passwordHash || !cookieSecret) {
    console.error('Faltan variables de entorno: ADMIN_PASSWORD_HASH o COOKIE_SECRET')
    return Response.json({ error: 'Error de configuración del servidor' }, { status: 500 })
  }

  // Comparar contraseña con bcrypt
  const esValida = await bcryptjs.compare(password, passwordHash)

  if (!esValida) {
    registrarIntentoFallido(ip)
    const entrada = rateLimitMap.get(ip)
    const intentosRestantes = MAX_INTENTOS - (entrada?.count ?? 0)

    return Response.json(
      {
        error: 'Contraseña incorrecta',
        intentosRestantes: Math.max(0, intentosRestantes),
      },
      { status: 401 }
    )
  }

  // Contraseña correcta: limpiar intentos y setear cookie
  limpiarIntentos(ip)

  const cookieStore = await cookies()
  cookieStore.set('admin-session', cookieSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  })

  return Response.json({ ok: true }, { status: 200 })
}

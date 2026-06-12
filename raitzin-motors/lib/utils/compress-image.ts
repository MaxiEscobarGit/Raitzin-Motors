/**
 * isHeic
 * Detecta si un archivo es HEIC/HEIF por MIME type o extensión.
 */
export function isHeic(file: File): boolean {
  return (
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    /\.(heic|heif)$/i.test(file.name)
  )
}

/**
 * convertHeicToJpeg
 *
 * Convierte un archivo HEIC/HEIF a JPEG usando Canvas API.
 *
 * IMPORTANTE: Esta conversión depende del soporte nativo del navegador para
 * decodificar HEIC. Funciona en Safari (iOS y macOS). En Chrome o Firefox de
 * escritorio, los archivos HEIC no pueden cargarse en <img> y esta función
 * lanzará un error con un mensaje descriptivo. Si se necesita soporte
 * cross-browser, reemplazar con la librería `heic2any`.
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  const objectUrl = URL.createObjectURL(file)

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () =>
        reject(
          new Error(
            `No se pudo convertir "${file.name}" (HEIC). ` +
            `Este formato solo es compatible con Safari en iOS/macOS. ` +
            `Intentá convertir la foto a JPG antes de subirla.`,
          ),
        )
      el.src = objectUrl
    })

    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas.')
    ctx.drawImage(img, 0, 0)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b)
          else reject(new Error('canvas.toBlob devolvió null al convertir HEIC.'))
        },
        'image/jpeg',
        0.95,
      )
    })

    const baseName = file.name.replace(/\.[^.]+$/, '')
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

/**
 * compressImage
 *
 * Comprime una imagen en el navegador usando Canvas API.
 * - Archivos < 300 KB se retornan sin modificar.
 * - Redimensiona al máximo 1200 px en el lado más largo manteniendo aspect ratio.
 * - Exporta como WebP a calidad 0.82.
 *
 * No lleva directiva 'use client' ni 'use server' — es una función pura
 * que puede importarse desde cualquier componente cliente.
 */
export async function compressImage(file: File): Promise<File> {
  const THRESHOLD_BYTES = 300 * 1024 // 300 KB
  const MAX_SIDE = 1200
  const QUALITY = 0.82

  // Si el archivo ya es pequeño, no tocar nada
  if (file.size < THRESHOLD_BYTES) {
    return file
  }

  const objectUrl = URL.createObjectURL(file)

  try {
    // Cargar en un HTMLImageElement para conocer las dimensiones reales
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error(`No se pudo cargar la imagen: ${file.name}`))
      el.src = objectUrl
    })

    // Calcular nuevas dimensiones respetando aspect ratio
    let { naturalWidth: w, naturalHeight: h } = img

    if (w > MAX_SIDE || h > MAX_SIDE) {
      if (w >= h) {
        h = Math.round((h / w) * MAX_SIDE)
        w = MAX_SIDE
      } else {
        w = Math.round((w / h) * MAX_SIDE)
        h = MAX_SIDE
      }
    }

    // Dibujar en canvas y exportar
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h

    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas.')

    ctx.drawImage(img, 0, 0, w, h)

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b)
          else reject(new Error('canvas.toBlob devolvió null.'))
        },
        'image/webp',
        QUALITY,
      )
    })

    // Nombre sin extensión original + .webp
    const baseName = file.name.replace(/\.[^.]+$/, '')
    return new File([blob], `${baseName}.webp`, { type: 'image/webp' })
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

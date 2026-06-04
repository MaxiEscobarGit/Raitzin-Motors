'use client'

import { useState, useRef } from 'react'
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropperProps {
  imageSrc: string
  fileName: string
  onComplete: (croppedFile: File) => void
  onCancel: () => void
}

async function getCroppedImage(
  image: HTMLImageElement,
  crop: PixelCrop,
  fileName: string,
): Promise<File> {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 900 // 4:3 at 1200px
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('No se pudo obtener el contexto 2D del canvas.')

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    1200,
    900,
  )

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'))
          return
        }
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
        resolve(new File([blob], `${nameWithoutExt}.webp`, { type: 'image/webp' }))
      },
      'image/webp',
      0.82,
    )
  })
}

export function ImageCropper({ imageSrc, fileName, onComplete, onCancel }: ImageCropperProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [confirming, setConfirming] = useState(false)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 4 / 3, width, height),
      width,
      height,
    )
    setCrop(initialCrop)
  }

  async function handleConfirm() {
    if (!completedCrop || !imgRef.current) return
    setConfirming(true)
    try {
      const file = await getCroppedImage(imgRef.current, completedCrop, fileName)
      onComplete(file)
    } catch {
      setConfirming(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
        {/* Header text */}
        <div className="text-center">
          <p className="text-white text-base font-semibold">Ajustá el encuadre del auto</p>
          <p className="text-gray-400 text-sm mt-1">Proporcion 4:3 fija</p>
        </div>

        {/* Crop area */}
        <div className="overflow-hidden">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={4 / 3}
            minWidth={100}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Imagen a recortar"
              onLoad={onImageLoad}
              style={{ maxWidth: '90vw', maxHeight: '75vh', display: 'block' }}
            />
          </ReactCrop>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={confirming}
            className="border border-white text-white bg-transparent hover:bg-white/10 px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Omitir
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!completedCrop || confirming}
            className="text-white px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
            style={{ backgroundColor: confirming ? '#6b1414' : '#8B1A1A' }}
          >
            {confirming ? 'Procesando...' : 'Confirmar recorte'}
          </button>
        </div>
      </div>
    </div>
  )
}

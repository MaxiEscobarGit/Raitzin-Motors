'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { compressImage } from '@/lib/utils/compress-image'
import {
  uploadImagesAction,
  updateVehicleAction,
  deleteVehicleAction,
  deleteImagesAction,
  setVehicleTagsAction,
} from '@/app/rm-bariloche-gestion/autos/actions'
import { ImageCropper } from '@/components/admin/ImageCropper'
import { SortableImageGrid, type SortableImage } from '@/components/admin/SortableImageGrid'
import { TagSelector } from '@/components/admin/TagSelector'
import { NuevaMarcaModal } from '@/components/admin/NuevaMarcaModal'
import type { Marca, TipoVehiculo } from '@/types/database'

type MarcaOption = Pick<Marca, 'id' | 'nombre'>

interface Props {
  vehicle: {
    id: string
    id_marca: number | null
    id_tipo: number | null
    model: string
    year: number
    km: number
    currency: 'ARS' | 'USD'
    precio_contado: number | null
    precio_financiado: string | null
    cuotas: number | null
    valor_cuota: number | null
    fuel: string | null
    transmission: string | null
    color: string | null
    motor: string | null
    traccion: string | null
    interior: string | null
    estado: number | null
    description: string | null
    images: string[]
    slug: string
    is_featured: boolean
    is_sold: boolean
    solo_financiado: boolean
  }
  marcas: MarcaOption[]
  tipos: Pick<TipoVehiculo, 'id' | 'nombre'>[]
  tags: { id: number; nombre: string }[]
  initialTagIds: number[]
}

const inputClass =
  'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-100 disabled:opacity-50 disabled:bg-gray-50'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'
const sectionClass = 'bg-white rounded-xl shadow-sm p-6 mb-5'
const sectionTitleClass = 'text-base font-semibold mb-4 pb-3 border-b border-gray-100'

export function VehicleEditForm({ vehicle, marcas: initialMarcas, tipos, tags, initialTagIds }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [marcas, setMarcas] = useState<MarcaOption[]>(initialMarcas)
  const [showNuevaMarcaModal, setShowNuevaMarcaModal] = useState(false)
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(initialTagIds)

  const [form, setForm] = useState({
    id_marca: String(vehicle.id_marca ?? ''),
    model: vehicle.model,
    year: String(vehicle.year),
    id_tipo: String(vehicle.id_tipo ?? ''),
    currency: vehicle.currency,
    solo_financiado: vehicle.solo_financiado,
    precio_contado: String(vehicle.precio_contado ?? ''),
    precio_financiado: vehicle.precio_financiado ?? '',
    cuotas: String(vehicle.cuotas ?? ''),
    valor_cuota: String(vehicle.valor_cuota ?? ''),
    km: String(vehicle.km),
    fuel: vehicle.fuel ?? '',
    transmission: vehicle.transmission ?? '',
    color: vehicle.color ?? '',
    motor: vehicle.motor ?? '',
    traccion: vehicle.traccion ?? '',
    interior: vehicle.interior ?? '',
    estado: String(vehicle.estado ?? ''),
    description: vehicle.description ?? '',
    is_featured: vehicle.is_featured,
    is_sold: vehicle.is_sold,
  })

  // Unified image array — existing Storage URLs and new local Files live together so drag-to-reorder works across both
  const [images, setImages] = useState<SortableImage[]>(() =>
    (vehicle.images ?? []).map((url) => ({ id: url, url, preview: url })),
  )
  // URLs that were removed from the array — will be deleted from Storage on save
  const [removedUrls, setRemovedUrls] = useState<string[]>([])

  // Crop queue state
  const [pendingFiles, setPendingFiles] = useState<File[]>([])
  const [croppingIndex, setCroppingIndex] = useState<number | null>(null)
  const [croppingImageSrc, setCroppingImageSrc] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [uploadStep, setUploadStep] = useState<'idle' | 'compressing' | 'uploading' | 'saving'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview.startsWith('blob:')) URL.revokeObjectURL(img.preview)
      })
      if (croppingImageSrc) URL.revokeObjectURL(croppingImageSrc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function set(key: keyof typeof form, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (fileInputRef.current) fileInputRef.current.value = ''

    const available = 10 - images.length
    if (available <= 0) {
      alert('Máximo 10 fotos permitidas')
      return
    }

    const toQueue = selected.slice(0, available)
    if (toQueue.length === 0) return

    if (selected.length > available) {
      alert(`Máximo 10 fotos permitidas. Solo se agregarán las primeras ${available}.`)
    }

    setPendingFiles(toQueue)
    setCroppingIndex(0)
    setCroppingImageSrc(URL.createObjectURL(toQueue[0]))
  }

  function handleCropComplete(croppedFile: File) {
    if (croppingImageSrc) URL.revokeObjectURL(croppingImageSrc)

    const previewUrl = URL.createObjectURL(croppedFile)
    const newImage: SortableImage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file: croppedFile,
      preview: previewUrl,
    }
    setImages((prev) => [...prev, newImage])

    const nextIndex = (croppingIndex ?? 0) + 1
    if (nextIndex < pendingFiles.length) {
      setCroppingIndex(nextIndex)
      setCroppingImageSrc(URL.createObjectURL(pendingFiles[nextIndex]))
    } else {
      setCroppingIndex(null)
      setCroppingImageSrc(null)
      setPendingFiles([])
    }
  }

  function handleCropCancel() {
    if (croppingImageSrc) URL.revokeObjectURL(croppingImageSrc)

    const nextIndex = (croppingIndex ?? 0) + 1
    if (nextIndex < pendingFiles.length) {
      setCroppingIndex(nextIndex)
      setCroppingImageSrc(URL.createObjectURL(pendingFiles[nextIndex]))
    } else {
      setCroppingIndex(null)
      setCroppingImageSrc(null)
      setPendingFiles([])
    }
  }

  function removeImage(id: string) {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (!img) return prev
      // If it was an existing Storage URL, queue it for deletion on save
      if (img.url) setRemovedUrls((r) => [...r, img.url!])
      // If it was a local blob, free memory
      if (img.preview.startsWith('blob:')) URL.revokeObjectURL(img.preview)
      return prev.filter((i) => i.id !== id)
    })
  }

  function handleNuevaMarca(marca: MarcaOption) {
    setMarcas((prev) => [...prev, marca].sort((a, b) => a.nombre.localeCompare(b.nombre)))
    set('id_marca', String(marca.id))
    setShowNuevaMarcaModal(false)
  }

  // Strips thousands separators (dots in es-AR locale) before parsing to integer.
  // Handles values like "16.000.000" that can appear when pasting formatted strings.
  function parseIntField(val: string): number | null {
    if (!val) return null
    const clean = val.replace(/\./g, '').replace(/,/g, '')
    const n = parseInt(clean, 10)
    return isNaN(n) ? null : n
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.id_marca) return setError('Seleccioná una marca.')
    if (!form.model.trim()) return setError('El modelo es obligatorio.')
    if (!form.year || Number(form.year) < 1990) return setError('El año no es válido.')
    if (!form.km) return setError('El kilometraje es obligatorio.')
    if (!form.solo_financiado && !form.precio_contado) return setError('El precio de contado es obligatorio.')

    setLoading(true)

    try {
      // 1. Comprimir las imágenes nuevas (las que tienen `file`) en el orden actual del grid
      const newImages = images.filter((img) => !!img.file)
      let compressedFiles: File[] = newImages.map((img) => img.file!)
      if (newImages.length > 0) {
        setUploadStep('compressing')
        compressedFiles = await Promise.all(newImages.map((img) => compressImage(img.file!)))
      }

      // 2. Subir imágenes nuevas al Storage
      let uploadedUrls: string[] = []
      if (compressedFiles.length > 0) {
        setUploadStep('uploading')
        const fd = new FormData()
        fd.append('slug', vehicle.slug)
        compressedFiles.forEach((f) => fd.append('images', f))
        uploadedUrls = await uploadImagesAction(fd)
      }

      // 3. Build the final ordered array respecting the drag-and-drop order.
      //    Replace each SortableImage with its resolved URL:
      //    - existing images keep their Storage URL
      //    - new images get the URL returned from the upload (in the same relative order)
      let newUrlCursor = 0
      const finalImages = images.map((img) => {
        if (img.url) return img.url          // already-stored image
        return uploadedUrls[newUrlCursor++]  // newly uploaded image
      })

      // 4. Guardar en la DB
      setUploadStep('saving')

      await updateVehicleAction(vehicle.id, {
        id_marca: Number(form.id_marca),
        id_tipo: form.id_tipo ? Number(form.id_tipo) : null,
        model: form.model.trim(),
        year: Number(form.year),
        km: Number(form.km),
        currency: form.currency,
        solo_financiado: form.solo_financiado,
        precio_contado: form.solo_financiado ? null : parseIntField(form.precio_contado),
        precio_financiado: form.precio_financiado.trim() || null,
        cuotas: form.cuotas ? parseIntField(form.cuotas) : null,
        valor_cuota: form.valor_cuota ? parseIntField(form.valor_cuota) : null,
        fuel: form.fuel || null,
        transmission: form.transmission || null,
        color: form.color.trim() || null,
        motor: form.motor.trim() || null,
        traccion: form.traccion || null,
        interior: form.interior.trim() || null,
        estado: form.estado ? Number(form.estado) : null,
        description: form.description.trim() || null,
        images: finalImages,
        is_featured: form.is_featured,
        is_sold: form.is_sold,
      })

      // 5. Guardar tags
      await setVehicleTagsAction(vehicle.id, selectedTagIds)

      // 6. Eliminar del Storage las imágenes que el usuario quitó (best-effort)
      if (removedUrls.length > 0) {
        await deleteImagesAction(removedUrls)
      }

      router.push('/rm-bariloche-gestion/autos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar los cambios.')
      setLoading(false)
      setUploadStep('idle')
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      // Pass all original image URLs so Storage is fully cleaned.
      // Use the original vehicle.images array (before any edits) combined with removed URLs
      // to ensure nothing is left orphaned in Storage.
      const allOriginalImages = Array.from(
        new Set([...(vehicle.images ?? []), ...removedUrls]),
      )
      await deleteVehicleAction(vehicle.id, allOriginalImages)
      router.push('/rm-bariloche-gestion/autos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el vehículo.')
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  return (
    <>
      {/* Image crop modal */}
      {croppingIndex !== null && croppingImageSrc && (
        <ImageCropper
          key={croppingIndex}
          imageSrc={croppingImageSrc}
          fileName={pendingFiles[croppingIndex]?.name ?? 'imagen.jpg'}
          onComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}

      {/* Nueva marca modal */}
      <NuevaMarcaModal
        isOpen={showNuevaMarcaModal}
        onClose={() => setShowNuevaMarcaModal(false)}
        onCreated={handleNuevaMarca}
      />

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Eliminar vehículo</h3>
            <p className="text-gray-500 text-sm mb-6">
              Esta acción no se puede deshacer. Se eliminarán el vehículo y todas sus fotos
              permanentemente.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-600
                  hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white
                  hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Información básica */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Información básica
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Marca <span style={{ color: '#8B1A1A' }}>*</span>
              </label>
              <select
                value={form.id_marca}
                onChange={(e) => {
                  if (e.target.value === '__nueva__') {
                    setShowNuevaMarcaModal(true)
                  } else {
                    set('id_marca', e.target.value)
                  }
                }}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Seleccioná una marca</option>
                {marcas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
                <option value="__nueva__">+ Agregar nueva marca...</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                Modelo <span style={{ color: '#8B1A1A' }}>*</span>
              </label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => set('model', e.target.value)}
                disabled={loading}
                placeholder="Ej: Hilux"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Año <span style={{ color: '#8B1A1A' }}>*</span>
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => set('year', e.target.value)}
                disabled={loading}
                min={1990}
                max={2030}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Tipo de vehículo</label>
              <select
                value={form.id_tipo}
                onChange={(e) => set('id_tipo', e.target.value)}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Sin tipo</option>
                {tipos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Precio */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Precio
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Moneda</label>
              <select
                value={form.currency}
                onChange={(e) => set('currency', e.target.value as 'ARS' | 'USD')}
                disabled={loading}
                className={inputClass}
              >
                <option value="ARS">ARS — Pesos argentinos</option>
                <option value="USD">USD — Dólares</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Precio de contado {!form.solo_financiado && <span style={{ color: '#8B1A1A' }}>*</span>}
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={form.solo_financiado}
                    onChange={(e) => {
                      set('solo_financiado', e.target.checked)
                      if (e.target.checked) set('precio_contado', '')
                    }}
                    disabled={loading}
                    className="w-3.5 h-3.5 rounded"
                  />
                  <span className="text-xs text-gray-500">Solo financiado</span>
                </label>
              </div>
              <input
                type="number"
                value={form.precio_contado}
                onChange={(e) => set('precio_contado', e.target.value)}
                disabled={loading || form.solo_financiado}
                placeholder={form.currency === 'ARS' ? 'Ej: 15000000' : 'Ej: 12000'}
                min={0}
                step={1}
                className={cn(inputClass, form.solo_financiado && 'opacity-50')}
              />
            </div>

            <div>
              <label className={labelClass}>Precio financiado (texto, opcional)</label>
              <input
                type="text"
                value={form.precio_financiado}
                onChange={(e) => set('precio_financiado', e.target.value)}
                disabled={loading}
                placeholder="Ej: 36 cuotas de $420.000"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Especificaciones */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Especificaciones
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Kilometraje <span style={{ color: '#8B1A1A' }}>*</span>
              </label>
              <input
                type="number"
                value={form.km}
                onChange={(e) => set('km', e.target.value)}
                disabled={loading}
                placeholder="Ej: 45000"
                min={0}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Combustible</label>
              <select
                value={form.fuel}
                onChange={(e) => set('fuel', e.target.value)}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Sin especificar</option>
                <option value="Nafta">Nafta</option>
                <option value="Diesel">Diesel</option>
                <option value="GNC">GNC</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Eléctrico">Eléctrico</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Transmisión</label>
              <select
                value={form.transmission}
                onChange={(e) => set('transmission', e.target.value)}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Sin especificar</option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
                <option value="CVT">CVT</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Color</label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => set('color', e.target.value)}
                disabled={loading}
                placeholder="Ej: Blanco"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Motor (opcional)</label>
              <input
                type="text"
                value={form.motor}
                onChange={(e) => set('motor', e.target.value)}
                disabled={loading}
                placeholder="Ej: 2.8 TDI"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Tracción (opcional)</label>
              <select
                value={form.traccion}
                onChange={(e) => set('traccion', e.target.value)}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Sin especificar</option>
                <option value="Delantera">Delantera</option>
                <option value="Trasera">Trasera</option>
                <option value="Integral">Integral</option>
                <option value="4x4">4x4</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Interior (opcional)</label>
              <input
                type="text"
                value={form.interior}
                onChange={(e) => set('interior', e.target.value)}
                disabled={loading}
                placeholder="Ej: Cuero negro"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Estado del vehículo</label>
              <select
                value={form.estado}
                onChange={(e) => set('estado', e.target.value)}
                disabled={loading}
                className={inputClass}
              >
                <option value="">Sin especificar</option>
                <option value="1">1 — Regular</option>
                <option value="2">2 — Bueno</option>
                <option value="3">3 — Muy bueno</option>
                <option value="4">4 — Excelente</option>
                <option value="5">5 — Impecable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Descripción
          </h2>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            disabled={loading}
            placeholder="Descripción detallada del vehículo, extras, estado general..."
            rows={4}
            className={cn(inputClass, 'resize-none')}
          />
        </div>

        {/* Tags */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Tags
          </h2>
          <TagSelector
            tags={tags}
            selectedIds={selectedTagIds}
            onChange={setSelectedTagIds}
          />
        </div>

        {/* Imágenes */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Imágenes
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            Máximo 10 imágenes. La primera imagen será la principal en el catálogo.
          </p>

          {/* Drag-and-drop sortable grid — existing + new images unified */}
          {images.length > 0 && (
            <div className="mb-4">
              <SortableImageGrid
                images={images}
                onChange={setImages}
                onRemove={removeImage}
                disabled={loading}
              />
            </div>
          )}

          {images.length < 10 && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading || croppingIndex !== null}
                className="hidden"
                id="image-upload-edit"
              />
              <label
                htmlFor="image-upload-edit"
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-lg text-sm font-medium transition-colors',
                  loading || croppingIndex !== null
                    ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
                    : 'cursor-pointer border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                )}
              >
                <Upload className="w-4 h-4" />
                {images.length === 0
                  ? 'Seleccionar imágenes'
                  : `Agregar más (${images.length}/10)`}
              </label>
            </>
          )}

          {images.length > 0 && croppingIndex === null && !loading && (
            <p className="text-xs text-gray-500 mt-3">
              {images.length} {images.length === 1 ? 'foto' : 'fotos'}. Arrastrá para reordenar.
            </p>
          )}

          {croppingIndex !== null && (
            <p className="text-xs mt-3" style={{ color: '#1E2167' }}>
              Recortando imagen {croppingIndex + 1} de {pendingFiles.length}...
            </p>
          )}
          {loading && uploadStep === 'compressing' && (
            <p className="text-sm text-blue-600 mt-3">Comprimiendo imágenes...</p>
          )}
          {loading && uploadStep === 'uploading' && (
            <p className="text-sm text-blue-600 mt-3">Subiendo imágenes...</p>
          )}
          {loading && uploadStep === 'saving' && (
            <p className="text-sm text-blue-600 mt-3">Guardando cambios...</p>
          )}
        </div>

        {/* Opciones */}
        <div className={sectionClass}>
          <h2 className={sectionTitleClass} style={{ color: '#1E2167' }}>
            Opciones
          </h2>
          <div className="flex flex-col gap-4">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => set('is_featured', e.target.checked)}
                disabled={loading}
                className="w-4 h-4 mt-0.5 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Destacado en la landing</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Aparecerá en la sección &quot;Vehículos destacados&quot; de la página principal.
                </p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.is_sold}
                onChange={(e) => set('is_sold', e.target.checked)}
                disabled={loading}
                className="w-4 h-4 mt-0.5 rounded"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Marcar como vendido</span>
                <p className="text-xs text-gray-400 mt-0.5">
                  Se mostrará con badge &quot;Vendido&quot; en el catálogo.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-lg mb-5 text-sm font-medium"
            style={{ backgroundColor: '#FEF2F2', color: '#8B1A1A' }}
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <button
            type="button"
            onClick={() => router.push('/rm-bariloche-gestion/autos')}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-gray-200 text-gray-600
              hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold
              transition-all hover:brightness-90 active:scale-[0.98]
              disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#8B1A1A' }}
          >
            {loading && uploadStep === 'compressing'
              ? 'Comprimiendo...'
              : loading && uploadStep === 'uploading'
              ? 'Subiendo...'
              : loading
              ? 'Guardando...'
              : 'Guardar cambios'}
          </button>
        </div>

        {/* Zona de peligro — eliminar vehículo */}
        <div className="border-t border-red-100 pt-6 pb-8">
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            disabled={loading || deleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              border border-red-200 text-red-600 hover:bg-red-50 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar vehículo
          </button>
        </div>
      </form>
    </>
  )
}

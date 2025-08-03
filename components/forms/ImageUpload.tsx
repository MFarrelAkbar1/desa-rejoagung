'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  className?: string
  required?: boolean
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Gambar",
  className = "",
  required = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif'
    ]
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError(`File harus berupa gambar (JPG, JPEG, PNG, WEBP, GIF). File type: ${file.type}`)
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Ukuran file maksimal 10MB')
      return
    }
    setIsUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'berita')
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Upload failed: ${response.status}`)
      }
      const result = await response.json()
      onChange(result.imageUrl)
    } catch (error) {
      setError(`Gagal upload gambar: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileUpload(file)
    e.target.value = ''
  }

  const handleRemoveImage = () => {
    onChange('')
    setError(null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Current Image Preview */}
      {value && (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder-news.jpg'
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload File Only */}
      {!value && (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if (file) handleFileUpload(file)
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              {isUploading ? 'Mengupload...' : 'Klik untuk upload gambar'}
            </p>
            <p className="text-sm text-gray-500">atau drag & drop file di sini</p>
            <p className="text-xs text-gray-400 mt-2">PNG, JPG, JPEG, WEBP hingga 10MB</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          <div className="text-sm">{error}</div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-xs underline hover:no-underline mt-1"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Success Message */}
      {value && !error && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
          <div className="text-sm">✅ Gambar berhasil diupload dan disimpan sebagai file lokal!</div>
        </div>
      )}

      {/* Loading Indicator */}
      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Mengupload gambar...</span>
          </div>
        </div>
      )}
    </div>
  )
}

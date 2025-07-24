// components/ImageUpload/ImageUpload.tsx
'use client'

import { useState } from 'react'
import { X, Upload, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  folder?: string
  className?: string
  maxSize?: number // in MB
  disabled?: boolean
}

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  folder = 'general',
  className = '',
  maxSize = 5,
  disabled = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string>(currentImage || '')

  // Handle file upload to Cloudinary
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Hanya file gambar (JPG, PNG, WEBP) yang diperbolehkan')
      return
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Ukuran file maksimal ${maxSize}MB`)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setPreviewImage(result.imageUrl)
        onImageChange(result.imageUrl)
      } else {
        const error = await response.json()
        alert(`Gagal mengupload gambar: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Terjadi kesalahan saat mengupload gambar')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewImage('')
    onImageChange('')
  }

  const inputId = `image-upload-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors ${className}`}>
      {previewImage ? (
        <div className="space-y-4">
          <div className="relative inline-block">
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full h-48 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              disabled={disabled}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {uploading ? 'Mengupload gambar baru...' : 'Klik untuk mengganti gambar'}
            </p>
            <label 
              htmlFor={inputId} 
              className="cursor-pointer inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Ganti Gambar
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <label htmlFor={inputId} className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                {uploading ? 'Mengupload...' : 'Upload gambar'}
              </span>
              <span className="text-xs text-gray-500">
                JPG, PNG, WEBP hingga {maxSize}MB
              </span>
            </label>
          </div>
          {uploading && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
              <span className="ml-2 text-sm text-gray-600">Mengupload...</span>
            </div>
          )}
        </div>
      )}
      
      <input
        id={inputId}
        name="file-upload"
        type="file"
        className="sr-only"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading || disabled}
      />
    </div>
  )
}

// Hook untuk validasi gambar
export const useImageValidation = () => {
  const validateImageFile = (file: File, maxSizeMB: number = 5) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Hanya file gambar (JPG, PNG, WEBP) yang diperbolehkan' }
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return { valid: false, error: `Ukuran file maksimal ${maxSizeMB}MB` }
    }

    return { valid: true, error: null }
  }

  const getImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  return { validateImageFile, getImagePreview }
}
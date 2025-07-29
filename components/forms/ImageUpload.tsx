// components/forms/ImageUpload.tsx - FIXED untuk menggunakan API endpoint seperti kuliner/produk
'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react'

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
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    // Validate file - FIXED untuk support JPG dan JPEG
    const allowedTypes = [
      'image/jpeg', 
      'image/jpg',   // JPG support
      'image/png', 
      'image/webp',
      'image/gif'
    ]
    
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setError(`File harus berupa gambar (JPG, JPEG, PNG, WEBP, GIF). File type: ${file.type}`)
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      setError('Ukuran file maksimal 10MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'berita') // Folder untuk berita

      console.log('🔄 Uploading via API...', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      })

      // Upload menggunakan API endpoint yang sama seperti kuliner/produk
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('❌ Upload API error:', errorData)
        throw new Error(errorData.error || `Upload failed: ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Upload successful:', result.imageUrl)
      
      onChange(result.imageUrl)
      setMode('upload') // Reset to upload mode after success
     
    } catch (error) {
      console.error('❌ Upload error:', error)
      setError(`Gagal upload gambar: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('📁 File selected:', {
        name: file.name,
        type: file.type,
        size: file.size
      })
      handleFileUpload(file)
    }
    // Reset input value so same file can be selected again
    e.target.value = ''
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
      setMode('upload')
      setError(null)
    }
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

      {/* Mode Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            mode === 'upload'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📤 Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
            mode === 'url'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          🔗 URL Gambar
        </button>
      </div>

      {/* Current Image Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            onError={(e) => {
              console.error('❌ Image load error:', value)
              e.currentTarget.style.display = 'none'
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div className="space-y-3">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors cursor-pointer"
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="text-sm text-gray-600">Mengupload ke Cloudinary...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">
                  Klik untuk upload atau drag & drop file
                </p>
                <p className="text-xs text-gray-400">
                  JPG, JPEG, PNG, WEBP, GIF (max 10MB)
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.webp,.gif"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Masukkan URL gambar dari internet (JPG, PNG, WEBP, GIF)
          </p>
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
          <div className="text-sm">✅ Gambar berhasil diupload!</div>
        </div>
      )}
    </div>
  )
}
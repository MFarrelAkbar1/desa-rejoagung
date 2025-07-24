// components/forms/ImageUpload.tsx - FALLBACK VERSION (jika Cloudinary belum ready)
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

  // Check if Cloudinary is configured
  const isCloudinaryConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

  const handleFileUpload = async (file: File) => {
    if (!isCloudinaryConfigured) {
      setError('Cloudinary belum dikonfigurasi. Gunakan mode URL atau setup Cloudinary.')
      return
    }

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran file maksimal 5MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'
      )

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onChange(data.secure_url)
      
    } catch (error) {
      console.error('Upload error:', error)
      setError('Gagal upload gambar. Coba mode URL sebagai alternatif.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      // Basic URL validation
      try {
        new URL(urlInput)
        onChange(urlInput.trim())
        setUrlInput('')
        setError(null)
      } catch {
        setError('URL tidak valid')
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setUrlInput('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setError(null)
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* Mode Toggle */}
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              mode === 'upload' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            📁 Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              mode === 'url' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔗 URL
          </button>
        </div>
      </div>
      
      {/* Upload Area */}
      <div className="space-y-4">
        {!value ? (
          <div>
            {mode === 'upload' ? (
              // File Upload Mode
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  required={required && !value}
                />
                
                <div className="space-y-2">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                  <div className="text-gray-600">
                    {!isCloudinaryConfigured ? (
                      <div className="space-y-2">
                        <p className="text-yellow-600 font-medium">
                          ⚠️ Cloudinary belum dikonfigurasi
                        </p>
                        <p className="text-sm text-gray-500">
                          Gunakan mode URL atau setup Cloudinary
                        </p>
                        <button
                          type="button"
                          onClick={() => setMode('url')}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                        >
                          → Gunakan Mode URL
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="text-emerald-600 hover:text-emerald-700 font-medium disabled:opacity-50"
                        >
                          {isUploading ? 'Mengupload...' : 'Pilih gambar'}
                        </button>
                        <p className="text-sm text-gray-500 mt-1">
                          atau drag & drop file di sini
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, GIF hingga 5MB
                  </p>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full animate-pulse w-1/2"></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Mengupload gambar...</p>
                  </div>
                )}
              </div>
            ) : (
              // URL Input Mode
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Link className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600 font-medium mt-2">
                      Masukkan URL Gambar
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                      onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                    />
                    <button
                      type="button"
                      onClick={handleUrlSubmit}
                      disabled={!urlInput.trim()}
                      className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                    >
                      Tambah
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Pastikan URL gambar dapat diakses secara publik
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-lg border"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwNSAxNTAgMjEwIDE0NSAyMTAgMTQwQzIxMCAxMzUgMjA1IDEzMCAyMDAgMTMwQzE5NSAxMzAgMTkwIDEzNSAxOTAgMTQwQzE5MCAxNDUgMTk1IDE1MCAyMDAgMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTcwIDE4MEwyMzAgMTgwTDIyMCAxNjBMMjEwIDE3MEwxOTAgMTUwTDE3MCAxODBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkdhbWJhciB0aWRhayBkYXBhdCBkaW11YXQ8L3RleHQ+Cjwvc3ZnPgo='
                setError('Gambar tidak dapat dimuat')
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Change button */}
            <div className="absolute bottom-2 left-2">
              <button
                type="button"
                onClick={() => mode === 'upload' ? fileInputRef.current?.click() : setMode('url')}
                disabled={isUploading}
                className="bg-white bg-opacity-90 text-gray-700 px-3 py-1 rounded text-sm hover:bg-opacity-100 transition-all disabled:opacity-50"
              >
                <Upload className="w-4 h-4 inline mr-1" />
                Ganti
              </button>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            <div className="text-sm">{error}</div>
            {error.includes('Cloudinary') && (
              <button
                onClick={() => setMode('url')}
                className="text-xs underline hover:no-underline mt-1"
              >
                Gunakan mode URL sebagai alternatif
              </button>
            )}
          </div>
        )}

        {/* Info */}
        {!isCloudinaryConfigured && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
            <div className="text-sm">
              <strong>💡 Tips:</strong> Untuk upload file langsung, setup Cloudinary di file .env.local
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
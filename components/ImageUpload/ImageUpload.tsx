// components/forms/ImageUpload.tsx - Dengan sistem notifikasi yang elegan

'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Link } from 'lucide-react'
import { useNotifications } from '../notifications/NotificationSystem'

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
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Gunakan sistem notifikasi
  const { showSuccess, showFileError, showError } = useNotifications()

  const handleFileUpload = async (file: File) => {
    // Validate file - Support berbagai format
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png', 
      'image/webp',
      'image/gif'
    ]

    if (!allowedTypes.includes(file.type.toLowerCase())) {
      showFileError('type', 'File yang dipilih bukan gambar yang valid.')
      return
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      showFileError('size', `Ukuran file ${(file.size / 1024 / 1024).toFixed(1)}MB melebihi batas maksimal.`)
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Upload gagal')
      }

      const data = await response.json()
      
      if (data.url) {
        onChange(data.url)
        showSuccess('Gambar berhasil diupload!', 'Upload Berhasil')
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        throw new Error('URL gambar tidak ditemukan dalam response')
      }

    } catch (error) {
      console.error('Upload error:', error)
      showFileError('network', error instanceof Error ? error.message : 'Terjadi kesalahan saat upload.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      showError('URL gambar tidak boleh kosong', 'Input Tidak Valid')
      return
    }

    // Validate URL format
    try {
      const url = new URL(urlInput)
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('URL harus menggunakan protokol HTTP atau HTTPS')
      }
    } catch {
      showError('Format URL tidak valid', 'URL Tidak Valid')
      return
    }

    // Validate image extension
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const hasValidExtension = imageExtensions.some(ext => 
      urlInput.toLowerCase().includes(ext)
    )

    if (!hasValidExtension) {
      showError('URL harus mengarah ke file gambar (JPG, PNG, WEBP, GIF)', 'URL Tidak Valid')
      return
    }

    setIsUploading(true)

    try {
      // Test if image can be loaded
      const img = new Image()
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = () => reject(new Error('Gambar tidak dapat dimuat dari URL tersebut'))
        img.src = urlInput
      })

      onChange(urlInput)
      showSuccess('Gambar dari URL berhasil ditambahkan!', 'URL Berhasil')
      setUrlInput('')
      setMode('upload')

    } catch (error) {
      showError(
        error instanceof Error ? error.message : 'Gagal memuat gambar dari URL',
        'URL Gagal'
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeImage = () => {
    onChange('')
    showSuccess('Gambar berhasil dihapus', 'Gambar Dihapus')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
          <Upload className="w-4 h-4 inline mr-2" />
          Upload File
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
          <Link className="w-4 h-4 inline mr-2" />
          Dari URL
        </button>
      </div>

      {/* Current Image Preview */}
      {value && (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
            disabled={isUploading}
          >
            <X className="w-4 h-4" />
          </button>
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white text-sm font-medium flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Memproses...
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Mode */}
      {mode === 'upload' && !value && (
        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors ${
            isUploading 
              ? 'border-emerald-500 bg-emerald-50' 
              : 'hover:border-emerald-500 hover:bg-emerald-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              {isUploading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
              ) : (
                <ImageIcon className="w-12 h-12 text-gray-400" />
              )}
            </div>
            
            <div>
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-emerald-600 hover:text-emerald-700 font-medium">
                  {isUploading ? 'Mengupload...' : 'Klik untuk upload'}
                </span>
                <span className="text-gray-500"> atau drag & drop</span>
              </label>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />
            </div>
            
            <p className="text-xs text-gray-500">
              PNG, JPG, WEBP, GIF hingga 5MB
            </p>
          </div>
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && !value && (
        <div className="space-y-3">
          <div className="flex space-x-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isUploading}
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              disabled={isUploading || !urlInput.trim()}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Link className="w-4 h-4" />
                  <span>Tambah</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Masukkan URL gambar dari internet (JPG, PNG, WEBP, GIF)
          </p>
        </div>
      )}
    </div>
  )
}
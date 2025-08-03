// app/produk-kuliner/produk/components/EditProductModal.tsx - FIXED VERSION

'use client'

import { useState, useEffect } from 'react'
import { X, Upload, Image as ImageIcon, Loader2, Edit } from 'lucide-react'
import { useNotifications } from '@/components/notifications/NotificationSystem'

interface ProductItem {
  id: string
  name: string
  description: string
  price?: string
  image_url?: string
  category: string
  is_featured: boolean
  contact?: string
  location?: string
  created_at: string
  updated_at?: string
}

interface EditProductModalProps {
  item: ProductItem
  onClose: () => void
  onSuccess: () => void
}

// Helper function to ensure all form fields have proper default values
const initializeFormData = (item: ProductItem) => {
  return {
    ...item,
    name: item.name || '',
    description: item.description || '',
    price: item.price || '',
    image_url: item.image_url || '',
    contact: item.contact || '',
    location: item.location || '',
    category: item.category || 'kerajinan',
    is_featured: Boolean(item.is_featured) // Ensure boolean
  }
}

export default function EditProductModal({ item, onClose, onSuccess }: EditProductModalProps) {
  const { showSuccess, showError, showFileError, showWarning } = useNotifications()
  
  // ✅ FIX: Initialize formData with proper default values to prevent null/undefined
  const [formData, setFormData] = useState<ProductItem>(() => initializeFormData(item))
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  // ✅ FIX: Update formData when item prop changes
  useEffect(() => {
    setFormData(initializeFormData(item))
  }, [item])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      showFileError('type', 'Gunakan format JPG, PNG, atau WEBP untuk gambar produk')
      e.target.value = '' // Reset input
      return
    }

    // File size validation with detailed feedback
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1)
      showFileError('size', `File Anda ${fileSizeMB}MB, maksimal 5MB. Kompres gambar untuk hasil optimal.`)
      e.target.value = '' // Reset input
      return
    }

    setUploadingImage(true)

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('folder', 'produk')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const result = await response.json()
        setFormData(prev => ({ ...prev, image_url: result.imageUrl }))
        showSuccess('Foto produk berhasil diperbarui!')
      } else {
        const error = await response.json()
        
        if (response.status === 413) {
          showFileError('size', 'File terlalu besar untuk server. Maksimal 5MB.')
        } else if (response.status === 400) {
          showFileError('type', error.error || 'Format file tidak didukung')
        } else {
          showError(`Upload gagal: ${error.error || 'Server error'}`, 'Upload Error')
        }
      }
    } catch (error) {
      console.error('Upload error:', error)
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        showFileError('network', 'Periksa koneksi internet dan coba lagi')
      } else {
        showError('Terjadi kesalahan saat mengupload. Coba refresh halaman.', 'Upload Error')
      }
    } finally {
      setUploadingImage(false)
      e.target.value = '' // Reset input
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }))
    showSuccess('Foto berhasil dihapus')
  }

  // ✅ FIX: Improved handleInputChange with proper type checking and null safety
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      // ✅ FIX: Ensure value is never null or undefined
      const safeValue = value ?? ''
      setFormData(prev => ({
        ...prev,
        [name]: safeValue
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!formData.name?.trim()) {
      showError('Nama produk harus diisi', 'Validasi Form')
      return
    }

    if (!formData.description?.trim()) {
      showError('Deskripsi produk harus diisi', 'Validasi Form')
      return
    }

    if (formData.description.length < 10) {
      showWarning('Deskripsi terlalu pendek. Minimal 10 karakter untuk menarik pembeli.')
      return
    }

    setIsLoading(true)
    try {
      // ✅ FIX: Clean form data before submission
      const submitData = {
        ...formData,
        // Ensure all string fields are properly formatted
        name: formData.name?.trim() || '',
        description: formData.description?.trim() || '',
        contact: formData.contact?.trim() || '',
        location: formData.location?.trim() || '',
        // Handle price formatting
        price: formData.price?.trim() 
          ? (formData.price.startsWith('Rp') ? formData.price : `Rp. ${formData.price}`)
          : '',
        // Ensure image_url is string, not null
        image_url: formData.image_url || '',
        // Ensure boolean
        is_featured: Boolean(formData.is_featured)
      }

      const response = await fetch(`/api/products/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        showSuccess('Produk unggulan berhasil diperbarui!', 'Berhasil')
        onSuccess()
        onClose()
      } else {
        const error = await response.json()
        
        if (response.status === 401) {
          showError('Sesi Anda telah berakhir. Silakan login kembali.', 'Auth Error')
        } else if (response.status === 400) {
          showError(error.error || 'Data yang dimasukkan tidak valid', 'Validasi Error')
        } else {
          showError('Gagal memperbarui produk. Coba lagi.', 'Server Error')
        }
      }
    } catch (error) {
      console.error('Submit error:', error)
      showError('Terjadi kesalahan jaringan. Periksa koneksi internet Anda.', 'Network Error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Edit Produk Unggulan</h2>
              <p className="text-gray-600 text-sm">Perbarui informasi produk unggulan desa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''} // ✅ FIX: Ensure never null
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Contoh: Kerajinan Bambu Cantik"
                style={{ color: '#111827' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category || 'kerajinan'} // ✅ FIX: Ensure default value
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 bg-white"
                style={{ color: '#111827' }}
                required
              >
                <option value="kerajinan" style={{ color: '#111827' }}>🎨 Kerajinan</option>
                <option value="makanan" style={{ color: '#111827' }}>🍘 Makanan Kering</option>
                <option value="pertanian" style={{ color: '#111827' }}>🌾 Hasil Pertanian</option>
                <option value="olahan" style={{ color: '#111827' }}>🥫 Produk Olahan</option>
                <option value="lainnya" style={{ color: '#111827' }}>📋 Lainnya</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Produk *
            </label>
            <textarea
              name="description"
              value={formData.description || ''} // ✅ FIX: Ensure never null
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Jelaskan keunggulan dan detail produk..."
              style={{ color: '#111827' }}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimal 10 karakter untuk deskripsi yang menarik
            </p>
          </div>

          {/* Price and Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <input
                type="text"
                name="price"
                value={formData.price || ''} // ✅ FIX: Ensure never null
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Contoh: 50000 atau Rp. 50.000"
                style={{ color: '#111827' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact || ''} // ✅ FIX: Ensure never null
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="WhatsApp: 08123456789"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi/Alamat
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ''} // ✅ FIX: Ensure never null
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Contoh: Dusun Krajan, RT 01/RW 02"
              style={{ color: '#111827' }}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Produk
            </label>
            
            {formData.image_url ? (
              <div className="relative">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-gray-600">Pilih foto produk</p>
                  <p className="text-xs text-gray-500">JPG, PNG, WEBP hingga 5MB</p>
                </div>
              </div>
            )}

            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              disabled={uploadingImage}
            />
            
            {uploadingImage && (
              <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengupload foto...
              </div>
            )}
          </div>

          {/* Featured Toggle */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={Boolean(formData.is_featured)} // ✅ FIX: Ensure boolean
                onChange={handleInputChange}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Produk Unggulan (Featured)
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || uploadingImage}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Update Produk
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
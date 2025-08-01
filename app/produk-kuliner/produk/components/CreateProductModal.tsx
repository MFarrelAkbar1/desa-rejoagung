// app/produk-kuliner/produk/components/CreateProductModal.tsx - OPTIMIZED VERSION

'use client'

import { useState } from 'react'
import { X, Upload, Image as ImageIcon, Loader2, Package } from 'lucide-react'
import { useNotifications } from '@/components/notifications/NotificationSystem'

interface ProductItem {
  id?: string
  name: string
  description: string
  price?: string
  image_url?: string
  category: string
  is_featured: boolean
  contact?: string
  location?: string
  created_at?: string
  updated_at?: string
}

interface CreateProductModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function CreateProductModal({ onClose, onSuccess }: CreateProductModalProps) {
  // Use the elegant notification system
  const { showSuccess, showError, showFileError, showWarning } = useNotifications()

  const [formData, setFormData] = useState<ProductItem>({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: 'kerajinan',
    is_featured: false,
    contact: '',
    location: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Elegant image upload with proper error handling
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

    // Additional check for extremely large files
    if (file.size > 10 * 1024 * 1024) { // 10MB
      showError('File terlalu besar dan dapat menyebabkan error sistem. Gunakan gambar maksimal 5MB.', 'File Terlalu Besar')
      e.target.value = '' // Reset input
      return
    }

    setUploadingImage(true)
    
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('folder', 'produk') // Folder for products

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const result = await response.json()
        setFormData(prev => ({ ...prev, image_url: result.imageUrl }))
        showSuccess('Foto produk berhasil diupload!')
      } else {
        const error = await response.json()
        
        // Handle specific API errors
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
      
      // Handle network errors elegantly
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validation
    if (!formData.name.trim()) {
      showError('Nama produk harus diisi', 'Validasi Form')
      return
    }
    
    if (!formData.description.trim()) {
      showError('Deskripsi produk harus diisi', 'Validasi Form')
      return
    }

    if (formData.description.length < 10) {
      showWarning('Deskripsi terlalu pendek. Minimal 10 karakter untuk menarik pembeli.')
      return
    }

    setIsLoading(true)

    try {
      const submitData = {
        ...formData,
        price: formData.price ? 
          (formData.price.startsWith('Rp') ? formData.price : `Rp. ${formData.price}`) 
          : undefined
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}` // Add auth
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        showSuccess('Produk unggulan berhasil ditambahkan!', 'Berhasil')
        onSuccess()
        onClose()
      } else {
        const error = await response.json()
        
        // Handle specific API errors
        if (response.status === 401) {
          showError('Sesi Anda telah berakhir. Silakan login kembali.', 'Session Expired')
          localStorage.removeItem('admin_token')
          setTimeout(() => window.location.href = '/admin/login', 2000)
        } else if (response.status === 400) {
          showError(`Validasi gagal: ${error.error}`, 'Data Invalid')
        } else {
          showError(`Gagal menyimpan produk: ${error.error || 'Server error'}`, 'Save Error')
        }
      }
    } catch (error) {
      console.error('Submit error:', error)
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        showError('Koneksi terputus. Periksa internet dan coba lagi.', 'Network Error')
      } else {
        showError('Terjadi kesalahan sistem. Coba refresh halaman.', 'System Error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Tambah Produk Unggulan</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Contoh: Gula Merah Premium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="kerajinan">🎨 Kerajinan</option>
                <option value="makanan">🍘 Makanan Kering</option>
                <option value="pertanian">🌾 Hasil Pertanian</option>
                <option value="olahan">🥫 Produk Olahan</option>
                <option value="lainnya">📋 Lainnya</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Deskripsi Produk *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Jelaskan keunggulan dan keunikan produk Anda..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 karakter (minimal 10)
            </p>
          </div>

          {/* Image Upload - ENHANCED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Produk
            </label>
            
            {formData.image_url ? (
              <div className="relative inline-block">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingImage}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadingImage ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-2" />
                      <p className="text-sm text-gray-600">Mengupload foto...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Klik untuk upload foto produk
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG, WEBP • Max 5MB • Foto berkualitas tinggi untuk daya tarik maksimal
                      </p>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga
              </label>
              <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-700 font-semibold">
                Rp.
              </span>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="25000"
              />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Penjual
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Dusun/alamat lengkap"
              />
            </div>
          </div>

          {/* Contact & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak Penjual
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-3 border text-gray-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="08123456789"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Produk Unggulan (Featured)
                </label>
              </div>
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
                  Simpan Produk
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
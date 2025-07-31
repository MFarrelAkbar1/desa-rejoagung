// app/produk-kuliner/produk/components/CreateProductModal.tsx - FIXED VERSION
'use client'

import { useState } from 'react'
import { X, Upload, Star } from 'lucide-react'
import { ApiHelper } from '@/lib/api-helper'

interface CreateProductModalProps {
  onClose: () => void
  onSuccess: () => void
}

// Utility function untuk format harga
const formatPriceInput = (price: string): string => {
  if (!price) return ''
 
  // Jika sudah ada "Rp" di awal, return as is
  if (price.toLowerCase().startsWith('rp')) {
    return price
  }
 
  // Jika hanya angka atau angka dengan titik/koma, tambahkan Rp.
  const cleanPrice = price.trim()
  if (/^\d+[.,]?\d*$/.test(cleanPrice.replace(/\./g, ''))) {
    return `Rp. ${cleanPrice}`
  }
 
  // Jika format lain, tambahkan Rp. di depan
  return `Rp. ${cleanPrice}`
}

export default function CreateProductModal({ onClose, onSuccess }: CreateProductModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'kerajinan',
    description: '',
    price: '',
    location: '',
    image_url: '',
    is_featured: false,
    contact: ''
  })

  const categories = [
    { value: 'kerajinan', label: 'Kerajinan', emoji: '🎨' },
    { value: 'makanan', label: 'Makanan Kering', emoji: '🍘' },
    { value: 'pertanian', label: 'Hasil Pertanian', emoji: '🌾' },
    { value: 'olahan', label: 'Produk Olahan', emoji: '🥫' },
    { value: 'lainnya', label: 'Lainnya', emoji: '📋' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
   
    if (name === 'price') {
      // Format harga otomatis
      setFormData(prev => ({ ...prev, [name]: formatPriceInput(value) }))
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Handle image upload using same API as kuliner
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Hanya file gambar (JPG, PNG, WEBP) yang diperbolehkan')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB')
      return
    }

    setUploadingImage(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('folder', 'produk') // Folder untuk produk

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      })

      if (response.ok) {
        const result = await response.json()
        setFormData(prev => ({ ...prev, image_url: result.imageUrl }))
      } else {
        const error = await response.json()
        alert(`Gagal mengupload gambar: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Terjadi kesalahan saat mengupload gambar')
    } finally {
      setUploadingImage(false)
      // Reset input
      e.target.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
   
    try {
      // ✅ MENGGUNAKAN API HELPER DENGAN AUTENTIKASI
      const result = await ApiHelper.createProduct(formData)
      
      if (result.success) {
        onSuccess()
        // Auto refresh page setelah 500ms untuk smooth UX
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    } catch (error) {
      console.error('Error creating product:', error)
      
      // Handle different error types
      if (error instanceof Error) {
        if (error.message.includes('Token tidak valid') || 
            error.message.includes('Akses ditolak')) {
          alert('Sesi Anda telah berakhir. Silakan login kembali.')
          // Redirect to login
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
        } else {
          alert(`Gagal menambahkan produk: ${error.message}`)
        }
      } else {
        alert('Terjadi kesalahan saat menyimpan produk')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Tambah Produk Unggulan</h2>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Produk
            </label>
           
            {formData.image_url ? (
              <div className="relative">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <label htmlFor="image-upload-product" className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium">
                    Klik untuk upload gambar
                  </label>
                  <span> atau drag & drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP hingga 5MB</p>
                <input
                  id="image-upload-product"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </div>
            )}
            
            {uploadingImage && (
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Mengupload gambar...
              </div>
            )}
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Contoh: Kerajinan Bambu Anyaman"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
              placeholder="Jelaskan produk Anda secara detail..."
            />
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga (opsional)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Contoh: 50000 atau Rp. 50.000"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi (opsional)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Contoh: Dusun Krajan, RT 01"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kontak (opsional)
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Contoh: 0812-3456-7890 atau WhatsApp: 081234567890"
            />
          </div>

          {/* Featured Toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <div className="flex items-center gap-2">
                <Star className={`w-5 h-5 ${formData.is_featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                <span className="text-sm font-medium text-gray-700">
                  Jadikan produk unggulan
                </span>
              </div>
            </label>
            <p className="text-xs text-gray-500 ml-8 mt-1">
              Produk unggulan akan ditampilkan di halaman utama
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || uploadingImage}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Menyimpan...
                </>
              ) : uploadingImage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Upload gambar...
                </>
              ) : (
                'Tambah Produk'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
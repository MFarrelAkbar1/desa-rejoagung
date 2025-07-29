// app/produk-kuliner/produk/components/EditProductModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { X, Upload, Star } from 'lucide-react'
import { ProductItem } from '../types'

interface EditProductModalProps {
  item: ProductItem
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

export default function EditProductModal({ item, onClose, onSuccess }: EditProductModalProps) {
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

  // Load existing data
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'kerajinan',
        description: item.description || '',
        price: item.price || '',
        location: item.location || '',
        image_url: item.image_url || '',
        is_featured: item.is_featured || false,
        contact: item.contact || ''
      })
    }
  }, [item])

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

    // Validate file type (same as kuliner)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('Hanya file gambar (JPG, PNG, WEBP) yang diperbolehkan')
      return
    }

    // Validate file size (max 5MB, same as kuliner)
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
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: item.id })
      })
      
      if (response.ok) {
        onSuccess()
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        const errorData = await response.json()
        alert(`Gagal mengupdate produk: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan saat mengupdate produk')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Produk</h2>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 mt-1">Mengubah: {item.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload Section - Same as kuliner */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Produk
            </label>
            
            {formData.image_url ? (
              <div className="relative">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {uploadingImage ? (
                  <div className="py-4">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-600">Mengupload ke Cloudinary...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload gambar produk</p>
                    <p className="text-xs text-gray-500 mb-3">JPG, PNG, atau WEBP (Maks. 5MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      disabled={uploadingImage}
                    />
                  </>
                )}
              </div>
            )}
            
            {/* URL Input Alternative - Same as kuliner */}
            <div className="mt-2">
              <label className="block text-xs text-gray-600 mb-1">Atau masukkan URL gambar:</label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Produk */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-black">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Kerajinan Anyaman Bambu"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-black">
                Kategori *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Harga */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 50000 atau Rp. 50.000"
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Produksi
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Dusun Krajan"
              />
            </div>

            {/* Kontak */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: 0812-3456-7890"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Produk *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              placeholder="Jelaskan detail produk, bahan, keunggulan, dll..."
            />
          </div>

          {/* Featured Toggle */}
          <div className="mt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  Jadikan sebagai produk unggulan
                </span>
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              Produk unggulan akan ditampilkan lebih menonjol
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading || uploadingImage}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
                  'Update Produk'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
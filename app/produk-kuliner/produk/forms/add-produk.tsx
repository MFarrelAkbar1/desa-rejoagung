// app/produk-kuliner/produk/forms/add-product-form.tsx
'use client'

import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload/ImageUpload'

interface AddProductFormProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AddProductForm({ onClose, onSuccess }: AddProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    is_featured: false,
    contact: '',
    location: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        const error = await response.json()
        alert(`Gagal menambahkan produk: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Terjadi kesalahan saat menambahkan produk')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Tambah Produk Unggulan</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Produk *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
              placeholder="Masukkan nama produk"
              style={{ color: '#111827' }}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Produk *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
              placeholder="Deskripsikan produk secara detail..."
              style={{ color: '#111827' }}
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Produk
            </label>
            <ImageUpload
              currentImage={formData.image_url}
              onImageChange={handleImageChange}
              folder="products"
              maxSize={5}
              disabled={isLoading}
            />
          </div>

          {/* Row: Harga & Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                placeholder="Contoh: Rp 50.000 / kg"
                style={{ color: '#111827' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                style={{ color: '#111827' }}
              >
                <option value="">Pilih Kategori</option>
                <option value="pertanian">Pertanian</option>
                <option value="kerajinan">Kerajinan</option>
                <option value="makanan">Makanan Olahan</option>
                <option value="minuman">Minuman</option>
                <option value="tekstil">Tekstil</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          {/* Row: Kontak & Lokasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                placeholder="Nomor WhatsApp atau telepon"
                style={{ color: '#111827' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                placeholder="Alamat atau lokasi produksi"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Produk Unggulan */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
              Tandai sebagai produk unggulan
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
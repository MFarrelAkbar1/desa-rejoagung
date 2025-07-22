// app/produk-kuliner/kuliner/forms/edit-kuliner.tsx

'use client'

import { useState, useEffect } from 'react'
import { X, Edit } from 'lucide-react'
import { CulinaryItem } from '@/types/database'

interface EditKulinerFormProps {
  item: CulinaryItem
  onClose: () => void
  onSuccess: () => void
}

export default function EditKulinerForm({ item, onClose, onSuccess }: EditKulinerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'makanan' as 'makanan' | 'minuman' | 'camilan',
    description: '',
    ingredients: '',
    price: '',
    location: '',
    image_url: '',
    rating: 5,
    is_signature: false,
    cooking_time: '',
    serving_size: '',
    benefits: '',
    contact: ''
  })

  // Initialize form with existing data
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'makanan',
        description: item.description || '',
        ingredients: Array.isArray(item.ingredients) ? item.ingredients.join(', ') : '',
        price: item.price || '',
        location: item.location || '',
        image_url: item.image_url || '',
        rating: item.rating || 5,
        is_signature: item.is_signature || false,
        cooking_time: item.cooking_time || '',
        serving_size: item.serving_size || '',
        benefits: Array.isArray(item.benefits) ? item.benefits.join(', ') : '',
        contact: item.contact || ''
      })
    }
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Konversi array fields
      const ingredientsArray = formData.ingredients 
        ? formData.ingredients.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : []
      
      const benefitsArray = formData.benefits 
        ? formData.benefits.split(',').map(item => item.trim()).filter(item => item.length > 0)
        : []

      const payload = {
        ...formData,
        ingredients: ingredientsArray,
        benefits: benefitsArray
      }

      const response = await fetch(`/api/culinary/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        onSuccess()
      } else {
        const error = await response.json()
        alert(`Gagal mengupdate menu: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error updating culinary item:', error)
      alert('Terjadi kesalahan saat mengupdate menu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Edit Menu Kuliner</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nama Menu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Menu *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Masukkan nama menu kuliner"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori *
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="camilan">Camilan</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Deskripsikan menu kuliner ini..."
            />
          </div>

          {/* Bahan-bahan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bahan-bahan (pisahkan dengan koma)
            </label>
            <textarea
              name="ingredients"
              rows={2}
              value={formData.ingredients}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: Ayam, Bumbu kari, Santan, Daun jeruk"
            />
          </div>

          {/* Row 1: Harga & Rating */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Contoh: Rp 15.000 - 20.000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi Penjualan
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: Warung Bu Sari - Jl. Raya Rejoagung"
            />
          </div>

          {/* URL Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Gambar
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Row 2: Waktu Masak & Porsi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Masak
              </label>
              <input
                type="text"
                name="cooking_time"
                value={formData.cooking_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Contoh: 30 menit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ukuran Porsi
              </label>
              <input
                type="text"
                name="serving_size"
                value={formData.serving_size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Contoh: 1 porsi"
              />
            </div>
          </div>

          {/* Manfaat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manfaat (pisahkan dengan koma)
            </label>
            <textarea
              name="benefits"
              rows={2}
              value={formData.benefits}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: Kaya protein, Menambah stamina, Bergizi tinggi"
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Contoh: 0812-3456-7890"
            />
          </div>

          {/* Menu Signature */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_signature"
              name="is_signature"
              checked={formData.is_signature}
              onChange={handleChange}
              className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
            />
            <label htmlFor="is_signature" className="ml-2 text-sm font-medium text-gray-700">
              Jadikan Menu Signature
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isLoading ? 'Menyimpan...' : 'Update Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
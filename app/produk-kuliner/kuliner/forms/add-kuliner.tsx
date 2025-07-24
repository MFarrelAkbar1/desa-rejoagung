// app/produk-kuliner/kuliner/forms/add-culinary-form.tsx
'use client'

import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload/ImageUpload'

interface AddCulinaryFormProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AddCulinaryForm({ onClose, onSuccess }: AddCulinaryFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [benefits, setBenefits] = useState<string[]>([''])
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    location: '',
    image_url: '',
    rating: 0,
    is_signature: false,
    cooking_time: '',
    serving_size: '',
    contact: ''
  })

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

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }))
  }

  // Handle ingredients array
  const addIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  // Handle benefits array
  const addBenefit = () => {
    setBenefits([...benefits, ''])
  }

  const removeBenefit = (index: number) => {
    if (benefits.length > 1) {
      setBenefits(benefits.filter((_, i) => i !== index))
    }
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits]
    newBenefits[index] = value
    setBenefits(newBenefits)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Filter empty ingredients and benefits
      const filteredIngredients = ingredients.filter(item => item.trim() !== '')
      const filteredBenefits = benefits.filter(item => item.trim() !== '')

      const submitData = {
        ...formData,
        ingredients: filteredIngredients,
        benefits: filteredBenefits
      }

      const response = await fetch('/api/culinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        const error = await response.json()
        alert(`Gagal menambahkan menu kuliner: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error adding culinary:', error)
      alert('Terjadi kesalahan saat menambahkan menu kuliner')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b rounded-t-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Tambah Menu Kuliner</h2>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
              placeholder="Masukkan nama menu kuliner"
              style={{ color: '#111827' }}
            />
          </div>

          {/* Row: Kategori & Harga */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                style={{ color: '#111827' }}
              >
                <option value="">Pilih Kategori</option>
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="camilan">Camilan</option>
              </select>
            </div>

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
                placeholder="Contoh: Rp 25.000"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Menu *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
              placeholder="Deskripsikan menu kuliner..."
              style={{ color: '#111827' }}
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Menu
            </label>
            <ImageUpload
              currentImage={formData.image_url}
              onImageChange={handleImageChange}
              folder="culinary"
              maxSize={5}
              disabled={isLoading}
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bahan-bahan
            </label>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                    placeholder={`Bahan ${index + 1}`}
                    style={{ color: '#111827' }}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center text-emerald-600 hover:text-emerald-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Bahan
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manfaat
            </label>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                    placeholder={`Manfaat ${index + 1}`}
                    style={{ color: '#111827' }}
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center text-emerald-600 hover:text-emerald-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Manfaat
              </button>
            </div>
          </div>

          {/* Row: Waktu Masak & Porsi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Memasak
              </label>
              <input
                type="text"
                name="cooking_time"
                value={formData.cooking_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                placeholder="Contoh: 30 menit"
                style={{ color: '#111827' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Porsi
              </label>
              <input
                type="text"
                name="serving_size"
                value={formData.serving_size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                placeholder="Contoh: 4-6 orang"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Row: Rating, Kontak & Lokasi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
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
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500"
                placeholder="WhatsApp/Telepon"
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
                placeholder="Alamat warung/toko"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Menu Signature */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_signature"
              name="is_signature"
              checked={formData.is_signature}
              onChange={handleChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="is_signature" className="ml-2 block text-sm text-gray-700">
              Tandai sebagai menu signature/andalan
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
                  Tambah Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
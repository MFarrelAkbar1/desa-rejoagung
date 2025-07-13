'use client'

import { useState } from 'react'
import { X, Upload, Star } from 'lucide-react'

interface AddKulinerFormProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AddKulinerForm({ onClose, onSuccess }: AddKulinerFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'makanan' as 'makanan' | 'minuman' | 'camilan',
    description: '',
    ingredients: [''],
    price: '',
    location: '',
    rating: 4.0,
    is_signature: false,
    cooking_time: '',
    serving_size: '',
    benefits: [''],
    contact: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    })
  }

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index)
    })
  }

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients]
    newIngredients[index] = value
    setFormData({
      ...formData,
      ingredients: newIngredients
    })
  }

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, '']
    })
  }

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index)
    })
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData({
      ...formData,
      benefits: newBenefits
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let imageUrl = ''

      // Upload image jika ada
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)
        uploadFormData.append('folder', 'culinary')

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        })
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          imageUrl = uploadData.imageUrl
        }
      }

      // Filter empty ingredients and benefits
      const cleanedData = {
        ...formData,
        ingredients: formData.ingredients.filter(item => item.trim() !== ''),
        benefits: formData.benefits.filter(item => item.trim() !== ''),
        image_url: imageUrl
      }

      const response = await fetch('/api/culinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanedData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Gagal menambah menu kuliner')
      }
    } catch (error) {
      console.error('Error adding culinary item:', error)
      alert('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">🍛 Tambah Menu Kuliner</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Nama Menu *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contoh: Rujak Soto Rejoagung"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Kategori *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="makanan">🍛 Makanan</option>
                <option value="minuman">🥤 Minuman</option>
                <option value="camilan">🍡 Camilan</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Deskripsi *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Deskripsi menu kuliner..."
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-semibold mb-2">Bahan-bahan *</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
                  placeholder="Nama bahan"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              + Tambah Bahan
            </button>
          </div>

          {/* Price & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Harga *</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Rp 12.000 - 15.000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Lokasi Warung *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Warung Bu Sari - Jl. Raya Rejoagung"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Rating</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
                <Star className="w-5 h-5 text-yellow-500 ml-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Waktu Masak</label>
              <input
                type="text"
                value={formData.cooking_time}
                onChange={(e) => setFormData({...formData, cooking_time: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="15 menit"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Porsi</label>
              <input
                type="text"
                value={formData.serving_size}
                onChange={(e) => setFormData({...formData, serving_size: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="1 porsi"
              />
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-semibold mb-2">Manfaat (opsional)</label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2"
                  placeholder="Manfaat kesehatan"
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              + Tambah Manfaat
            </button>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold mb-2">Kontak *</label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              placeholder="0812-3456-7890"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">Upload Foto</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-48 w-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null)
                      setImagePreview('')
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Klik untuk upload foto atau drag & drop
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
              >
                Pilih Foto
              </label>
            </div>
          </div>

          {/* Signature Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="signature"
              checked={formData.is_signature}
              onChange={(e) => setFormData({...formData, is_signature: e.target.checked})}
              className="mr-3 h-4 w-4 text-orange-600"
            />
            <label htmlFor="signature" className="text-sm font-semibold">
              ⭐ Menu Signature Desa
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-semibold"
            >
              {isSubmitting ? 'Menyimpan...' : '🍛 Tambah Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
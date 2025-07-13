'use client'

import { useState, useEffect } from 'react'
import { X, Upload, Star } from 'lucide-react'

interface EditKulinerFormProps {
  item: any
  onClose: () => void
  onSuccess: () => void
}

export default function EditKulinerForm({ item, onClose, onSuccess }: EditKulinerFormProps) {
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

  // Load existing data
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || 'makanan',
        description: item.description || '',
        ingredients: item.ingredients || [''],
        price: item.price || '',
        location: item.location || '',
        rating: item.rating || 4.0,
        is_signature: item.isSignature || false,
        cooking_time: item.cookingTime || '',
        serving_size: item.servingSize || '',
        benefits: item.benefits || [''],
        contact: item.contact || ''
      })
      
      if (item.image) {
        setImagePreview(item.image)
      }
    }
  }, [item])

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
      let imageUrl = item.image || ''

      // Upload image baru jika ada
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

      const response = await fetch(`/api/culinary/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cleanedData)
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Gagal mengupdate menu kuliner')
      }
    } catch (error) {
      console.error('Error updating culinary item:', error)
      alert('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">✏️ Edit Menu: {item?.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Form fields sama seperti AddKulinerForm */}
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-semibold"
            >
              {isSubmitting ? 'Menyimpan...' : '✏️ Update Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
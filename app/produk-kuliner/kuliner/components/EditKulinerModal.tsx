// app/produk-kuliner/kuliner/components/EditKulinerModal.tsx - FIXED
'use client'

import { useState } from 'react'
import { X, Edit, Crown, Upload, Image as ImageIcon } from 'lucide-react'

interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients?: string[]
  price?: string
  location?: string
  image_url?: string
  rating?: number
  is_signature: boolean
  cooking_time?: string
  serving_size?: string
  benefits?: string[]
  contact?: string
}

interface EditKulinerModalProps {
  item: CulinaryItem
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

// Function untuk menghilangkan "Rp." dari value untuk editing
const cleanPriceForEdit = (price?: string): string => {
  if (!price) return ''
  return price.replace(/^(Rp\.?\s*)/i, '').trim()
}

export default function EditKulinerModal({ item, onClose, onSuccess }: EditKulinerModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    description: item.description,
    price: cleanPriceForEdit(item.price), // Clean untuk editing
    location: item.location || '',
    contact: item.contact || '',
    cooking_time: item.cooking_time || '',
    serving_size: item.serving_size || '',
    rating: item.rating || 5,
    is_signature: item.is_signature,
    image_url: item.image_url || ''
  })
  
  const [ingredients, setIngredients] = useState<string[]>(
    item.ingredients && item.ingredients.length > 0 ? item.ingredients : ['']
  )
  const [benefits, setBenefits] = useState<string[]>(
    item.benefits && item.benefits.length > 0 ? item.benefits : ['']
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    // Special handling untuk price field
    if (name === 'price') {
      setFormData(prev => ({
        ...prev,
        [name]: value // Store raw value untuk editing
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }))
    }
  }

  // Upload gambar via API yang udah ada
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

    setIsUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)
      formDataUpload.append('folder', 'kuliner')

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
      setIsUploading(false)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }))
  }

  const addIngredient = () => setIngredients(prev => [...prev, ''])
  const removeIngredient = (index: number) => setIngredients(prev => prev.filter((_, i) => i !== index))
  const updateIngredient = (index: number, value: string) => {
    setIngredients(prev => prev.map((item, i) => i === index ? value : item))
  }

  const addBenefit = () => setBenefits(prev => [...prev, ''])
  const removeBenefit = (index: number) => setBenefits(prev => prev.filter((_, i) => i !== index))
  const updateBenefit = (index: number, value: string) => {
    setBenefits(prev => prev.map((item, i) => i === index ? value : item))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const submitData = {
        ...formData,
        price: formData.price ? formatPriceInput(formData.price) : '', // Format price sebelum submit
        ingredients: ingredients.filter(item => item.trim() !== ''),
        benefits: benefits.filter(item => item.trim() !== ''),
        rating: Number(formData.rating)
      }

      const response = await fetch(`/api/culinary/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        // Success: Close modal and refresh
        onSuccess()
        
        // Auto refresh page setelah 500ms untuk smooth UX
        setTimeout(() => {
          window.location.reload()
        }, 500)
      } else {
        const errorData = await response.json()
        alert(`Gagal memperbarui menu kuliner: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan saat memperbarui menu kuliner')
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
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Edit className="w-6 h-6" />
              Edit: {item.name}
            </h2>
            <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gambar Menu
            </label>
            
            {formData.image_url ? (
              // Show uploaded image
              <div className="relative border border-gray-300 rounded-lg overflow-hidden">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-full h-48 object-contain bg-gray-50"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-sm font-medium">Mengupload...</div>
                  </div>
                )}
              </div>
            ) : (
              // Upload area
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        {isUploading ? 'Mengupload...' : 'Klik untuk upload gambar'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-1">atau drag & drop file di sini</p>
                  </div>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP hingga 5MB</p>
                </div>
                {isUploading && (
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Mengupload ke Cloudinary...</p>
                  </div>
                )}
              </div>
            )}
            
            {/* URL Input Alternative */}
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

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Menu *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="camilan">Camilan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Harga</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="15000 atau 15.000"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Otomatis ditambahkan "Rp." di depan
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi *</label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Warung</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kontak</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bahan-bahan</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="flex-1 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama bahan"
                />
                <button type="button" onClick={() => removeIngredient(index)} className="text-red-500 hover:text-red-700 p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
              + Tambah Bahan
            </button>
          </div>

          {/* Options */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_signature"
                checked={formData.is_signature}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 flex items-center gap-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                Menu Signature
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Memperbarui...
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Update Menu
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
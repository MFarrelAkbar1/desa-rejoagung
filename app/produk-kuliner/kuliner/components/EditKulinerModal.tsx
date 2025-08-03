// app/produk-kuliner/kuliner/components/EditKulinerModal.tsx - OPTIMIZED VERSION

'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Minus, Upload, Image as ImageIcon, Loader2, Edit } from 'lucide-react'
import { useNotifications } from '@/components/notifications/NotificationSystem'

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
  created_at: string
  updated_at: string
}

interface EditKulinerModalProps {
  item: CulinaryItem
  onClose: () => void
  onSuccess: () => void
}

export default function EditKulinerModal({ item, onClose, onSuccess }: EditKulinerModalProps) {
  // Use the elegant notification system
  const { showSuccess, showError, showFileError, showWarning } = useNotifications()

  const [formData, setFormData] = useState<CulinaryItem>({
    ...item,
    // Ensure arrays are properly initialized
    ingredients: item.ingredients || [''],
    benefits: item.benefits || ['']
  })

  const [ingredients, setIngredients] = useState<string[]>(
    item.ingredients && item.ingredients.length > 0 ? item.ingredients : ['']
  )
  const [benefits, setBenefits] = useState<string[]>(
    item.benefits && item.benefits.length > 0 ? item.benefits : ['']
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // Elegant image upload with proper error handling
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      showFileError('type', 'Gunakan format JPG, PNG, atau WEBP')
      e.target.value = '' // Reset input
      return
    }

    // File size validation with detailed feedback
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1)
      showFileError('size', `File Anda ${fileSizeMB}MB, maksimal 5MB. Kompres gambar terlebih dahulu.`)
      e.target.value = '' // Reset input
      return
    }

    // Additional check for extremely large files
    if (file.size > 10 * 1024 * 1024) { // 10MB
      showError('File terlalu besar dan dapat menyebabkan error sistem. Gunakan gambar maksimal 5MB.', 'File Terlalu Besar')
      e.target.value = '' // Reset input
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
        showSuccess('Gambar berhasil diperbarui!')
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
      setIsUploading(false)
      e.target.value = '' // Reset input
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }))
    showSuccess('Gambar berhasil dihapus')
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

  // Ingredient management
  const addIngredient = () => setIngredients(prev => [...prev, ''])
  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(prev => prev.filter((_, i) => i !== index))
    }
  }
  const updateIngredient = (index: number, value: string) => {
    setIngredients(prev => prev.map((item, i) => i === index ? value : item))
  }

  // Benefit management
  const addBenefit = () => setBenefits(prev => [...prev, ''])
  const removeBenefit = (index: number) => {
    if (benefits.length > 1) {
      setBenefits(prev => prev.filter((_, i) => i !== index))
    }
  }
  const updateBenefit = (index: number, value: string) => {
    setBenefits(prev => prev.map((item, i) => i === index ? value : item))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validation
    if (!formData.name.trim()) {
      showError('Nama menu harus diisi', 'Validasi Form')
      return
    }
    
    if (!formData.description.trim()) {
      showError('Deskripsi menu harus diisi', 'Validasi Form')
      return
    }

    if (formData.description.length < 10) {
      showWarning('Deskripsi terlalu pendek. Minimal 10 karakter untuk SEO yang baik.')
      return
    }

    setIsLoading(true)

    try {
      const submitData = {
        ...formData,
        ingredients: ingredients.filter(item => item.trim()),
        benefits: benefits.filter(item => item.trim()),
        price: formData.price ? 
          (formData.price.startsWith('Rp') ? formData.price : `Rp. ${formData.price}`) 
          : undefined,
        updated_at: new Date().toISOString()
      }

      const response = await fetch(`/api/culinary/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      })

      if (response.ok) {
        showSuccess('Menu kuliner berhasil diperbarui!', 'Update Berhasil')
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
        } else if (response.status === 404) {
          showError('Menu tidak ditemukan. Mungkin sudah dihapus.', 'Not Found')
        } else {
          showError(`Gagal memperbarui menu: ${error.error || 'Server error'}`, 'Update Error')
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Edit className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Edit Menu: {item.name}</h2>
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
                Nama Menu *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Contoh: Rendang Sapi Asli"
                style={{ color: '#111827' }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                style={{ color: '#111827' }}
              >
                <option value="makanan" style={{ color: '#111827' }}>🍽️ Makanan</option>
                <option value="minuman" style={{ color: '#111827' }}>🥤 Minuman</option>
                <option value="camilan" style={{ color: '#111827' }}>🍪 Camilan</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Deskripsikan kelezatan menu ini..."
              style={{ color: '#111827' }}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/300 karakter (minimal 10)
            </p>
          </div>

          {/* Image Upload - ENHANCED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Menu
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  id="image-upload-edit"
                  disabled={isUploading}
                />
                <label htmlFor="image-upload-edit" className="cursor-pointer">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                      <p className="text-sm text-gray-600">Mengupload gambar...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Klik untuk upload foto menu baru
                      </p>
                      <p className="text-xs text-gray-500">
                        JPG, PNG, WEBP • Max 5MB • Resolusi tinggi untuk hasil terbaik
                      </p>
                    </div>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Price & Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="15000"
                style={{ color: '#111827' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Masak
              </label>
              <input
                type="text"
                name="cooking_time"
                value={formData.cooking_time}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="30 menit"
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
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="2-3 orang"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Signature & Location */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_signature"
                checked={formData.is_signature}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Menu Signature (Unggulan)
              </label>
            </div>

            <div className="flex-1 ml-6">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Lokasi penjual"
                style={{ color: '#111827' }}
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bahan-bahan
            </label>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                    placeholder={`Bahan ${index + 1}`}
                    style={{ color: '#111827' }}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
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
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                    placeholder={`Manfaat ${index + 1}`}
                    style={{ color: '#111827' }}
                  />
                  {benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Tambah Manfaat
              </button>
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
              disabled={isLoading || isUploading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
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
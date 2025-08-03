// components/forms/NewsForm.tsx - FIXED with NotificationSystem

'use client'

import { useState } from 'react'
import { Save, ArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'
import ContentBlockManager from './ContentBlockManager'
import { ContentBlock } from '@/types/news'
import { useNotifications } from '@/components/notifications/NotificationSystem'

interface NewsFormData {
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  is_published: boolean
  is_announcement: boolean
  author: string
  content_blocks: ContentBlock[]
}

interface NewsFormProps {
  initialData?: Partial<NewsFormData>
  onSubmit: (data: NewsFormData) => Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  error?: string | null
  submitLabel?: string
  title?: string
  description?: string
}

export default function NewsForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  error = null,
  submitLabel = "Simpan Berita",
  title = "Form Berita",
  description
}: NewsFormProps) {
  const { showError } = useNotifications()
  
  const [formData, setFormData] = useState<NewsFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    image_url: initialData?.image_url || '',
    category: initialData?.category || '',
    is_published: initialData?.is_published || false,
    is_announcement: initialData?.is_announcement || false,
    author: initialData?.author || '',
    content_blocks: initialData?.content_blocks || []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation - FIXED: Replace alert with showError
    if (!formData.title.trim()) {
      showError('Judul berita wajib diisi', 'Validasi Form')
      return
    }
    
    if (!formData.content.trim()) {
      showError('Konten berita wajib diisi', 'Validasi Form')
      return
    }
    
    if (!formData.author.trim()) {
      showError('Nama penulis wajib diisi', 'Validasi Form')
      return
    }

    await onSubmit(formData)
  }

  // Content block management
  const handleAddContentBlock = (type: 'text' | 'subtitle' | 'image') => {
    const newBlock: ContentBlock = {
      id: `temp-${Date.now()}`,
      type,
      content: '',
      order_index: formData.content_blocks.length,
      style: type === 'text' ? { textAlign: 'justify' } : { textAlign: 'left' }
    }
    
    setFormData(prev => ({
      ...prev,
      content_blocks: [...prev.content_blocks, newBlock]
    }))
  }

  const handleEditContentBlock = (blockId: string, content: string, style?: any) => {
    setFormData(prev => ({
      ...prev,
      content_blocks: prev.content_blocks.map(block =>
        block.id === blockId || `temp-${block.order_index}` === blockId
          ? { ...block, content, style: { ...block.style, ...style } }
          : block
      )
    }))
  }

  const handleDeleteContentBlock = (blockId: string) => {
    setFormData(prev => ({
      ...prev,
      content_blocks: prev.content_blocks
        .filter(block => 
          block.id !== blockId && `temp-${block.order_index}` !== blockId
        )
        .map((block, index) => ({ ...block, order_index: index }))
    }))
  }

  const handleMoveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = formData.content_blocks.findIndex(block => 
      block.id === blockId || `temp-${block.order_index}` === blockId
    )
    
    if (currentIndex === -1) return
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (newIndex < 0 || newIndex >= formData.content_blocks.length) return
    
    const newBlocks = [...formData.content_blocks]
    ;[newBlocks[currentIndex], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[currentIndex]]
    
    // Update order_index
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order_index: index
    }))
    
    setFormData(prev => ({
      ...prev,
      content_blocks: updatedBlocks
    }))
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {description && (
          <p className="text-emerald-100 mt-2">{description}</p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="text-red-700">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* 1. 📤 PENGATURAN PUBLIKASI (moved to first) */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            📤 Pengaturan Publikasi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Published Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_published"
                id="is_published"
                checked={formData.is_published}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-700">
                Publikasikan berita sekarang
              </label>
            </div>
            
            {/* Announcement Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_announcement"
                id="is_announcement"
                checked={formData.is_announcement}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <label htmlFor="is_announcement" className="ml-3 text-sm font-medium text-gray-700">
                Tandai sebagai pengumuman penting
              </label>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Status:</strong> {formData.is_published ? '✅ Akan dipublikasikan' : '📝 Disimpan sebagai draft'} 
              {formData.is_announcement && ' • 📢 Pengumuman Penting'}
            </p>
          </div>
        </div>

        {/* 2. ℹ️ INFORMASI DASAR */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            ℹ️ Informasi Dasar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Berita *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black placeholder-gray-500"
                placeholder="Masukkan judul berita yang menarik"
                required
              />
            </div>
            
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
              >
                <option value="">Pilih Kategori</option>
                <option value="Berita">Berita</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Kegiatan">Kegiatan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Budaya">Budaya</option>
              </select>
            </div>
            
            {/* Author */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penulis *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black placeholder-gray-500"
                placeholder="Nama penulis atau Tim Redaksi"
                required
              />
            </div>
          </div>

          {/* Main Content - AUTO JUSTIFY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Utama *
              <span className="text-emerald-600 text-xs ml-2">✨ Otomatis justify</span>
            </label>
            <textarea
              name="content"
              rows={8}
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black placeholder-gray-500 text-justify"
              placeholder="Tulis konten berita di sini. Konten ini akan menjadi isi utama dari berita Anda."
              required
            />
          </div>

          {/* Excerpt - AUTO JUSTIFY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ringkasan (Excerpt)
              <span className="text-emerald-600 text-xs ml-2">✨ Otomatis justify</span>
            </label>
            <textarea
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black placeholder-gray-500 text-justify"
              placeholder="Ringkasan singkat yang akan muncul di daftar berita (opsional)"
            />
          </div>

          {/* Main Image Upload - FIXED */}
          <ImageUpload
            value={formData.image_url}
            onChange={(url) => setFormData({ ...formData, image_url: url })}
            label="Gambar Utama Berita"
            className="col-span-full"
          />
        </div>

        {/* 3. 📝 KONTEN TAMBAHAN */}
        <ContentBlockManager
          contentBlocks={formData.content_blocks}
          onAddBlock={handleAddContentBlock}
          onEditBlock={handleEditContentBlock}
          onDeleteBlock={handleDeleteContentBlock}
          onMoveBlock={handleMoveContentBlock}
          isEditing={true}
        />

        {/* Content Statistics */}
        {formData.content_blocks.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="text-emerald-800">
                <strong>Statistik Konten:</strong>
              </div>
              <div className="flex space-x-4 text-emerald-700">
                <span>
                  📝 {formData.content_blocks.filter(b => b.type === 'text').length} Paragraf (Auto Justify)
                </span>
                <span>
                  📖 {formData.content_blocks.filter(b => b.type === 'subtitle').length} Sub Judul
                </span>
                <span>
                  🖼️ {formData.content_blocks.filter(b => b.type === 'image').length} Gambar
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Batal
              </button>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Menyimpan...' : submitLabel}
          </button>
        </div>

        {/* Form Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">💡 Tips Menulis Berita:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Gunakan judul yang menarik dan informatif</li>
            <li>• Tulis konten dengan bahasa yang mudah dipahami</li>
            <li>• Sertakan gambar untuk memperkaya visual</li>
            <li>• Manfaatkan konten tambahan untuk informasi detail</li>
            <li>• Centang "Pengumuman Penting" untuk berita prioritas</li>
          </ul>
        </div>
      </form>
    </div>
  )
}
// components/forms/NewsForm.tsx - Updated with rearranged layout and alignment options

'use client'

import { useState } from 'react'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'
import ContentBlockManager from './ContentBlockManager'
import { ContentBlock } from '@/types/news'

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
  title = "Buat Berita Baru",
  description = "Buat berita dengan konten blok yang dapat dikustomisasi"
}: NewsFormProps) {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: '',
    is_published: false,
    is_announcement: false,
    author: 'Admin Desa',
    content_blocks: [],
    ...initialData
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddContentBlock = (type: 'text' | 'subtitle' | 'image') => {
    const newBlock: ContentBlock = {
      id: `temp_${Date.now()}`,
      type,
      content: type === 'image' ? '' : '',
      order_index: formData.content_blocks.length,
      style: {
        textAlign: type === 'text' ? 'justify' : 'left'  // AUTO JUSTIFY untuk text blocks
      }
    }

    setFormData({
      ...formData,
      content_blocks: [...formData.content_blocks, newBlock]
    })
  }

  const handleEditContentBlock = (blockId: string, content: string, style?: any) => {
    setFormData({
      ...formData,
      content_blocks: formData.content_blocks.map(block =>
        block.id === blockId ? { ...block, content, style: { ...block.style, ...style } } : block
      )
    })
  }

  const handleDeleteContentBlock = (blockId: string) => {
    setFormData({
      ...formData,
      content_blocks: formData.content_blocks.filter(block => block.id !== blockId)
    })
  }

  const handleMoveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    const blocks = [...formData.content_blocks]
    const index = blocks.findIndex(block => block.id === blockId)
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]]
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]]
    }

    blocks.forEach((block, idx) => {
      block.order_index = idx
    })

    setFormData({
      ...formData,
      content_blocks: blocks
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-8 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {title}
        </h1>
        <p className="text-gray-600">
          {description}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-8 mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        
        {/* 1. INFORMASI TAMBAHAN (moved to top) */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            🏷️ Informasi Tambahan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
              >
                <option value="">Pilih Kategori</option>
                <option value="Pembangunan">Pembangunan</option>
                <option value="Budaya">Budaya</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Pengumuman">Pengumuman</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penulis
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                placeholder="Nama penulis berita"
              />
            </div>
          </div>
        </div>

        {/* 2. PENGATURAN PUBLIKASI (moved to second) */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            📤 Pengaturan Publikasi
          </h2>
          
          <div className="space-y-4">
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
              <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
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
              <label htmlFor="is_announcement" className="ml-2 text-sm text-gray-700">
                Tandai sebagai pengumuman penting
              </label>
            </div>
          </div>
        </div>

        {/* 3. INFORMASI DASAR (moved to bottom) */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
            📰 Informasi Dasar
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Berita <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                placeholder="Masukkan judul berita yang menarik"
              />
            </div>

            {/* Main Content - AUTO JUSTIFY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten Utama <span className="text-red-500">*</span>
                <span className="text-emerald-600 text-xs ml-2">✨ Otomatis justify</span>
              </label>
              
              <textarea
                name="content"
                required
                rows={8}
                value={formData.content}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-justify"
                placeholder="Tulis konten berita lengkap di sini. Konten ini akan menjadi isi utama dari berita Anda."
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-justify"
                placeholder="Ringkasan singkat yang akan muncul di daftar berita (opsional)"
              />
            </div>

            {/* Main Image Upload */}
            <ImageUpload
              value={formData.image_url}
              onChange={(url) => setFormData({ ...formData, image_url: url })}
              label="Gambar Utama Berita"
              className="col-span-full"
            />
          </div>
        </div>

        {/* Content Blocks Manager */}
        <ContentBlockManager
          contentBlocks={formData.content_blocks}
          onAddBlock={handleAddContentBlock}
          onEditBlock={handleEditContentBlock}
          onDeleteBlock={handleDeleteContentBlock}
          onMoveBlock={handleMoveContentBlock}
          isEditing={true}
        />

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
      </form>
    </div>
  )
}
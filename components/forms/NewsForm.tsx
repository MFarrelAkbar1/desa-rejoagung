// components/forms/NewsForm.tsx
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

  const handleAddContentBlock = (type: 'text' | 'image') => {
    const newBlock: ContentBlock = {
      id: `temp_${Date.now()}`,
      type,
      content: type === 'text' ? '' : '',
      order_index: formData.content_blocks.length
    }

    setFormData({
      ...formData,
      content_blocks: [...formData.content_blocks, newBlock]
    })
  }

  const handleEditContentBlock = (blockId: string, content: string) => {
    setFormData({
      ...formData,
      content_blocks: formData.content_blocks.map(block =>
        block.id === blockId ? { ...block, content } : block
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
        {/* Basic Information */}
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
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                placeholder="Masukkan judul berita yang menarik"
              />
            </div>

            {/* Main Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konten Utama <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                placeholder="Tulis konten berita lengkap di sini. Konten ini akan menjadi isi utama dari berita Anda."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ringkasan (Excerpt)
              </label>
              <textarea
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
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

        {/* Metadata */}
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
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                placeholder="Contoh: Pembangunan, Sosial, Pendidikan"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penulis
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                placeholder="Nama penulis berita"
              />
            </div>
          </div>

          {/* Status Checkboxes */}
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-700">
                Publikasikan berita (akan terlihat oleh publik)
              </span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_announcement}
                onChange={(e) => setFormData({ ...formData, is_announcement: e.target.checked })}
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <span className="ml-2 text-sm text-gray-700">
                Tandai sebagai pengumuman penting
              </span>
            </label>
          </div>
        </div>

        {/* Content Blocks */}
        <ContentBlockManager
          contentBlocks={formData.content_blocks}
          onAddBlock={handleAddContentBlock}
          onEditBlock={handleEditContentBlock}
          onDeleteBlock={handleDeleteContentBlock}
          onMoveBlock={handleMoveContentBlock}
          isEditing={true}
        />

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Link
            href="/berita/umum"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Berita
          </Link>
          
          <div className="flex space-x-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Menyimpan..." : submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
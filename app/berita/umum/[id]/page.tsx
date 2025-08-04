// app/berita/umum/[id]/page.tsx - FIXED VERSION

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Edit3, Save, X, Plus, Type, ImageIcon, Calendar, User, ArrowLeft, Heading, Settings } from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ContentBlockRenderer from '@/components/News/ContentBlockRenderer'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import ImageUpload from '@/components/forms/ImageUpload'
import { useNotifications } from '@/components/notifications/NotificationSystem'

interface ContentBlock {
  id?: string
  type: 'text' | 'subtitle' | 'image'
  content: string
  order_index: number
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    fontSize?: 'small' | 'medium' | 'large'
    caption?: string
  }
  created_at?: string
}

interface NewsDetail {
  id: string
  title: string
  content: string
  excerpt?: string
  image_url?: string
  category?: string
  is_published: boolean
  is_announcement: boolean
  author: string
  slug?: string
  created_at: string
  updated_at?: string
  content_blocks?: ContentBlock[]
}

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAdmin } = useAdminAuth()
  const { showSuccess, showError, confirm } = useNotifications()
  
  const [currentNews, setCurrentNews] = useState<NewsDetail | null>(null)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Edit mode states
  const [isEditing, setIsEditing] = useState(false)
  const [editedNews, setEditedNews] = useState<NewsDetail | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchNewsDetail()
    }
  }, [params.id])

  const fetchNewsDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/news/${params.id}`)
      if (!response.ok) {
        throw new Error('Berita tidak ditemukan')
      }

      const data = await response.json()
      setCurrentNews(data)
      setContentBlocks(data.content_blocks || [])
    } catch (error) {
      console.error('Error fetching news:', error)
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartEdit = () => {
    if (!isAdmin) {
      showError('Anda tidak memiliki akses untuk mengedit berita')
      return
    }
    setEditedNews({ ...currentNews! })
    setIsEditing(true)
  }

  const handleSaveChanges = async () => {
    if (!editedNews || !isAdmin) return

    try {
      setIsSaving(true)
      
      // Clean content blocks - remove temp IDs and ensure proper indexing
      const cleanedContentBlocks = contentBlocks.map((block, index) => ({
        type: block.type,
        content: block.content,
        order_index: index,
        style: block.style || (block.type === 'text' ? { textAlign: 'justify' } : { textAlign: 'left' })
      }))

      const updateData = {
        title: editedNews.title,
        content: editedNews.content,
        excerpt: editedNews.excerpt || '',
        image_url: editedNews.image_url || '',
        category: editedNews.category || '',
        is_published: editedNews.is_published,
        is_announcement: editedNews.is_announcement,
        author: editedNews.author,
        // CRITICAL: Include content_blocks in update
        content_blocks: cleanedContentBlocks
      }

      console.log('Sending update data:', updateData)

      const response = await fetch(`/api/news/${currentNews.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })

      console.log('Update response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Update error:', errorData)
        throw new Error(errorData.error || 'Gagal menyimpan perubahan')
      }

      const updatedNews = await response.json()
      console.log('Update success:', updatedNews)
      
      setCurrentNews(updatedNews)
      setEditedNews(updatedNews)
      setIsEditing(false)
      
      // FIXED: Replace alert with showSuccess
      showSuccess(
        `Berita "${editedNews.title}" berhasil diperbarui dengan ${cleanedContentBlocks.length} content blocks!`,
        'Berhasil Menyimpan'
      )
      
      // Refresh data
      window.location.reload()
      
    } catch (err) {
      console.error('Error saving news:', err)
      setError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan')
      showError(err instanceof Error ? err.message : 'Gagal menyimpan perubahan', 'Error Menyimpan')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = async () => {
    // FIXED: Replace window.confirm with confirm from useNotifications
    const confirmed = await confirm(
      'Apakah Anda yakin ingin membatalkan? Perubahan yang belum disimpan akan hilang.',
      'Konfirmasi Pembatalan'
    )
    
    if (confirmed) {
      setEditedNews(currentNews)
      setIsEditing(false)
      setError(null)
      // Reset content blocks to original
      if (currentNews?.content_blocks) {
        setContentBlocks(currentNews.content_blocks)
      }
    }
  }

  // Content block management
  const handleAddContentBlock = (type: 'text' | 'subtitle' | 'image') => {
    const newBlock: ContentBlock = {
      id: `temp-${Date.now()}`,
      type,
      content: '',
      order_index: contentBlocks.length,
      style: type === 'text' ? { textAlign: 'justify' } : { textAlign: 'left' }
    }
    console.log('Adding new content block:', newBlock)
    setContentBlocks([...contentBlocks, newBlock])
  }

  const handleEditContentBlock = (blockId: string, content: string, style?: any) => {
    console.log('Editing content block:', blockId, content, style)
    setContentBlocks(blocks =>
      blocks.map(block =>
        block.id === blockId || `temp-${block.order_index}` === blockId
          ? { ...block, content, style: { ...block.style, ...style } }
          : block
      )
    )
  }

  const handleDeleteContentBlock = async (blockId: string) => {
    // FIXED: Replace window.confirm with confirm from useNotifications
    const confirmed = await confirm(
      'Apakah Anda yakin ingin menghapus content block ini?',
      'Konfirmasi Hapus'
    )
    
    if (confirmed) {
      console.log('Deleting content block:', blockId)
      setContentBlocks(blocks =>
        blocks.filter(block =>
          block.id !== blockId && `temp-${block.order_index}` !== blockId
        ).map((block, index) => ({ ...block, order_index: index }))
      )
    }
  }

  const handleMoveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = contentBlocks.findIndex(block =>
      block.id === blockId || `temp-${block.order_index}` === blockId
    )
    
    if (currentIndex === -1) return
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (newIndex < 0 || newIndex >= contentBlocks.length) return
    
    const newBlocks = [...contentBlocks]
    ;[newBlocks[currentIndex], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[currentIndex]]
    
    // Update order_index
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order_index: index
    }))
    
    console.log('Moving content block:', blockId, direction, 'New order:', updatedBlocks)
    setContentBlocks(updatedBlocks)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat berita...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !currentNews) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <p className="text-red-600 mb-4">{error || 'Berita tidak ditemukan'}</p>
            <Link
              href="/berita/umum"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Kembali ke Berita Umum
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Berita Umum', href: '/berita/umum' },
            { label: currentNews.title, href: `/berita/umum/${currentNews.id}` }
          ]}
        />

        {/* Loading Overlay */}
        {isSaving && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Menyimpan perubahan...</p>
              <p className="text-gray-500 text-sm mt-2">Mohon tunggu, jangan tutup halaman ini</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className={`${isEditing ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-emerald-600 to-green-600'} p-6`}>
            <div className="flex justify-between items-start">
              <div className="text-white">
                <h1 className="text-2xl font-bold mb-2">{isEditing ? '📝 Edit Berita' : '📰 Detail Berita'}</h1>
                <p className="text-emerald-100">
                  Terakhir diupdate: {formatDate(currentNews.updated_at || currentNews.created_at)}
                </p>
                <p className="text-emerald-100 text-sm mt-1">
                  Content blocks: {contentBlocks.length} blok
                </p>
              </div>

              {/* Admin Controls - hanya tampil untuk admin */}
              {isAdmin && (
                <div className="flex space-x-2">
                  {!isEditing ? (
                    <button
                      onClick={handleStartEdit}
                      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Berita
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Menyimpan...' : 'Simpan'}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Batal
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {/* News Content */}
          <div className="p-8">
            {isEditing && editedNews ? (
              <div className="space-y-8">
                {/* 📤 PENGATURAN PUBLIKASI */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    📤 Pengaturan Publikasi
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Published Status */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_published"
                        checked={editedNews.is_published}
                        onChange={(e) => setEditedNews({
                          ...editedNews,
                          is_published: e.target.checked
                        })}
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
                        id="is_announcement"
                        checked={editedNews.is_announcement}
                        onChange={(e) => setEditedNews({
                          ...editedNews,
                          is_announcement: e.target.checked
                        })}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                      />
                      <label htmlFor="is_announcement" className="ml-3 text-sm font-medium text-gray-700">
                        Tandai sebagai pengumuman penting
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Status saat ini:</strong> {editedNews.is_published ? 
                        '✅ Dipublikasikan' : '⏳ Draft'} 
                      {editedNews.is_announcement && ' • 📢 Pengumuman Penting'}
                    </p>
                  </div>
                </div>

                {/* 📰 INFORMASI DASAR BERITA */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
                    📰 Informasi Dasar Berita
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Berita *
                      </label>
                      <input
                        type="text"
                        value={editedNews.title}
                        onChange={(e) => setEditedNews({
                          ...editedNews,
                          title: e.target.value
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-lg"
                        placeholder="Masukkan judul berita yang menarik..."
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Isi Berita Utama *
                      </label>
                      <textarea
                        value={editedNews.content}
                        onChange={(e) => setEditedNews({
                          ...editedNews,
                          content: e.target.value
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-justify"
                        rows={12}
                        placeholder="Tulis isi berita utama di sini..."
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ringkasan Berita (Excerpt)
                      </label>
                      <textarea
                        value={editedNews.excerpt || ''}
                        onChange={(e) => setEditedNews({
                          ...editedNews,
                          excerpt: e.target.value
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black text-justify"
                        rows={3}
                        placeholder="Ringkasan singkat yang akan muncul di daftar berita (opsional)"
                      />
                    </div>

                    {/* Gambar Utama dengan ImageUpload */}
                    <div>
                      <ImageUpload
                        value={editedNews.image_url || ''}
                        onChange={(url) => setEditedNews({
                          ...editedNews,
                          image_url: url
                        })}
                        label="Gambar Utama Berita"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Blocks */}
                <div className="space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      📝 Konten Tambahan ({contentBlocks.length} blok)
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Tambahkan blok teks, sub judul, dan gambar untuk memperkaya konten berita Anda.
                      <span className="text-emerald-600 font-medium"> ✨ Paragraf otomatis justify untuk hasil yang rapi.</span>
                    </p>
                    
                    {/* Add Content Block Buttons */}
                    <div className="flex space-x-3 mb-6">
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('text')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Type className="w-4 h-4" />
                        Tambah Paragraf
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('subtitle')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Heading className="w-4 h-4" />
                        Tambah Sub Judul
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddContentBlock('image')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Tambah Gambar
                      </button>
                    </div>

                    {/* Content Blocks List */}
                    {contentBlocks.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-lg mb-2">Belum ada content blocks</p>
                        <p className="text-sm">Gunakan tombol di atas untuk menambahkan konten tambahan</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contentBlocks.map((block, index) => (
                          <div key={block.id || `block-${index}`} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600">
                                  Block #{index + 1}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  block.type === 'text' ? 'bg-blue-100 text-blue-800' :
                                  block.type === 'subtitle' ? 'bg-green-100 text-green-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {block.type === 'text' ? '📝 Paragraf' :
                                   block.type === 'subtitle' ? '📋 Sub Judul' : '🖼️ Gambar'}
                                </span>
                              </div>
                            </div>

                            <ContentBlockRenderer
                              block={block}
                              isEditing={true}
                              showControls={true}
                              onEdit={(blockId, content, style) => handleEditContentBlock(blockId, content, style)}
                              onDelete={(blockId) => handleDeleteContentBlock(blockId)}
                              onMoveUp={(blockId) => handleMoveContentBlock(blockId, 'up')}
                              onMoveDown={(blockId) => handleMoveContentBlock(blockId, 'down')}
                              isFirst={index === 0}
                              isLast={index === contentBlocks.length - 1}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // VIEW MODE - FIXED: Added text-justify for main content
              <div>
                {/* Article Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {currentNews.title}
                  </h1>
                  
                  {/* Meta Information */}
                  <div className="flex items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(currentNews.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{currentNews.author}</span>
                    </div>
                    {currentNews.is_announcement && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        📢 Pengumuman Penting
                      </span>
                    )}
                  </div>

                  {/* Featured Image */}
                  {currentNews.image_url && (
                    <div className="mb-6">
                      <img
                        src={currentNews.image_url}
                        alt={currentNews.title}
                        className="w-full h-auto max-h-96 object-contain rounded-lg shadow-sm bg-gray-50"
                      />
                    </div>
                  )}
                </div>

                {/* Article Content - FIXED: Added text-justify */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
                    {currentNews.content}
                  </div>
                </div>

                {/* Content Blocks - RENDER SEMUA BLOCKS LENGKAP ASLI */}
                {contentBlocks.length > 0 && (
                  <div className="space-y-6 border-t pt-6">
                    {contentBlocks
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((block, index) => (
                        <ContentBlockRenderer
                          key={block.id || `block-${index}`}
                          block={block}
                          isEditing={false}
                          showControls={false}
                        />
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="p-8 border-t border-gray-200 bg-gray-50">
            <Link
              href="/berita/umum"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Berita Umum
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
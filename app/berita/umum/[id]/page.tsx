// app/berita/umum/[id]/page.tsx - SIMPLIFIED dengan auto justify

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Edit3, Save, X, Plus, Type, ImageIcon, Calendar, User, ArrowLeft, Heading } from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ContentBlockRenderer from '@/components/News/ContentBlockRenderer'
import DeleteConfirmation from '@/components/DeleteConfirmation'
import ImageUpload from '@/components/forms/ImageUpload'

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
  content_blocks: ContentBlock[]
}

export default function BeritaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAdmin } = useAdminAuth()
 
  const [news, setNews] = useState<NewsDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editedNews, setEditedNews] = useState<NewsDetail | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchNewsDetail()
    }
  }, [params.id])

  const fetchNewsDetail = async () => {
    try {
      const response = await fetch(`/api/news/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setNews(data)
        setEditedNews(data)
      } else {
        setError('Berita tidak ditemukan')
      }
    } catch (error) {
      setError('Gagal memuat berita')
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveChanges = async () => {
    if (!editedNews) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedNews),
      })

      if (response.ok) {
        const updatedNews = await response.json()
        setNews(updatedNews)
        setEditedNews(updatedNews)
        setIsEditing(false)
        setError(null)
        await fetchNewsDetail()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Gagal menyimpan perubahan')
      }
    } catch (error) {
      setError('Terjadi kesalahan saat menyimpan')
      console.error('Error saving news:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditedNews(news)
    setIsEditing(false)
    setError(null)
  }

  const handleAddContentBlock = (type: 'text' | 'subtitle' | 'image') => {
    if (!editedNews) return

    const newBlock: ContentBlock = {
      id: `temp_${Date.now()}`,
      type,
      content: '',
      order_index: editedNews.content_blocks.length,
      style: {
        textAlign: type === 'text' ? 'justify' : 'left'  // Auto justify untuk text blocks
      }
    }

    const updatedNews = {
      ...editedNews,
      content_blocks: [...editedNews.content_blocks, newBlock]
    }
   
    setEditedNews(updatedNews)
  }

  const handleEditContentBlock = (blockId: string, content: string, style?: any) => {
    if (!editedNews) return

    const updatedNews = {
      ...editedNews,
      content_blocks: editedNews.content_blocks.map(block =>
        block.id === blockId
          ? { ...block, content, style: { ...block.style, ...style } }
          : block
      )
    }
   
    setEditedNews(updatedNews)
  }

  const handleDeleteContentBlock = (blockId: string) => {
    if (!editedNews) return

    const updatedNews = {
      ...editedNews,
      content_blocks: editedNews.content_blocks.filter(block => block.id !== blockId)
    }
   
    setEditedNews(updatedNews)
  }

  const handleMoveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!editedNews) return

    const blocks = [...editedNews.content_blocks]
    const currentIndex = blocks.findIndex(block => block.id === blockId)
   
    if (currentIndex === -1) return

    if (direction === 'up' && currentIndex > 0) {
      [blocks[currentIndex], blocks[currentIndex - 1]] = [blocks[currentIndex - 1], blocks[currentIndex]]
    } else if (direction === 'down' && currentIndex < blocks.length - 1) {
      [blocks[currentIndex], blocks[currentIndex + 1]] = [blocks[currentIndex + 1], blocks[currentIndex]]
    }

    blocks.forEach((block, index) => {
      block.order_index = index
    })

    setEditedNews({
      ...editedNews,
      content_blocks: blocks
    })
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        router.push('/berita/umum')
      } else {
        setError('Gagal menghapus berita')
      }
    } catch (error) {
      setError('Terjadi kesalahan saat menghapus')
      console.error('Error deleting news:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
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

  if (error && !news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Berita Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/berita/umum')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Kembali ke Berita
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!news) return null

  const currentNews = editedNews || news

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Berita Umum', href: '/berita/umum' },
              { label: currentNews.title, href: '#' }
            ]}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between">
              {isEditing ? (
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    value={currentNews.title}
                    onChange={(e) => setEditedNews(prev =>
                      prev ? { ...prev, title: e.target.value } : null
                    )}
                    className="text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-emerald-500 focus:outline-none w-full text-gray-900"
                    placeholder="Judul berita..."
                  />
                </div>
              ) : (
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight flex-1">
                  {currentNews.title}
                </h1>
              )}

              {/* Admin Controls */}
              {isAdmin && (
                <div className="flex gap-2 ml-4">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Batal
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Menyimpan..." : "Simpan"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
                      <DeleteConfirmation
                        onConfirm={handleDelete}
                        title="Konfirmasi Hapus Berita"
                        description={`Apakah Anda yakin ingin menghapus berita "${currentNews.title}"? Tindakan ini tidak dapat dibatalkan.`}
                      />
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={currentNews.author}
                    onChange={(e) => setEditedNews(prev =>
                      prev ? { ...prev, author: e.target.value } : null
                    )}
                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-emerald-500 text-gray-900"
                  />
                ) : (
                  <span className="text-gray-900">{currentNews.author}</span>
                )}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-gray-900">{formatDate(currentNews.created_at)}</span>
              </div>
              {currentNews.category && (
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {currentNews.category}
                </span>
              )}
              {currentNews.is_announcement && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  📢 Pengumuman
                </span>
              )}
            </div>

            {/* Edit Fields */}
            {isEditing && (
              <div className="space-y-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📝 Edit Informasi Berita
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <input
                      type="text"
                      value={currentNews.category || ''}
                      onChange={(e) => setEditedNews(prev =>
                        prev ? { ...prev, category: e.target.value } : null
                      )}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                      placeholder="Kategori berita"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt/Ringkasan
                    </label>
                    <textarea
                      value={currentNews.excerpt || ''}
                      onChange={(e) => setEditedNews(prev =>
                        prev ? { ...prev, excerpt: e.target.value } : null
                      )}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                      rows={3}
                      placeholder="Ringkasan berita..."
                    />
                  </div>
                </div>

                {/* Enhanced Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gambar Utama Berita
                  </label>
                  <ImageUpload
                    value={currentNews.image_url || ''}
                    onChange={(url) => setEditedNews(prev =>
                      prev ? { ...prev, image_url: url } : null
                    )}
                    label=""
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {currentNews.image_url && (
            <div className="relative h-64 md:h-96">
              <img
                src={currentNews.image_url}
                alt={currentNews.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', currentNews.image_url)
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}

          {/* SIMPLIFIED: Main Content dengan AUTO JUSTIFY */}
          <div className="p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konten Utama
                  </label>
                  
                  {/* AUTO JUSTIFY - Simple! */}
                  <textarea
                    value={currentNews.content}
                    onChange={(e) => setEditedNews(prev =>
                      prev ? { ...prev, content: e.target.value } : null
                    )}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 text-justify"
                    rows={12}
                    placeholder="Tulis konten berita lengkap di sini..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ✨ Teks akan otomatis rata kanan-kiri (justify) untuk hasil yang rapi
                  </p>
                </div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {/* Display excerpt */}
                {currentNews.excerpt && (
                  <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg">
                    <p className="text-emerald-800 font-medium italic text-lg leading-relaxed m-0">
                      {currentNews.excerpt}
                    </p>
                  </div>
                )}
                
                {/* AUTO JUSTIFY - Simple display! */}
                <div className="text-lg text-gray-900 leading-relaxed whitespace-pre-wrap text-justify">
                  {currentNews.content}
                </div>
              </div>
            )}
          </div>

          {/* Content Blocks */}
          <div className="p-8">
            <div className="space-y-6">
              {currentNews.content_blocks.map((block, index) => (
                <ContentBlockRenderer
                  key={block.id}
                  block={block}
                  onEdit={handleEditContentBlock}
                  onDelete={handleDeleteContentBlock}
                  onMoveUp={(blockId) => handleMoveContentBlock(blockId, 'up')}
                  onMoveDown={(blockId) => handleMoveContentBlock(blockId, 'down')}
                  isEditing={isEditing}
                  isFirst={index === 0}
                  isLast={index === currentNews.content_blocks.length - 1}
                  showControls={isEditing}
                />
              ))}

              {/* Add Content Block Buttons */}
              {isAdmin && isEditing && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Tambah Konten Baru
                    </h3>
                    <div className="flex justify-center space-x-4 flex-wrap gap-2">
                      <button
                        onClick={() => handleAddContentBlock('text')}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        type="button"
                      >
                        <Type className="w-5 h-5" />
                        Tambah Paragraf
                      </button>
                     
                      <button
                        onClick={() => handleAddContentBlock('subtitle')}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        type="button"
                      >
                        <Heading className="w-5 h-5" />
                        Tambah Sub Judul
                      </button>
                     
                      <button
                        onClick={() => handleAddContentBlock('image')}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        type="button"
                      >
                        <ImageIcon className="w-5 h-5" />
                        Tambah Gambar
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      ✨ Paragraf otomatis menggunakan justify alignment untuk hasil yang rapi
                    </p>
                  </div>
                </div>
              )}
            </div>
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
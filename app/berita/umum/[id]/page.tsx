// app/berita/umum/[id]/page.tsx - BUAT BARU
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Edit3, Save, X, Plus, Type, Image, Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ContentBlock from '@/components/ContentBlock'
import DeleteConfirmation from '@/components/DeleteConfirmation'

interface ContentBlock {
  id?: string
  type: 'text' | 'image'
  content: string
  order_index: number
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

  // Editing state
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
        setIsEditing(false)
        setError(null)
        // Refresh data to get content blocks
        await fetchNewsDetail()
      } else {
        setError('Gagal menyimpan perubahan')
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

  const handleAddContentBlock = (type: 'text' | 'image') => {
    if (!editedNews) return

    const newBlock: ContentBlock = {
      id: `temp_${Date.now()}`,
      type,
      content: type === 'text' ? 'Masukkan teks...' : '',
      order_index: editedNews.content_blocks.length
    }

    setEditedNews({
      ...editedNews,
      content_blocks: [...editedNews.content_blocks, newBlock]
    })
  }

  const handleEditContentBlock = (blockId: string, content: string) => {
    if (!editedNews) return

    setEditedNews({
      ...editedNews,
      content_blocks: editedNews.content_blocks.map(block =>
        block.id === blockId ? { ...block, content } : block
      )
    })
  }

  const handleDeleteContentBlock = (blockId: string) => {
    if (!editedNews) return

    setEditedNews({
      ...editedNews,
      content_blocks: editedNews.content_blocks.filter(block => block.id !== blockId)
    })
  }

  const handleMoveContentBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!editedNews) return

    const blocks = [...editedNews.content_blocks]
    const index = blocks.findIndex(block => block.id === blockId)
    
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]]
    } else if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]]
    }

    // Update order_index
    blocks.forEach((block, idx) => {
      block.order_index = idx
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="text-red-500 text-xl font-semibold mb-4">
              {error || 'Berita tidak ditemukan'}
            </div>
            <Link
              href="/berita/umum"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentNews = editedNews || news

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Berita Umum', href: '/berita/umum' },
              { label: currentNews.title, href: `/berita/umum/${currentNews.id}` }
            ]}
          />
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/berita/umum"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Link>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex justify-between items-start mb-6">
              {isEditing ? (
                <div className="flex-1 mr-4">
                  <input
                    type="text"
                    value={currentNews.title}
                    onChange={(e) => setEditedNews(prev => 
                      prev ? { ...prev, title: e.target.value } : null
                    )}
                    className="text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-emerald-500 focus:outline-none w-full"
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
                    className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  <span>{currentNews.author}</span>
                )}
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(currentNews.created_at)}</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Kategori berita"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Gambar
                  </label>
                  <input
                    type="url"
                    value={currentNews.image_url || ''}
                    onChange={(e) => setEditedNews(prev => 
                      prev ? { ...prev, image_url: e.target.value } : null
                    )}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ringkasan (Excerpt)
                  </label>
                  <textarea
                    value={currentNews.excerpt || ''}
                    onChange={(e) => setEditedNews(prev => 
                      prev ? { ...prev, excerpt: e.target.value } : null
                    )}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="Ringkasan singkat berita"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentNews.is_published}
                      onChange={(e) => setEditedNews(prev => 
                        prev ? { ...prev, is_published: e.target.checked } : null
                      )}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Publikasikan</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={currentNews.is_announcement}
                      onChange={(e) => setEditedNews(prev => 
                        prev ? { ...prev, is_announcement: e.target.checked } : null
                      )}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pengumuman</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {currentNews.image_url && (
            <div className="p-8 border-b border-gray-200">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={currentNews.image_url}
                  alt={currentNews.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-8 border-b border-gray-200">
            {isEditing ? (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Konten Utama
                </label>
                <textarea
                  value={currentNews.content}
                  onChange={(e) => setEditedNews(prev => 
                    prev ? { ...prev, content: e.target.value } : null
                  )}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={8}
                  placeholder="Tulis konten berita lengkap di sini..."
                />
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <div className="text-xl text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {currentNews.content}
                </div>
              </div>
            )}
          </div>

          {/* Content Blocks */}
          <div className="p-8">
            <div className="space-y-6">
              {currentNews.content_blocks.map((block, index) => (
                <ContentBlock
                  key={block.id}
                  block={block}
                  onEdit={handleEditContentBlock}
                  onDelete={handleDeleteContentBlock}
                  onMoveUp={(blockId) => handleMoveContentBlock(blockId, 'up')}
                  onMoveDown={(blockId) => handleMoveContentBlock(blockId, 'down')}
                  isEditing={isEditing}
                  isAdmin={isAdmin}
                  isFirst={index === 0}
                  isLast={index === currentNews.content_blocks.length - 1}
                />
              ))}

              {/* Add Content Block Buttons */}
              {isAdmin && isEditing && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Tambah Konten Baru
                    </h3>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => handleAddContentBlock('text')}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Type className="w-5 h-5" />
                        Tambah Teks
                      </button>
                      <button
                        onClick={() => handleAddContentBlock('image')}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Image className="w-5 h-5" />
                        Tambah Gambar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
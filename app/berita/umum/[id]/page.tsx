// app/berita/umum/[id]/page.tsx - MAIN PAGE

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { useNotifications } from '@/components/notifications/NotificationSystem'

// Import komponen yang dipisah
import NewsHeader from '../components/NewsHeader'
import NewsEditForm from '../components/NewsEditForm'
import NewsViewMode from '../components/NewsViewMode'

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
  const { showSuccess, showError, showFileError, confirm } = useNotifications()
  
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

  const handleDeleteContentBlock = (blockId: string) => {
    console.log('Deleting content block:', blockId)
    setContentBlocks(blocks =>
      blocks.filter(block =>
        block.id !== blockId && `temp-${block.order_index}` !== blockId
      ).map((block, index) => ({ ...block, order_index: index }))
    )
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
          <NewsHeader
            isEditing={isEditing}
            currentNews={currentNews}
            contentBlocks={contentBlocks}
            formatDate={formatDate}
            isAdmin={isAdmin}
            isSaving={isSaving}
            onStartEdit={handleStartEdit}
            onSave={handleSaveChanges}
            onCancel={handleCancel}
          />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {/* News Content */}
          <div className="p-8">
            {isEditing && editedNews ? (
              <NewsEditForm
                editedNews={editedNews}
                setEditedNews={setEditedNews}
                contentBlocks={contentBlocks}
                onAddContentBlock={handleAddContentBlock}
                onEditContentBlock={handleEditContentBlock}
                onDeleteContentBlock={handleDeleteContentBlock}
                onMoveContentBlock={handleMoveContentBlock}
              />
            ) : (
              <NewsViewMode
                currentNews={currentNews}
                contentBlocks={contentBlocks}
                formatDate={formatDate}
              />
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
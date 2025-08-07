// app/berita/umum/create/page.tsx - MAIN PAGE USING COMPONENTS

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { useNotifications } from '@/components/notifications/NotificationSystem'

// Import komponen yang dipisah
import CreateNewsHeader from '../components/CreateNewsHeader'
import NewsPublicationSettings from '../components/NewsPublicationSettings'
import NewsBasicInfo from '../components/NewsBasicInfo'
import NewsContentBlocks from '../components/NewsContentBlocks'

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
}

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

export default function CreateBeritaPage() {
  const router = useRouter()
  const { showSuccess, showError, confirm } = useNotifications()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  
  // Form data state
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: '',
    is_published: false,
    is_announcement: false,
    author: 'Admin Desa',
    content_blocks: []
  })

  const handleFormUpdate = (updates: Partial<NewsFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleSubmit = async () => {
    try {
      // Validation
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

      setIsLoading(true)
      setError(null)

      console.log('=== CREATE BERITA DEBUG ===')
      console.log('Form data:', formData)
      console.log('Content blocks count:', contentBlocks.length)

      // Prepare content blocks
      const cleanedContentBlocks = contentBlocks.map((block, index) => ({
        type: block.type,
        content: block.content,
        order_index: index,
        style: block.style || (block.type === 'text' ? { textAlign: 'justify' } : { textAlign: 'left' })
      }))

      // Prepare news data
      const newsData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || '',
        image_url: formData.image_url || '',
        category: formData.category || '',
        is_published: formData.is_published || false,
        is_announcement: formData.is_announcement || false,
        author: formData.author || 'Admin Desa',
        content_blocks: cleanedContentBlocks
      }

      console.log('Sending to API:', newsData)

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal menyimpan berita')
      }

      const result = await response.json()
      
      showSuccess(
        `Berita "${formData.title}" berhasil dibuat dengan ${cleanedContentBlocks.length} content blocks!`,
        'Berhasil Membuat Berita'
      )
      
      // Redirect to news detail
      router.push(`/berita/umum/${result.id}`)
      
    } catch (err) {
      console.error('Error creating news:', err)
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan'
      setError(errorMessage)
      showError(errorMessage, 'Gagal Membuat Berita')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async () => {
    const confirmed = await confirm(
      'Apakah Anda yakin ingin membatalkan? Data yang belum disimpan akan hilang.',
      'Konfirmasi Pembatalan'
    )
    
    if (confirmed) {
      router.push('/berita/umum')
    }
  }

  // Content block management
  const handleAddContentBlock = (type: 'text' | 'subtitle' | 'image') => {
    const newBlock: ContentBlock = {
      id: `temp-${Date.now()}`,
      type,
      content: '',
      order_index: contentBlocks.length,
      style: type === 'text' 
        ? { textAlign: 'justify' } 
        : type === 'subtitle' 
        ? { textAlign: 'center' } 
        : { textAlign: 'left' }
    }
    console.log('Adding new content block with style:', newBlock)
    setContentBlocks([...contentBlocks, newBlock])
  }

  const handleEditContentBlock = (blockId: string, content: string, style?: any) => {
    console.log('Main page handleEditContentBlock:', blockId, content, style)
    setContentBlocks(blocks =>
      blocks.map(block =>
        block.id === blockId || `temp-${block.order_index}` === blockId
          ? { ...block, content, style: { ...block.style, ...style } }
          : block
      )
    )
  }

  const handleDeleteContentBlock = (blockId: string) => {
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
    
    setContentBlocks(updatedBlocks)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Berita Umum', href: '/berita/umum' },
            { label: 'Buat Berita Baru', href: '/berita/umum/create' }
          ]}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Menyimpan berita...</p>
              <p className="text-gray-500 text-sm mt-2">Mohon tunggu, jangan tutup halaman ini</p>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Header */}
          <CreateNewsHeader
            contentBlocksCount={contentBlocks.length}
            isLoading={isLoading}
            onSave={handleSubmit}
            onCancel={handleCancel}
          />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-8">
              {/* Publication Settings */}
              <NewsPublicationSettings
                formData={formData}
                onChange={handleFormUpdate}
              />

              {/* Basic Info */}
              <NewsBasicInfo
                formData={formData}
                onChange={handleFormUpdate}
              />

              {/* Content Blocks */}
              <NewsContentBlocks
                contentBlocks={contentBlocks}
                onAddContentBlock={handleAddContentBlock}
                onEditContentBlock={handleEditContentBlock}
                onDeleteContentBlock={handleDeleteContentBlock}
                onMoveContentBlock={handleMoveContentBlock}
              />
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
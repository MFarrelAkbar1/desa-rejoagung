// app/berita/umum/create/page.tsx - FIXED with NotificationSystem

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import NewsForm from '@/components/forms/NewsForm'
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { showSuccess, showError, confirm } = useNotifications()

  const handleSubmit = async (data: NewsFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('=== CREATE BERITA DEBUG ===')
      console.log('Form data received:', data)
      console.log('Content blocks count:', data.content_blocks?.length || 0)
      console.log('Content blocks detail:', data.content_blocks)

      // Prepare content blocks dengan clean temp IDs
      const cleanedContentBlocks = (data.content_blocks || []).map((block, index) => ({
        type: block.type,
        content: block.content,
        order_index: index,
        style: block.style || (block.type === 'text' ? { textAlign: 'justify' } : { textAlign: 'left' })
      }))

      // Prepare the news data for submission
      const newsData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        image_url: data.image_url || '',
        category: data.category || '',
        is_published: data.is_published || false,
        is_announcement: data.is_announcement || false,
        author: data.author || 'Admin Desa',
        // CRITICAL: Include content_blocks in main request
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

      console.log('API Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || 'Gagal menyimpan berita')
      }

      const result = await response.json()
      console.log('Success result:', result)

      // FIXED: Replace alert with showSuccess notification
      showSuccess(
        `Berita "${data.title}" berhasil dibuat dengan ${cleanedContentBlocks.length} content blocks!`,
        'Berhasil Membuat Berita'
      )
      
      // Redirect to news detail or list
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
    // FIXED: Replace window.confirm with confirm from useNotifications
    const confirmed = await confirm(
      'Apakah Anda yakin ingin membatalkan? Data yang belum disimpan akan hilang.',
      'Konfirmasi Pembatalan'
    )
    
    if (confirmed) {
      router.push('/berita/umum')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">
            <a href="/berita/umum" className="hover:text-emerald-600">
              Berita Umum
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Buat Berita Baru</span>
          </nav>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Menyimpan berita dan konten blok...</p>
              <p className="text-gray-500 text-sm mt-2">Mohon tunggu, jangan tutup halaman ini</p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <NewsForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          error={error}
          submitLabel="Simpan Berita"
          title="🆕 Buat Berita Baru"
          description="Buat berita dengan konten blok yang dapat dikustomisasi. Semua content blocks akan otomatis tersimpan bersama dengan berita."
        />
      </div>
    </div>
  )
}
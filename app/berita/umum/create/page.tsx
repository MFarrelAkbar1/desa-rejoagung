// app/berita/umum/create/page.tsx - Updated with new form structure

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NewsForm from '@/components/forms/NewsForm'

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
  content_align?: 'left' | 'center' | 'right' | 'justify'
  excerpt_align?: 'left' | 'center' | 'right' | 'justify'
}

export default function CreateBeritaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: NewsFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Submitting news data:', data)

      // Prepare the news data for submission
      const newsData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        image_url: data.image_url || '',
        category: data.category || '',
        is_published: data.is_published,
        is_announcement: data.is_announcement,
        author: data.author,
        content_align: data.content_align || 'left',
        excerpt_align: data.excerpt_align || 'left'
      }

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
      console.log('News created successfully:', result)

      // If content blocks exist, save them separately
      if (data.content_blocks && data.content_blocks.length > 0) {
        const blocksData = data.content_blocks.map(block => ({
          news_id: result.id,
          type: block.type,
          content: block.content,
          order_index: block.order_index,
          style: block.style || {}
        }))

        const blocksResponse = await fetch('/api/news/content-blocks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blocks: blocksData }),
        })

        if (!blocksResponse.ok) {
          console.warn('Failed to save content blocks, but news was created')
        }
      }

      // Redirect to news list or detail page
      router.push('/berita/umum')
      
    } catch (err) {
      console.error('Error creating news:', err)
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/berita/umum')
  }

  // Show loading state while redirecting or during form submission
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Menyimpan berita...</p>
          </div>
        </div>
      </div>
    )
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

        {/* Main Form */}
        <NewsForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          error={error}
          submitLabel="Simpan Berita"
          title="Buat Berita Baru"
          description="Buat berita dengan konten blok yang dapat dikustomisasi. Layout telah diperbarui: Informasi Tambahan dan Pengaturan Publikasi sekarang berada di atas Informasi Dasar."
        />
      </div>
    </div>
  )
}
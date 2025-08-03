// app/berita/umum/[id]/page.tsx - Main Page Component

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/auth'
import { useNotifications } from '@/components/notifications/NotificationSystem'
import Breadcrumb from '@/components/layout/Breadcrumb'
import NewsViewer from '../components/NewsViewer'
import NewsEditor from '../components/NewsEditor'

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
  const { isAdmin } = useAdminAuth()
  const { showSuccess, showError } = useNotifications()
  
  const [currentNews, setCurrentNews] = useState<NewsDetail | null>(null)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

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
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveSuccess = (updatedNews: NewsDetail) => {
    setCurrentNews(updatedNews)
    setIsEditing(false)
    showSuccess('Berita berhasil diperbarui')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
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

        {/* Content - Switch between View and Edit */}
        {isEditing && isAdmin ? (
          <NewsEditor
            news={currentNews}
            onSave={handleSaveSuccess}
            onCancel={handleCancelEdit}
          />
        ) : (
          <NewsViewer
            news={currentNews}
            contentBlocks={contentBlocks}
            isAdmin={isAdmin}
            onStartEdit={handleStartEdit}
          />
        )}
      </div>
    </div>
  )
}
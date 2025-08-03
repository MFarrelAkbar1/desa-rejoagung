// app/berita/umum/[id]/components/NewsViewer.tsx - View Component

'use client'

import { Edit3, Calendar, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ContentBlockRenderer from '@/components/News/ContentBlockRenderer'

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

interface NewsViewerProps {
  news: NewsDetail
  contentBlocks: ContentBlock[]
  isAdmin: boolean
  onStartEdit: () => void
}

export default function NewsViewer({ 
  news, 
  contentBlocks, 
  isAdmin, 
  onStartEdit 
}: NewsViewerProps) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-6">
        <div className="flex justify-between items-start">
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-2">📰 Detail Berita</h1>
            <p className="text-emerald-100">
              Terakhir diupdate: {formatDate(news.updated_at || news.created_at)}
            </p>
            <p className="text-emerald-100 text-sm mt-1">
              Content blocks: {contentBlocks.length} blok
            </p>
          </div>

          {/* Admin Edit Button - hanya tampil untuk admin */}
          {isAdmin && (
            <button
              onClick={onStartEdit}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Berita
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {news.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(news.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{news.author}</span>
            </div>
            {news.is_announcement && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                📢 Pengumuman Penting
              </span>
            )}
          </div>

          {/* Featured Image */}
          {news.image_url && (
            <div className="mb-6">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
        </div>

        {/* Content Blocks */}
        {contentBlocks.length > 0 && (
          <div className="space-y-6 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Konten Tambahan
            </h3>
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

      {/* Footer - Back Button */}
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
  )
}
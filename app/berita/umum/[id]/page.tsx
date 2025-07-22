// app/berita/umum/[id]/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter } from 'lucide-react'
import Link from 'next/link'
import { News } from '@/types/database'

export default function NewsDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.id) {
      fetchNewsDetail(params.id as string)
    }
  }, [params.id])

  const fetchNewsDetail = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`)
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      } else if (response.status === 404) {
        setError('Berita tidak ditemukan')
      } else {
        setError('Gagal memuat berita')
      }
    } catch (error) {
      console.error('Error fetching news detail:', error)
      setError('Terjadi kesalahan')
    } finally {
      setLoading(false)
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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = news ? `${news.title} - Desa Rejoagung` : ''

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)
    
    let shareLink = ''
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat berita...</p>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Berita tidak ditemukan'}
          </h1>
          <Link
            href="/berita/umum"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/berita/umum"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Link>
        </div>

        {/* Article */}
        <article className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Featured Image */}
          {news.image_url && (
            <div className="w-full h-64 md:h-96 overflow-hidden">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            
            {/* Category & Announcement Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {news.category && (
                <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {news.category}
                </span>
              )}
              {news.is_announcement && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  Pengumuman
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {news.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{news.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(news.created_at)}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              {news.content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ) : null
              ))}
            </div>

            {/* Share Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Bagikan Berita Ini
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleShare('facebook')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                    title="Bagikan ke Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('twitter')}
                    className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-full transition-colors"
                    title="Bagikan ke Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors"
                    title="Bagikan ke WhatsApp"
                  >
                    {/* WhatsApp SVG icon */}
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.028-.967-.271-.099-.468-.148-.666.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.487-.5-.666-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.373.711.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.271-.198-.571-.347z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
                    title="Salin Link"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section (Optional) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Berita Lainnya</h2>
          <div className="text-center py-8 text-gray-500">
            <p>Berita terkait akan ditampilkan di sini</p>
          </div>
        </div>
      </div>
    </div>
  )
}
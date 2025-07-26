// components/PostTerbaru.tsx - Fixed with working article links

'use client'

import { useState, useEffect } from 'react'
import { Calendar, MessageCircle, Heart, Share2, ExternalLink, ChevronDown, ChevronUp, Newspaper } from 'lucide-react'
import Link from 'next/link'

interface News {
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
  updated_at: string
}

export default function PostTerbaru() {
  const [activeTab, setActiveTab] = useState<'terbaru' | 'pengumuman'>('terbaru')
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch news from API
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?published=true')
      if (response.ok) {
        const data = await response.json()
        setNews(data.slice(0, 6)) // Limit to 6 most recent posts
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const filteredPosts = activeTab === 'pengumuman'
    ? news.filter(post => post.is_announcement)
    : news.filter(post => !post.is_announcement)

  const toggleExpand = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    return content.length > 100 ? content.substring(0, 100) + '...' : content
  }

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'pengumuman': return 'bg-red-100 text-red-800'
      case 'berita': return 'bg-blue-100 text-blue-800'
      case 'kegiatan': return 'bg-green-100 text-green-800'
      case 'ekonomi': return 'bg-yellow-100 text-yellow-800'
      case 'kesehatan': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Generate proper article URL
  const getArticleUrl = (post: News) => {
    // Jika ada slug, gunakan slug. Jika tidak, gunakan ID
    const identifier = post.slug || post.id
    
    // Tentukan path berdasarkan jenis post
    if (post.is_announcement) {
      return `/berita/pengumuman/${identifier}`
    }
    
    // Untuk berita umum, gunakan kategori jika ada
    if (post.category) {
      const categoryPath = post.category.toLowerCase().replace(/\s+/g, '-')
      return `/berita/${categoryPath}/${identifier}`
    }
    
    // Default ke berita umum
    return `/berita/umum/${identifier}`
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4">
        <h3 className="font-bold text-white text-lg flex items-center">
          <Newspaper className="w-5 h-5 mr-2" />
          Info Terkini
        </h3>
        <p className="text-emerald-100 text-sm mt-1">
          Berita dan pengumuman terbaru dari Desa Rejoagung
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('terbaru')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'terbaru'
              ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          BERITA TERBARU
        </button>
        <button
          onClick={() => setActiveTab('pengumuman')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'pengumuman'
              ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          PENGUMUMAN
        </button>
      </div>

      {/* Posts List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredPosts.length === 0 ? (
          <div className="p-6 text-center">
            <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {activeTab === 'pengumuman' ? 'Belum ada pengumuman' : 'Belum ada berita'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
              {/* Post Image */}
              {post.image_url && (
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {post.is_announcement && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      📢 Pengumuman
                    </div>
                  )}
                </div>
              )}
             
              <div className="p-4">
                {/* Category & Date */}
                <div className="flex items-center justify-between mb-2">
                  {post.category && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  )}
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.created_at)}
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">
                  {post.title}
                </h4>

                {/* Content */}
                <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                  {expandedPost === post.id
                    ? post.content.substring(0, 300) + (post.content.length > 300 ? '...' : '')
                    : getExcerpt(post.content, post.excerpt)
                  }
                </p>

                {/* Expand/Collapse Button */}
                {post.content.length > 100 && (
                  <button
                    onClick={() => toggleExpand(post.id)}
                    className="flex items-center text-emerald-600 hover:text-emerald-700 text-xs font-medium mb-3 transition-colors"
                  >
                    {expandedPost === post.id ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" />
                        Tutup
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        Baca Selengkapnya
                      </>
                    )}
                  </button>
                )}

                {/* Action Button - FIXED */}
                <Link
                  href={getArticleUrl(post)}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-xs font-medium transition-colors hover:underline"
                >
                  Baca Artikel Lengkap
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>

                {/* Author */}
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-gray-500 text-xs">
                    Oleh: {post.author}
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <Link
          href="/berita/umum"
          className="block text-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors hover:underline"
        >
          Lihat Semua Berita →
        </Link>
      </div>
    </div>
  )
}
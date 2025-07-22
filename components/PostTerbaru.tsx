// components/PostTerbaru.tsx

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
    if (!category) return 'bg-gray-100 text-gray-800'
    
    const colors: Record<string, string> = {
      'PEMBANGUNAN': 'bg-blue-100 text-blue-800',
      'KESEHATAN': 'bg-green-100 text-green-800',
      'PENDIDIKAN': 'bg-purple-100 text-purple-800',
      'EKONOMI': 'bg-yellow-100 text-yellow-800',
      'SOSIAL': 'bg-pink-100 text-pink-800',
      'KEAMANAN': 'bg-red-100 text-red-800',
      'LINGKUNGAN': 'bg-teal-100 text-teal-800'
    }
    return colors[category.toUpperCase()] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
          <h3 className="text-xl font-bold mb-2">📰 Pos Terbaru</h3>
          <p className="text-emerald-100 text-sm">Berita terkini dari Desa Rejoagung</p>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
        <h3 className="text-xl font-bold mb-2">📰 Pos Terbaru</h3>
        <p className="text-emerald-100 text-sm">Berita terkini dari Desa Rejoagung</p>
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
            <div key={post.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
              {/* Post Image */}
              {post.image_url && (
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
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

                {/* Action Button */}
                <Link
                  href={`/berita/umum/${post.slug || post.id}`}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-xs font-medium transition-colors"
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
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <Link
          href="/berita/umum"
          className="block text-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
        >
          Lihat Semua Berita →
        </Link>
      </div>
    </div>
  )
}
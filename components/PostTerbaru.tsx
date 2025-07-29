// components/PostTerbaru.tsx - Fixed with correct routing and latest announcements
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
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch news from API
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?published=true')
      if (response.ok) {
        const data = await response.json()
        
        // Debug log untuk melihat data yang diterima
        console.log('Raw news data received:', data)
        
        // Sort by created_at descending (terbaru dulu)
        const sortedData = data.sort((a: News, b: News) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        
        console.log('Sorted news data:', sortedData.slice(0, 5)) // Log 5 terbaru
        
        setNews(sortedData.slice(0, 8)) // Ambil 8 posts terbaru (berita + pengumuman)
      } else {
        console.error('Failed to fetch news:', response.status)
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

  // Tampilkan semua posts (berita + pengumuman) diurutkan berdasarkan tanggal terbaru
  const displayedPosts = news.slice(0, 6) // 6 posts terbaru

  const toggleExpand = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    const textContent = content.replace(/<[^>]+>/g, '')
    return textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent
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

  // Generate proper article URL - SEMUA MENGARAH KE /berita/umum/[id]
  const getArticleUrl = (post: News) => {
    // PENTING: SELALU gunakan ID, BUKAN slug/judul
    // Mengarah ke /berita/umum/[id] bukan /berita/umum/[judul]
    const url = `/berita/umum/${post.id}`
    
    // Debug log untuk memastikan URL benar
    console.log(`Generating URL for post "${post.title}": ${url} (using ID: ${post.id})`)
    
    return url
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
          Berita Terbaru
        </h3>
        <p className="text-emerald-100 text-sm mt-1">
          Informasi dan pengumuman terbaru dari Desa Rejoagung
        </p>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {displayedPosts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-3">
              <Newspaper className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <p className="text-gray-500 text-sm">
              Belum ada berita terbaru
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedPosts.map((post) => (
              <article
                key={post.id}
                className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  {/* Image/Icon */}
                  <div className="flex-shrink-0">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Newspaper className="w-6 h-6 text-emerald-600" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      {post.is_announcement && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                          Penting
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.created_at)}
                      </span>
                      <span>{post.author}</span>
                    </div>

                    {/* Category Badge */}
                    {post.category && (
                      <div className="mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                    )}

                    {/* Excerpt */}
                    <div className="mb-3">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {expandedPost === post.id 
                          ? post.content.replace(/<[^>]+>/g, '') 
                          : getExcerpt(post.content, post.excerpt)
                        }
                      </p>
                      
                      {post.content.length > 100 && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="text-emerald-600 text-xs mt-1 hover:text-emerald-700 flex items-center gap-1"
                        >
                          {expandedPost === post.id ? (
                            <>
                              <ChevronUp className="w-3 h-3" />
                              Tutup
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" />
                              Selengkapnya
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={getArticleUrl(post)}
                        className="text-emerald-600 hover:text-emerald-700 text-xs font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Baca selengkapnya
                      </Link>

                      <div className="flex items-center gap-3 text-gray-400">
                        <button className="hover:text-red-500 transition-colors">
                          <Heart className="w-3 h-3" />
                        </button>
                        <button className="hover:text-blue-500 transition-colors">
                          <Share2 className="w-3 h-3" />
                        </button>
                        <button className="hover:text-green-500 transition-colors">
                          <MessageCircle className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <Link
          href="/berita/umum"
          className="w-full bg-emerald-50 text-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          Lihat Semua Berita
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
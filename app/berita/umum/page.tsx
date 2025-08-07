// app/berita/umum/page.tsx - FIXED LAYOUT + WORKING DRAFT FILTER

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Trash2, Calendar, User, Eye, Newspaper, FileText } from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/auth'
import PageSearchBar from '@/components/SearchBar/PageSearchBar'
import Breadcrumb from '@/components/layout/Breadcrumb'
import DeleteConfirmation from '@/components/DeleteConfirmation'

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
  updated_at?: string
  content_blocks_count?: number
}

export default function BeritaUmumPage() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showOnlyPublished, setShowOnlyPublished] = useState(false) // 🚀 FIXED: Simplified state
  const { isAdmin } = useAdminAuth()

  // 🚀 FIXED: Fetch all news for admin, only published for public
  const fetchNews = async () => {
    try {
      // Admin gets all news, public gets only published
      const queryParam = isAdmin ? '' : '?published=true'
      const response = await fetch(`/api/news${queryParam}`)
      if (response.ok) {
        const data = await response.json()
        setNews(data || [])
        console.log('Fetched news:', data?.length || 0, 'items')
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [isAdmin])

  // 🚀 FIXED: Simplified and working filter logic
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      // Search filter
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      
      // Category filter
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      
      // 🚀 FIXED: Publication filter - only apply for admin
      const matchesPublished = !isAdmin || !showOnlyPublished || item.is_published
      
      console.log(`Item ${item.title}: search=${matchesSearch}, category=${matchesCategory}, published=${matchesPublished}`)
      
      return matchesSearch && matchesCategory && matchesPublished
    })
  }, [news, searchQuery, selectedCategory, showOnlyPublished, isAdmin])

  // Categories for filter
  const categories = useMemo(() => {
    const cats = news.map(item => item.category).filter(Boolean)
    return [...new Set(cats)]
  }, [news])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        await fetchNews()
      }
    } catch (error) {
      console.error('Error deleting news:', error)
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

  // Statistics
  const publishedCount = news.filter(n => n.is_published).length
  const draftCount = news.filter(n => !n.is_published).length
  const announcementCount = news.filter(n => n.is_announcement).length
  const totalContentBlocks = news.reduce((sum, n) => sum + (n.content_blocks_count || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-600">Memuat berita...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🚀 FIXED: Better spacing for breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumb
          items={[
            { label: 'Berita Umum', href: '/berita/umum' },
          ]}
        />
      </div>

      {/* 🚀 FIXED: Better spacing and layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section - More spacious */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 flex items-center">
                <Newspaper className="w-10 h-10 lg:w-12 lg:h-12 mr-4 text-emerald-600" />
                Berita & Informasi Desa
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-4">
                Informasi terbaru tentang kegiatan, program, dan perkembangan Desa Rejoagung
              </p>
              
              {/* Admin info */}
              {isAdmin && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-800 font-medium flex items-center">
                    <span className="text-lg mr-2">👑</span>
                    Mode Admin: Anda dapat melihat semua berita termasuk yang masih draft
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Total: {news.length} berita ({publishedCount} published, {draftCount} draft)
                  </p>
                </div>
              )}
            </div>

            {/* Admin Button */}
            {isAdmin && (
              <div className="flex-shrink-0">
                <Link
                  href="/berita/umum/create"
                  className="bg-emerald-600 text-white px-8 py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-3 shadow-lg text-lg font-medium"
                >
                  <Plus className="w-6 h-6" />
                  Buat Berita Baru
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 🚀 FIXED: Search and Filters - Better spacing */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <PageSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cari berita berdasarkan judul atau konten..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-700"
              >
                <option value="">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* 🚀 FIXED: Admin filter - simpler checkbox */}
              {isAdmin && (
                <label className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={showOnlyPublished}
                    onChange={(e) => {
                      console.log('Filter changed:', e.target.checked)
                      setShowOnlyPublished(e.target.checked)
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-blue-800">
                    Hanya yang dipublish
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Filter Status Info */}
          {isAdmin && (
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-6 text-sm">
                <span className="font-medium text-gray-800">Status filter:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  showOnlyPublished ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {showOnlyPublished ? '✅ Hanya menampilkan berita terpublikasi' : '🌟 Menampilkan semua berita'}
                </span>
                <span className="text-gray-600">
                  ({filteredNews.length} dari {news.length} berita)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 🚀 FIXED: Statistics - Better grid and spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-emerald-500 p-4 rounded-xl mr-4">
                <Newspaper className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{news.length}</div>
                <div className="text-gray-600 text-sm font-medium">Total Berita</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-500 p-4 rounded-xl mr-4">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{publishedCount}</div>
                <div className="text-gray-600 text-sm font-medium">Terpublikasi</div>
              </div>
            </div>
          </div>

          {/* Draft Count - Only for Admin */}
          {isAdmin && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center">
                <div className="bg-orange-500 p-4 rounded-xl mr-4">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{draftCount}</div>
                  <div className="text-gray-600 text-sm font-medium">Draft</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-red-500 p-4 rounded-xl mr-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{announcementCount}</div>
                <div className="text-gray-600 text-sm font-medium">Pengumuman</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-500 p-4 rounded-xl mr-4">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{totalContentBlocks}</div>
                <div className="text-gray-600 text-sm font-medium">Konten Blok</div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              {searchQuery ? `Tidak ada berita untuk "${searchQuery}"` : 
               showOnlyPublished ? 'Tidak ada berita terpublikasi' :
               'Belum ada berita'}
            </h3>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
              {isAdmin
                ? searchQuery
                  ? 'Coba kata kunci lain atau buat berita baru.'
                  : 'Klik tombol "Buat Berita Baru" untuk menambahkan berita pertama.'
                : searchQuery
                  ? 'Coba kata kunci lain.'
                  : 'Berita akan segera ditampilkan di sini.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                news={item}
                isAdmin={isAdmin}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 🚀 FIXED: Enhanced News Card Component
interface NewsCardProps {
  news: News
  isAdmin: boolean
  onDelete: (id: string) => void
}

function NewsCard({ news, isAdmin, onDelete }: NewsCardProps) {
  return (
    <article className={`bg-white rounded-2xl shadow-xl border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
      !news.is_published ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100' : 'border-gray-200'
    }`}>
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-emerald-100 to-green-100">
        {news.image_url ? (
          <img
            src={news.image_url}
            alt={news.title}
            className={`w-full h-full object-cover ${!news.is_published ? 'opacity-80' : ''}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Newspaper className="w-16 h-16 text-emerald-400" />
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {news.is_announcement && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              📢 Pengumuman
            </span>
          )}
          {!news.is_published && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse shadow-lg">
              📝 Draft
            </span>
          )}
          {news.is_published && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              ✅ Published
            </span>
          )}
        </div>

        {/* 🚀 FIXED: Admin Controls with red delete button */}
        {isAdmin && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link
              href={`/berita/umum/${news.id}`}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              title="Edit berita"
            >
              <Edit className="w-4 h-4" />
            </Link>
            
            {/* 🚀 FIXED: Red delete button */}
            <div className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg">
              <DeleteConfirmation
                onConfirm={() => onDelete(news.id)}
                title="Konfirmasi Hapus Berita"
                description={`Apakah Anda yakin ingin menghapus berita "${news.title}"?`}
                buttonClassName="p-0 text-white hover:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Calendar className="w-4 h-4" />
          <time>{new Date(news.created_at).toLocaleDateString('id-ID')}</time>
          <span>•</span>
          <User className="w-4 h-4" />
          <span>{news.author}</span>
          {!news.is_published && (
            <>
              <span>•</span>
              <span className="text-orange-600 font-medium">📝 Draft</span>
            </>
          )}
        </div>

        <h3 className={`text-xl font-bold mb-4 line-clamp-2 leading-tight ${
          !news.is_published ? 'text-orange-900' : 'text-gray-800'
        }`}>
          {news.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
          {news.excerpt || news.content}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            {news.category && (
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                {news.category}
              </span>
            )}
            {(news.content_blocks_count || 0) > 0 && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                +{news.content_blocks_count}
              </span>
            )}
          </div>
          
          <Link
            href={`/berita/umum/${news.id}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
          >
            {isAdmin && !news.is_published ? 'Edit draft →' : 'Baca →'}
          </Link>
        </div>
      </div>
    </article>
  )
}
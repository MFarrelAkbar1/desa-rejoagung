// app/berita/umum/page.tsx - MAJOR UPDATE
'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Trash2, Calendar, User, Eye, Newspaper } from 'lucide-react'
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
  const [showPublished, setShowPublished] = useState(false)
  const { isAdmin } = useAdminAuth()

  // Fetch news
  const fetchNews = async () => {
    try {
      const published = !isAdmin ? '?published=true' : ''
      const response = await fetch(`/api/news${published}`)
      if (response.ok) {
        const data = await response.json()
        setNews(data || [])
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

  // Filter news
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || item.category === selectedCategory
      const matchesPublished = !showPublished || item.is_published
      
      return matchesSearch && matchesCategory && (!isAdmin || !showPublished || matchesPublished)
    })
  }, [news, searchQuery, selectedCategory, showPublished, isAdmin])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat berita...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6">
        <Breadcrumb
          items={[
            { label: 'Berita Umum', href: '/berita/umum' },
          ]}
        />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
                <Newspaper className="w-8 h-8 mr-4 text-emerald-600" />
                Berita & Informasi Desa
              </h1>
              <p className="text-xl text-gray-600">
                Informasi terbaru tentang kegiatan, program, dan perkembangan Desa Rejoagung
              </p>
            </div>

            {/* Admin Button - CREATE INLINE */}
            {isAdmin && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/berita/umum/create"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Buat Berita Baru
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <PageSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Cari berita berdasarkan judul atau konten..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Semua Kategori</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {isAdmin && (
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={showPublished}
                    onChange={(e) => setShowPublished(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Hanya yang dipublish</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-emerald-500 p-3 rounded-xl mr-3">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">{news.length}</div>
                <div className="text-gray-600 text-sm">Total Berita</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-xl mr-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {news.filter(n => n.is_published).length}
                </div>
                <div className="text-gray-600 text-sm">Dipublikasi</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-red-500 p-3 rounded-xl mr-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {news.filter(n => n.is_announcement).length}
                </div>
                <div className="text-gray-600 text-sm">Pengumuman</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-xl mr-3">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {news.reduce((sum, n) => sum + (n.content_blocks_count || 0), 0)}
                </div>
                <div className="text-gray-600 text-sm">Konten Blok</div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery ? `Tidak ada berita untuk "${searchQuery}"` : 'Belum ada berita'}
            </h3>
            <p className="text-gray-500">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Info Section */}
        <div className="mt-16">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8">
              <h2 className="text-2xl font-bold mb-4">📰 Tentang Berita Desa</h2>
              <p className="text-emerald-100">
                Dapatkan informasi terbaru mengenai kegiatan, program, dan perkembangan Desa Rejoagung
              </p>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">📋 Kategori Berita</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Pembangunan & Infrastruktur</li>
                    <li>• Kegiatan Masyarakat</li>
                    <li>• Program Pemerintah Desa</li>
                    <li>• Ekonomi & UMKM</li>
                    <li>• Pendidikan & Kesehatan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">🔔 Cara Mendapat Update</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Kunjungi website secara berkala</li>
                    <li>• Follow media sosial desa</li>
                    <li>• Daftar newsletter (coming soon)</li>
                    <li>• Hubungi kantor desa untuk info langsung</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// News Card Component
interface NewsCardProps {
  news: News
  isAdmin: boolean
  onDelete: (id: string) => void
}

function NewsCard({ news, isAdmin, onDelete }: NewsCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-100">
        {news.image_url ? (
          <img
            src={news.image_url}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Newspaper className="w-16 h-16 text-emerald-400" />
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {news.is_announcement && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              📢 Pengumuman
            </span>
          )}
          {!news.is_published && (
            <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Draft
            </span>
          )}
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex space-x-2">
            <Link
              href={`/berita/umum/${news.id}`}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <DeleteConfirmation
              onConfirm={() => onDelete(news.id)}
              title="Konfirmasi Hapus Berita"
              description={`Apakah Anda yakin ingin menghapus berita "${news.title}"?`}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <time>{new Date(news.created_at).toLocaleDateString('id-ID')}</time>
          <span>•</span>
          <User className="w-4 h-4" />
          <span>{news.author}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {news.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {news.excerpt || news.content}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
          <div className="flex items-center gap-3">
            {news.category && (
              <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-medium">
                {news.category}
              </span>
            )}
            {(news.content_blocks_count || 0) > 0 && (
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                +{news.content_blocks_count} konten
              </span>
            )}
          </div>
          
          <Link
            href={`/berita/umum/${news.id}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Baca selengkapnya →
          </Link>
        </div>
      </div>
    </article>
  )
}
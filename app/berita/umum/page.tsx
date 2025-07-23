// app/berita/umum/page.tsx - Updated with Breadcrumb

'use client'

import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Trash2, Calendar, User, Eye, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { useAdminAuth } from '@/lib/auth'
import PageSearchBar from '@/components/SearchBar/PageSearchBar'
import Breadcrumb from '@/components/layout/Breadcrumb'
// Import forms
import AddNewsForm from './forms/add-news'
import EditNewsForm from './forms/edit-news'
import DeleteNewsForm from './forms/delete-news'

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

export default function BeritaUmumPage() {
  const { isAdmin } = useAdminAuth()
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Admin states
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [deletingNews, setDeletingNews] = useState<News | null>(null)

  // Fetch news from API
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      if (response.ok) {
        const data = await response.json()
        setNews(data)
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

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return news
    
    return news.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [news, searchQuery])

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Generate excerpt if not available
  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    return content.length > 150 ? content.substring(0, 150) + '...' : content
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50">
      {/* Breadcrumb - Tambahkan di sini */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <Breadcrumb
          items={[
            { label: 'Berita & Artikel', href: '/berita' },
            { label: 'Berita Umum', href: '/berita/umum' },
          ]}
        />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">📰 Berita Umum Desa Rejoagung</h1>
              <p className="text-emerald-100 text-base max-w-2xl">
                Informasi terkini dan berita penting dari Desa Rejoagung
              </p>
            </div>
            
            {/* Admin Controls */}
            {isAdmin && (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Tambah Berita
              </button>
            )}
          </div>

          {/* Search Section - Kotak putih */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md mb-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <Newspaper className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="font-semibold text-gray-800">Cari Berita:</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="🔍 Cari berita berdasarkan judul, konten, kategori, atau penulis..."
                      className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-800 font-medium"
                    />
                    <Newspaper className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-emerald-100 text-emerald-700 rounded-lg font-medium flex items-center justify-center">
                  <Newspaper className="w-4 h-4 mr-1" />
                  {filteredNews.length} Berita
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
              <div className="flex items-center">
                <div className="bg-blue-500 p-3 rounded-xl mr-3">
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
                  <div className="text-xl font-bold text-gray-800">{news.filter(n => n.is_published).length}</div>
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
                  <div className="text-xl font-bold text-gray-800">{news.filter(n => n.is_announcement).length}</div>
                  <div className="text-gray-600 text-sm">Pengumuman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
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
                  ? 'Coba kata kunci lain atau tambah berita baru.'
                  : 'Klik tombol "Tambah Berita" untuk menambahkan berita pertama.'
                : searchQuery
                  ? 'Coba kata kunci lain.'
                  : 'Berita akan segera ditampilkan di sini.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-100">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Newspaper className="w-16 h-16 text-emerald-400" />
                    </div>
                  )}
                  
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.is_announcement && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        📢 Pengumuman
                      </span>
                    )}
                    {!item.is_published && (
                      <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={() => setEditingNews(item)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingNews(item)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    {item.category && (
                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    )}
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(item.created_at)}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {getExcerpt(item.content, item.excerpt)}
                  </p>

                  {/* Author & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="w-4 h-4 mr-1" />
                      {item.author}
                    </div>
                    
                    <Link
                      href={`/berita/umum/${item.slug || item.id}`}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-200"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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

      {/* Admin Forms */}
      {showAddForm && (
        <AddNewsForm
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            fetchNews()
            setShowAddForm(false)
          }}
        />
      )}

      {editingNews && (
        <EditNewsForm
          news={editingNews}
          onClose={() => setEditingNews(null)}
          onSuccess={() => {
            fetchNews()
            setEditingNews(null)
          }}
        />
      )}

      {deletingNews && (
        <DeleteNewsForm
          news={deletingNews}
          onClose={() => setDeletingNews(null)}
          onSuccess={() => {
            fetchNews()
            setDeletingNews(null)
          }}
        />
      )}
    </div>
  )
}
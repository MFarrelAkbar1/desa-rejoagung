// components/Home/LatestNews.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Newspaper, ChevronRight, Calendar } from 'lucide-react'

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
  created_at: string
}

const NewsCard = ({ news }: { news: News }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    const textContent = content.replace(/<[^>]+>/g, '')
    return textContent.length > 120 ? textContent.substring(0, 120) + '...' : textContent
  }

  return (
    <Link href={`/berita/umum/${news.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 h-full">
        <div className="relative h-48 overflow-hidden">
          {news.image_url ? (
            <Image
              src={news.image_url}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-news.jpg'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-emerald-500 opacity-50" />
            </div>
          )}
          {news.category && (
            <div className="absolute top-3 right-3">
              <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                {news.category}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {getExcerpt(news.content, news.excerpt)}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(news.created_at)}
            </span>
            <span className="text-emerald-600 font-medium group-hover:text-emerald-700">
              Baca →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LatestNews() {
  const [latestNews, setLatestNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // Menggunakan endpoint yang benar dari database
        const response = await fetch('/api/news?published=true')
        if (response.ok) {
          const allNews = await response.json()
          console.log('Latest News fetched:', allNews.length)
          
          // Tampilkan semua berita tanpa filter, ambil 6 terbaru untuk grid 3 kolom
          const latestNews = allNews.slice(0, 6)
          
          setLatestNews(latestNews)
        } else {
          console.error('Failed to fetch news:', response.status)
        }
      } catch (error) {
        console.error('Error fetching latest news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestNews()
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Newspaper className="w-6 h-6 text-emerald-600" />
          <h2 className="text-3xl font-bold text-gray-800">Berita Terbaru</h2>
        </div>
        <Link 
          href="/berita/umum"
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
        >
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : latestNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada berita terbaru</p>
        </div>
      )}
    </section>
  )
}
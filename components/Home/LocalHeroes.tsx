// components/Home/LocalHeroes.tsx - OPTIMIZED VERSION

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Calendar } from 'lucide-react'
import { useLocalHeroes } from '../../hooks/useNewsData'

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

const LocalHeroCard = ({ news }: { news: News }) => {
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
        <div className="relative h-40 overflow-hidden">
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
              <Star className="w-12 h-12 text-emerald-500 opacity-50" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Hero
            </span>
          </div>
        </div>
        
        <div className="p-4">
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

export default function LocalHeroes() {
  // OPTIMIZED: Menggunakan custom hook yang di-cache
  const { localHeroes, loading, error } = useLocalHeroes()

  if (error) {
    console.error('Local Heroes Error:', error)
  }

  return (
    <section>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-8 h-8 text-yellow-500 fill-current" />
          <h2 className="text-3xl font-bold text-gray-800">Local Heroes</h2>
          <Star className="w-8 h-8 text-yellow-500 fill-current" />
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Cerita inspiratif dan pencapaian luar biasa dari masyarakat Desa Rejoagung
        </p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-40 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8 bg-yellow-50 rounded-xl border border-yellow-200">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-yellow-700 font-medium mb-2">Gagal memuat Local Heroes</p>
          <p className="text-yellow-600 text-sm">{error}</p>
        </div>
      ) : localHeroes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localHeroes.map((hero) => (
            <LocalHeroCard key={hero.id} news={hero} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Local Heroes belum tersedia</p>
        </div>
      )}
    </section>
  )
}
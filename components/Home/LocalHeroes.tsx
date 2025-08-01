// components/Home/LocalHeroes.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Calendar } from 'lucide-react'

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
  const [localHeroes, setLocalHeroes] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  // Local Heroes IDs yang dipilih
  const localHeroIds = [
    'b9525f47-3bf7-4486-abcf-e2e00f0dd19a',
    'bb8104fd-09ac-4aab-99b7-83a99d82932e', 
    '1559b53d-24f9-4a8c-8af3-a83560b16fc1'
  ]

  useEffect(() => {
    const fetchLocalHeroes = async () => {
      try {
        // Menggunakan endpoint yang benar dari database
        const response = await fetch('/api/news?published=true')
        if (response.ok) {
          const allNews = await response.json()
          console.log('All news fetched for heroes:', allNews.length)
          
          // Filter berita berdasarkan ID yang diinginkan dan urutkan sesuai array
          const heroes = localHeroIds
            .map(id => allNews.find((news: News) => news.id === id))
            .filter(hero => hero !== undefined)
          
          console.log('Local heroes found:', heroes.length)
          setLocalHeroes(heroes)
        } else {
          console.error('Failed to fetch news:', response.status)
        }
      } catch (error) {
        console.error('Error fetching local heroes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLocalHeroes()
  }, [])

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
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : localHeroes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {localHeroes.map((hero) => (
            <LocalHeroCard key={hero.id} news={hero} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Local Heroes belum tersedia</p>
        </div>
      )}
    </section>
  )
}
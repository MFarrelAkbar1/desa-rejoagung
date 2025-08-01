// components/Home/LatestCulinary.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Utensils, ChevronRight, Star } from 'lucide-react'

interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  image_url?: string
  rating?: number
  is_signature: boolean
  price?: string
  created_at: string
}

const CulinaryCard = ({ item }: { item: CulinaryItem }) => {
  const categoryConfig = {
    makanan: { color: 'bg-red-500', emoji: '🍽️', label: 'Makanan' },
    minuman: { color: 'bg-blue-500', emoji: '🥤', label: 'Minuman' },
    camilan: { color: 'bg-yellow-500', emoji: '🍪', label: 'Camilan' }
  }

  const config = categoryConfig[item.category] || categoryConfig.makanan

  const getExcerpt = (description: string) => {
    return description.length > 80 ? description.substring(0, 80) + '...' : description
  }

  return (
    <Link href={`/produk-kuliner/kuliner/${item.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 h-full">
        <div className="relative h-48 overflow-hidden">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-culinary.jpg'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
              <Utensils className="w-12 h-12 text-orange-500 opacity-50" />
            </div>
          )}
          {item.is_signature && (
            <div className="absolute top-3 left-3">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Signature
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className={`${config.color} text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1`}>
              <span>{config.emoji}</span>
              {config.label}
            </span>
          </div>
        </div>
        
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {getExcerpt(item.description)}
          </p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {item.rating && item.rating > 0 && (
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-yellow-700 font-medium">{item.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            {item.price ? (
              <span className="text-emerald-600 font-bold">
                {item.price}
              </span>
            ) : (
              <span className="text-emerald-600 font-medium group-hover:text-emerald-700">
                Lihat →
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LatestCulinary() {
  const [latestCulinary, setLatestCulinary] = useState<CulinaryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestCulinary = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('Fetching culinary data from /api/culinary...')
        
        const response = await fetch('/api/culinary')
        
        console.log('Response status:', response.status)
        console.log('Response ok:', response.ok)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Raw API response:', result)
        
        // Coba berbagai kemungkinan struktur response
        let culinaryItems: CulinaryItem[] = []
        
        if (Array.isArray(result)) {
          // Jika response langsung array
          culinaryItems = result
          console.log('Response is direct array')
        } else if (result.data && Array.isArray(result.data)) {
          // Jika response punya property data
          culinaryItems = result.data
          console.log('Response has data property')
        } else if (result.culinary && Array.isArray(result.culinary)) {
          // Jika response punya property culinary
          culinaryItems = result.culinary
          console.log('Response has culinary property')
        } else {
          console.log('Unknown response structure:', Object.keys(result))
          culinaryItems = []
        }
        
        console.log('Processed culinary items:', culinaryItems.length)
        console.log('First item:', culinaryItems[0])
        
        // Ambil 6 item kuliner terbaru untuk grid 3 kolom
        setLatestCulinary(culinaryItems.slice(0, 6))
        
      } catch (error) {
        console.error('Error fetching latest culinary:', error)
        setError(error instanceof Error ? error.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestCulinary()
  }, [])

  // Debug render
  console.log('Component render - loading:', loading, 'items:', latestCulinary.length, 'error:', error)

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Utensils className="w-6 h-6 text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-800">Kuliner Terbaru</h2>
        </div>
        <Link 
          href="/produk-kuliner/kuliner"
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
        >
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Show error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">Error: {error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 mx-auto w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      ) : latestCulinary.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestCulinary.map((item) => (
            <CulinaryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {error ? 'Gagal memuat data kuliner' : 'Tidak ada menu kuliner terbaru'}
          </p>
        </div>
      )}
    </section>
  )
}
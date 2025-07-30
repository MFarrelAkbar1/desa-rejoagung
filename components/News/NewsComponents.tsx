// components/news/NewsComponents.tsx
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Eye, TrendingUp, Clock, User, MessageSquare } from 'lucide-react'

// Interface berdasarkan struktur API backend
export interface NewsItem {
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
  views?: number
}

// Komponen untuk kartu berita
export const NewsCard = ({ news, isPopular = false }: { news: NewsItem, isPopular?: boolean }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    const textContent = content.replace(/<[^>]+>/g, '')
    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent
  }

  const getCategoryColor = (category?: string) => {
    const colors: { [key: string]: string } = {
      'Pembangunan': 'bg-blue-600',
      'Budaya': 'bg-purple-600',
      'Ekonomi': 'bg-green-600',
      'Kesehatan': 'bg-red-600',
      'Pertanian': 'bg-yellow-600',
      'Teknologi': 'bg-indigo-600',
      'Pengumuman': 'bg-orange-600'
    }
    return colors[category || ''] || 'bg-gray-600'
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isPopular ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="relative">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            width={400}
            height={240}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder-news.jpg'
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Tidak Ada Gambar Tersedia</span>
          </div>
        )}
        
        {isPopular && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <TrendingUp size={12} />
            Populer
          </div>
        )}
        
        {news.is_announcement && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            Pengumuman
          </div>
        )}
        
        {news.category && !news.is_announcement && (
          <div className={`absolute bottom-3 left-3 text-white px-2 py-1 rounded text-xs font-medium ${getCategoryColor(news.category)}`}>
            {news.category}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/berita/umum/${news.id}`}>
            {news.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {getExcerpt(news.content, news.excerpt)}
        </p>
        
        <div className="flex items-center justify-between text-xs text-black">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User size={12} />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays size={12} />
              <span>{formatDate(news.created_at)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {news.content_blocks_count && news.content_blocks_count > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare size={12} />
                <span>{news.content_blocks_count}</span>
              </div>
            )}
            {news.views && (
              <div className="flex items-center gap-1">
                <Eye size={12} />
                <span>{news.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Komponen untuk list berita kecil
export const NewsListItem = ({ news }: { news: NewsItem }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    const textContent = content.replace(/<[^>]+>/g, '')
    return textContent.length > 80 ? textContent.substring(0, 80) + '...' : textContent
  }

  return (
    <div className="flex gap-3 p-3 hover:bg-gray-50 transition-colors rounded-lg">
      {news.image_url ? (
        <Image
          src={news.image_url}
          alt={news.title}
          width={80}
          height={60}
          className="w-20 h-15 object-cover rounded flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder-news.jpg'
          }}
        />
      ) : (
        <div className="w-20 h-15 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
          <span className="text-xs text-gray-500">No Img</span>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/berita/umum/${news.id}`}>
            {news.title}
          </Link>
        </h4>
        
        <p className="text-xs text-gray-600 mt-1 line-clamp-1">
          {getExcerpt(news.content, news.excerpt)}
        </p>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <div className="flex items-center gap-1">
            <Clock size={10} />
            <span>{formatDate(news.created_at)}</span>
          </div>
          {news.views && (
            <div className="flex items-center gap-1">
              <Eye size={10} />
              <span>{news.views}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
// components/News/NewsCard.tsx
'use client'

import { Calendar, User, Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
  news: {
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
  isAdmin?: boolean
  onEdit?: (news: any) => void
  onDelete?: (news: any) => void
}

export default function NewsCard({ news, isAdmin = false, onEdit, onDelete }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getExcerpt = (content: string, excerpt?: string) => {
    if (excerpt) return excerpt
    return content.length > 180 ? content.substring(0, 180) + '...' : content
  }

  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Calendar className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">Berita Desa</p>
            </div>
          </div>
        )}
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {news.is_announcement && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              📢 Pengumuman
            </span>
          )}
          {!news.is_published && isAdmin && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              📝 Draft
            </span>
          )}
        </div>

        {/* Category Badge */}
        {news.category && (
          <div className="absolute top-4 right-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {news.category}
            </span>
          </div>
        )}

        {/* Admin Controls Overlay */}
        {isAdmin && (
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onEdit?.(news)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
              title="Edit Berita"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete?.(news)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
              title="Hapus Berita"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {news.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {getExcerpt(news.content, news.excerpt)}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(news.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{news.author}</span>
            </div>
          </div>
          
          {/* Published Status for Admin */}
          {isAdmin && (
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${news.is_published ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-xs">{news.is_published ? 'Published' : 'Draft'}</span>
            </div>
          )}
        </div>

        {/* Read More Button */}
        <Link href={`/berita/umum/${news.id}`}>
          <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Eye className="w-4 h-4" />
            Baca Selengkapnya
          </button>
        </Link>
      </div>
    </article>
  )
}
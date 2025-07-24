// components/News/NewsGrid.tsx
'use client'

import NewsCard from './NewsCard'
import { Newspaper, Search } from 'lucide-react'

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

interface NewsGridProps {
  news: News[]
  loading: boolean
  isAdmin: boolean
  searchQuery: string
  onEdit: (news: News) => void
  onDelete: (news: News) => void
}

export default function NewsGrid({ 
  news, 
  loading, 
  isAdmin, 
  searchQuery, 
  onEdit, 
  onDelete 
}: NewsGridProps) {
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Memuat berita...</p>
        </div>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            {searchQuery ? (
              <Search className="w-12 h-12 text-gray-400" />
            ) : (
              <Newspaper className="w-12 h-12 text-gray-400" />
            )}
          </div>
          
          {searchQuery ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Tidak ada berita ditemukan
              </h3>
              <p className="text-gray-600 mb-6">
                Tidak ditemukan berita yang sesuai dengan kata kunci "{searchQuery}".
                Coba gunakan kata kunci yang berbeda.
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Belum ada berita
              </h3>
              <p className="text-gray-600 mb-6">
                Saat ini belum ada berita yang dipublikasikan.
                {isAdmin && ' Silakan tambahkan berita pertama.'}
              </p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {news.map((item) => (
        <NewsCard
          key={item.id}
          news={item}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
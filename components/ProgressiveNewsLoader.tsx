// components/ProgressiveNewsLoader.tsx
'use client'

import { useNewsData } from '@/hooks/useNewsData'
import { Clock, Wifi, WifiOff } from 'lucide-react'

export function ProgressiveNewsLoader() {
  const { latestNews, loading, error } = useNewsData()

  return (
    <div className="space-y-4">
      {/* Loading Indicator */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <div className="flex items-center gap-2 text-blue-700">
            <Wifi className="w-4 h-4" />
            <span className="text-sm">Memuat berita terbaru...</span>
          </div>
        </div>
      )}

      {/* Error/Info Banner */}
      {error && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-3">
          <div className="flex items-center gap-2 text-orange-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* News Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestNews.map((news) => (
          <div key={news.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{news.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{news.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{news.category}</span>
              <span>•</span>
              <span>{new Date(news.created_at).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
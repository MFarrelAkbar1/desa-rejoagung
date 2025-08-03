// hooks/useOptimizedNews.ts - OPTIMIZED: Single fetch untuk semua komponen

import { useState, useEffect, useMemo } from 'react'

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
  updated_at: string
  views?: number
  content_blocks_count?: number
}

// Cache untuk menyimpan data news
let newsCache: NewsItem[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 menit

export const useOptimizedNews = () => {
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fungsi fetch dengan caching
  const fetchNews = async (forceRefresh = false) => {
    try {
      // Check cache terlebih dahulu
      const now = Date.now()
      if (!forceRefresh && newsCache && (now - cacheTimestamp) < CACHE_DURATION) {
        console.log('📖 Using cached news data')
        setAllNews(newsCache)
        setLoading(false)
        return
      }

      console.log('🔄 Fetching fresh news data...')
      setLoading(true)

      const response = await fetch('/api/news?published=true', {
        // Add cache control headers
        headers: {
          'Cache-Control': 'max-age=300' // 5 minutes
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const newsData: NewsItem[] = await response.json()
      console.log(`✅ Fetched ${newsData.length} news items`)

      // Update cache
      newsCache = newsData
      cacheTimestamp = now

      setAllNews(newsData)
      setError(null)

    } catch (err) {
      console.error('❌ Error fetching news:', err)
      setError(err instanceof Error ? err.message : 'Gagal memuat berita')
      
      // Fallback ke cache jika ada error
      if (newsCache) {
        console.log('📖 Fallback to cached data due to error')
        setAllNews(newsCache)
      }
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchNews()
  }, [])

  // Computed values dengan memoization untuk performa
  const computedData = useMemo(() => {
    if (allNews.length === 0) {
      return {
        latestNews: [],
        popularNews: [],
        localHeroes: [],
        announcements: []
      }
    }

    // Sort by date untuk latest news
    const latestNews = [...allNews]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6) // Ambil 6 terbaru

    // Popular news: berdasarkan views dan content blocks
    const popularNews = [...allNews]
      .filter(news => !news.is_announcement) // Exclude announcements
      .sort((a, b) => {
        const scoreA = (a.views || 0) + (a.content_blocks_count || 0) * 10
        const scoreB = (b.views || 0) + (b.content_blocks_count || 0) * 10
        return scoreB - scoreA
      })
      .slice(0, 4)

    // Local Heroes: News dengan ID spesifik
    const localHeroIds = [
      'b9525f47-3bf7-4486-abcf-e2e00f0dd19a',
      'bb8104fd-09ac-4aab-99b7-83a99d82932e',
      '1559b53d-24f9-4a8c-8af3-a83560b16fc1'
    ]
    
    const localHeroes = localHeroIds
      .map(id => allNews.find(news => news.id === id))
      .filter(hero => hero !== undefined) as NewsItem[]

    // Announcements
    const announcements = allNews
      .filter(news => news.is_announcement)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3)

    return {
      latestNews,
      popularNews,
      localHeroes,
      announcements
    }
  }, [allNews])

  // Force refresh function
  const refreshNews = () => {
    fetchNews(true)
  }

  return {
    // Raw data
    allNews,
    loading,
    error,
    
    // Computed data
    ...computedData,
    
    // Actions
    refreshNews,
    
    // Stats
    totalNews: allNews.length,
    publishedNews: allNews.filter(news => news.is_published).length,
    
    // Cache info
    cacheAge: newsCache ? Math.round((Date.now() - cacheTimestamp) / 1000) : 0,
    isCached: Boolean(newsCache && (Date.now() - cacheTimestamp) < CACHE_DURATION)
  }
}

// Hook khusus untuk beranda dengan data yang sudah difilter
export const useHomepageNews = () => {
  const { latestNews, localHeroes, loading, error, refreshNews } = useOptimizedNews()
  
  return {
    latestNews: latestNews.slice(0, 6), // Limit untuk beranda
    localHeroes,
    loading,
    error,
    refreshNews
  }
}

// Hook untuk halaman berita lengkap
export const useNewsPage = () => {
  const { allNews, loading, error, refreshNews } = useOptimizedNews()
  
  return {
    allNews,
    loading,
    error,
    refreshNews
  }
}

// Utility function untuk clear cache (misalnya setelah create/update/delete)
export const clearNewsCache = () => {
  console.log('🗑️ Clearing news cache...')
  newsCache = null
  cacheTimestamp = 0
}
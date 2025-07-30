// hooks/useNewsData.ts
import { useState, useEffect } from 'react'
import { NewsItem } from '../News/NewsComponents'

export const useNewsData = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([])
  const [popularNews, setPopularNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    try {
      setLoading(true)
      
      // Fetch berita published dengan content blocks count
      const response = await fetch('/api/news?published=true')
      
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      
      const newsData: NewsItem[] = await response.json()
      
      // Berita terbaru: diurutkan berdasarkan tanggal terbaru
      const latest = [...newsData]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 8)
      
      // Berita populer: berdasarkan content blocks, views, dan bukan pengumuman
      const popular = [...newsData]
        .filter(news => {
          return !news.is_announcement && 
                 ((news.content_blocks_count && news.content_blocks_count > 0) ||
                  (news.views && news.views > 100))
        })
        .sort((a, b) => {
          // Score berdasarkan views + content blocks
          const scoreA = (a.views || 0) + (a.content_blocks_count || 0) * 10
          const scoreB = (b.views || 0) + (b.content_blocks_count || 0) * 10
          return scoreB - scoreA
        })
        .slice(0, 4)
      
      setLatestNews(latest)
      setPopularNews(popular)
      
    } catch (err) {
      console.error('Error fetching news:', err)
      setError('Gagal memuat berita')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return {
    latestNews,
    popularNews,
    loading,
    error,
    refetch: fetchNews
  }
}
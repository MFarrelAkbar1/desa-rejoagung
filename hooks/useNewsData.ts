// hooks/useNewsData.tsx - OPTIMIZED untuk mengurangi API calls

'use client'

import { useState, useEffect, useRef } from 'react'

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

interface NewsData {
  latestNews: News[]
  localHeroes: News[]
  loading: boolean
  error: string | null
}

// Global cache untuk sharing data antar komponen
let globalNewsCache: {
  data: News[] | null
  timestamp: number
  loading: boolean
} = {
  data: null,
  timestamp: 0,
  loading: false
}

// Cache duration: 5 menit
const CACHE_DURATION = 5 * 60 * 1000

// Local Heroes IDs yang dipilih
const LOCAL_HERO_IDS = [
  'b9525f47-3bf7-4486-abcf-e2e00f0dd19a',
  'bb8104fd-09ac-4aab-99b7-83a99d82932e', 
  '1559b53d-24f9-4a8c-8af3-a83560b16fc1'
]

export function useNewsData(): NewsData {
  const [newsData, setNewsData] = useState<NewsData>({
    latestNews: [],
    localHeroes: [],
    loading: true,
    error: null
  })
  
  const fetchInProgress = useRef(false)

  useEffect(() => {
    const fetchNews = async () => {
      const now = Date.now()
      
      // Check if we have fresh cached data
      if (globalNewsCache.data && (now - globalNewsCache.timestamp) < CACHE_DURATION) {
        console.log('🎯 Using cached news data')
        processNewsData(globalNewsCache.data)
        return
      }

      // Check if fetch is already in progress
      if (globalNewsCache.loading || fetchInProgress.current) {
        console.log('⏳ Fetch already in progress, waiting...')
        
        // Wait for ongoing fetch to complete
        const checkInterval = setInterval(() => {
          if (!globalNewsCache.loading && globalNewsCache.data) {
            clearInterval(checkInterval)
            processNewsData(globalNewsCache.data)
          }
        }, 100)
        
        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkInterval)
          if (!globalNewsCache.data) {
            setNewsData(prev => ({ 
              ...prev, 
              loading: false, 
              error: 'Request timeout' 
            }))
          }
        }, 10000)
        
        return
      }

      try {
        console.log('🚀 Fetching fresh news data...')
        globalNewsCache.loading = true
        fetchInProgress.current = true
        
        const startTime = Date.now()
        const response = await fetch('/api/news?published=true')
        const endTime = Date.now()
        
        console.log(`📊 API Response time: ${endTime - startTime}ms`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const allNews = await response.json()
        console.log(`✅ Fetched ${allNews.length} news articles`)
        
        // Update global cache
        globalNewsCache = {
          data: allNews,
          timestamp: now,
          loading: false
        }
        
        processNewsData(allNews)
        
      } catch (error) {
        console.error('❌ Error fetching news:', error)
        globalNewsCache.loading = false
        setNewsData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch news'
        }))
      } finally {
        fetchInProgress.current = false
      }
    }

    const processNewsData = (allNews: News[]) => {
      try {
        // Process latest news (6 terbaru)
        const latest = allNews
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 6)
        
        // Process local heroes (filter by specific IDs)
        const heroes = LOCAL_HERO_IDS
          .map(id => allNews.find(news => news.id === id))
          .filter((hero): hero is News => hero !== undefined)
        
        console.log(`📰 Processed: ${latest.length} latest news, ${heroes.length} local heroes`)
        
        setNewsData({
          latestNews: latest,
          localHeroes: heroes,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('❌ Error processing news data:', error)
        setNewsData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to process news data'
        }))
      }
    }

    fetchNews()
  }, [])

  return newsData
}

// Hook khusus untuk latest news saja
export function useLatestNews() {
  const { latestNews, loading, error } = useNewsData()
  return { latestNews, loading, error }
}

// Hook khusus untuk local heroes saja
export function useLocalHeroes() {
  const { localHeroes, loading, error } = useNewsData()
  return { localHeroes, loading, error }
}

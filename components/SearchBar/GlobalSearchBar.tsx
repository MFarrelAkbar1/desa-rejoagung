// components/SearchBar/GlobalSearchBar.tsx

'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  type: 'berita' | 'kuliner' | 'produk'
  url: string
  excerpt?: string
  image?: string
}

interface GlobalSearchBarProps {
  placeholder?: string
  className?: string
}

export default function GlobalSearchBar({ 
  placeholder = "Cari berita, kuliner, produk...",
  className = ""
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock data - replace with real API calls
  const mockSearch = async (searchQuery: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const mockData: SearchResult[] = [
      {
        id: '1',
        title: 'Gudeg Jogja Asli',
        type: 'kuliner',
        url: '/produk-kuliner/kuliner',
        excerpt: 'Gudeg tradisional dengan cita rasa autentik'
      },
      {
        id: '2', 
        title: 'Berita Musyawarah Desa 2025',
        type: 'berita',
        url: '/berita/umum',
        excerpt: 'Pembahasan APBD dan program kerja tahun 2025'
      },
      {
        id: '3',
        title: 'Gula Merah Organik',
        type: 'produk',
        url: '/produk-kuliner/produk',
        excerpt: 'Gula merah murni tanpa bahan kimia'
      }
    ]

    return mockData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsLoading(true)
        try {
          const searchResults = await mockSearch(query)
          setResults(searchResults)
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Handle search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowResults(true)
  }

  // Handle search submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Save to recent searches
      const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5)
      setRecentSearches(newRecent)
      localStorage.setItem('recentSearches', JSON.stringify(newRecent))
      
      // Redirect to search results page
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  // Clear search
  const clearSearch = () => {
    setQuery('')
    setResults([])
    setShowResults(false)
    inputRef.current?.focus()
  }

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'berita': return 'bg-blue-100 text-blue-600'
      case 'kuliner': return 'bg-orange-100 text-orange-600' 
      case 'produk': return 'bg-green-100 text-green-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'berita': return 'Berita'
      case 'kuliner': return 'Kuliner'
      case 'produk': return 'Produk'
      default: return type
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowResults(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (query.length > 0 || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Mencari...</p>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && query.length > 2 && (
            <>
              {results.length > 0 ? (
                <div>
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Hasil Pencarian</p>
                  </div>
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-1">
                            {result.title}
                          </h4>
                          {result.excerpt && (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {result.excerpt}
                            </p>
                          )}
                        </div>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {/* View All Results */}
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="block px-4 py-3 text-center text-sm font-medium text-emerald-600 hover:bg-emerald-50 border-t border-gray-100"
                    onClick={() => setShowResults(false)}
                  >
                    Lihat semua hasil untuk "{query}"
                  </Link>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-500">Tidak ada hasil untuk "{query}"</p>
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="text-xs text-emerald-600 hover:text-emerald-700 mt-1 inline-block"
                    onClick={() => setShowResults(false)}
                  >
                    Coba pencarian lanjutan
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Recent Searches */}
          {!isLoading && query.length <= 2 && recentSearches.length > 0 && (
            <div>
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase">Pencarian Terakhir</p>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search)
                    setShowResults(false)
                    window.location.href = `/search?q=${encodeURIComponent(search)}`
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                >
                  <Search className="w-3 h-3 inline mr-2 text-gray-400" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && query.length === 0 && recentSearches.length === 0 && (
            <div className="p-4 text-center">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Mulai ketik untuk mencari...</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
// components/SearchBar/PageSearchBar.tsx

'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'

interface PageSearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
  value?: string
  showClearButton?: boolean
}

export default function PageSearchBar({ 
  placeholder = "Cari...",
  onSearch,
  className = "",
  value = "",
  showClearButton = true
}: PageSearchBarProps) {
  const [query, setQuery] = useState(value)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery) // Real-time search
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-800 font-medium"
        />
        {showClearButton && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  )
}
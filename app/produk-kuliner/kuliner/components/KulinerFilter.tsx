// app/produk-kuliner/kuliner/components/KulinerFilter.tsx
'use client'

import { Filter, Crown } from 'lucide-react'
import PageSearchBar from '@/components/SearchBar/PageSearchBar'

interface KulinerFilterProps {
  selectedCategory: string
  showSignatureOnly: boolean
  filteredCount: number
  searchQuery: string
  onCategoryChange: (category: string) => void
  onSignatureToggle: () => void
  onSearchChange: (query: string) => void
}

const categories = [
  { value: 'all', label: 'Semua Menu', color: 'bg-gray-500' },
  { value: 'makanan', label: 'Makanan', color: 'bg-red-500' },
  { value: 'minuman', label: 'Minuman', color: 'bg-blue-500' },
  { value: 'camilan', label: 'Camilan', color: 'bg-yellow-500' },
]

export default function KulinerFilter({
  selectedCategory,
  showSignatureOnly,
  filteredCount,
  searchQuery,
  onCategoryChange,
  onSignatureToggle,
  onSearchChange
}: KulinerFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left side - Search and Filters */}
        <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <PageSearchBar
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Cari menu kuliner..."
              className="w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Kategori:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.value
                      ? `${category.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Signature Toggle and Result Count */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Signature Filter */}
          <div className="flex items-center gap-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showSignatureOnly}
                onChange={onSignatureToggle}
                className="sr-only"
              />
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                showSignatureOnly ? 'bg-yellow-500' : 'bg-gray-300'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  showSignatureOnly ? 'translate-x-6' : 'translate-x-0'
                }`}>
                  {showSignatureOnly && (
                    <Crown className="w-3 h-3 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 whitespace-nowrap">
                Hanya Signature
              </span>
            </label>
          </div>

          {/* Result Count */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
            <span className="text-emerald-800 font-medium text-sm">
              {filteredCount} menu ditemukan
            </span>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || showSignatureOnly || searchQuery) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Filter aktif:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Kategori: {categories.find(c => c.value === selectedCategory)?.label}
                </span>
              )}
              {showSignatureOnly && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Menu Signature
                </span>
              )}
              {searchQuery && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  Pencarian: "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
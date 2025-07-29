// app/produk-kuliner/produk/components/ProductFilter.tsx
'use client'

import { Filter, Star } from 'lucide-react'

interface ProductFilterProps {
  selectedCategory: string
  showFeaturedOnly: boolean
  filteredCount: number
  searchQuery: string
  onCategoryChange: (category: string) => void
  onFeaturedToggle: () => void
  onSearchChange: (query: string) => void
}

const categories = [
  { value: 'all', label: 'Semua Kategori', emoji: '📦' },
  { value: 'kerajinan', label: 'Kerajinan', emoji: '🎨' },
  { value: 'makanan', label: 'Makanan Kering', emoji: '🍘' },
  { value: 'pertanian', label: 'Hasil Pertanian', emoji: '🌾' },
  { value: 'olahan', label: 'Produk Olahan', emoji: '🥫' },
  { value: 'lainnya', label: 'Lainnya', emoji: '📋' }
]

export default function ProductFilter({
  selectedCategory,
  showFeaturedOnly,
  filteredCount,
  searchQuery,
  onCategoryChange,
  onFeaturedToggle,
  onSearchChange
}: ProductFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 flex-1">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onFeaturedToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showFeaturedOnly
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Star className={`w-4 h-4 ${showFeaturedOnly ? 'fill-current' : ''}`} />
            <span>Unggulan</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>
              Menampilkan <span className="font-semibold text-emerald-600">{filteredCount}</span> produk
              {selectedCategory !== 'all' && (
                <span> dalam kategori <span className="font-medium">{categories.find(c => c.value === selectedCategory)?.label}</span></span>
              )}
              {showFeaturedOnly && <span> yang <span className="font-medium">unggulan</span></span>}
            </span>
          </div>
          
          {(selectedCategory !== 'all' || showFeaturedOnly || searchQuery) && (
            <button
              onClick={() => {
                onCategoryChange('all')
                onSearchChange('')
                if (showFeaturedOnly) onFeaturedToggle()
              }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
// app/produk-kuliner/produk/components/ProductFilter.tsx - FIXED VERSION
'use client'

import { Filter, Star, Search, X } from 'lucide-react'

interface ProductFilterProps {
  selectedCategory: string
  showFeaturedOnly: boolean
  filteredCount: number
  searchQuery: string
  onCategoryChange: (category: string) => void
  onFeaturedToggle: () => void
  onSearchChange: (query: string) => void
}

export default function ProductFilter({
  selectedCategory,
  showFeaturedOnly,
  filteredCount,
  searchQuery,
  onCategoryChange,
  onFeaturedToggle,
  onSearchChange
}: ProductFilterProps) {
  const categories = [
    { value: 'all', label: 'Semua Kategori', emoji: '📦' },
    { value: 'kerajinan', label: 'Kerajinan', emoji: '🎨' },
    { value: 'makanan', label: 'Makanan Kering', emoji: '🍘' },
    { value: 'pertanian', label: 'Hasil Pertanian', emoji: '🌾' },
    { value: 'olahan', label: 'Produk Olahan', emoji: '🥫' },
    { value: 'lainnya', label: 'Lainnya', emoji: '📋' }
  ]

  const hasActiveFilters = selectedCategory !== 'all' || showFeaturedOnly || searchQuery.length > 0

  const resetAllFilters = () => {
    onCategoryChange('all')
    onSearchChange('')
    if (showFeaturedOnly) onFeaturedToggle()
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 rounded-full">
            <Filter className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Filter Produk</h3>
            <p className="text-sm text-gray-600">Cari produk unggulan sesuai kebutuhan Anda</p>
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Reset Filter
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-sm"
            placeholder="Cari nama produk atau deskripsi..."
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Kategori Produk
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-emerald-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200'
              }`}
            >
              <span className="text-base">{category.emoji}</span>
              <span className={`${selectedCategory === category.value ? 'block' : 'hidden sm:block'}`}>
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Toggle */}
      <div className="mb-6">
        <button
          onClick={onFeaturedToggle}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border-2 ${
            showFeaturedOnly
              ? 'bg-yellow-50 text-yellow-700 border-yellow-300 shadow-md'
              : 'bg-gray-50 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 border-gray-200 hover:border-yellow-200'
          }`}
        >
          <Star className={`w-5 h-5 ${showFeaturedOnly ? 'fill-current text-yellow-500' : ''}`} />
          <span className="font-medium">Hanya Produk Unggulan</span>
          {showFeaturedOnly && (
            <span className="ml-auto bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
              Aktif
            </span>
          )}
        </button>
      </div>

      {/* Results Summary */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>
              Menampilkan <span className="font-semibold text-emerald-600">{filteredCount}</span> produk
              {selectedCategory !== 'all' && (
                <span> dalam kategori <span className="font-medium">{categories.find(c => c.value === selectedCategory)?.label}</span></span>
              )}
              {showFeaturedOnly && <span> yang <span className="font-medium">unggulan</span></span>}
              {searchQuery && <span> dengan kata kunci "<span className="font-medium">{searchQuery}</span>"</span>}
            </span>
          </div>

          {/* Active Filters Count */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-medium">
                {[
                  selectedCategory !== 'all' ? 1 : 0,
                  showFeaturedOnly ? 1 : 0,
                  searchQuery ? 1 : 0
                ].reduce((a, b) => a + b, 0)} filter aktif
              </span>
            </div>
          )}
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                {categories.find(c => c.value === selectedCategory)?.emoji}
                {categories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => onCategoryChange('all')}
                  className="ml-1 hover:bg-emerald-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {showFeaturedOnly && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                <Star className="w-3 h-3 fill-current" />
                Unggulan
                <button
                  onClick={onFeaturedToggle}
                  className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <Search className="w-3 h-3" />
                "{searchQuery}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
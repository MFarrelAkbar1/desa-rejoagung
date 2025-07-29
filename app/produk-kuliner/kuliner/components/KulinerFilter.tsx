// app/produk-kuliner/kuliner/components/KulinerFilter.tsx
'use client'

import { Filter, Crown } from 'lucide-react'

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
        {/* Left side - Filters */}
        <div className="flex-1 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-6">
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
                      ? `text-white ${category.color} shadow-md`
                      : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Signature Toggle and Count */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          {/* Signature Toggle */}
          <button
            onClick={onSignatureToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              showSignatureOnly
                ? 'bg-yellow-500 text-white shadow-md'
                : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Crown className="w-4 h-4" />
            Hanya Signature
          </button>

          {/* Results Count */}
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full">
            <span className="text-sm text-emerald-700 font-medium">
              <span className="font-bold">{filteredCount}</span> menu ditemukan
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
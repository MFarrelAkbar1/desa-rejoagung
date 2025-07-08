// components/CulinaryFilter.tsx
import { culinaryCategories } from '@/data/culinary'
import { Filter, Star } from 'lucide-react'

interface CulinaryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  showSignatureOnly: boolean
  onSignatureToggle: () => void
  categoryCount: Record<string, number>
}

export default function CulinaryFilter({
  selectedCategory,
  onCategoryChange,
  showSignatureOnly,
  onSignatureToggle,
  categoryCount
}: CulinaryFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-4 border-gray-200">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-3 rounded-xl mr-4">
          <Filter className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          🔍 Filter Kategori Kuliner
        </h2>
      </div>

      {/* Category Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* All Categories */}
        <button
          onClick={() => onCategoryChange('all')}
          className={`p-4 rounded-xl border-3 transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'bg-gray-100 border-gray-400 shadow-lg transform scale-105'
              : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:shadow-md'
          }`}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🍽️</div>
            <div className="text-xl font-bold text-gray-800">Semua Menu</div>
            <div className="text-lg text-gray-600">
              {Object.values(categoryCount).reduce((a, b) => a + b, 0)} item
            </div>
          </div>
        </button>

        {/* Individual Categories */}
        {Object.entries(culinaryCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`p-4 rounded-xl border-3 transition-all duration-300 ${
              selectedCategory === key
                ? `${category.bgColor} ${category.borderColor} shadow-lg transform scale-105`
                : `bg-gray-50 border-gray-300 hover:${category.bgColor} hover:shadow-md`
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="text-xl font-bold text-gray-800">{category.label}</div>
              <div className="text-lg text-gray-600">
                {categoryCount[key] || 0} item
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Signature Filter */}
      <div className="bg-yellow-50 border-3 border-yellow-300 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-2xl font-bold text-yellow-800">
                ⭐ Menu Signature Desa
              </h3>
              <p className="text-lg text-yellow-700">
                Tampilkan hanya menu khas yang menjadi kebanggaan desa
              </p>
            </div>
          </div>
          
          <button
            onClick={onSignatureToggle}
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
              showSignatureOnly ? 'bg-yellow-600' : 'bg-gray-300'
            }`}
          >
            <span className="sr-only">Toggle signature filter</span>
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                showSignatureOnly ? 'translate-x-9' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || showSignatureOnly) && (
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <h4 className="text-lg font-bold text-blue-800 mb-2">🏷️ Filter Aktif:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-base">
                {culinaryCategories[selectedCategory as keyof typeof culinaryCategories]?.icon} {' '}
                {culinaryCategories[selectedCategory as keyof typeof culinaryCategories]?.label}
              </span>
            )}
            {showSignatureOnly && (
              <span className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold text-base">
                ⭐ Menu Signature
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
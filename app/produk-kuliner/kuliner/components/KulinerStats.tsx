// app/produk-kuliner/kuliner/components/KulinerStats.tsx
'use client'

import { Star, MapPin, Utensils, TrendingUp } from 'lucide-react'

interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients?: string[]
  price?: string
  location?: string
  image_url?: string
  rating?: number
  is_signature: boolean
  cooking_time?: string
  serving_size?: string
  benefits?: string[]
  contact?: string
  created_at: string
  updated_at: string
}

interface KulinerStatsProps {
  items: CulinaryItem[]
}

export default function KulinerStats({ items }: KulinerStatsProps) {
  // Calculate statistics
  const totalItems = items.length
  const signatureItems = items.filter(item => item.is_signature).length
  const averageRating = items.length > 0 
    ? (items.reduce((sum, item) => sum + (item.rating || 0), 0) / items.length).toFixed(1)
    : '0.0'
  
  // Count unique locations
  const uniqueLocations = new Set(items.map(item => item.location).filter(Boolean)).size

  // Category distribution
  const categoryStats = {
    makanan: items.filter(item => item.category === 'makanan').length,
    minuman: items.filter(item => item.category === 'minuman').length,
    camilan: items.filter(item => item.category === 'camilan').length,
  }

  return (
    <div className="mb-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-emerald-500 p-3 rounded-xl mr-4">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
              <div className="text-gray-600">Total Menu</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-xl mr-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{signatureItems}</div>
              <div className="text-gray-600">Menu Signature</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-xl mr-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{uniqueLocations}+</div>
              <div className="text-gray-600">Lokasi Warung</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-xl mr-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{averageRating}</div>
              <div className="text-gray-600">Rating Rata-rata</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribusi Kategori</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-red-600 font-medium">Makanan</div>
                <div className="text-2xl font-bold text-red-700">{categoryStats.makanan}</div>
              </div>
              <div className="bg-red-500 p-2 rounded-lg">
                <Utensils className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 font-medium">Minuman</div>
                <div className="text-2xl font-bold text-blue-700">{categoryStats.minuman}</div>
              </div>
              <div className="bg-blue-500 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-yellow-600 font-medium">Camilan</div>
                <div className="text-2xl font-bold text-yellow-700">{categoryStats.camilan}</div>
              </div>
              <div className="bg-yellow-500 p-2 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
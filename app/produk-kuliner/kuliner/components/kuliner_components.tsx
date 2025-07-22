// app/produk-kuliner/kuliner/components/kuliner_components.tsx

'use client'

import { Star, MapPin, Utensils, Filter, Users, Edit, Trash2, Plus } from 'lucide-react'
import PageSearchBar from '@/components/SearchBar/PageSearchBar'
import GlobalSearchBar from '@/components/SearchBar/GlobalSearchBar'

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

interface KulinerHeaderProps {
  totalItems: number
  signatureItems: number
  isAdmin: boolean
  onAddClick: () => void
}

export function KulinerHeader({ totalItems, signatureItems, isAdmin, onAddClick }: KulinerHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">🍽️ Kuliner Lokal Desa Rejoagung</h1>
            <p className="text-emerald-100 text-lg max-w-2xl">
              Cita Rasa Autentik dengan Bahan-Bahan Lokal Berkualitas Tinggi
            </p>
          </div>
          
          {/* Admin Controls */}
          {isAdmin && (
            <button
              onClick={onAddClick}
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Kuliner
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-orange-500 p-3 rounded-xl mr-4">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{totalItems}</div>
                <div className="text-gray-600">Menu Tersedia</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
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
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-xl mr-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">6+</div>
                <div className="text-gray-600">Lokasi Warung</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-xl mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">0.0</div>
                <div className="text-gray-600">Rating Rata-rata</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


interface KulinerFilterProps {
  selectedCategory: string
  showSignatureOnly: boolean
  filteredCount: number
  searchQuery: string
  onCategoryChange: (category: string) => void
  onSignatureToggle: () => void
  onSearchChange: (query: string) => void
}

export function KulinerFilter({ 
  selectedCategory, 
  showSignatureOnly, 
  filteredCount, 
  searchQuery,
  onCategoryChange, 
  onSignatureToggle,
  onSearchChange
}: KulinerFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center">
          <div className="bg-emerald-100 p-2 rounded-lg mr-3">
            <Filter className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-semibold text-gray-800">Filter Menu:</span>
        </div>
        
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <PageSearchBar
            placeholder="🔍 Cari menu kuliner..."
            onSearch={onSearchChange}
            value={searchQuery}
            className="md:col-span-1"
          />

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-800 font-medium"
          >
            <option value="all">🍽️ Semua Kategori</option>
            <option value="makanan">🍛 Makanan</option>
            <option value="minuman">🥤 Minuman</option>
            <option value="camilan">🍪 Camilan</option>
          </select>

          {/* Signature Filter */}
          <button
            onClick={onSignatureToggle}
            className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
              showSignatureOnly
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            <Star className="w-4 h-4 mr-1" />
            Signature Only
          </button>
          
          {/* Info Badge */}
          <div className="px-4 py-3 bg-emerald-100 text-emerald-700 rounded-lg font-medium flex items-center justify-center">
            <Utensils className="w-4 h-4 mr-1" />
            Total: {filteredCount} Menu
          </div>
        </div>
      </div>
    </div>
  )
}

interface KulinerCardProps {
  item: CulinaryItem
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

export function KulinerCard({ item, isAdmin, onEdit, onDelete }: KulinerCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-100">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        
        {/* Signature Badge */}
        {item.is_signature && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Signature
          </div>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={() => onEdit(item)}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.category === 'makanan' ? 'bg-orange-100 text-orange-600' :
              item.category === 'minuman' ? 'bg-blue-100 text-blue-600' :
              'bg-green-100 text-green-600'
            }`}>
              {item.category}
            </span>
          </div>
          {item.price && (
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-600">{item.price}</div>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {item.location && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="bg-blue-100 p-1 rounded mr-2">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              {item.location}
            </div>
          )}
          {item.rating && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="bg-yellow-100 p-1 rounded mr-2">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              {item.rating}/5.0 Rating
            </div>
          )}
          {item.cooking_time && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="bg-orange-100 p-1 rounded mr-2">
                <span className="w-4 h-4 text-orange-600 text-xs">⏰</span>
              </div>
              {item.cooking_time}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {item.contact ? (
            <a
              href={`tel:${item.contact}`}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Hubungi
            </a>
          ) : (
            <span></span>
          )}
          <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-200">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  )
}

export function KulinerEmptyState({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="text-center py-16">
      <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada menu</h3>
      <p className="text-gray-500">
        {isAdmin ? 'Klik tombol "Tambah Kuliner" untuk menambahkan menu pertama.' : 'Menu kuliner akan segera ditampilkan di sini.'}
      </p>
    </div>
  )
}

export function KulinerInfo() {
  return (
    <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8">
        <h2 className="text-2xl font-bold mb-4">🍽️ Informasi Kuliner Lokal</h2>
        <p className="text-emerald-100">
          Kuliner khas Desa Rejoagung yang menggunakan bahan-bahan segar dari kebun sendiri
        </p>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Keunggulan */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">⭐ Keunggulan Kuliner Kami</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Bahan-bahan segar langsung dari kebun lokal</li>
              <li>• Resep tradisional turun temurun</li>
              <li>• Cita rasa autentik khas Jawa Timur</li>
              <li>• Harga yang ramah di kantong</li>
              <li>• Higienis dan berkualitas</li>
            </ul>
          </div>

          {/* Tips */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">💡 Tips Menikmati Kuliner</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Datang pada jam makan untuk rasa terbaik</li>
              <li>• Coba menu signature untuk pengalaman otentik</li>
              <li>• Hubungi warung untuk reservasi grup</li>
              <li>• Bawa keluarga untuk menikmati bersama</li>
              <li>• Jangan lupa foto untuk kenang-kenangan!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
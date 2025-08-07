// components/OptimizedKulinerGrid.tsx - Consistent with ProductGrid
'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Phone,
  Edit2,
  Trash2,
  Heart,
  Share2,
  ChefHat,
  Loader2,
  Search
} from 'lucide-react'

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

interface OptimizedKulinerGridProps {
  items: CulinaryItem[]
  loading: boolean
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

// Culinary Card Component - Consistent with ProductCard
const CulinaryCard = memo(({ 
  item, 
  isAdmin, 
  onEdit, 
  onDelete 
}: { 
  item: CulinaryItem
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}) => {
  const [imageError, setImageError] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'makanan': return 'bg-orange-100 text-orange-800'
      case 'minuman': return 'bg-blue-100 text-blue-800'
      case 'camilan': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'makanan': return '🍽️'
      case 'minuman': return '🥤'
      case 'camilan': return '🍪'
      default: return '🍴'
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link berhasil disalin!')
    }
  }

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {item.image_url && !imageError ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
            <ChefHat className="w-16 h-16 text-emerald-600 opacity-60" />
          </div>
        )}

        {/* Signature Badge */}
        {item.is_signature && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-current" />
            Unggulan
          </div>
        )}

        {/* Admin Actions - Direct Buttons (Same style as ProductCard) */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(item)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md shadow-md transition-colors duration-200"
              title="Edit"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-md shadow-md transition-colors duration-200"
              title="Hapus"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* User Actions */}
        {!isAdmin && (
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1.5 rounded-md shadow-md transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500'
              }`}
              title="Suka"
            >
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="bg-white/90 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 p-1.5 rounded-md shadow-md transition-all duration-200"
              title="Bagikan"
            >
              <Share2 className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Rating */}
        {item.rating && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-gray-700">{item.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-emerald-700 transition-colors duration-200">
            {item.name}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2 ${getCategoryColor(item.category)}`}>
            {getCategoryIcon(item.category)} {item.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          {/* Cooking Time & Serving */}
          {(item.cooking_time || item.serving_size) && (
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {item.cooking_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.cooking_time}</span>
                </div>
              )}
              {item.serving_size && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{item.serving_size}</span>
                </div>
              )}
            </div>
          )}

          {/* Location */}
          {item.location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          )}

          {/* Contact */}
          {item.contact && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{item.contact}</span>
            </div>
          )}
        </div>

        {/* Price */}
        {item.price && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-emerald-600 font-bold text-lg">
              {item.price}
            </span>
            <div className="text-xs text-gray-400">
              {new Date(item.created_at).toLocaleDateString('id-ID')}
            </div>
          </div>
        )}

        {/* Ingredients Preview */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Bahan utama:</p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients.slice(0, 3).map((ingredient, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {ingredient}
                </span>
              ))}
              {item.ingredients.length > 3 && (
                <span className="text-gray-400 text-xs px-1 py-1">
                  +{item.ingredients.length - 3} lainnya
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

// Main Grid Component - Consistent with ProductGrid structure
export default function OptimizedKulinerGrid({ 
  items, 
  loading, 
  isAdmin, 
  onEdit, 
  onDelete 
}: OptimizedKulinerGridProps) {
  
  // Loading State - Same as ProductGrid
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <Loader2 className="w-8 h-8 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-gray-600 mt-4 text-lg font-medium">Memuat menu kuliner...</p>
        <p className="text-gray-500 text-sm mt-1">Harap tunggu sebentar</p>
      </div>
    )
  }

  // Empty State - Same structure as ProductGrid
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <ChefHat className="w-12 h-12 text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-700 mb-2">Tidak Ada Menu Kuliner Ditemukan</h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Maaf, tidak ada menu kuliner yang sesuai dengan kriteria pencarian Anda. 
          Coba ubah filter atau kata kunci pencarian.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Coba kata kunci yang berbeda</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Pilih kategori lain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Reset semua filter</span>
          </div>
        </div>

        {/* Admin hint */}
        {isAdmin && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md">
            <p className="text-blue-700 text-sm text-center">
              <strong>Tips Admin:</strong> Tambahkan menu kuliner baru dengan mengklik tombol "Tambah Kuliner" di atas.
            </p>
          </div>
        )}
      </div>
    )
  }

  // Kuliner Grid - Same structure as ProductGrid
  return (
    <div className="space-y-6">
      {/* Grid Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700 font-medium">
            {items.length} Menu Kuliner Tersedia
          </span>
        </div>
        
        {isAdmin && (
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Mode Admin Aktif
          </div>
        )}
      </div>

      {/* Kuliner Grid - Same responsive structure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <CulinaryCard
              item={item}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {/* Grid Footer Info */}
      <div className="flex items-center justify-center pt-8 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ChefHat className="w-4 h-4" />
          <span>
            Menampilkan {items.length} dari total menu kuliner Desa Rejoagung
          </span>
        </div>
      </div>

      {/* Custom CSS for animations - Same as ProductGrid */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
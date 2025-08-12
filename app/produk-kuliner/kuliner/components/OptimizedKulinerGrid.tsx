// components/OptimizedKulinerGrid.tsx - Fixed with Navigation

'use client'

import { useState, memo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Clock,
  Users,
  Star,
  MapPin,
  Phone,
  Edit2,
  Trash2,
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

// Culinary Card Component - Now with Navigation
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
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

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

  // Navigation handler - same as in homepage
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on action buttons
    const target = e.target as HTMLElement
    if (target.closest('.admin-actions, .action-button')) {
      return
    }
    router.push(`/produk-kuliner/kuliner/${item.id}`)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: `${window.location.origin}/produk-kuliner/kuliner/${item.id}`
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/produk-kuliner/kuliner/${item.id}`)
      alert('Link berhasil disalin!')
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(item)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(item)
  }

  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {item.image_url && !imageError ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
            <ChefHat className="w-12 h-12 text-emerald-400" />
          </div>
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
          {getCategoryIcon(item.category)} {item.category}
        </div>

        {/* Signature Badge */}
        {item.is_signature && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            ⭐ Signature
          </div>
        )}

        {/* Action Buttons - Show on Hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 action-button">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/90 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="admin-actions absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleEdit}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              title="Hapus"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2">
          {/* Rating & Location Row */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            {item.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-gray-700 font-medium">{item.rating.toFixed(1)}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{item.location}</span>
              </div>
            )}
          </div>

          {/* Time & Serving Row */}
          {(item.cooking_time || item.serving_size) && (
            <div className="flex items-center justify-between text-sm text-gray-500">
              {item.cooking_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.cooking_time}</span>
                </div>
              )}
              {item.serving_size && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{item.serving_size}</span>
                </div>
              )}
            </div>
          )}

          {/* Contact & Price Row */}
          <div className="flex items-center justify-between text-sm">
            {item.contact && (
              <div className="flex items-center gap-1 text-gray-500">
                <Phone className="w-4 h-4" />
                <span className="truncate">{item.contact}</span>
              </div>
            )}
            {item.price && (
              <div className="text-emerald-600 font-bold text-base">
                {item.price}
              </div>
            )}
          </div>
        </div>

        {/* Price Section - if exists */}
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

CulinaryCard.displayName = 'CulinaryCard'

// Main Grid Component
export default function OptimizedKulinerGrid({
  items,
  loading,
  isAdmin,
  onEdit,
  onDelete
}: OptimizedKulinerGridProps) {
  
  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty State
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Search className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Tidak Ada Menu Ditemukan
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Coba ubah filter pencarian atau tambahkan menu kuliner baru.
        </p>
      </div>
    )
  }

  // Items Grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <CulinaryCard
          key={item.id}
          item={item}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
// app/produk-kuliner/produk/components/ProductCard.tsx - FIXED VERSION with Share Button

'use client'

import { Edit, Trash2, MapPin, Phone, Star, Package, Share2 } from 'lucide-react'
import Link from 'next/link'
import { ProductItem } from '../types'

interface ProductCardProps {
  item: ProductItem
  isAdmin: boolean
  onEdit: (item: ProductItem) => void
  onDelete: (item: ProductItem) => void
}

const categoryConfig: Record<string, { color: string; emoji: string; label: string }> = {
  kerajinan: { color: 'bg-purple-100 text-purple-700', emoji: '🎨', label: 'Kerajinan' },
  makanan: { color: 'bg-orange-100 text-orange-700', emoji: '🍘', label: 'Makanan Kering' },
  pertanian: { color: 'bg-green-100 text-green-700', emoji: '🌾', label: 'Hasil Pertanian' },
  olahan: { color: 'bg-blue-100 text-blue-700', emoji: '🥫', label: 'Produk Olahan' },
  lainnya: { color: 'bg-gray-100 text-gray-700', emoji: '📋', label: 'Lainnya' }
}

export default function ProductCard({ item, isAdmin, onEdit, onDelete }: ProductCardProps) {
  const categoryInfo = categoryConfig[item.category] || categoryConfig.lainnya

  // Handle admin button clicks - prevent navigation
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit(item)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete(item)
  }

  // Handle share button click
  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const productUrl = `${window.location.origin}/produk-kuliner/produk/${item.id}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: productUrl
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(productUrl)
      alert('Link berhasil disalin!')
    }
  }

  return (
    <Link href={`/produk-kuliner/produk/${item.id}`} className="block">
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative cursor-pointer">
        {/* Action Buttons - Top Right Corner */}
        <div className="absolute top-3 right-3 z-20 flex gap-1">
          {/* Share Button - Always visible */}
          <button
            onClick={handleShareClick}
            className="p-2 bg-white/90 hover:bg-emerald-50 text-emerald-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Share produk"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Admin Actions - Only for admin */}
          {isAdmin && (
            <>
              <button
                onClick={handleEditClick}
                className="p-2 bg-white/90 hover:bg-blue-50 text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Edit produk"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-2 bg-white/90 hover:bg-red-50 text-red-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Hapus produk"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Featured Badge - Top Left Corner */}
        {item.is_featured && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              <span>Unggulan</span>
            </div>
          </div>
        )}

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Category overlay */}
          <div className="absolute bottom-3 left-3">
            <div className={`${categoryInfo.color} px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md backdrop-blur-sm`}>
              <span>{categoryInfo.emoji}</span>
              <span>{categoryInfo.label}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Meta information */}
          <div className="space-y-2">
            {/* Location & Phone */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              {item.location && (
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              )}
              {item.contact && (
                <div className="flex items-center gap-1 ml-2">
                  <Phone className="w-3 h-3" />
                  <span className="text-xs">{item.contact}</span>
                </div>
              )}
            </div>

            {/* Price */}
            {item.price && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-emerald-600 font-bold text-lg">
                  {item.price}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(item.created_at).toLocaleDateString('id-ID')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
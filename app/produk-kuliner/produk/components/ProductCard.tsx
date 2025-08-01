// app/produk-kuliner/produk/components/ProductCard.tsx - FIXED VERSION with Clickable Card

'use client'

import { Edit, Trash2, MapPin, Phone, Star, Package } from 'lucide-react'
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

  return (
    <Link href={`/produk-kuliner/produk/${item.id}`} className="block">
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative cursor-pointer">
        {/* Admin Actions - Top Right Corner */}
        {isAdmin && (
          <div className="absolute top-3 right-3 z-20 flex gap-1">
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
          </div>
        )}

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
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder-product.jpg'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-colors">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="mb-3">
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
              <span>{categoryInfo.emoji}</span>
              {categoryInfo.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {item.description}
          </p>

          {/* Price and Location */}
          <div className="space-y-2">
            {item.price && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold text-lg">
                  {item.price}
                </span>
              </div>
            )}
            
            {item.location && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{item.location}</span>
              </div>
            )}

            {item.contact && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Phone className="w-4 h-4" />
                <span className="truncate">{item.contact}</span>
              </div>
            )}
          </div>

          {/* Hover effect indicator */}
          <div className="mt-4 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-emerald-600 text-sm font-medium">
              Klik untuk lihat detail →
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
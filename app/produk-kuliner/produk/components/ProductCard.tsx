// app/produk-kuliner/produk/components/ProductCard.tsx
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

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
      {/* Admin Actions - Top Right Corner */}
      {isAdmin && (
        <div className="absolute top-3 right-3 z-20 flex gap-1">
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-white/90 hover:bg-blue-50 text-blue-600 rounded-lg shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
            title="Edit produk"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-2 bg-white/90 hover:bg-red-50 text-red-600 rounded-lg shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
            title="Hapus produk"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Featured Badge */}
      {item.is_featured && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-current" />
            <span>UNGGULAN</span>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-100 overflow-hidden">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-emerald-300" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color} backdrop-blur-sm`}>
            <span>{categoryInfo.emoji}</span>
            <span>{categoryInfo.label}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {item.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {item.price && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-emerald-600 font-semibold">{item.price}</span>
            </div>
          )}
          
          {item.location && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
          )}
          
          {item.contact && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4" />
              <span>{item.contact}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* View Details */}
          <Link href={`/produk-kuliner/produk/${item.id}`}>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
              Lihat Detail →
            </button>
          </Link>
          
          {/* Optional: Add contact info or other action */}
          {item.contact && (
            <span className="text-xs text-gray-500">
              Kontak tersedia
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
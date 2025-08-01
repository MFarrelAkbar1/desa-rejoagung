// app/produk-kuliner/kuliner/components/SimpleKulinerCard.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Crown, Edit, Trash2, Eye } from 'lucide-react'

interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  image_url?: string
  rating?: number
  is_signature: boolean
  price?: string
  created_at: string
}

interface SimpleKulinerCardProps {
  item: CulinaryItem
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

// Category configuration for colors
const categoryConfig = {
  makanan: {
    color: 'bg-red-500',
    lightBg: 'bg-red-50',
    lightText: 'text-red-700',
    emoji: '🍽️'
  },
  minuman: {
    color: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-700',
    emoji: '🥤'
  },
  camilan: {
    color: 'bg-yellow-500',
    lightBg: 'bg-yellow-50',
    lightText: 'text-yellow-700',
    emoji: '🍪'
  }
}

// Format price utility
const formatPrice = (price?: string): string => {
  if (!price) return ''
  if (price.toLowerCase().startsWith('rp')) return price
  return `Rp. ${price}`
}

export default function SimpleKulinerCard({ item, isAdmin, onEdit, onDelete }: SimpleKulinerCardProps) {
  const [imageError, setImageError] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  
  const categoryInfo = categoryConfig[item.category]

  const handleImageError = () => {
    setImageError(true)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit(item)
    setShowAdminMenu(false)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete(item)
    setShowAdminMenu(false)
  }

  const handleAdminMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowAdminMenu(!showAdminMenu)
  }

  return (
    <Link href={`/produk-kuliner/kuliner/${item.id}`} className="block group">
      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 relative">
        
        {/* Signature Badge */}
        {item.is_signature && (
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Crown className="w-3 h-3" />
              Signature
            </div>
          </div>
        )}

        {/* Admin Menu */}
        {isAdmin && (
          <div className="absolute top-3 left-3 z-10">
            <div className="relative">
              <button
                onClick={handleAdminMenuToggle}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Menu admin"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
              
              {showAdminMenu && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[120px]">
                  <button
                    onClick={handleEdit}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 className="w-3 h-3" />
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Section */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {item.image_url && !imageError ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">{categoryInfo.emoji}</div>
                <p className="text-gray-500 text-sm font-medium">{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <div className={`${categoryInfo.color} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
              <span>{categoryInfo.emoji}</span>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </div>
          </div>

          {/* Rating */}
          {item.rating && item.rating > 0 && (
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {item.rating.toFixed(1)}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              {item.price ? (
                <p className="text-emerald-600 font-bold text-sm">
                  {formatPrice(item.price)}
                </p>
              ) : (
                <p className="text-gray-400 text-sm">Harga belum tersedia</p>
              )}
            </div>

            {/* View Detail Button */}
            <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:text-emerald-700">
              <Eye className="w-4 h-4 mr-1" />
              Lihat Detail
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </article>
    </Link>
  )
}
// app/produk-kuliner/kuliner/components/KulinerGrid.tsx - FIXED
'use client'

import { Star, MapPin, Clock, Users, Crown, Edit, Trash2, Phone, ChefHat, Eye, Heart, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

interface KulinerGridProps {
  items: CulinaryItem[]
  loading: boolean
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

// Utility function untuk format harga
const formatPrice = (price?: string): string => {
  if (!price) return ''
  
  // Jika sudah ada "Rp" di awal, return as is
  if (price.toLowerCase().startsWith('rp')) {
    return price
  }
  
  // Jika hanya angka atau angka dengan titik/koma, tambahkan Rp.
  const cleanPrice = price.trim()
  if (/^\d+[.,]?\d*$/.test(cleanPrice.replace(/\./g, ''))) {
    return `Rp. ${cleanPrice}`
  }
  
  // Jika format lain, tambahkan Rp. di depan
  return `Rp. ${cleanPrice}`
}

// Category colors and icons - ENHANCED
const categoryConfig = {
  makanan: {
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500',
    lightBg: 'bg-red-50',
    lightText: 'text-red-700',
    icon: ChefHat,
    label: 'Makanan',
    emoji: '🍽️'
  },
  minuman: {
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-700',
    icon: Users,
    label: 'Minuman',
    emoji: '🥤'
  },
  camilan: {
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500',
    lightBg: 'bg-yellow-50',
    lightText: 'text-yellow-700',
    icon: Star,
    label: 'Camilan',
    emoji: '🍪'
  }
}

export default function KulinerGrid({
  items,
  loading,
  isAdmin,
  onEdit,
  onDelete
}: KulinerGridProps) {
  // Loading skeleton - ENHANCED
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-200">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-8">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Empty state - ENHANCED
  if (items.length === 0) {
    return (
      <div className="text-center py-20 mb-16">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-16 max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
            <ChefHat className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Belum ada menu kuliner
          </h3>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {isAdmin 
              ? 'Klik tombol "Tambah Menu" untuk menambahkan menu kuliner pertama yang menggugah selera!' 
              : 'Menu kuliner lezat akan segera hadir untuk memanjakan lidah Anda.'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {items.map((item) => (
        <EnhancedKulinerCard
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

// ENHANCED Kuliner Card Component - FIXED
function EnhancedKulinerCard({
  item,
  isAdmin,
  onEdit,
  onDelete
}: {
  item: CulinaryItem
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}) {
  const categoryInfo = categoryConfig[item.category]
  const IconComponent = categoryInfo.icon

  return (
    <article className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group border border-gray-100 relative">
      {/* Enhanced Image Section - FIXED RATIO */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain group-hover:scale-105 transition-transform duration-700"
            style={{
              objectPosition: 'center'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement!
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center">
                  <div class="text-white text-6xl">${categoryInfo.emoji}</div>
                </div>
              `
            }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center`}>
            <div className="text-white text-6xl">{categoryInfo.emoji}</div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Admin Actions - Enhanced */}
        {isAdmin && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-3">
            <button
              onClick={() => onEdit(item)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
              title="Edit Menu"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(item)}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
              title="Hapus Menu"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Enhanced Category Badge */}
        <div className="absolute top-4 left-4">
          <div className={`bg-gradient-to-r ${categoryInfo.color} text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg`}>
            <span className="text-lg">{categoryInfo.emoji}</span>
            {categoryInfo.label}
          </div>
        </div>

        {/* Signature Badge - Enhanced */}
        {item.is_signature && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg animate-pulse">
              <Crown className="w-4 h-4" />
              SIGNATURE
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {item.rating && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-1 shadow-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {item.rating}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Content Section */}
      <div className="p-8">
        {/* Title and Price - Enhanced */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 leading-tight flex-1 pr-4">
            {item.name}
          </h3>
          {item.price && (
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-emerald-600">{formatPrice(item.price)}</div>
              <div className="text-xs text-gray-500">per porsi</div>
            </div>
          )}
        </div>

        {/* Description - Enhanced */}
        <p className="text-gray-600 mb-6 leading-relaxed text-base line-clamp-3">
          {item.description}
        </p>

        {/* Meta Information Grid - Enhanced */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {item.location && (
            <div className={`${categoryInfo.lightBg} ${categoryInfo.lightText} p-3 rounded-xl`}>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="font-medium text-xs uppercase tracking-wide">Lokasi</span>
              </div>
              <div className="text-sm font-semibold">{item.location}</div>
            </div>
          )}
          
          {item.cooking_time && (
            <div className={`${categoryInfo.lightBg} ${categoryInfo.lightText} p-3 rounded-xl`}>
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-xs uppercase tracking-wide">Waktu Masak</span>
              </div>
              <div className="text-sm font-semibold">{item.cooking_time}</div>
            </div>
          )}
        </div>

        {/* Ingredients - Enhanced */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">🧂 Bahan Utama:</h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.slice(0, 4).map((ingredient, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {ingredient}
                </span>
              ))}
              {item.ingredients.length > 4 && (
                <span className="text-gray-500 text-sm font-medium px-3 py-1">
                  +{item.ingredients.length - 4} lagi
                </span>
              )}
            </div>
          </div>
        )}

        {/* Benefits - Enhanced */}
        {item.benefits && item.benefits.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">💚 Manfaat:</h4>
            <div className="flex flex-wrap gap-2">
              {item.benefits.slice(0, 3).map((benefit, index) => (
                <span 
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons - Enhanced */}
        <div className="flex gap-3">
          {/* View Details Button */}
          <Link href={`/produk-kuliner/kuliner/${item.id}`} className="flex-1">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Eye className="w-5 h-5" />
              Lihat Detail
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          {/* Contact Button */}
          {item.contact && (
            <button
              onClick={() => window.open(`tel:${item.contact}`, '_self')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              title="Hubungi Penjual"
            >
              <Phone className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
    </article>
  )
}
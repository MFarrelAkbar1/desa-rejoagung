// app/produk-kuliner/kuliner/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Star, MapPin, Clock, Users, Crown, Edit, Trash2, 
  Phone, Share2, Heart, ChefHat, Utensils, Leaf, Timer, 
  ShoppingCart, MessageCircle 
} from 'lucide-react'
import { useAdminAuth } from '@/lib/auth'
import Breadcrumb from '@/components/layout/Breadcrumb'

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

// Category configurations
const categoryConfig = {
  makanan: {
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500',
    lightBg: 'bg-red-50',
    lightText: 'text-red-700',
    darkBg: 'bg-red-100',
    icon: ChefHat,
    label: 'Makanan',
    emoji: '🍽️'
  },
  minuman: {
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-700',
    darkBg: 'bg-blue-100',
    icon: Users,
    label: 'Minuman',
    emoji: '🥤'
  },
  camilan: {
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500',
    lightBg: 'bg-yellow-50',
    lightText: 'text-yellow-700',
    darkBg: 'bg-yellow-100',
    icon: Star,
    label: 'Camilan',
    emoji: '🍪'
  }
}

export default function KulinerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isAdmin } = useAdminAuth()
  
  const [item, setItem] = useState<CulinaryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [relatedItems, setRelatedItems] = useState<CulinaryItem[]>([])
  const [isFavorite, setIsFavorite] = useState(false)

  // Fetch culinary item detail
  const fetchCulinaryDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/culinary/${params.id}`)
      
      if (!response.ok) {
        throw new Error('Menu kuliner tidak ditemukan')
      }
      
      const data = await response.json()
      setItem(data)
      
      // Fetch related items (same category, exclude current)
      const relatedResponse = await fetch('/api/culinary')
      if (relatedResponse.ok) {
        const allItems = await relatedResponse.json()
        const related = allItems
          .filter((relatedItem: CulinaryItem) => 
            relatedItem.category === data.category && relatedItem.id !== data.id
          )
          .slice(0, 3)
        setRelatedItems(related)
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchCulinaryDetail()
    }
  }, [params.id])

  // Handle share
  const handleShare = async () => {
    if (navigator.share && item) {
      try {
        await navigator.share({
          title: item.name,
          text: item.description,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('Link berhasil disalin!')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link berhasil disalin!')
    }
  }

  // Handle admin actions
  const handleEdit = () => {
    router.push(`/produk-kuliner/kuliner?edit=${item?.id}`)
  }

  const handleDelete = async () => {
    if (!item) return
    
    const confirmed = confirm(`Apakah Anda yakin ingin menghapus "${item.name}"?`)
    if (!confirmed) return
    
    try {
      const response = await fetch(`/api/culinary/${item.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        router.push('/produk-kuliner/kuliner')
      } else {
        alert('Gagal menghapus menu')
      }
    } catch (error) {
      alert('Terjadi kesalahan')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="h-96 bg-gray-300 rounded-2xl mb-8"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Menu Tidak Ditemukan'}
          </h1>
          <p className="text-gray-600 mb-8">
            Menu kuliner yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link href="/produk-kuliner/kuliner">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
              Kembali ke Daftar Menu
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = categoryConfig[item.category]
  const IconComponent = categoryInfo.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
              { label: 'Produk & Kuliner', href: '/produk-kuliner' },
              { label: 'Kuliner', href: '/produk-kuliner/kuliner' },
              { label: item.name, href: `#` },
            ]}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link href="/produk-kuliner/kuliner">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Daftar Menu
          </button>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center`}>
                <div className="text-white text-8xl">{categoryInfo.emoji}</div>
              </div>
            )}
            
            {/* Badges on Image */}
            <div className="absolute top-6 left-6">
              <div className={`bg-gradient-to-r ${categoryInfo.color} text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg`}>
                <span className="text-xl">{categoryInfo.emoji}</span>
                {categoryInfo.label}
              </div>
            </div>
            
            {item.is_signature && (
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg">
                  <Crown className="w-5 h-5" />
                  SIGNATURE
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                {item.name}
              </h1>
              {item.rating && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(item.rating!) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{item.rating}</span>
                  <span className="text-gray-600">rating</span>
                </div>
              )}
            </div>

            {/* Price */}
            {item.price && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="text-emerald-600 text-sm font-medium mb-1">HARGA</div>
                <div className="text-3xl font-bold text-emerald-700">{item.price}</div>
                <div className="text-emerald-600 text-sm">per porsi</div>
              </div>
            )}

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {item.location && (
                <div className={`${categoryInfo.lightBg} ${categoryInfo.lightText} p-4 rounded-xl`}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium text-sm uppercase tracking-wide">Lokasi</span>
                  </div>
                  <div className="font-bold">{item.location}</div>
                </div>
              )}
              
              {item.cooking_time && (
                <div className={`${categoryInfo.lightBg} ${categoryInfo.lightText} p-4 rounded-xl`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium text-sm uppercase tracking-wide">Waktu</span>
                  </div>
                  <div className="font-bold">{item.cooking_time}</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {item.contact && (
                <button
                  onClick={() => window.open(`tel:${item.contact}`, '_self')}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  Hubungi Penjual
                </button>
              )}
              
              <button
                onClick={handleShare}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-xl transition-all duration-300 shadow-lg"
                title="Bagikan"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-4 rounded-xl transition-all duration-300 shadow-lg ${
                  isFavorite 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
                title="Favorit"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleEdit}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-5 h-5" />
                  Edit Menu
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Hapus
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Utensils className="w-6 h-6 text-emerald-500" />
            Deskripsi
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-green-500" />
                Bahan-bahan
              </h2>
              <div className="space-y-3">
                {item.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {item.benefits && item.benefits.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                Manfaat
              </h2>
              <div className="space-y-3">
                {item.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-emerald-500" />
              Menu {categoryInfo.label} Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem) => (
                <Link key={relatedItem.id} href={`/produk-kuliner/kuliner/${relatedItem.id}`}>
                  <div className="group cursor-pointer bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                    <div className="text-3xl mb-3">{categoryConfig[relatedItem.category].emoji}</div>
                    <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors mb-2">
                      {relatedItem.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedItem.description}</p>
                    {relatedItem.price && (
                      <div className="text-emerald-600 font-bold mt-3">{relatedItem.price}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// app/produk-kuliner/kuliner/[id]/page.tsx - SIMPLE FIX (hanya hapus contact button + optimasi gambar)

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, Star, MapPin, Clock, Users, Crown, Edit, Trash2,
  Share2, Heart, ChefHat, Utensils, Leaf, Timer
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

// Category configuration
const categoryConfig = {
  makanan: {
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500',
    icon: ChefHat,
    label: 'Makanan',
    emoji: '🍽️'
  },
  minuman: {
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500',
    icon: Users,
    label: 'Minuman',
    emoji: '🥤'
  },
  camilan: {
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500',
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
  const [imageError, setImageError] = useState(false)

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
      
      // Fetch related items
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
        navigator.clipboard.writeText(window.location.href)
        alert('Link berhasil disalin!')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link berhasil disalin!')
    }
  }

  // Admin actions
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
          <button
            onClick={() => router.push('/produk-kuliner/kuliner')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Kembali ke Kuliner
          </button>
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
              { label: item.name, href: `/produk-kuliner/kuliner/${item.id}` },
            ]}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link 
          href="/produk-kuliner/kuliner"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Kuliner</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section - SIMPLE OPTIMIZATION */}
          <div className="space-y-6">
            <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              {item.image_url && !imageError ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="transition-transform duration-500 hover:scale-105"
                  onError={() => setImageError(true)}
                  onLoad={(e) => {
                    // SIMPLE: Auto-detect jika gambar terlalu tinggi/vertikal
                    const img = e.target as HTMLImageElement
                    const ratio = img.naturalWidth / img.naturalHeight
                    
                    if (ratio < 0.8) {
                      // Gambar vertikal - gunakan contain + background putih
                      img.style.objectFit = 'contain'
                      img.style.backgroundColor = '#f9fafb'
                    } else {
                      // Gambar normal/horizontal - gunakan cover
                      img.style.objectFit = 'cover'
                      img.style.objectPosition = 'center'
                    }
                  }}
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
                    <p className="text-gray-500 text-lg font-medium">
                      {categoryInfo.label}
                    </p>
                  </div>
                </div>
              )}

              {/* Signature Badge */}
              {item.is_signature && (
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-500 text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Crown className="w-4 h-4" />
                    Menu Signature
                  </div>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute bottom-4 left-4">
                <div className={`${categoryInfo.bgColor} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg`}>
                  <IconComponent className="w-4 h-4" />
                  {categoryInfo.label}
                </div>
              </div>
            </div>

            {/* Action Buttons - REMOVED CONTACT BUTTON */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Favorit' : 'Tambah Favorit'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Bagikan</span>
              </button>

              {/* Admin Actions */}
              {isAdmin && (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Hapus</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {item.name}
              </h1>
              
              {/* Rating & Info */}
              <div className="flex items-center gap-6 mb-6">
                {item.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(item.rating!)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              {/* Price */}
              {item.price && (
                <div className="mb-6">
                  <div className="inline-block bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      {item.price.startsWith('Rp') ? item.price : `Rp. ${item.price}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cooking Time */}
              {item.cooking_time && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Timer className="w-6 h-6 text-orange-500" />
                    <h3 className="font-semibold text-gray-800">Waktu Masak</h3>
                  </div>
                  <p className="text-gray-600">{item.cooking_time}</p>
                </div>
              )}

              {/* Serving Size */}
              {item.serving_size && (
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold text-gray-800">Porsi</h3>
                  </div>
                  <p className="text-gray-600">{item.serving_size}</p>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Bahan-bahan</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {item.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700"
                    >
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {item.benefits && item.benefits.length > 0 && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Manfaat</h3>
                </div>
                <ul className="space-y-2">
                  {item.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Menu Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/produk-kuliner/kuliner/${relatedItem.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className="relative h-48 bg-gray-100">
                      {relatedItem.image_url ? (
                        <Image
                          src={relatedItem.image_url}
                          alt={relatedItem.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-3xl">{categoryConfig[relatedItem.category].emoji}</div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {relatedItem.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedItem.description}
                      </p>
                      {relatedItem.price && (
                        <div className="mt-3">
                          <span className="text-emerald-600 font-bold">
                            {relatedItem.price.startsWith('Rp') ? relatedItem.price : `Rp. ${relatedItem.price}`}
                          </span>
                        </div>
                      )}
                    </div>
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
// app/produk-kuliner/produk/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Phone, 
  Star, 
  Calendar,
  Edit,
  Trash2,
  Share2
} from 'lucide-react'
import { ProductItem } from '../types'
import EditProductModal from '../components/EditProductModal'

const categoryConfig: Record<string, { color: string; emoji: string; label: string }> = {
  kerajinan: { color: 'bg-purple-100 text-purple-700', emoji: '🎨', label: 'Kerajinan' },
  makanan: { color: 'bg-orange-100 text-orange-700', emoji: '🍘', label: 'Makanan Kering' },
  pertanian: { color: 'bg-green-100 text-green-700', emoji: '🌾', label: 'Hasil Pertanian' },
  olahan: { color: 'bg-blue-100 text-blue-700', emoji: '🥫', label: 'Produk Olahan' },
  lainnya: { color: 'bg-gray-100 text-gray-700', emoji: '📋', label: 'Lainnya' }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<ProductItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<ProductItem[]>([])

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id as string)
      checkAdminStatus()
    }
  }, [params.id])

  const loadProduct = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const result = await response.json()
      const products = result.data || result || []
      
      const foundProduct = products.find((p: ProductItem) => p.id === id)
      
      if (foundProduct) {
        setProduct(foundProduct)
        
        // Load related products (same category, excluding current)
        const related = products
          .filter((p: ProductItem) => p.category === foundProduct.category && p.id !== id)
          .slice(0, 3)
        setRelatedProducts(related)
      } else {
        setError('Produk tidak ditemukan')
      }
    } catch (err) {
      console.error('Error loading product:', err)
      setError('Gagal memuat produk')
    } finally {
      setLoading(false)
    }
  }

  const checkAdminStatus = () => {
    // Replace with your admin check logic
    setIsAdmin(process.env.NODE_ENV === 'development')
  }

  const handleDelete = async () => {
    if (!product) return

    try {
      const response = await fetch(`/api/products?id=${product.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/produk-kuliner/produk')
      } else {
        const errorData = await response.json()
        alert(`Gagal menghapus produk: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Terjadi kesalahan saat menghapus produk')
    }
  }

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link berhasil disalin!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Memuat produk...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">{error || 'Produk yang Anda cari tidak tersedia'}</p>
          <Link href="/produk-kuliner/produk">
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Kembali ke Daftar Produk
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = categoryConfig[product.category] || categoryConfig.lainnya

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/produk-kuliner/produk"
              className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali ke Produk</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Bagikan produk"
              >
                <Share2 className="w-5 h-5" />
              </button>

              {isAdmin && (
                <>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit produk"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus produk"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Product Header */}
          <div className="relative">
            {/* Product Image */}
            <div className="h-64 md:h-80 bg-gradient-to-br from-emerald-100 to-green-100 relative overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-24 h-24 text-emerald-300" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color} backdrop-blur-sm`}>
                  <span>{categoryInfo.emoji}</span>
                  <span>{categoryInfo.label}</span>
                </span>
                
                {product.is_featured && (
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>UNGGULAN</span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              {product.price && (
                <div className="text-2xl font-bold text-emerald-600 mb-6">
                  {product.price}
                </div>
              )}

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Product Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {product.location && (
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Lokasi Produksi</h3>
                      <p className="text-gray-600">{product.location}</p>
                    </div>
                  </div>
                )}

                {product.contact && (
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg mt-1">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Kontak</h3>
                      <p className="text-gray-600">{product.contact}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-1">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Ditambahkan</h3>
                    <p className="text-gray-600">
                      {new Date(product.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              {product.contact && (
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Tertarik dengan Produk Ini?</h3>
                  <p className="text-emerald-100 mb-4">
                    Hubungi langsung untuk informasi lebih lanjut dan pemesanan
                  </p>
                  <div className="flex justify-center">
                    <span className="bg-white/20 px-4 py-2 rounded-lg">
                      📞 {product.contact}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Produk Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/produk-kuliner/produk/${relatedProduct.id}`}>
                  <div className="group cursor-pointer bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                    <div className="text-3xl mb-3">{categoryConfig[relatedProduct.category].emoji}</div>
                    <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedProduct.description}</p>
                    {relatedProduct.price && (
                      <div className="text-emerald-600 font-bold mt-3">{relatedProduct.price}</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showEditModal && product && (
        <EditProductModal
          item={product}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false)
            loadProduct(product.id)
          }}
        />
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Hapus Produk</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus produk <strong>"{product.name}"</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
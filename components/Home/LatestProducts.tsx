// components/Home/LatestProducts.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, ChevronRight, Star } from 'lucide-react'

interface Product {
  id: string
  name: string
  category: string
  price?: string
  image_url?: string
  description: string
  is_featured: boolean
  created_at: string
}

const ProductCard = ({ product }: { product: Product }) => {
  const getExcerpt = (description: string) => {
    return description.length > 80 ? description.substring(0, 80) + '...' : description
  }

  return (
    <Link href={`/produk-kuliner/produk/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 h-full">
        <div className="relative h-48 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-product.jpg'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <Package className="w-12 h-12 text-green-500 opacity-50" />
            </div>
          )}
          {product.is_featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Unggulan
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {getExcerpt(product.description)}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">
              {product.category}
            </span>
            {product.price ? (
              <span className="text-emerald-600 font-bold">
                {product.price}
              </span>
            ) : (
              <span className="text-emerald-600 font-medium group-hover:text-emerald-700">
                Lihat →
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function LatestProducts() {
  const [latestProducts, setLatestProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const result = await response.json()
          const products = result.data || []
          
          // Ambil 5 produk terbaru
          setLatestProducts(products.slice(0, 5))
        } else {
          console.error('Failed to fetch products:', response.status)
        }
      } catch (error) {
        console.error('Error fetching latest products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestProducts()
  }, [])

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Produk Terbaru</h2>
        </div>
        <Link 
          href="/produk-kuliner/produk"
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
        >
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : latestProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada produk terbaru</p>
        </div>
      )}
    </section>
  )
}
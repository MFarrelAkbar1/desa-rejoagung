// app/produk-kuliner/produk/components/produk_components.tsx

'use client'

import Image from 'next/image'
import { Package, Star, MapPin, Plus, Edit, Trash2, Award, Users, Factory } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  price?: string
  image_url?: string
  category?: string
  is_featured: boolean
  contact?: string
  location?: string
  created_at: string
  updated_at: string
}

interface ProdukHeaderProps {
  totalProducts: number
  featuredProducts: number
  isAdmin: boolean
  onAddClick: () => void
}

export function ProdukHeader({ totalProducts, featuredProducts, isAdmin, onAddClick }: ProdukHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">📦 Produk Unggulan Desa Rejoagung</h1>
            <p className="text-emerald-100 text-lg max-w-2xl">
              Produk-produk berkualitas hasil karya masyarakat Desa Rejoagung yang telah dikenal luas
            </p>
          </div>
          
          {/* Admin Controls */}
          {isAdmin && (
            <button
              onClick={onAddClick}
              className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Tambah Produk
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-xl mr-4">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{totalProducts}</div>
                <div className="text-gray-600">Total Produk</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-xl mr-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{featuredProducts}</div>
                <div className="text-gray-600">Produk Unggulan</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-xl mr-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">50+</div>
                <div className="text-gray-600">Pengrajin</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-xl mr-4">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">5</div>
                <div className="text-gray-600">Lokasi Produksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProdukFilterProps {
  totalProducts: number
}

export function ProdukFilter({ totalProducts }: ProdukFilterProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="bg-emerald-100 p-2 rounded-lg mr-3">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="font-semibold text-gray-800">Filter Produk:</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Featured Filter */}
          <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-medium flex items-center hover:bg-yellow-200 transition-colors">
            <Star className="w-4 h-4 mr-1" />
            Produk Unggulan
          </button>
          
          {/* Category Info */}
          <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium flex items-center">
            <Package className="w-4 h-4 mr-1" />
            Total: {totalProducts} Produk
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProdukCardProps {
  product: Product
  isAdmin: boolean
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProdukCard({ product, isAdmin, onEdit, onDelete }: ProdukCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="w-16 h-16 text-emerald-400" />
          </div>
        )}
        
        {/* Featured Badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="w-4 h-4 mr-1" />
            Unggulan
          </div>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
            {product.category && (
              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
            )}
          </div>
          {product.price && (
            <div className="text-right">
              <div className="text-lg font-bold text-emerald-600">{product.price}</div>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          {product.location && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="bg-blue-100 p-1 rounded mr-2">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              {product.location}
            </div>
          )}
          {product.contact && (
            <div className="flex items-center text-gray-600 text-sm">
              <div className="bg-green-100 p-1 rounded mr-2">
                <span className="w-4 h-4 text-green-600 text-xs">📞</span>
              </div>
              Kontak tersedia
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          {product.contact ? (
            <a
              href={`tel:${product.contact}`}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Hubungi
            </a>
          ) : (
            <span></span>
          )}
          <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-200">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProdukEmptyState({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="text-center py-16">
      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum ada produk</h3>
      <p className="text-gray-500">
        {isAdmin ? 'Klik tombol "Tambah Produk" untuk menambahkan produk unggulan pertama.' : 'Produk unggulan akan segera ditampilkan di sini.'}
      </p>
    </div>
  )
}

export function ProdukInfo() {
  return (
    <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          📦 Informasi Produk Unggulan
        </h2>
        <p className="text-emerald-100">
          Produk-produk unggulan Desa Rejoagung diproduksi dengan kualitas terbaik dan telah tersebar ke berbagai daerah
        </p>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Keunggulan */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              🌿 Keunggulan Produk
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Dibuat dengan bahan-bahan alami dan berkualitas</li>
              <li>• Proses produksi tradisional turun temurun</li>
              <li>• Telah tersebar ke berbagai kota besar</li>
              <li>• Mendukung ekonomi masyarakat lokal</li>
              <li>• Ramah lingkungan dan berkelanjutan</li>
            </ul>
          </div>

          {/* Dukungan */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              ❤️ Dukungan Pemerintah Desa
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Pelatihan keterampilan untuk pengrajin</li>
              <li>• Bantuan pemasaran dan promosi</li>
              <li>• Pendampingan teknis produksi</li>
              <li>• Akses ke pasar yang lebih luas</li>
              <li>• Sertifikasi kualitas produk</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h4 className="font-semibold text-emerald-800 mb-2">Tertarik dengan produk kami?</h4>
          <p className="text-emerald-700 text-sm mb-4">
            Hubungi kontak yang tertera pada setiap produk untuk informasi lebih lanjut dan pemesanan.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-emerald-600">
            <span>📞 Telepon langsung ke pengrajin</span>
            <span>🚚 Pengiriman ke seluruh Indonesia</span>
            <span>✅ Kualitas terjamin</span>
          </div>
        </div>
      </div>
    </div>
  )
}
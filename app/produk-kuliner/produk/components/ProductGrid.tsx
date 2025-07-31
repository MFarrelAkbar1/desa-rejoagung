// app/produk-kuliner/produk/components/ProductGrid.tsx - FIXED VERSION
'use client'

import { Package, Loader2, Search } from 'lucide-react'
import ProductCard from './ProductCard'
import { ProductItem } from '../types'

interface ProductGridProps {
  items: ProductItem[]
  loading: boolean
  isAdmin: boolean
  onEdit: (item: ProductItem) => void
  onDelete: (item: ProductItem) => void
}

export default function ProductGrid({
  items,
  loading,
  isAdmin,
  onEdit,
  onDelete
}: ProductGridProps) {
  
  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
          <Loader2 className="w-8 h-8 text-emerald-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-gray-600 mt-4 text-lg font-medium">Memuat produk unggulan...</p>
        <p className="text-gray-500 text-sm mt-1">Harap tunggu sebentar</p>
      </div>
    )
  }

  // Empty State
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-700 mb-2">Tidak Ada Produk Ditemukan</h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          Maaf, tidak ada produk yang sesuai dengan kriteria pencarian Anda. 
          Coba ubah filter atau kata kunci pencarian.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Coba kata kunci yang berbeda</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Pilih kategori lain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Reset semua filter</span>
          </div>
        </div>

        {/* Admin hint */}
        {isAdmin && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md">
            <p className="text-blue-700 text-sm text-center">
              <strong>Tips Admin:</strong> Tambahkan produk baru dengan mengklik tombol "Tambah Produk" di atas.
            </p>
          </div>
        )}
      </div>
    )
  }

  // Products Grid
  return (
    <div className="space-y-6">
      {/* Grid Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-gray-700 font-medium">
            {items.length} Produk Tersedia
          </span>
        </div>
        
        {isAdmin && (
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Mode Admin Aktif
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <ProductCard
              item={item}
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {/* Grid Footer Info */}
      <div className="flex items-center justify-center pt-8 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Package className="w-4 h-4" />
          <span>
            Menampilkan {items.length} dari total produk unggulan Desa Rejoagung
          </span>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
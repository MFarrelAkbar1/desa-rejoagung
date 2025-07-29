// app/produk-kuliner/produk/components/ProductGrid.tsx
'use client'

import { Package, Loader2 } from 'lucide-react'
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
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Memuat produk unggulan...</p>
        </div>
      </div>
    )
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Belum Ada Produk
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Saat ini belum ada produk unggulan yang sesuai dengan filter yang dipilih.
        </p>
        {isAdmin && (
          <p className="text-sm text-gray-500">
            Sebagai admin, Anda dapat menambahkan produk baru dengan tombol "Tambah Produk" di atas.
          </p>
        )}
      </div>
    )
  }

  // Grid with products
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ProductCard
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
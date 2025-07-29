// app/produk-kuliner/produk/components/ProductPageHeader.tsx
'use client'

import { Plus, Package } from 'lucide-react'

interface ProductPageHeaderProps {
  isAdmin: boolean
  totalItems: number
  filteredCount: number
  onAddProduct: () => void
}

export default function ProductPageHeader({
  isAdmin,
  totalItems,
  filteredCount,
  onAddProduct
}: ProductPageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          {/* Title & Description */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Produk Unggulan</h1>
                <p className="text-emerald-100 text-lg">Desa Rejoagung</p>
              </div>
            </div>
            <p className="text-emerald-100 text-base max-w-2xl leading-relaxed">
              Temukan berbagai produk unggulan berkualitas tinggi dari Desa Rejoagung
              yang diproduksi dengan bahan lokal dan keahlian tradisional.
            </p>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
            {/* Stats */}
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-bold">{totalItems}</div>
                <div className="text-emerald-100 text-sm">Total Produk</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                <div className="text-2xl font-bold">{filteredCount}</div>
                <div className="text-emerald-100 text-sm">Ditampilkan</div>
              </div>
            </div>

            {/* Add Button - Only for Admin */}
            {isAdmin && (
              <button
                onClick={onAddProduct}
                className="flex items-center justify-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span>Tambah Produk</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
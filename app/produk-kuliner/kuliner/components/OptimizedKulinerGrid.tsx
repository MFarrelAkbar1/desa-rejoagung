// app/produk-kuliner/kuliner/components/OptimizedKulinerGrid.tsx - NEW COMPONENT

'use client'

import { useMemo } from 'react'
import SimpleKulinerCard from './SimpleKulinerCard'
import { ChefHat } from 'lucide-react'

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

interface OptimizedKulinerGridProps {
  items: CulinaryItem[]
  loading: boolean
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

// Optimized Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Optimized Empty State
function EmptyState({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
        <ChefHat className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Belum Ada Menu Kuliner
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        {isAdmin 
          ? 'Klik tombol "Tambah Menu" untuk menambahkan menu kuliner pertama yang menggugah selera!'
          : 'Menu kuliner lezat akan segera hadir untuk memanjakan lidah Anda.'
        }
      </p>
      {isAdmin && (
        <div className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 inline-block">
          💡 Tip: Tambahkan foto yang menarik untuk menarik perhatian pengunjung
        </div>
      )}
    </div>
  )
}

export default function OptimizedKulinerGrid({ items, loading, isAdmin, onEdit, onDelete }: OptimizedKulinerGridProps) {
  // Memoize sorted items for better performance
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      // Signature items first
      if (a.is_signature && !b.is_signature) return -1
      if (!a.is_signature && b.is_signature) return 1
      
      // Then by creation date (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }, [items])

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  // Empty state
  if (!sortedItems.length) {
    return <EmptyState isAdmin={isAdmin} />
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Menu Kuliner Desa
          </h2>
          <p className="text-gray-600 mt-1">
            Ditemukan {sortedItems.length} menu lezat untuk Anda
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">
              {sortedItems.filter(item => item.is_signature).length}
            </div>
            <div className="text-xs text-gray-500">Signature</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {sortedItems.filter(item => item.rating && item.rating >= 4).length}
            </div>
            <div className="text-xs text-gray-500">Rating 4+</div>
          </div>
        </div>
      </div>

      {/* Grid Layout - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <SimpleKulinerCard
            key={item.id}
            item={item}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Bottom Info */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          Menampilkan semua {sortedItems.length} menu kuliner • 
          <span className="text-emerald-600 font-medium ml-1">
            {sortedItems.filter(item => item.is_signature).length} menu signature tersedia
          </span>
        </p>
      </div>
    </div>
  )
}
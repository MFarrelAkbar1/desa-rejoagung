// app/produk-kuliner/kuliner/components/KulinerPageHeader.tsx
'use client'

import { Plus, Utensils } from 'lucide-react'

interface KulinerPageHeaderProps {
  isAdmin: boolean
  totalItems: number
  filteredCount: number
  onAddKuliner: () => void
}

export default function KulinerPageHeader({
  isAdmin,
  totalItems,
  filteredCount,
  onAddKuliner
}: KulinerPageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          {/* Title & Description */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Utensils className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Kuliner Lokal</h1>
                <p className="text-emerald-100 text-lg">Desa Rejoagung</p>
              </div>
            </div>
            <p className="text-emerald-100 text-base max-w-2xl leading-relaxed">
              Nikmati cita rasa autentik kuliner khas Desa Rejoagung yang dibuat dengan 
              bahan-bahan segar dari kebun lokal dan resep turun temurun.
            </p>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalItems}</div>
                <div className="text-emerald-100 text-sm">Menu Tersedia</div>
              </div>
            </div>

            {/* Admin Action */}
            {isAdmin && (
              <button
                onClick={onAddKuliner}
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
              >
                <Plus className="w-5 h-5" />
                Tambah Menu
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
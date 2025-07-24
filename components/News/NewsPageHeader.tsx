// components/News/NewsPageHeader.tsx
'use client'

import { Plus, Newspaper, Search } from 'lucide-react'

interface NewsPageHeaderProps {
  isAdmin: boolean
  searchQuery: string
  onSearchChange: (query: string) => void
  onAddNews: () => void
  totalNews: number
  filteredCount: number
}

export default function NewsPageHeader({ 
  isAdmin, 
  searchQuery, 
  onSearchChange, 
  onAddNews,
  totalNews,
  filteredCount
}: NewsPageHeaderProps) {
  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            {/* Title & Description */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Newspaper className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">Berita Umum</h1>
                  <p className="text-emerald-100 text-lg">Desa Rejoagung</p>
                </div>
              </div>
              <p className="text-emerald-100 text-base max-w-2xl leading-relaxed">
                Informasi terkini dan berita penting dari Desa Rejoagung. 
                Ikuti perkembangan pembangunan, kegiatan masyarakat, dan pengumuman resmi desa.
              </p>
              
              {/* Stats */}
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="bg-white/10 px-3 py-1 rounded-full">
                  <span className="font-semibold">{totalNews}</span> Total Berita
                </div>
                {searchQuery && (
                  <div className="bg-white/10 px-3 py-1 rounded-full">
                    <span className="font-semibold">{filteredCount}</span> Hasil Pencarian
                  </div>
                )}
              </div>
            </div>

            {/* Admin Add Button */}
            {isAdmin && (
              <div className="flex-shrink-0">
                <button
                  onClick={onAddNews}
                  className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Berita
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="🔍 Cari berita berdasarkan judul, konten, kategori, atau penulis..."
                className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
                style={{ color: '#111827' }}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            
            {searchQuery && (
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">
                  Menampilkan <span className="font-semibold text-emerald-600">{filteredCount}</span> dari{' '}
                  <span className="font-semibold">{totalNews}</span> berita
                  {filteredCount === 0 && (
                    <span className="block mt-1 text-gray-500">
                      Coba kata kunci yang berbeda atau hapus filter pencarian
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
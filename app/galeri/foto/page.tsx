// ===========================================
// app/galeri/foto/page.tsx
// ===========================================

'use client'

import { Camera, Calendar, Eye, Download } from 'lucide-react'
import { useState } from 'react'

export default function GaleriFotoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'Semua Foto' },
    { id: 'kegiatan', label: 'Kegiatan Desa' },
    { id: 'infrastruktur', label: 'Infrastruktur' },
    { id: 'pertanian', label: 'Pertanian' },
    { id: 'budaya', label: 'Budaya' }
  ]

  const photos = [
    {
      id: 1,
      src: '/gallery/kegiatan1.jpg',
      title: 'Musyawarah Desa',
      category: 'kegiatan',
      date: '15 Juni 2025',
      views: 234
    },
    {
      id: 2,
      src: '/gallery/sawit1.jpg',
      title: 'Panen Kelapa Sawit',
      category: 'pertanian',
      date: '10 Juni 2025',
      views: 189
    },
    // Add more photos...
  ]

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Camera className="w-8 h-8 mr-4 text-emerald-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Galeri Foto</h1>
          <p className="text-gray-600">Dokumentasi kegiatan dan pembangunan Desa Rejoagung</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="aspect-w-16 aspect-h-12 bg-gray-200">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{photo.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {photo.date}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {photo.views}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

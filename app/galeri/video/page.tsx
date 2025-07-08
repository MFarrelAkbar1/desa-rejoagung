
// ===========================================
// app/galeri/video/page.tsx
// ===========================================

'use client'

import { Video, Calendar, Eye, Play } from 'lucide-react'
import { useState } from 'react'

export default function GaleriVideoPage() {
  const videos = [
    {
      id: 1,
      title: 'Dokumenter Panen Kelapa Sawit 2025',
      thumbnail: '/gallery/video1-thumb.jpg',
      duration: '5:30',
      date: '20 Juni 2025',
      views: 1234,
      description: 'Dokumentasi lengkap proses panen kelapa sawit di Desa Rejoagung'
    },
    {
      id: 2,
      title: 'Proses Pembuatan Gula Merah Tradisional',
      thumbnail: '/gallery/video2-thumb.jpg',
      duration: '8:15',
      date: '15 Juni 2025',
      views: 987,
      description: 'Melihat proses pembuatan gula merah dari nira kelapa yang berkualitas'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center mb-6">
        <Video className="w-8 h-8 mr-4 text-emerald-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Galeri Video</h1>
          <p className="text-gray-600">Koleksi video dokumentasi Desa Rejoagung</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="group">
            <div className="relative overflow-hidden rounded-lg shadow-md mb-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-opacity">
                <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-opacity">
                  <Play className="w-8 h-8 text-emerald-600 ml-1" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{video.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {video.date}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {video.views.toLocaleString()} views
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
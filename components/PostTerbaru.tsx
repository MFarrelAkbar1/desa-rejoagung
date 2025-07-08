'use client'

import { useState } from 'react'
import { Calendar, MessageCircle, Heart, Share2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

interface FacebookPost {
  id: number
  title: string
  excerpt: string
  fullContent: string
  date: string
  category: string
  likes: number
  comments: number
  shares: number
  image?: string
  isPopular?: boolean
}

const facebookPosts: FacebookPost[] = [
  {
    id: 1,
    title: "KEGIATAN PEMBINAAN PERPUSTAKAAN DESA OLEH DINAS PERPUSTAKAAN DAN KEARSIPAN KAB. SOPPENG",
    excerpt: "Alhamdulillah, kegiatan pembinaan perpustakaan desa telah terlaksana dengan baik...",
    fullContent: "Alhamdulillah, kegiatan pembinaan perpustakaan desa telah terlaksana dengan baik. Dinas Perpustakaan dan Kearsipan Kabupaten Soppeng memberikan pembinaan komprehensif untuk meningkatkan kualitas layanan perpustakaan desa. Kegiatan ini meliputi pelatihan pengelolaan koleksi, sistem katalog modern, dan program literasi masyarakat.",
    date: "26 Mei 2025",
    category: "PEMBINAAN",
    likes: 45,
    comments: 12,
    shares: 8,
    image: "/posts/perpustakaan.jpg",
    isPopular: true
  },
  {
    id: 2,
    title: "PEMDES ABBANUANGE LAKSANAKAN MUSDES TERKAIT PENATAAN POSYANDU",
    excerpt: "Musyawarah desa (Musdes) telah dilaksanakan untuk membahas penataan posyandu...",
    fullContent: "Musyawarah desa (Musdes) telah dilaksanakan untuk membahas penataan posyandu yang lebih efektif dan efisien. Agenda utama meliputi relokasi posyandu, penambahan fasilitas kesehatan, dan peningkatan kualitas pelayanan untuk ibu dan anak.",
    date: "20 Mei 2025",
    category: "MUSDES",
    likes: 38,
    comments: 15,
    shares: 6,
    isPopular: false
  },
  {
    id: 3,
    title: "MUSYAWARAH DESA KHUSUS PEMBENTUKAN KOPERASI DESA MERAH PUTIH",
    excerpt: "Desa mengadakan musyawarah khusus untuk pembentukan koperasi desa...",
    fullContent: "Desa mengadakan musyawarah khusus untuk pembentukan koperasi desa 'Merah Putih' yang akan fokus pada pengembangan ekonomi masyarakat. Koperasi ini akan mengelola simpan pinjam, usaha bersama, dan pemasaran produk lokal.",
    date: "20 Mei 2025",
    category: "KOPERASI",
    likes: 52,
    comments: 23,
    shares: 11,
    isPopular: true
  },
  {
    id: 4,
    title: "Kegiatan pemeriksaan fisik tahun anggaran 2024 oleh inspektorat Daerah kabupaten Soppeng",
    excerpt: "Tim inspektorat daerah melakukan pemeriksaan fisik untuk evaluasi program...",
    fullContent: "Tim inspektorat daerah melakukan pemeriksaan fisik untuk evaluasi program dan kegiatan tahun anggaran 2024. Pemeriksaan meliputi infrastruktur, administrasi keuangan, dan pencapaian target pembangunan desa.",
    date: "29 April 2025",
    category: "INSPEKSI",
    likes: 29,
    comments: 8,
    shares: 4,
    isPopular: false
  }
]

export default function PostTerbaru() {
  const [activeTab, setActiveTab] = useState<'terbaru' | 'populer'>('terbaru')
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const filteredPosts = activeTab === 'populer' 
    ? facebookPosts.filter(post => post.isPopular)
    : facebookPosts

  const toggleExpand = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'PEMBINAAN': 'bg-blue-100 text-blue-800',
      'MUSDES': 'bg-green-100 text-green-800',
      'KOPERASI': 'bg-purple-100 text-purple-800',
      'INSPEKSI': 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6">
        <h3 className="text-xl font-bold mb-2">📱 Pos Terbaru</h3>
        <p className="text-emerald-100 text-sm">Update langsung dari Facebook</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('terbaru')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'terbaru'
              ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          POS TERBARU
        </button>
        <button
          onClick={() => setActiveTab('populer')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'populer'
              ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          POS POPULER
        </button>
      </div>

      {/* Posts List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
            {/* Post Image */}
            {post.image && (
              <div className="h-32 bg-gray-200 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {post.isPopular && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    🔥 Populer
                  </div>
                )}
              </div>
            )}

            <div className="p-4">
              {/* Category & Date */}
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </div>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">
                {post.title}
              </h4>

              {/* Content */}
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">
                {expandedPost === post.id ? post.fullContent : post.excerpt}
              </p>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleExpand(post.id)}
                className="flex items-center text-emerald-600 hover:text-emerald-700 text-xs font-medium mb-3 transition-colors"
              >
                {expandedPost === post.id ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Tutup
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    Baca selengkapnya
                  </>
                )}
              </button>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1 text-blue-500" />
                    {post.comments}
                  </span>
                  <span className="flex items-center">
                    <Share2 className="w-3 h-3 mr-1 text-green-500" />
                    {post.shares}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <a
          href="https://www.facebook.com/rejo.agung.374"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Lihat Semua di Facebook
        </a>
      </div>
    </div>
  )
}
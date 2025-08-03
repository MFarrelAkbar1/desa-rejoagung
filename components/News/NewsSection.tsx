// components/news/NewsSection.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, TrendingUp } from 'lucide-react'
import { useNewsData } from '../../hooks/useNewsData'
import { NewsCard, NewsListItem } from './NewsComponents'

export default function NewsSection() {
  const { latestNews, popularNews, loading, error, refetch } = useNewsData()

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-black">Memuat berita...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Berita & Informasi Terkini
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            Dapatkan informasi terbaru seputar kegiatan, program, dan perkembangan Desa Rejoagung
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Berita Utama dan Terbaru */}
          <div className="lg:col-span-2">
            {/* Hero News */}
            {latestNews.length > 0 && (
              <div className="mb-8">
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  {latestNews[0].image_url ? (
                    <Image
                      src={latestNews[0].image_url}
                      alt={latestNews[0].title}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-80 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder-news.jpg'
                      }}
                    />
                  ) : (
                    <div className="w-full h-64 md:h-80 bg-gray-300 flex items-center justify-center">
                      <span className="text-black">Tidak Ada Gambar</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {latestNews[0].is_announcement ? (
                      <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium inline-block mb-2">
                        Pengumuman
                      </div>
                    ) : latestNews[0].category && (
                      <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium inline-block mb-2">
                        {latestNews[0].category}
                      </div>
                    )}
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      <Link href={`/berita/umum/${latestNews[0].id}`} className="hover:text-blue-300 transition-colors">
                        {latestNews[0].title}
                      </Link>
                    </h3>
                    <p className="text-black mb-3 line-clamp-2">
                      {latestNews[0].excerpt || latestNews[0].content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{latestNews[0].author}</span>
                      <span>{new Date(latestNews[0].created_at).toLocaleDateString('id-ID')}</span>
                      {latestNews[0].views && <span>{latestNews[0].views.toLocaleString()} views</span>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Berita Terbaru Grid */}
            <div className="mb-8">
              <h3 className="text-2xl text-black font-bold mb-6 flex items-center gap-2">
                <Clock className="text-black" />
                Berita Terbaru
              </h3>
              
              {latestNews.length > 1 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {latestNews.slice(1, 5).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              ) : (
                <p className="text-black text-center py-8">Belum ada berita terbaru</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            
            {/* Berita Populer */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
              <h4 className="text-xl text-black font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-red-500" />
                Berita Terpopuler
              </h4>
              
              {popularNews.length > 0 ? (
                <div className="space-y-4">
                  {popularNews.map((news, index) => (
                    <div key={news.id} className="relative">
                      <div className="absolute -left-2 -top-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center z-10">
                        {index + 1}
                      </div>
                      <div className="ml-4">
                        <NewsCard news={news} isPopular />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-black text-sm">Belum ada berita populer</p>
              )}
            </div>

            {/* Berita Terbaru (List Format) */}
            <div className="bg-gray-50 rounded-lg shadow-md p-6">
              <h4 className="text-xl text-black font-bold mb-4 flex items-center gap-2">
                <Clock className="text-black" />
                Berita Terkini
              </h4>
              
              {latestNews.length > 0 ? (
                <>
                  <div className="space-y-2">
                    {latestNews.slice(0, 5).map((news) => (
                      <NewsListItem key={news.id} news={news} />
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      href="/berita/umum" 
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Lihat Semua Berita →
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-black text-sm">Belum ada berita terkini</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
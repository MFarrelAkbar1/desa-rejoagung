'use client'
import { useEffect, useState } from 'react'
import { useSidebar } from '@/context/SidebarContext'
import { Newspaper, Facebook, ExternalLink, Calendar, Users, MessageCircle, Heart } from 'lucide-react'

// Hook untuk loading Facebook SDK
function useFacebookSDK() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Cek apakah SDK sudah dimuat
    if (window.FB) {
      setIsLoaded(true)
      window.FB.XFBML.parse()
      return
    }

    // Load Facebook SDK
    const loadFacebookSDK = () => {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v19.0'
      
      script.onload = () => {
        setIsLoaded(true)
        // Parse setelah script loaded
        if (window.FB) {
          window.FB.XFBML.parse()
        }
      }
      
      document.head.appendChild(script)
    }

    loadFacebookSDK()
  }, [])

  return isLoaded
}

// Komponen Facebook Page Feed
function FacebookPageFeed() {
  const isSDKLoaded = useFacebookSDK()

  if (!isSDKLoaded) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-64 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Facebook className="w-6 h-6 mr-3 text-blue-600" />
          Berita Terkini dari Facebook
        </h2>
        <a 
          href="https://www.facebook.com/rejo.agung.374" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          <span className="mr-2 font-medium">Kunjungi Facebook</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      {/* Facebook Page Plugin */}
      <div className="flex justify-center">
        <div 
          className="fb-page" 
          data-href="https://www.facebook.com/rejo.agung.374"
          data-tabs="timeline" 
          data-width="550" 
          data-height="700"
          data-small-header="false" 
          data-adapt-container-width="true" 
          data-hide-cover="false" 
          data-show-facepile="true"
          data-hide-cta="false"
        />
      </div>
      
      {/* Tips untuk pengunjung */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          💡 <strong>Tips:</strong> Klik "Suka" pada halaman Facebook di atas untuk mendapatkan notifikasi 
          setiap ada pengumuman atau berita terbaru dari Desa Rejoagung!
        </p>
      </div>
    </div>
  )
}

// Komponen untuk highlight posts penting
function HighlightedPosts() {
  const highlightedPosts = [
    {
      id: 1,
      title: "Panen Raya Kelapa Sawit 2025",
      content: "Alhamdulillah, hasil panen kelapa sawit periode Juni 2025 mengalami peningkatan 25% dari tahun sebelumnya. Terima kasih kepada semua petani yang telah bekerja keras.",
      date: "27 Juni 2025",
      category: "Pertanian",
      image: "/images/panen-sawit.jpg",
      stats: { likes: 89, comments: 23, shares: 12 }
    },
    {
      id: 2,
      title: "Program Pelatihan Petani Modern",
      content: "Dimulainya program pelatihan untuk meningkatkan keterampilan petani dalam menggunakan teknologi modern dan praktik pertanian berkelanjutan.",
      date: "25 Juni 2025", 
      category: "Pendidikan",
      stats: { likes: 67, comments: 15, shares: 8 }
    },
    {
      id: 3,
      title: "Pembangunan Infrastruktur Selesai",
      content: "Pembangunan jalan desa dan fasilitas umum telah selesai dilaksanakan. Diharapkan dapat meningkatkan mobilitas dan kualitas hidup warga.",
      date: "22 Juni 2025",
      category: "Infrastruktur", 
      stats: { likes: 134, comments: 31, shares: 19 }
    }
  ]

  const colors: Record<string, string> = {
    'Pertanian': 'bg-green-100 text-green-800',
    'Pendidikan': 'bg-blue-100 text-blue-800', 
    'Infrastruktur': 'bg-orange-100 text-orange-800'
  }
  const getCategoryColor = (category: string) => {
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Newspaper className="w-6 h-6 mr-3 text-green-600" />
        Berita Pilihan
      </h2>
      
      <div className="space-y-6">
        {highlightedPosts.map((post) => (
          <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-600 mb-4 leading-relaxed">{post.content}</p>
            
            {/* Image jika ada */}
            {post.image && (
              <div className="mb-4">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-gray-500 text-sm border-t pt-4">
              <div className="flex items-center space-x-6">
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1 text-red-500" />
                  {post.stats.likes}
                </span>
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                  {post.stats.comments}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1 text-green-500" />
                  {post.stats.shares} shares
                </span>
              </div>
              <a 
                href="https://www.facebook.com/rejo.agung.374" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                Lihat di Facebook →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Komponen info media sosial
function SocialMediaInfo() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Facebook className="w-5 h-5 mr-2 text-blue-600" />
        Ikuti Media Sosial Desa Rejoagung
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">📱 Facebook</h4>
          <p className="text-gray-600 text-sm mb-3">
            Dapatkan update berita, pengumuman, dan informasi kegiatan desa secara real-time.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-800 mb-2">🔔 Notifikasi</h4>
          <p className="text-gray-600 text-sm mb-3">
            Aktifkan notifikasi untuk mendapat pemberitahuan langsung di smartphone Anda.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a 
          href="https://www.facebook.com/rejo.agung.374" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center font-medium"
        >
          <Facebook className="w-5 h-5 mr-2" />
          Follow Facebook
        </a>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center font-medium">
          <span className="mr-2">🔔</span>
          Aktifkan Notifikasi
        </button>
      </div>
    </div>
  )
}

export default function BeritaPage() {
  const { isOpen } = useSidebar()

  return (
    <div className={`${isOpen ? 'ml-64' : 'ml-16'} min-h-screen p-8 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
            <Newspaper className="w-8 h-8 mr-4 text-green-600" />
            Berita & Artikel Desa Rejoagung
          </h1>
          <p className="text-xl text-gray-600">
            Ikuti perkembangan terkini dan informasi penting dari Desa Rejoagung melalui berbagai sumber berita resmi.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Facebook Feed - Kolom Utama */}
          <div className="lg:col-span-2 space-y-8">
            <FacebookPageFeed />
            <HighlightedPosts />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <SocialMediaInfo />
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Statistik Media Sosial</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengikut Facebook:</span>
                  <span className="font-semibold text-blue-600">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Post Bulan Ini:</span>
                  <span className="font-semibold text-green-600">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engagement Rate:</span>
                  <span className="font-semibold text-orange-600">12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Facebook SDK Root */}
      <div id="fb-root"></div>
    </div>
  )
}
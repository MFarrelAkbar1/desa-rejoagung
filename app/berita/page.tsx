'use client'

import { useEffect, useState } from 'react'
import { Newspaper, Facebook, ExternalLink, Calendar, Users, MessageCircle, Heart } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'

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
    </div>
  )
}
export default function BeritaPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb - Tambahkan di sini */}
        <Breadcrumb
          items={[
            { label: 'Berita Facebook', href: '/berita' },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
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
          <div className="lg:col-span-3 space-y-8">
            <FacebookPageFeed />
          </div>
        </div>
      </div>
     
      {/* Facebook SDK Root */}
      <div id="fb-root"></div>
    </div>
  )
}

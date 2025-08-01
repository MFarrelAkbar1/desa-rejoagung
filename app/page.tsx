'use client'

import { Users, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LocalHeroes from '@/components/Home/LocalHeroes'
import LatestNews from '@/components/Home/LatestNews'
import LatestProducts from '@/components/Home/LatestProducts'
import LatestCulinary from '@/components/Home/LatestCulinary'

export default function Home() {
 const router = useRouter()

 const handleExploreClick = () => {
   router.push('/profil/tentang-desa')
 }

 return (
   <div className="min-h-screen bg-gray-50">
     {/* Hero Section - Mobile Optimized */}
     <div
       className="relative h-[60vh] sm:h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
       style={{
         backgroundImage: 'url(/foto-beranda.jpg)'
       }}
     >
       <div className="absolute inset-0 bg-black/20"></div> {/* Subtle black overlay */}
       
       <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6">
         <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)' }}>
           Selamat Datang di
           <span className="block text-green-300 mt-2">Desa Rejoagung</span>
         </h1>
         <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-emerald-100 max-w-3xl mx-auto px-2" style={{ textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.8)' }}>
           Portal resmi informasi, layanan, dan produk unggulan Desa Rejoagung
         </p>
         
         <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
           <button
             onClick={handleExploreClick}
             className="bg-white text-emerald-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg w-full sm:w-auto"
           >
             Jelajahi Desa
           </button>
           <button
             onClick={() => router.push('/berita/umum')}
             className="bg-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg w-full sm:w-auto"
           >
             Berita Terbaru
           </button>
         </div>
       </div>
     </div>

     {/* Content Sections - Mobile Optimized */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16">
       {/* Local Heroes Section */}
       <LocalHeroes />

       {/* Berita Terbaru Section */}
       <LatestNews />

       {/* Produk Terbaru Section */}
       <LatestProducts />

       {/* Kuliner Terbaru Section */}
       <LatestCulinary />
     </div>
   </div>
 )
}
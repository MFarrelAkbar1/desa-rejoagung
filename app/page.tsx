'use client'

import { Users, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LocalHeroes from '@/components/Home/LocalHeroes'
import Booklet from '@/components/Home/Booklet'
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
           Portal resmi informasi dan layanan digital untuk masyarakat Desa Rejoagung
         </p>
         <button 
           onClick={handleExploreClick}
           className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
         >
           Jelajahi Desa Kami
         </button>
       </div>
     </div>

     {/* Quick Stats */}
     <div className="relative -mt-16 z-20 max-w-4xl mx-auto px-4 sm:px-6">
       <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
           <div className="text-center">
             <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Users className="w-8 h-8 text-emerald-600" />
             </div>
             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">2,547</h3>
             <p className="text-gray-600">Total Penduduk</p>
           </div>
           <div className="text-center">
             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <MapPin className="w-8 h-8 text-blue-600" />
             </div>
             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">12.5 km²</h3>
             <p className="text-gray-600">Luas Wilayah</p>
           </div>
         </div>
       </div>
     </div>

     {/* Main Content */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
       {/* Local Heroes Section */}
       <LocalHeroes />

       {/* Booklet Section */}
       <Booklet />

       {/* Latest News Section */}
       <LatestNews />

       {/* Latest Products Section */}
       <LatestProducts />

       {/* Latest Culinary Section */}
       <LatestCulinary />
     </div>
   </div>
 )
}
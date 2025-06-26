'use client'
import { Users, MapPin, Calendar, Award } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'

export default function ProfilPage() {
  const { isOpen } = useSidebar()

  return (
    <div className={`${isOpen ? 'ml-64' : 'ml-16'} min-h-screen p-8 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Profil Desa Rejoagung
          </h1>
    

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tentang Desa Rejoagung</h2>
            <p className="text-gray-600 leading-relaxed">
              Desa Rejoagung adalah sebuah desa yang terletak di wilayah penghasil kelapa sawit terbaik. 
              Dengan masyarakat yang gotong royong dan semangat kebersamaan yang tinggi, desa ini terus 
              berkembang menjadi pusat agrobisnis berkelanjutan.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-green-50 border border-green-200 rounded-xl">
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">2,547</div>
              <div className="text-gray-600">Total Penduduk</div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">1,850</div>
              <div className="text-gray-600">Luas Wilayah (Ha)</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 border border-purple-200 rounded-xl">
              <Calendar className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">1965</div>
              <div className="text-gray-600">Tahun Berdiri</div>
            </div>
            
            <div className="text-center p-6 bg-orange-50 border border-orange-200 rounded-xl">
              <Award className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-800 mb-2">12</div>
              <div className="text-gray-600">Penghargaan</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sejarah Desa</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Desa Rejoagung didirikan pada tahun 1965 oleh para transmigran yang berasal dari Jawa Tengah. 
                  Nama "Rejoagung" berasal dari bahasa Jawa yang berarti "kebahagiaan yang agung".
                </p>
                <p>
                  Awalnya, desa ini merupakan daerah hutan yang kemudian dibuka menjadi lahan pertanian. 
                  Seiring berkembangnya zaman, masyarakat mulai membudidayakan kelapa sawit yang kini menjadi 
                  komoditas unggulan desa.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Visi & Misi</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-600 mb-3">Visi</h3>
                <p className="text-gray-600 italic">
                  "Menjadi desa mandiri, sejahtera, dan berkelanjutan berbasis agrobisnis kelapa sawit 
                  dengan tetap menjaga kelestarian lingkungan"
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-3">Misi</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Meningkatkan produktivitas dan kualitas kelapa sawit</li>
                  <li>• Mengembangkan industri pengolahan hasil pertanian</li>
                  <li>• Meningkatkan kualitas sumber daya manusia</li>
                  <li>• Menjaga kelestarian lingkungan dan biodiversitas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
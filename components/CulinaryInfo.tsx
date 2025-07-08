// components/CulinaryInfo.tsx
import { Info, Clock, MapPin, Phone, Heart, Star } from 'lucide-react'

export default function CulinaryInfo() {
  const operatingHours = [
    { day: 'Senin - Jumat', time: '06:00 - 21:00', icon: '🌅' },
    { day: 'Sabtu - Minggu', time: '05:00 - 22:00', icon: '🌄' },
    { day: 'Hari Raya', time: '07:00 - 20:00', icon: '🎉' }
  ]

  const culinaryTips = [
    {
      title: 'Waktu Terbaik Berkunjung',
      content: 'Pagi hari (07:00-09:00) untuk menu sarapan segar, sore hari (17:00-19:00) untuk menu dinner.',
      icon: '⏰'
    },
    {
      title: 'Menu Rekomendasi',
      content: 'Coba Rujak Soto dan Es Dawet Gula Merah - kombinasi segar dan unik khas Rejoagung.',
      icon: '🌟'
    },
    {
      title: 'Harga Ramah Kantong',
      content: 'Semua menu dibawah Rp 30.000 dengan porsi mengenyangkan dan cita rasa autentik.',
      icon: '💰'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Operating Hours */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-gray-200">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-xl mr-4">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            ⏰ Jam Operasional Warung
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {operatingHours.map((schedule, index) => (
            <div key={index} className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{schedule.icon}</div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">{schedule.day}</h3>
              <p className="text-2xl font-bold text-blue-600">{schedule.time}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-yellow-50 border-3 border-yellow-300 rounded-xl p-4">
          <p className="text-lg text-yellow-800 text-center font-medium">
            💡 <strong>Info:</strong> Beberapa warung mungkin tutup lebih awal jika menu habis terjual
          </p>
        </div>
      </div>

      {/* Culinary Tips */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-gray-200">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-3 rounded-xl mr-4">
            <Heart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            💡 Tips Wisata Kuliner
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {culinaryTips.map((tip, index) => (
            <div key={index} className="bg-green-50 border-3 border-green-300 rounded-xl p-6">
              <div className="text-4xl mb-4 text-center">{tip.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mb-3 text-center">{tip.title}</h3>
              <p className="text-lg text-green-700 leading-relaxed text-center">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-orange-50 to-red-100 border-4 border-orange-300 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="bg-orange-600 p-4 rounded-2xl mr-4">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-orange-800">
            📞 Informasi & Bantuan
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border-3 border-orange-200 shadow-lg">
            <h4 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              📍 Pusat Informasi Kuliner
            </h4>
            <div className="space-y-3 text-lg text-orange-700">
              <p><strong>Lokasi:</strong> Balai Desa Rejoagung</p>
              <p><strong>Alamat:</strong> Jl. Raya Rejoagung No. 1, Srono</p>
              <p><strong>Jam Buka:</strong> 08:00 - 16:00 (Senin-Jumat)</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border-3 border-red-200 shadow-lg">
            <h4 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
              <Phone className="w-6 h-6 mr-2" />
              📱 Kontak Darurat
            </h4>
            <div className="space-y-3 text-lg text-red-700">
              <p><strong>Telepon Desa:</strong> +62 333-123-456</p>
              <p><strong>WhatsApp:</strong> +62 812-3456-7890</p>
              <p><strong>Email:</strong> info@rejoagung-desa.id</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl p-6 border-3 border-gray-200">
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 mr-2 text-yellow-600" />
            <h4 className="text-2xl font-bold text-gray-800">🌟 Komitmen Kualitas</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span><strong>Bahan Segar:</strong> Dipilih langsung dari petani lokal setiap hari</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span><strong>Higienitas:</strong> Standar kebersihan tinggi di semua warung</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-3 text-xl">✓</span>
                <span><strong>Harga Transparan:</strong> Tidak ada biaya tersembunyi</span>
              </li>
            </ul>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">✓</span>
                <span><strong>Pelayanan Ramah:</strong> Pemilik warung yang berpengalaman</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">✓</span>
                <span><strong>Resep Autentik:</strong> Turun temurun dari nenek moyang</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3 text-xl">✓</span>
                <span><strong>Kemasan Ramah Lingkungan:</strong> Mendukung go green</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
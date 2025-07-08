// components/CulinaryList.tsx
import { CulinaryItem } from '@/data/culinary'
import CulinaryCard from './CulinaryCard'
import { Utensils, Search } from 'lucide-react'

interface CulinaryListProps {
  items: CulinaryItem[]
  title: string
}

export default function CulinaryList({ items, title }: CulinaryListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 border-4 border-gray-200 text-center">
        <div className="text-8xl mb-6">🍽️</div>
        <h3 className="text-3xl font-bold text-gray-600 mb-4">Tidak Ada Menu Ditemukan</h3>
        <p className="text-xl text-gray-500 mb-6">
          Maaf, tidak ada menu yang sesuai dengan filter yang dipilih.
        </p>
        <div className="bg-blue-50 border-3 border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-center text-blue-700">
            <Search className="w-6 h-6 mr-2" />
            <span className="text-lg font-medium">Coba ubah filter atau kategori untuk melihat menu lainnya</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-gray-200">
      <div className="flex items-center mb-8">
        <div className="bg-orange-100 p-3 rounded-xl mr-4">
          <Utensils className="w-8 h-8 text-orange-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <p className="text-xl text-gray-600">
            Menampilkan {items.length} menu kuliner terpilih
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {items.map((item) => (
          <CulinaryCard key={item.id} item={item} />
        ))}
      </div>

      {/* Summary Info */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-3 border-orange-200 rounded-2xl p-6">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-orange-600">{items.length}</div>
            <div className="text-lg font-semibold text-orange-700">Menu Tersedia</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">
              {items.filter(item => item.isSignature).length}
            </div>
            <div className="text-lg font-semibold text-yellow-700">Menu Signature</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {(items.reduce((sum, item) => sum + item.rating, 0) / items.length).toFixed(1)}
            </div>
            <div className="text-lg font-semibold text-green-700">Rating Rata-rata</div>
          </div>
        </div>
      </div>
    </div>
  )
}
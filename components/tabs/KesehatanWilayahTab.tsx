// components/tabs/KesehatanWilayahTab.tsx
import DataTable from '../DataTable'
import { kesehatanWilayahData } from '@/data/dataWilayahConstants'

export default function KesehatanWilayahTab() {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4 text-center text-lg">
        {kesehatanWilayahData.title}
      </h3>
      <DataTable data={kesehatanWilayahData.table} />
      
      {/* Informasi Layanan Kesehatan */}
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <h4 className="font-semibold text-red-800 mb-4 text-lg">
          {kesehatanWilayahData.informasiTambahan.title}
        </h4>
        <div className="space-y-2">
          {kesehatanWilayahData.informasiTambahan.data.map((item, index) => (
            <p key={index} className="text-red-700 text-sm leading-relaxed">
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Info Tambahan Program Kesehatan */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-3">💊 Program Kesehatan Desa</h4>
        <div className="grid md:grid-cols-2 gap-4 text-blue-700 text-sm">
          <div>
            <h5 className="font-medium mb-2">Program Rutin:</h5>
            <ul className="space-y-1">
              <li>• Posyandu Balita (5 lokasi)</li>
              <li>• Posyandu Lansia</li>
              <li>• Imunisasi dasar lengkap</li>
              <li>• Pemeriksaan kehamilan (ANC)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Layanan Khusus:</h5>
            <ul className="space-y-1">
              <li>• Persalinan oleh bidan terlatih</li>
              <li>• Program KB</li>
              <li>• Deteksi dini PTM</li>
              <li>• Penyuluhan gizi dan sanitasi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
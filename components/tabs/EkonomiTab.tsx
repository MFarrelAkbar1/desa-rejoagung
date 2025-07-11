// components/tabs/EkonomiTab.tsx
import DataTable from '../DataTable'
import { ekonomiData } from '@/data/dataWilayahConstants'

export default function EkonomiTab() {
  return (
    <div>
      <p className="text-gray-800 mb-6 text-sm leading-relaxed font-medium">
        {ekonomiData.deskripsi}
      </p>
      
      <h3 className="font-bold text-gray-900 mb-4 text-lg">PROFESI DAN MATA PENCAHARIAN</h3>
      <DataTable data={ekonomiData.table} />
      
      <div className="mb-6">
        {ekonomiData.keterangan.map((item, index) => (
          <p key={index} className="text-gray-800 text-sm font-medium mb-2">{item}</p>
        ))}
      </div>

      {/* Info Ekonomi Tambahan */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-3">🌾 Potensi Ekonomi Desa</h4>
        <ul className="text-green-700 text-sm space-y-2">
          <li>• <strong>Kelapa Sawit:</strong> Komoditas utama dengan luas 480 Ha, menghasilkan TBS (Tandan Buah Segar)</li>
          <li>• <strong>Pertanian Padi:</strong> Luas sawah 145 Ha dengan sistem irigasi yang memadai</li>
          <li>• <strong>Industri Rumahan:</strong> Produksi gula merah tradisional dan sale pisang</li>
          <li>• <strong>Perdagangan:</strong> Terdapat satu pasar desa yang melayani kebutuhan sehari-hari</li>
          <li>• <strong>Peternakan:</strong> Sapi, kambing, dan unggas skala rumah tangga</li>
        </ul>
      </div>
    </div>
  )
}
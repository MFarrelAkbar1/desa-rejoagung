// components/tabs/PendidikanWilayahTab.tsx
import DataTable from '../DataTable'
import { pendidikanWilayahData } from '@/data/dataWilayahConstants'

export default function PendidikanWilayahTab() {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4 text-center text-lg">
        {pendidikanWilayahData.title}
      </h3>
      
      <h4 className="font-bold text-gray-900 mb-4 text-lg">SARANA PENDIDIKAN</h4>
      <DataTable data={pendidikanWilayahData.saranaPendidikan} />
      
      <h4 className="font-bold text-gray-900 mb-4 mt-8 text-lg">DATA TINGKAT PENDIDIKAN PENDUDUK</h4>
      <DataTable data={pendidikanWilayahData.tingkatPendidikan} />

      {/* Info Pendidikan Tambahan */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-3">🎓 Informasi Pendidikan</h4>
        <div className="grid md:grid-cols-2 gap-4 text-purple-700 text-sm">
          <div>
            <h5 className="font-medium mb-2">Sekolah Negeri:</h5>
            <ul className="space-y-1">
              <li>• SDN 1 Rejoagung Srono</li>
              <li>• SDN 2 Rejoagung</li>
              <li>• SMP Al Amiriyyah</li>
              <li>• SMK NU Darussalam</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Fasilitas Khusus:</h5>
            <ul className="space-y-1">
              <li>• SLB Bina Insani Srono</li>
              <li>• Perpustakaan desa</li>
              <li>• Program kejar paket A, B, C</li>
              <li>• Kursus keterampilan masyarakat</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
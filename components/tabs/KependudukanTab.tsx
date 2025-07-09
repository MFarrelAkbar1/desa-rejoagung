// components/tabs/KependudukanTab.tsx

import DataTable from '../DataTable'
import { kependudukanData } from '@/data/dataDesaConstants'

export default function KependudukanTab() {
  return (
    <div>
      <p className="text-gray-800 mb-6 text-sm leading-relaxed font-medium">
        {kependudukanData.deskripsi}
      </p>
      <h3 className="font-bold text-gray-900 mb-4 text-lg">JUMLAH PENDUDUK</h3>
      <DataTable data={kependudukanData.table} />
    </div>
  )
}
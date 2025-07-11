// components/tabs/DemografisTab.tsx
import DataTable from '../DataTable'
import { demografisData } from '@/data/dataWilayahConstants'

export default function DemografisTab() {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4 text-lg">{demografisData.gambaran.title}</h3>
      <p className="text-gray-800 mb-6 text-sm leading-relaxed font-medium">
        {demografisData.deskripsi}
      </p>
      <DataTable data={demografisData.gambaran.table} />
      
      <h3 className="font-bold text-gray-900 mb-4 text-lg">BATAS DESA</h3>
      <DataTable data={demografisData.batasDesa} />
    </div>
  )
}
// components/tabs/KesehatanTab.tsx

import DataTable from '../DataTable'
import { kesehatanData } from '@/data/dataDesaConstants'

export default function KesehatanTab() {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4 text-center text-lg">
        {kesehatanData.title}
      </h3>
      <DataTable data={kesehatanData.table} />
      
      <h3 className="font-bold text-gray-900 mb-4 mt-8 text-lg">
        DATA KELUARGA YANG MEMILIKI WC
      </h3>
      <DataTable data={kesehatanData.keluargaWC} />
    </div>
  )
}
// components/tabs/PendidikanTab.tsx

import DataTable from '../DataTable'
import { pendidikanData } from '@/data/dataDesaConstants'

export default function PendidikanTab() {
  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4 text-center text-lg">
        {pendidikanData.title}
      </h3>
      <DataTable data={pendidikanData.table} />
    </div>
  )
}
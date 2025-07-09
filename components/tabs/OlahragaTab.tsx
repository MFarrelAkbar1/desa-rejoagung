// components/tabs/OlahragaTab.tsx

import DataTable from '../DataTable'
import { olahragaData } from '@/data/dataDesaConstants'

export default function OlahragaTab() {
  return (
    <div>
      <p className="text-gray-800 mb-6 text-sm font-medium">
        {olahragaData.deskripsi}
      </p>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-base">
          a. Olahraga Tradisional (Osing) Seperti:
        </h4>
        <ul className="ml-4 space-y-1">
          {olahragaData.olahragaTradisional.map((item, index) => (
            <li key={index} className="text-gray-800 text-sm font-medium">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 text-base">
          b. Olahraga Konvensional Seperti:
        </h4>
        <ul className="ml-4 space-y-1">
          {olahragaData.olahragaKonvensional.map((item, index) => (
            <li key={index} className="text-gray-800 text-sm font-medium">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      <h4 className="font-semibold text-gray-900 mb-4 text-base">
        c. Sarana dan Prasarana Olahraga di desa Rejoagung seperti:
      </h4>
      <DataTable data={olahragaData.saranaOlahraga} />
    </div>
  )
}
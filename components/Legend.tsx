// components/Legend.tsx
'use client'

// School type colors and labels based on updated schools data
const schoolTypeColors = {
  TK: '#ef4444',   // Red
  SD: '#3b82f6',   // Blue  
  SMP: '#10b981',  // Green
  SMK: '#f59e0b',  // Orange
  SLB: '#8b5cf6'   // Purple
}

const schoolTypeLabels = {
  TK: 'Taman Kanak-kanak',
  SD: 'Sekolah Dasar',
  SMP: 'Sekolah Menengah Pertama', 
  SMK: 'Sekolah Menengah Kejuruan',
  SLB: 'Sekolah Luar Biasa'
}

export default function Legend() {
  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-[1000]">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Legenda Sekolah</h3>
      <div className="space-y-2">
        {Object.entries(schoolTypeColors).map(([type, color]) => (
          <div key={type} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-gray-700">
              {schoolTypeLabels[type as keyof typeof schoolTypeLabels]} ({type})
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Klik marker untuk melihat detail sekolah
        </p>
      </div>
    </div>
  )
}
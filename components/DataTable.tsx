// components/DataTable.tsx - ENHANCED VERSION (JANGAN UBAH DATA APAPUN!)
'use client'

import { useState } from 'react'
import { Eye, EyeOff, Table, List } from 'lucide-react'

interface DataTableProps {
  data: string[][]
  className?: string
}

export default function DataTable({ data, className = "" }: DataTableProps) {
  const [isMobileCardView, setIsMobileCardView] = useState(false)
  const [isCompactMode, setIsCompactMode] = useState(false)

  if (!data || data.length === 0) {
    return <div className="text-gray-500 text-center py-4">Tidak ada data tersedia</div>
  }

  const headers = data[0] || []
  const rows = data.slice(1)

  // Mobile Card View - lebih readable untuk mobile
  const renderMobileCardView = () => (
    <div className="space-y-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
          {headers.map((header, cellIndex) => {
            const cellValue = row[cellIndex] || '-'
            return (
              <div key={cellIndex} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                <div className="font-medium text-gray-700 text-sm flex-shrink-0 mr-3 max-w-[40%]">
                  {header}:
                </div>
                <div className="text-gray-900 text-sm text-right flex-1 min-w-0">
                  {cellValue}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )

  // Enhanced Table View dengan responsive features
  const renderTableView = () => (
    <div className={`
      ${isCompactMode ? 'mobile-scale-dense' : ''} 
      overflow-x-auto 
      border border-gray-400 
      rounded-lg
      bg-white
      shadow-sm
    `}>
      {/* Horizontal scroll hint untuk mobile */}
      <div className="md:hidden bg-gray-50 px-3 py-2 text-xs text-gray-600 border-b border-gray-300">
        👈 Geser ke kiri/kanan untuk melihat semua kolom
      </div>
      
      <table className={`
        w-full 
        min-w-full
        ${isCompactMode ? 'text-xs' : 'text-sm'}
      `}>
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`
                  border border-gray-400 
                  ${isCompactMode ? 'px-2 py-2' : 'px-4 py-3'}
                  font-bold 
                  text-center 
                  text-black
                  whitespace-nowrap
                  min-w-[80px]
                `}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`
                    border border-gray-400 
                    ${isCompactMode ? 'px-2 py-2' : 'px-4 py-3'}
                    text-black
                    ${cellIndex === 0 
                      ? "font-semibold text-left" 
                      : "text-left"
                    }
                    whitespace-nowrap
                    min-w-[80px]
                  `}
                >
                  {cell || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className={`mb-6 ${className}`}>
      {/* Mobile Controls - hanya muncul di mobile */}
      <div className="md:hidden flex items-center justify-between mb-4 bg-gray-100 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          {/* Toggle View Mode */}
          <button
            onClick={() => setIsMobileCardView(!isMobileCardView)}
            className={`
              flex items-center px-3 py-2 rounded-md text-xs font-medium transition-colors
              ${isMobileCardView 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
              }
            `}
          >
            {isMobileCardView ? <List className="w-4 h-4 mr-1" /> : <Table className="w-4 h-4 mr-1" />}
            {isMobileCardView ? 'Card' : 'Tabel'}
          </button>

          {/* Compact Mode - hanya untuk table view */}
          {!isMobileCardView && (
            <button
              onClick={() => setIsCompactMode(!isCompactMode)}
              className={`
                flex items-center px-3 py-2 rounded-md text-xs font-medium transition-colors
                ${isCompactMode 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300'
                }
              `}
            >
              {isCompactMode ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
              {isCompactMode ? 'Normal' : 'Padat'}
            </button>
          )}
        </div>
        
        <div className="text-xs text-gray-600">
          {data.length - 1} baris data
        </div>
      </div>

      {/* Desktop hint */}
      <div className="hidden md:flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">
          Menampilkan {data.length - 1} baris data
        </div>
        {headers.length > 5 && (
          <div className="text-xs text-gray-500">
            {headers.length} kolom - scroll horizontal untuk melihat semua
          </div>
        )}
      </div>

      {/* Render Content */}
      {isMobileCardView ? renderMobileCardView() : renderTableView()}

      {/* Mobile Tips */}
      <div className="md:hidden mt-3 text-xs text-gray-500 bg-gray-50 rounded p-2">
        💡 Tips: 
        {isMobileCardView 
          ? " Mode Card lebih mudah dibaca di layar kecil" 
          : " Mode Padat untuk melihat lebih banyak data sekaligus"
        }
      </div>
    </div>
  )
}
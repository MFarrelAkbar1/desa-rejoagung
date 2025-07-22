// components/ToggleableLegend.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface LegendItem {
  color: string
  icon: string
  label: string
}

interface ToggleableLegendProps {
  title: string
  items: LegendItem[]
  extraInfo?: string
  dusunAreas?: {
    color: string
    name: string
  }[]
}

export default function ToggleableLegend({ 
  title, 
  items, 
  extraInfo,
  dusunAreas 
}: ToggleableLegendProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white hover:bg-gray-50 p-3 rounded-lg shadow-lg border border-gray-200 transition-colors duration-200"
        aria-label={isOpen ? 'Tutup legenda' : 'Buka legenda'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Legend Content */}
      {isOpen && (
        <div className="absolute top-0 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-xs min-w-[250px] mt-14">
          <h4 className="font-bold text-gray-800 mb-3 text-sm border-b border-gray-200 pb-2">
            📍 {title}
          </h4>
          
          {/* Main legend items */}
          <div className="space-y-2 text-xs">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs border-2 border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <span className="font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
          
          {/* Dusun areas if provided */}
          {dusunAreas && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h5 className="font-semibold text-gray-700 mb-2 text-xs">Area Dusun:</h5>
              <div className="space-y-1 text-xs">
                {dusunAreas.map((dusun, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded opacity-60"
                      style={{ backgroundColor: dusun.color }}
                    ></div>
                    <span className="text-gray-600">{dusun.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Extra info */}
          {extraInfo && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">{extraInfo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
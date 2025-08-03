// components/MapContainer.tsx - SUPER SIMPLE & FAST VERSION

'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    L: any
  }
}

// Data sekolah langsung di dalam file (tidak ada import external)
const schools = [
  { id: 1, name: 'TK Dharma Wanita', type: 'TK', coordinates: [-8.382, 114.302], students: 45, teachers: 4, rating: 4.2 },
  { id: 2, name: 'PAUD Tunas Harapan', type: 'TK', coordinates: [-8.385, 114.308], students: 38, teachers: 3, rating: 4.0 },
  { id: 3, name: 'Kelompok Bermain Ceria', type: 'TK', coordinates: [-8.387, 114.295], students: 25, teachers: 2, rating: 3.8 },
  { id: 4, name: 'SDN 1 Rejoagung Srono', type: 'SD', coordinates: [-8.384799, 114.302379], students: 245, teachers: 12, rating: 4.5, accreditation: 'A' },
  { id: 5, name: 'SDN 2 Rejoagung', type: 'SD', coordinates: [-8.383769, 114.306851], students: 198, teachers: 10, rating: 4.3, accreditation: 'A' },
  { id: 6, name: 'SDN 3 Rejoagung', type: 'SD', coordinates: [-8.388, 114.298], students: 156, teachers: 8, rating: 4.1, accreditation: 'B' },
  { id: 7, name: 'SMP AL AMIRIYYAH', type: 'SMP', coordinates: [-8.379498, 114.306128], students: 320, teachers: 18, rating: 4.7, accreditation: 'A' },
  { id: 8, name: 'SMK NU DARUSSALAM', type: 'SMK', coordinates: [-8.379092, 114.305069], students: 380, teachers: 22, rating: 4.6, accreditation: 'A' },
  { id: 9, name: 'SLB Bina Insani Srono', type: 'SLB', coordinates: [-8.381, 114.301], students: 45, teachers: 8, rating: 4.4, accreditation: 'B' }
]

// Warna sederhana
const colors = { TK: '#ef4444', SD: '#3b82f6', SMP: '#10b981', SMK: '#f59e0b', SLB: '#8b5cf6' }

export default function MapContainer({ height = '600px' }: { height?: string }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      // Load Leaflet hanya sekali
      if (!window.L) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
        await new Promise(resolve => {
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Buat map dengan koordinat tengah yang fixed
      const map = window.L.map(mapRef.current).setView([-8.383, 114.304], 14)

      // Add tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

      // Add markers langsung tanpa perhitungan kompleks
      schools.forEach(school => {
        const color = colors[school.type as keyof typeof colors]
        
        window.L.marker(school.coordinates, {
          icon: window.L.divIcon({
            html: `<div style="width:20px;height:20px;background:${color};border:2px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;font-weight:bold;box-shadow:0 2px 4px rgba(0,0,0,0.3)">${school.type}</div>`,
            iconSize: [20, 20],
            className: 'custom-marker'
          })
        })
        .bindPopup(`
          <div style="font-family:Arial;max-width:250px">
            <h3 style="margin:0 0 8px 0;color:#1f2937;font-size:14px;font-weight:bold">${school.name}</h3>
            <div style="background:${color};color:white;padding:2px 6px;border-radius:10px;font-size:10px;display:inline-block;margin-bottom:6px">${school.type}</div>
            <div style="font-size:11px;color:#666">
              <div>👥 ${school.students} siswa</div>
              <div>👨‍🏫 ${school.teachers} guru</div>
              <div>⭐ ${school.rating}/5.0</div>
              ${school.accreditation ? `<div>🏆 Akreditasi ${school.accreditation}</div>` : ''}
            </div>
          </div>
        `)
        .addTo(map)
      })
    }

    initMap()

    return () => {
      if (mapRef.current && window.L) {
        // Simple cleanup
        mapRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height, width: '100%' }} className="rounded-lg" />
      
      {/* Simple legend */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded shadow-lg text-xs z-[1000]">
        <div className="font-bold mb-2">Legenda</div>
        {Object.entries(colors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2 mb-1">
            <div style={{ width: 12, height: 12, backgroundColor: color, borderRadius: '50%' }} />
            <span>{type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
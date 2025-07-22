// components/MapContainer.tsx
'use client'

import { useEffect, useRef } from 'react'

// Leaflet imports - should match the existing pattern
declare global {
  interface Window {
    L: any
  }
}

interface School {
  id: number
  name: string
  type: 'TK' | 'SD' | 'SMP' | 'SMK' | 'SLB'
  address: string
  coordinates: [number, number]
  description?: string
  students?: number
  teachers?: number
  facilities?: string[]
  rating?: number
  contact?: string
  accreditation?: string
  principal?: string
  established?: number
}

interface MapContainerProps {
  height?: string
}

// School type colors consistent with Legend
const schoolTypeColors = {
  TK: '#ef4444',   // Red
  SD: '#3b82f6',   // Blue  
  SMP: '#10b981',  // Green
  SMK: '#f59e0b',  // Orange
  SLB: '#8b5cf6'   // Purple
}

// Import schools from our updated data
const schools: School[] = [
  // TK/PAUD (3 buah)
  {
    id: 1,
    name: 'TK Dharma Wanita',
    type: 'TK',
    address: 'Dusun Krajan, RT 02 RW 01, Rejoagung',
    coordinates: [-8.382, 114.302],
    description: 'Taman Kanak-kanak swasta dengan kurikulum nasional',
    students: 45,
    teachers: 4
  },
  {
    id: 2,
    name: 'PAUD Tunas Harapan',
    type: 'TK',
    address: 'Dusun Sumberagung, RT 03 RW 02, Rejoagung',
    coordinates: [-8.385, 114.308],
    description: 'Pendidikan Anak Usia Dini dengan metode bermain sambil belajar',
    students: 38,
    teachers: 3
  },
  {
    id: 3,
    name: 'Kelompok Bermain Ceria',
    type: 'TK',
    address: 'Dusun Sumbergroto, RT 01 RW 01, Rejoagung',
    coordinates: [-8.387, 114.295],
    description: 'Kelompok bermain untuk anak usia 2-4 tahun',
    students: 25,
    teachers: 2
  },

  // SD (3 buah)
  {
    id: 4,
    name: 'SDN 1 Rejoagung Srono',
    type: 'SD',
    address: 'J882+2XF, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.384798810410489, 114.30237941420603],
    description: 'Sekolah Dasar Negeri 1 Rejoagung Srono',
    students: 245,
    teachers: 12
  },
  {
    id: 5,
    name: 'SDN 2 Rejoagung',
    type: 'SD',
    address: 'J884+FPQ, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.383768572513736, 114.30685111350854],
    description: 'Sekolah Dasar Negeri 2 Rejoagung',
    students: 198,
    teachers: 10
  },
  {
    id: 6,
    name: 'SDN 3 Rejoagung',
    type: 'SD',
    address: 'Dusun Sumbergroto, RT 05 RW 02, Rejoagung',
    coordinates: [-8.388, 114.298],
    description: 'Sekolah Dasar Negeri 3 Rejoagung',
    students: 156,
    teachers: 8
  },

  // SMP (1 buah)
  {
    id: 7,
    name: 'SMP AL AMIRIYYAH',
    type: 'SMP',
    address: 'J8C4+3F2, Sumberagung, Rejoagung, Kec. Srono, Kabupaten Banyuwangi, Jawa Timur 68471',
    coordinates: [-8.379497666674562, 114.30612847162135],
    description: 'Sekolah Menengah Pertama swasta dengan nuansa Islami',
    students: 320,
    teachers: 18
  },

  // SMK (1 buah)
  {
    id: 8,
    name: 'SMK NU DARUSSALAM',
    type: 'SMK',
    address: 'J8C4+52 Rejoagung, Banyuwangi Regency, East Java',
    coordinates: [-8.379091765348011, 114.3050691166798],
    description: 'Sekolah Menengah Kejuruan dengan program keahlian Teknik dan Bisnis',
    students: 380,
    teachers: 22
  },

  // SLB (1 buah)
  {
    id: 9,
    name: 'SLB Bina Insani Srono',
    type: 'SLB',
    address: 'Jl. Pendidikan No. 12, Srono',
    coordinates: [-8.381, 114.301],
    description: 'Sekolah Luar Biasa untuk anak berkebutuhan khusus',
    students: 45,
    teachers: 8
  }
]

export default function MapContainer({ height = '600px' }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  const createCustomIcon = (type: School['type']) => {
    const color = schoolTypeColors[type]
   
    return window.L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 10px;
        ">
          ${type}
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
      popupAnchor: [0, -13]
    })
  }

  const createPopupContent = (school: School) => {
    return `
      <div style="min-width: 250px; font-family: Arial, sans-serif;">
        <div style="
          background: linear-gradient(135deg, ${schoolTypeColors[school.type]}, ${schoolTypeColors[school.type]}dd);
          color: white;
          padding: 8px 12px;
          margin: -10px -12px 8px -12px;
          border-radius: 4px 4px 0 0;
        ">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${school.name}</h3>
          <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">${school.type} - ${school.description}</p>
        </div>
        <div style="padding: 4px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;">
            <strong>📍 Alamat:</strong><br>
            ${school.address}
          </p>
          ${school.students ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #888;"><strong>👥 Siswa:</strong> ${school.students}</p>` : ''}
          ${school.teachers ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #888;"><strong>👨‍🏫 Guru:</strong> ${school.teachers}</p>` : ''}
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #888;">
            <strong>📍 Koordinat:</strong> ${school.coordinates[0].toFixed(6)}, ${school.coordinates[1].toFixed(6)}
          </p>
        </div>
      </div>
    `
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      if (!window.L) {
        // Load Leaflet CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
        document.head.appendChild(link)

        // Load Leaflet JS
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Center coordinates (average of all schools)
      const centerLat = schools.reduce((sum, school) => sum + school.coordinates[0], 0) / schools.length
      const centerLng = schools.reduce((sum, school) => sum + school.coordinates[1], 0) / schools.length

      // Initialize map
      const map = window.L.map(mapRef.current).setView([centerLat, centerLng], 15)

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      // Add markers for each school
      schools.forEach(school => {
        const marker = window.L.marker(school.coordinates, {
          icon: createCustomIcon(school.type)
        }).addTo(map)

        marker.bindPopup(createPopupContent(school), {
          maxWidth: 300,
          className: 'custom-popup'
        })
      })

      // Fit map to show all markers
      const group = new window.L.FeatureGroup(
        schools.map(school => window.L.marker(school.coordinates))
      )
      map.fitBounds(group.getBounds().pad(0.1))

      mapInstanceRef.current = map

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }
      }
    }

    loadLeaflet()
  }, [])

  return (
    <>
      <div
        ref={mapRef}
        style={{ height, width: '100%' }}
        className="rounded-lg shadow-lg border border-gray-300"
      />
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-content {
          margin: 10px 12px;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </>
  )
}
// components/DesaMapContainer.tsx - OPTIMIZED VERSION

'use client'

import { useEffect, useRef, useState } from 'react'

// Leaflet imports - should match the existing pattern
declare global {
  interface Window {
    L: any
  }
}

interface DesaMapContainerProps {
  height?: string
}

// Pre-define locations to avoid re-creating arrays
const DESA_LOCATIONS = [
  // Fasilitas Desa (Hijau)
  {
    coordinates: [-8.3833, 114.3014] as [number, number],
    name: 'Balai Desa Rejoagung',
    type: 'fasilitas-desa',
    description: 'Kantor Pemerintahan Desa Rejoagung',
    facilities: 'Kantor Kepala Desa, Ruang Pelayanan, Balai Pertemuan'
  },
  {
    coordinates: [-8.384, 114.303] as [number, number],
    name: 'Poskesdes',
    type: 'fasilitas-desa',
    description: 'Pos Kesehatan Desa',
    facilities: 'Pelayanan Kesehatan Dasar, Persalinan, KB'
  },
  // Pendidikan (Biru)
  {
    coordinates: [-8.385, 114.302] as [number, number],
    name: 'SD Negeri Rejoagung',
    type: 'pendidikan',
    description: 'Sekolah Dasar Negeri',
    facilities: 'Gedung Sekolah, Perpustakaan, Lapangan'
  },
  {
    coordinates: [-8.386, 114.304] as [number, number],
    name: 'TK Dharma Wanita',
    type: 'pendidikan',
    description: 'Taman Kanak-kanak',
    facilities: 'Ruang Kelas, Taman Bermain'
  },
  // Fasilitas Umum (Ungu)
  {
    coordinates: [-8.382, 114.305] as [number, number],
    name: 'Pasar Desa',
    type: 'fasilitas-umum',
    description: 'Pasar Tradisional Desa',
    facilities: 'Kios Pedagang, Area Parkir'
  },
  {
    coordinates: [-8.387, 114.301] as [number, number],
    name: 'Terminal Desa',
    type: 'fasilitas-umum',
    description: 'Terminal Angkutan Desa',
    facilities: 'Shelter, Area Parkir'
  },
  // Tempat Ibadah (Orange)
  {
    coordinates: [-8.383, 114.306] as [number, number],
    name: 'Masjid Al-Ikhlas',
    type: 'tempat-ibadah',
    description: 'Masjid Desa Rejoagung',
    facilities: 'Ruang Sholat, Tempat Wudhu, Perpustakaan'
  },
  {
    coordinates: [-8.388, 114.302] as [number, number],
    name: 'Musholla At-Taqwa',
    type: 'tempat-ibadah',
    description: 'Musholla Dusun',
    facilities: 'Ruang Sholat, Tempat Wudhu'
  },
  // Kesehatan (Pink)
  {
    coordinates: [-8.381, 114.307] as [number, number],
    name: 'Posyandu Melati',
    type: 'kesehatan',
    description: 'Pos Pelayanan Terpadu',
    facilities: 'Penimbangan Balita, Imunisasi, KB'
  },
  // Pertanian (Hijau Tua)
  {
    coordinates: [-8.389, 114.303] as [number, number],
    name: 'Gapoktan Makmur',
    type: 'pertanian',
    description: 'Gabungan Kelompok Tani',
    facilities: 'Gudang, Tempat Pertemuan'
  },
  // Ekonomi (Merah)
  {
    coordinates: [-8.390, 114.304] as [number, number],
    name: 'UD. Sejahtera',
    type: 'ekonomi',
    description: 'Usaha Dagang Sembako',
    facilities: 'Toko, Gudang'
  },
  {
    coordinates: [-8.379, 114.309] as [number, number],
    name: 'Warung Pak Harto',
    type: 'ekonomi',
    description: 'Warung Makan',
    facilities: 'Tempat Makan, Parkir'
  }
]

// Color configuration
const TYPE_COLORS = {
  'fasilitas-desa': '#10b981',
  'pendidikan': '#3b82f6',
  'fasilitas-umum': '#8b5cf6',
  'tempat-ibadah': '#f59e0b',
  'kesehatan': '#ec4899',
  'pertanian': '#65a30d',
  'ekonomi': '#dc2626'
}

// Optimized Leaflet loader with caching
let leafletPromise: Promise<any> | null = null

const loadLeaflet = () => {
  if (leafletPromise) return leafletPromise
  
  leafletPromise = new Promise((resolve) => {
    if (window.L) {
      resolve(window.L)
      return
    }

    // Load CSS first (non-blocking)
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Load JS
    if (!document.querySelector('script[src*="leaflet.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
      script.onload = () => resolve(window.L)
      document.head.appendChild(script)
    } else {
      // Script already loaded, wait for it
      const checkLoaded = () => {
        if (window.L) {
          resolve(window.L)
        } else {
          setTimeout(checkLoaded, 50)
        }
      }
      checkLoaded()
    }
  })

  return leafletPromise
}

// Optimized icon creation with memoization
const iconCache = new Map()

const createCustomIcon = (type: string) => {
  if (iconCache.has(type)) {
    return iconCache.get(type)
  }

  const L = window.L
  const color = TYPE_COLORS[type as keyof typeof TYPE_COLORS] || '#6b7280'
  
  const icon = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        width: 25px;
        height: 25px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">
        📍
      </div>
    `,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  })

  iconCache.set(type, icon)
  return icon
}

export default function DesaMapContainer({ height = '500px' }: DesaMapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return

    let isMounted = true

    const initializeMap = async () => {
      try {
        setIsLoading(true)
        
        // Load Leaflet with optimized caching
        const L = await loadLeaflet()
        
        if (!isMounted) return

        // Center coordinates for Desa Rejoagung
        const desaCenter: [number, number] = [-8.3833, 114.3014]
        
        const map = L.map(mapRef.current, {
          preferCanvas: true, // Use Canvas for better performance with many markers
          zoomControl: true,
          attributionControl: true
        }).setView(desaCenter, 14)

        // Add tile layer with error handling
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmI3MjgwIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=='
        }).addTo(map)

        // Batch marker creation for better performance
        const markers: any[] = []
        
        DESA_LOCATIONS.forEach(location => {
          const marker = L.marker(location.coordinates, {
            icon: createCustomIcon(location.type)
          })

          // Create popup content
          const popupContent = `
            <div style="max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                ${location.name}
              </h3>
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                ${location.description}
              </p>
              <div style="background: #f3f4f6; padding: 8px; border-radius: 6px; border-left: 4px solid ${TYPE_COLORS[location.type as keyof typeof TYPE_COLORS]};">
                <strong style="color: #374151; font-size: 12px;">Fasilitas:</strong><br>
                <span style="color: #6b7280; font-size: 12px;">${location.facilities}</span>
              </div>
            </div>
          `

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
          })

          markers.push(marker)
        })

        // Add all markers at once for better performance
        const markerGroup = L.layerGroup(markers).addTo(map)

        // Fit bounds with padding
        if (markers.length > 0) {
          const group = new L.FeatureGroup(markers)
          map.fitBounds(group.getBounds().pad(0.1))
        }

        mapInstanceRef.current = map
        setIsLoading(false)

      } catch (err) {
        console.error('Error initializing map:', err)
        setError('Gagal memuat peta. Silakan refresh halaman.')
        setIsLoading(false)
      }
    }

    initializeMap()

    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  if (error) {
    return (
      <div 
        style={{ height, width: '100%' }}
        className="rounded-lg shadow-lg border border-red-200 bg-red-50 flex items-center justify-center"
      >
        <div className="text-center p-6">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-700 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Refresh Halaman
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative">
        <div
          ref={mapRef}
          style={{ height, width: '100%' }}
          className="rounded-lg shadow-lg border border-gray-300"
        />
        
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat peta desa...</p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .custom-popup .leaflet-popup-content {
          margin: 10px 12px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>
    </>
  )
}
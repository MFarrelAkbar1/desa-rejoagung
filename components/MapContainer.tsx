// components/MapContainer.tsx - OPTIMIZED VERSION

'use client'

import { useEffect, useRef, useState } from 'react'

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
  schools: School[]
}

// School type colors and labels - memoized
const SCHOOL_TYPE_CONFIG = {
  TK: { color: '#ef4444', label: 'Taman Kanak-kanak' },
  SD: { color: '#3b82f6', label: 'Sekolah Dasar' },
  SMP: { color: '#10b981', label: 'Sekolah Menengah Pertama' },
  SMK: { color: '#f59e0b', label: 'Sekolah Menengah Kejuruan' },
  SLB: { color: '#8b5cf6', label: 'Sekolah Luar Biasa' }
}

// Optimized Leaflet loader (shared with DesaMapContainer)
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

// Optimized icon creation with caching
const iconCache = new Map()

const createCustomIcon = (schoolType: string) => {
  if (iconCache.has(schoolType)) {
    return iconCache.get(schoolType)
  }

  const L = window.L
  const config = SCHOOL_TYPE_CONFIG[schoolType as keyof typeof SCHOOL_TYPE_CONFIG]
  const color = config?.color || '#6b7280'
  
  const icon = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      ">
        ${schoolType}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  })

  iconCache.set(schoolType, icon)
  return icon
}

// Optimized popup content creation
const createPopupContent = (school: School) => {
  const config = SCHOOL_TYPE_CONFIG[school.type]
  const facilities = school.facilities ? school.facilities.join(', ') : 'Informasi tidak tersedia'
  
  return `
    <div style="max-width: 280px; font-family: system-ui, -apple-system, sans-serif;">
      <div style="border-bottom: 2px solid ${config.color}; padding-bottom: 8px; margin-bottom: 12px;">
        <h3 style="margin: 0 0 4px 0; color: #1f2937; font-size: 16px; font-weight: 600; line-height: 1.3;">
          ${school.name}
        </h3>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="
            background: ${config.color}; 
            color: white; 
            padding: 2px 8px; 
            border-radius: 12px; 
            font-size: 11px; 
            font-weight: 600;
          ">
            ${school.type}
          </span>
          ${school.rating ? `
            <div style="display: flex; align-items: center; gap: 2px;">
              <span style="color: #fbbf24; font-size: 14px;">⭐</span>
              <span style="color: #6b7280; font-size: 12px;">${school.rating}/5</span>
            </div>
          ` : ''}
        </div>
        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.4;">
          ${config.label}
        </p>
      </div>
      
      <div style="margin-bottom: 12px;">
        <p style="margin: 0 0 6px 0; color: #374151; font-size: 13px; line-height: 1.4;">
          📍 ${school.address}
        </p>
        ${school.description ? `
          <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 12px; line-height: 1.4;">
            ${school.description}
          </p>
        ` : ''}
      </div>

      ${school.students || school.teachers ? `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
          ${school.students ? `
            <div style="background: #f3f4f6; padding: 6px; border-radius: 6px; text-align: center;">
              <div style="color: #374151; font-size: 11px; font-weight: 600;">Siswa</div>
              <div style="color: #1f2937; font-size: 14px; font-weight: 700;">${school.students}</div>
            </div>
          ` : ''}
          ${school.teachers ? `
            <div style="background: #f3f4f6; padding: 6px; border-radius: 6px; text-align: center;">
              <div style="color: #374151; font-size: 11px; font-weight: 600;">Guru</div>
              <div style="color: #1f2937; font-size: 14px; font-weight: 700;">${school.teachers}</div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div style="background: #f9fafb; padding: 10px; border-radius: 8px; border-left: 4px solid ${config.color};">
        <strong style="color: #374151; font-size: 12px; display: block; margin-bottom: 4px;">🏢 Fasilitas:</strong>
        <span style="color: #6b7280; font-size: 11px; line-height: 1.4;">${facilities}</span>
      </div>

      ${school.contact ? `
        <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
          <span style="color: #6b7280; font-size: 11px;">📞 ${school.contact}</span>
        </div>
      ` : ''}
    </div>
  `
}

export default function MapContainer({ height = '500px', schools }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || !schools.length) return

    let isMounted = true

    const initializeMap = async () => {
      try {
        setIsLoading(true)
        
        // Load Leaflet with optimized caching
        const L = await loadLeaflet()
        
        if (!isMounted) return

        // Initialize map with performance optimizations
        const map = L.map(mapRef.current, {
          preferCanvas: true, // Use Canvas for better performance
          zoomControl: true,
          attributionControl: true
        }).setView([-8.3833, 114.3014], 13) // Default center for Rejoagung

        // Add tile layer with error handling
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0iI2Y5ZmFmYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmI3MjgwIj5Mb2FkaW5nLi4uPC90ZXh0Pjwvc3ZnPg=='
        }).addTo(map)

        // Batch marker creation for better performance
        const markers: any[] = []
        
        schools.forEach(school => {
          const marker = L.marker(school.coordinates, {
            icon: createCustomIcon(school.type)
          })

          marker.bindPopup(createPopupContent(school), {
            maxWidth: 300,
            className: 'custom-popup'
          })

          markers.push(marker)
        })

        // Add all markers at once
        const markerGroup = L.layerGroup(markers).addTo(map)

        // Fit map to show all markers with padding
        if (markers.length > 0) {
          const group = new L.FeatureGroup(markers)
          map.fitBounds(group.getBounds().pad(0.1))
        }

        mapInstanceRef.current = map
        setIsLoading(false)

      } catch (err) {
        console.error('Error initializing schools map:', err)
        setError('Gagal memuat peta sekolah. Silakan refresh halaman.')
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
  }, [schools])

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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat peta sekolah...</p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border: 1px solid #e5e7eb;
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px 14px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
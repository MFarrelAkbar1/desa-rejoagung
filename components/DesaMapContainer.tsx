'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { desaMarkers, desaBoundaries, dusunData } from '@/data/desaData'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface DesaMapContainerProps {
  height?: string
  onMapReady?: (controls: {
    zoomIn: () => void
    zoomOut: () => void
    centerMap: () => void
    locateUser: () => void
  }) => void
}

export default function DesaMapContainer({ height = '600px', onMapReady }: DesaMapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  // Expose map controls
  const zoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn()
    }
  }

  const zoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut()
    }
  }

  const centerMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([-8.3833, 114.3014], 14)
    }
  }

  const locateUser = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.locate({
        setView: true,
        maxZoom: 16,
        timeout: 10000
      })
    }
  }

  const createCustomIcon = (type: string) => {
    const icons = {
      'fasilitas-umum': { emoji: '🏛️', color: '#8B5CF6' }, // Ungu
      'pendidikan': { emoji: '🎓', color: '#3B82F6' }, // Biru
      'fasilitas-desa': { emoji: '🏢', color: '#10B981' }, // Hijau
      'lain-lain': { emoji: '📍', color: '#6B7280' }, // Abu-abu
      'dusun': { emoji: '🏘️', color: '#F59E0B' } // Kuning
    }
    
    const iconData = icons[type as keyof typeof icons] || { emoji: '📍', color: '#6B7280' }
    
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: ${iconData.color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        ">
          ${iconData.emoji}
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17]
    })
  }

  const createPopupContent = (marker: any) => {
    return `
      <div style="min-width: 250px; font-family: Arial, sans-serif;">
        <div style="
          background: linear-gradient(135deg, ${marker.color}, ${marker.color}dd);
          color: white;
          padding: 8px 12px;
          margin: -10px -12px 8px -12px;
          border-radius: 4px 4px 0 0;
        ">
          <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${marker.name}</h3>
          <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">${marker.type}</p>
        </div>
        <div style="padding: 4px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.4;">
            <strong>📍 Lokasi:</strong><br>
            ${marker.description}
          </p>
          ${marker.facilities ? `
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
              <strong>🏢 Fasilitas:</strong><br>
              ${marker.facilities}
            </p>
          ` : ''}
          <p style="margin: 0; font-size: 12px; color: #888;">
            <strong>📍 Koordinat:</strong> ${marker.coordinates[0].toFixed(6)}, ${marker.coordinates[1].toFixed(6)}
          </p>
        </div>
      </div>
    `
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Center coordinates untuk Desa Rejoagung
    const centerLat = -8.3833
    const centerLng = 114.3014

    // Initialize map
    const map = L.map(mapRef.current).setView([centerLat, centerLng], 14)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add markers untuk fasilitas desa
    desaMarkers.forEach(marker => {
      const leafletMarker = L.marker(marker.coordinates, {
        icon: createCustomIcon(marker.type)
      }).addTo(map)

      leafletMarker.bindPopup(createPopupContent(marker), {
        maxWidth: 320,
        className: 'custom-popup'
      })
    })

    // Add polygon untuk batas desa menggunakan koordinat yang lebih akurat
    L.polygon(desaBoundaries as L.LatLngExpression[], {
      color: '#10B981',
      weight: 4,
      opacity: 0.8,
      fillColor: '#10B981',
      fillOpacity: 0.15,
      dashArray: '10, 5'
    }).addTo(map).bindPopup(`
      <div style="text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #10B981;">🏘️ Desa Rejoagung</h3>
        <p style="margin: 0; font-size: 13px;"><strong>Luas:</strong> 668,883 Ha</p>
        <p style="margin: 0; font-size: 13px;"><strong>Penduduk:</strong> 8.574 jiwa</p>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Kec. Srono, Kab. Banyuwangi</p>
      </div>
    `)

    // Add area markers untuk setiap dusun
    dusunData.forEach((dusun, index) => {
      const dusunCenter = [
        -8.383 + (index * 0.002), // Spread vertically
        114.303 + (index * 0.003)  // Spread horizontally  
      ] as L.LatLngExpression

      const dusunMarker = L.circleMarker(dusunCenter, {
        radius: 15,
        fillColor: dusun.color,
        color: '#fff',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.7
      }).addTo(map)

      dusunMarker.bindPopup(`
        <div style="min-width: 200px;">
          <div style="
            background: ${dusun.color};
            color: white;
            padding: 8px 12px;
            margin: -10px -12px 8px -12px;
            border-radius: 4px 4px 0 0;
          ">
            <h3 style="margin: 0; font-size: 16px;">🏘️ Dusun ${dusun.name}</h3>
          </div>
          <div style="padding: 4px 0;">
            <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>📍 Lokasi:</strong> ${dusun.area}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>📋 Deskripsi:</strong> ${dusun.description}</p>
            <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>🏠 RT/RW:</strong></p>
            <div style="font-size: 11px; color: #666; line-height: 1.3;">
              ${dusun.rtList.slice(0, 6).join(', ')}${dusun.rtList.length > 6 ? '...' : ''}
            </div>
          </div>
        </div>
      `)
    })

    mapInstanceRef.current = map

    // Call onMapReady with control functions
    if (onMapReady) {
      onMapReady({
        zoomIn,
        zoomOut,
        centerMap,
        locateUser
      })
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <>
      <div
        ref={mapRef}
        style={{ height, width: '100%' }}
        className="rounded-lg shadow-lg border border-gray-300"
      />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-[1000] max-w-xs">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🗺️ Legenda</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 border-2 border-white shadow-md"></div>
            <span className="text-gray-700">Fasilitas Umum</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
            <span className="text-gray-700">Pendidikan</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
            <span className="text-gray-700">Fasilitas Desa</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow-md"></div>
            <span className="text-gray-700">Pusat Dusun</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-white shadow-md"></div>
            <span className="text-gray-700">Lain-lain</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 border-2 border-green-500 bg-green-100 opacity-70"></div>
              <span className="text-gray-700">Batas Desa</span>
            </div>
            <div className="grid grid-cols-1 gap-1 text-xs text-gray-600 ml-5">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                <span>Krajan</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span>Sumberagung</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span>Sumbergroto</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Klik marker untuk detail lengkap
          </p>
        </div>
      </div>

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
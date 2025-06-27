// components/MapContainer.tsx
'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { schools, schoolTypeColors, School } from '@/data/schools'

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapContainerProps {
  height?: string
}

export default function MapContainer({ height = '600px' }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  const createCustomIcon = (type: School['type']) => {
    const color = schoolTypeColors[type]
    
    return L.divIcon({
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
          <p style="margin: 0; font-size: 12px; color: #888;">
            <strong>📍 Koordinat:</strong> ${school.coordinates[0].toFixed(6)}, ${school.coordinates[1].toFixed(6)}
          </p>
        </div>
      </div>
    `
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Center coordinates (average of all schools)
    const centerLat = schools.reduce((sum, school) => sum + school.coordinates[0], 0) / schools.length
    const centerLng = schools.reduce((sum, school) => sum + school.coordinates[1], 0) / schools.length

    // Initialize map
    const map = L.map(mapRef.current).setView([centerLat, centerLng], 15)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add markers for each school
    schools.forEach(school => {
      const marker = L.marker(school.coordinates, {
        icon: createCustomIcon(school.type)
      }).addTo(map)

      marker.bindPopup(createPopupContent(school), {
        maxWidth: 300,
        className: 'custom-popup'
      })
    })

    // Fit map to show all markers
    const group = new L.FeatureGroup(
      schools.map(school => L.marker(school.coordinates))
    )
    map.fitBounds(group.getBounds().pad(0.1))

    mapInstanceRef.current = map

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
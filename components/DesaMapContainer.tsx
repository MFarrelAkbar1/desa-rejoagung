// components/DesaMapContainer.tsx - Tanpa Legend Built-in
'use client'

import { useEffect, useRef } from 'react'

// Leaflet imports - should match the existing pattern
declare global {
  interface Window {
    L: any
  }
}

interface DesaMapContainerProps {
  height?: string
}

export default function DesaMapContainer({ height = '500px' }: DesaMapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

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

      // Initialize map
      const L = window.L
      
      // Center coordinates for Desa Rejoagung
      const desaCenter: [number, number] = [-8.3833, 114.3014]
      
      const map = L.map(mapRef.current).setView(desaCenter, 14)

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      // Complete locations data with all existing places from desaData
      const desaLocations = [
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
          coordinates: [-8.382, 114.302] as [number, number],
          name: 'TK Dharma Wanita',
          type: 'pendidikan',
          description: 'Taman Kanak-kanak',
          facilities: 'Pendidikan Usia Dini, 3 Ruang Kelas'
        },
        {
          coordinates: [-8.385, 114.304] as [number, number],
          name: 'MI (Madrasah Ibtidaiyah)',
          type: 'pendidikan',
          description: 'Madrasah Ibtidaiyah',
          facilities: 'Pendidikan Dasar Islam, 6 Ruang Kelas'
        },
        {
          coordinates: [-8.384798810410489, 114.30237941420603] as [number, number],
          name: 'SDN 1 Rejoagung Srono',
          type: 'pendidikan',
          description: 'Sekolah Dasar Negeri 1',
          facilities: 'SD Negeri, Perpustakaan, Lab Komputer'
        },
        {
          coordinates: [-8.383768572513736, 114.30685111350854] as [number, number],
          name: 'SDN 2 Rejoagung',
          type: 'pendidikan',
          description: 'Sekolah Dasar Negeri 2',
          facilities: 'SD Negeri, Perpustakaan, Lab IPA'
        },
        {
          coordinates: [-8.388, 114.298] as [number, number],
          name: 'SDN 3 Rejoagung',
          type: 'pendidikan',
          description: 'Sekolah Dasar Negeri 3',
          facilities: 'SD Negeri, Perpustakaan, Lapangan'
        },
        {
          coordinates: [-8.379497666674562, 114.30612847162135] as [number, number],
          name: 'SMP Al Amiriyyah',
          type: 'pendidikan',
          description: 'Sekolah Menengah Pertama',
          facilities: 'SMP, Lab IPA, Perpustakaan, Masjid'
        },
        {
          coordinates: [-8.379091765348011, 114.3050691166798] as [number, number],
          name: 'SMK NU Darussalam',
          type: 'pendidikan',
          description: 'Sekolah Menengah Kejuruan',
          facilities: 'SMK, Lab Teknik, Workshop, Asrama'
        },

        // Fasilitas Umum (Ungu)
        {
          coordinates: [-8.383, 114.305] as [number, number],
          name: 'Pasar Sabtu',
          type: 'fasilitas-umum',
          description: 'Pasar tradisional yang buka setiap hari Sabtu',
          facilities: 'Pasar Tradisional, 50+ Pedagang'
        },
        {
          coordinates: [-8.386, 114.301] as [number, number],
          name: 'Pasar Tradisional Laisin',
          type: 'fasilitas-umum',
          description: 'Pasar tradisional harian',
          facilities: 'Pasar Harian, Hasil Bumi, Sayuran'
        },
        {
          coordinates: [-8.381, 114.308] as [number, number],
          name: 'Rejoagung Sport Center',
          type: 'fasilitas-umum',
          description: 'Pusat olahraga desa',
          facilities: 'Lapangan Futsal, Badminton, Gym'
        },
        {
          coordinates: [-8.380, 114.295] as [number, number],
          name: 'Climb Hill Rejoagung',
          type: 'fasilitas-umum',
          description: 'Area panjat tebing dan hiking',
          facilities: 'Wall Climbing, Hiking Trail'
        },
        {
          coordinates: [-8.389, 114.306] as [number, number],
          name: 'Boklawan',
          type: 'fasilitas-umum',
          description: 'Area rekreasi dan wisata alam',
          facilities: 'Taman, Gazebo, Area Piknik'
        },

        // Tempat Ibadah (Emas)
        {
          coordinates: [-8.3835, 114.3020] as [number, number],
          name: 'Masjid Jami Rejoagung',
          type: 'ibadah',
          description: 'Masjid utama desa',
          facilities: 'Masjid, Madrasah, Perpustakaan Islam'
        },
        {
          coordinates: [-8.385, 114.307] as [number, number],
          name: 'Masjid Al-Ikhlas',
          type: 'ibadah',
          description: 'Masjid dusun Sumberagung',
          facilities: 'Masjid, TPA, Ruang Serbaguna'
        },
        {
          coordinates: [-8.387, 114.299] as [number, number],
          name: 'Mushola Al-Hidayah',
          type: 'ibadah',
          description: 'Mushola dusun Sumbergroto',
          facilities: 'Mushola, TPA'
        },

        // Fasilitas Kesehatan (Merah Muda)
        {
          coordinates: [-8.382, 114.304] as [number, number],
          name: 'Posyandu Melati',
          type: 'kesehatan',
          description: 'Posyandu dusun Krajan',
          facilities: 'Imunisasi, Penimbangan, Gizi'
        },
        {
          coordinates: [-8.386, 114.308] as [number, number],
          name: 'Posyandu Mawar',
          type: 'kesehatan',
          description: 'Posyandu dusun Sumberagung',
          facilities: 'Posyandu Balita, Lansia'
        },
        {
          coordinates: [-8.388, 114.297] as [number, number],
          name: 'Posyandu Dahlia',
          type: 'kesehatan',
          description: 'Posyandu dusun Sumbergroto',
          facilities: 'Kesehatan Ibu dan Anak'
        },

        // Ekonomi & Perkebunan (Coklat)
        {
          coordinates: [-8.377, 114.310] as [number, number],
          name: 'Perkebunan Kelapa Sawit Utara',
          type: 'pertanian',
          description: 'Area perkebunan kelapa sawit terluas',
          facilities: 'Kelapa Sawit 120 Ha, Gudang, Kantor'
        },
        {
          coordinates: [-8.390, 114.308] as [number, number],
          name: 'Perkebunan Kelapa Sawit Selatan',
          type: 'pertanian',
          description: 'Perkebunan kelapa sawit bagian selatan',
          facilities: 'Kelapa Sawit 80 Ha, Pabrik Mini'
        },
        {
          coordinates: [-8.384, 114.309] as [number, number],
          name: 'Koperasi Tani Sejahtera',
          type: 'ekonomi',
          description: 'Koperasi petani kelapa sawit',
          facilities: 'Simpan Pinjam, Pupuk, Alsintan'
        },
        {
          coordinates: [-8.385, 114.300] as [number, number],
          name: 'UMKM Center',
          type: 'ekonomi',
          description: 'Pusat UMKM desa',
          facilities: 'Gula Merah, Sale Pisang, Kerajinan'
        }
      ]

      // Icon configurations for different types
      const iconConfigs = {
        'fasilitas-desa': { color: '#10b981', symbol: '🏛️' },
        'pendidikan': { color: '#3b82f6', symbol: '🎓' },
        'fasilitas-umum': { color: '#8b5cf6', symbol: '🏢' },
        'ibadah': { color: '#f59e0b', symbol: '🕌' },
        'kesehatan': { color: '#ec4899', symbol: '🏥' },
        'pertanian': { color: '#65a30d', symbol: '🌱' },
        'ekonomi': { color: '#dc2626', symbol: '🏪' }
      }

      // Add markers for each location
      desaLocations.forEach(location => {
        const config = iconConfigs[location.type as keyof typeof iconConfigs]
        
        // Custom icon
        const customIcon = L.divIcon({
          html: `
            <div style="
              background-color: ${config.color};
              width: 32px;
              height: 32px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              border: 3px solid white;
              box-shadow: 0 3px 6px rgba(0,0,0,0.3);
              cursor: pointer;
            ">
              ${config.symbol}
            </div>
          `,
          className: 'custom-div-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })

        const marker = L.marker(location.coordinates, { icon: customIcon }).addTo(map)
        
        // Popup content
        const popupContent = `
          <div style="min-width: 250px; max-width: 320px;">
            <h3 style="margin: 0 0 8px 0; color: ${config.color}; font-weight: bold; font-size: 16px;">
              ${config.symbol} ${location.name}
            </h3>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; line-height: 1.4;">
              ${location.description}
            </p>
            ${location.facilities ? `
              <div style="margin: 8px 0; padding: 8px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid ${config.color};">
                <p style="margin: 0; font-size: 13px; color: #374151;">
                  <strong>🏢 Fasilitas:</strong><br>
                  ${location.facilities}
                </p>
              </div>
            ` : ''}
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              📍 ${location.coordinates[0].toFixed(6)}, ${location.coordinates[1].toFixed(6)}
            </div>
          </div>
        `
        
        marker.bindPopup(popupContent, {
          maxWidth: 350,
          className: 'custom-popup'
        })
      })

      // Add village boundary (more accurate polygon)
      const villageBoundary = [
        [-8.375, 114.295],  // Batas Utara-Barat
        [-8.375, 114.315],  // Batas Utara-Timur
        [-8.395, 114.315],  // Batas Selatan-Timur
        [-8.395, 114.285],  // Batas Selatan-Barat
        [-8.375, 114.285],  // Kembali ke awal
        [-8.375, 114.295]   // Close polygon
      ]

      L.polygon(villageBoundary, {
        color: '#10b981',
        weight: 4,
        opacity: 0.8,
        fillColor: '#10b981',
        fillOpacity: 0.1,
        dashArray: '10, 5'
      }).addTo(map).bindPopup(`
        <div style="text-align: center; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #10b981; font-size: 18px;">🏘️ Desa Rejoagung</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; text-align: left;">
            <div><strong>Luas:</strong> 668,883 Ha</div>
            <div><strong>Penduduk:</strong> 8.574 jiwa</div>
            <div><strong>KK:</strong> 2.886 KK</div>
            <div><strong>Ketinggian:</strong> 210 mdpl</div>
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
            Kec. Srono, Kab. Banyuwangi, Jawa Timur
          </p>
        </div>
      `)

      // Add dusun areas with different colors
      const dusunAreas = [
        {
          name: 'Dusun Krajan',
          boundary: [
            [-8.375, 114.295],
            [-8.375, 114.305],
            [-8.385, 114.305],
            [-8.385, 114.295],
            [-8.375, 114.295]
          ],
          color: '#ef4444',
          center: [-8.380, 114.300]
        },
        {
          name: 'Dusun Sumberagung',
          boundary: [
            [-8.375, 114.305],
            [-8.375, 114.315],
            [-8.390, 114.315],
            [-8.390, 114.305],
            [-8.375, 114.305]
          ],
          color: '#22c55e',
          center: [-8.382, 114.310]
        },
        {
          name: 'Dusun Sumbergroto',
          boundary: [
            [-8.385, 114.285],
            [-8.385, 114.305],
            [-8.395, 114.305],
            [-8.395, 114.285],
            [-8.385, 114.285]
          ],
          color: '#3b82f6',
          center: [-8.390, 114.295]
        }
      ]

      dusunAreas.forEach(dusun => {
        L.polygon(dusun.boundary, {
          color: dusun.color,
          weight: 2,
          opacity: 0.6,
          fillColor: dusun.color,
          fillOpacity: 0.05
        }).addTo(map).bindPopup(`
          <div style="text-align: center;">
            <h4 style="margin: 0 0 4px 0; color: ${dusun.color};">📍 ${dusun.name}</h4>
            <p style="margin: 0; font-size: 12px; color: #666;">Area administratif dusun</p>
          </div>
        `)
      })

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
          border: 1px solid #e5e7eb;
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px 15px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-div-icon:hover {
          transform: scale(1.1);
          transition: transform 0.2s ease;
        }
      `}</style>
    </>
  )
}
// utils/mapUtils.ts
import { School } from '@/constants/schoolsData'

export const getSchoolTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    'Sekolah Dasar': '#22c55e',
    'Sekolah Menengah Pertama': '#3b82f6', 
    'Sekolah Menengah Atas': '#f59e0b',
    'Sekolah Menengah Kejuruan': '#8b5cf6',
    'Taman Kanak-Kanak': '#ec4899'
  }
  return colors[type] || '#6b7280'
}

export const getTypeColorClass = (type: string): string => {
  const colors: { [key: string]: string } = {
    'Sekolah Dasar': 'bg-green-100 text-green-800 border-green-200',
    'Sekolah Menengah Pertama': 'bg-blue-100 text-blue-800 border-blue-200',
    'Sekolah Menengah Atas': 'bg-orange-100 text-orange-800 border-orange-200',
    'Sekolah Menengah Kejuruan': 'bg-purple-100 text-purple-800 border-purple-200',
    'Taman Kanak-Kanak': 'bg-pink-100 text-pink-800 border-pink-200'
  }
  return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export const createPopupContent = (school: School): string => {
  const iconColor = getSchoolTypeColor(school.type)
  
  return `
    <div style="min-width: 280px; font-family: system-ui, -apple-system, sans-serif;">
      <div style="margin-bottom: 12px;">
        <h3 style="font-weight: bold; font-size: 16px; color: #1f2937; margin: 0 0 4px 0;">
          ${school.name}
        </h3>
        <span style="background-color: ${iconColor}20; color: ${iconColor}; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 500;">
          ${school.type}
        </span>
      </div>
      
      <div style="space-y: 8px; font-size: 14px;">
        <div style="display: flex; align-items: flex-start; margin-bottom: 6px;">
          <span style="color: #6b7280; margin-right: 8px;">📍</span>
          <span style="color: #4b5563; line-height: 1.4;">${school.address}</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="color: #6b7280; margin-right: 8px;">👥</span>
          <span style="color: #4b5563;">${school.students} Siswa • ${school.teachers} Guru</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="color: #fbbf24; margin-right: 8px;">⭐</span>
          <span style="color: #4b5563;">Rating: ${school.rating}/5</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="color: #6b7280; margin-right: 8px;">📞</span>
          <span style="color: #4b5563;">${school.contact}</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 6px;">
          <span style="color: #6b7280; margin-right: 8px;">🏆</span>
          <span style="color: #4b5563;">Akreditasi: ${school.accreditation}</span>
        </div>
        
        <div style="margin-top: 8px;">
          <div style="color: #6b7280; font-size: 12px; margin-bottom: 4px;">Fasilitas:</div>
          <div style="color: #4b5563; font-size: 12px; line-height: 1.4;">
            ${school.facilities.join(' • ')}
          </div>
        </div>
      </div>
    </div>
  `
}

export const loadLeafletLibrary = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.L) {
      resolve()
      return
    }

    // Load CSS
    const cssLink = document.createElement('link')
    cssLink.rel = 'stylesheet'
    cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'
    document.head.appendChild(cssLink)

    // Load JS
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}
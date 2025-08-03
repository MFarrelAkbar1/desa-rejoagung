// app/potensi-desa/page.tsx - Updated Version (tanpa PotensiUnggulanTab)
'use client'

import { useState } from 'react'
import { Users, Trees, Building } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'
// DIHAPUS: import PotensiUnggulanTab from './components/PotensiUnggulanTab'
import GeografiPendudukTab from './components/GeografiPendudukTab'
import SumberDayaAlamTab from './components/SumberDayaAlamTab'
import SaranaPrasaranaTab from './components/SaranaPrasaranaTab'

export interface TabConfig {
  id: string
  label: string
  icon: any
  color: string
  hoverColor: string
}

// UPDATED: Hapus tab "unggulan"
const tabs: TabConfig[] = [
  {
    id: 'geografi',
    label: 'Geografi dan Penduduk',
    icon: Users,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700'
  },
  {
    id: 'sda',
    label: 'Sumber Daya Alam',
    icon: Trees,
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700'
  },
  {
    id: 'sarana',
    label: 'Sarana Prasarana',
    icon: Building,
    color: 'bg-orange-600',
    hoverColor: 'hover:bg-orange-700'
  }
]

export default function PotensiDesaPage() {
  // UPDATED: Ganti default tab dari 'unggulan' ke 'geografi'
  const [activeTab, setActiveTab] = useState('geografi')

  const renderTabContent = () => {
    switch (activeTab) {
      // DIHAPUS: case 'unggulan': return <PotensiUnggulanTab />
      case 'geografi':
        return <GeografiPendudukTab />
      case 'sda':
        return <SumberDayaAlamTab />
      case 'sarana':
        return <SaranaPrasaranaTab />
      default:
        // UPDATED: Ganti default dari PotensiUnggulanTab ke GeografiPendudukTab
        return <GeografiPendudukTab />
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Potensi Desa', href: '/potensi-desa' }]} />
       
        {/* Header */}
        <div className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Potensi Desa Rejoagung
          </h1>
          <p className="text-lg text-gray-600">
            Explore berbagai potensi dan kekayaan yang dimiliki Desa Rejoagung
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-white rounded-t-lg p-4">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              const isActive = activeTab === tab.id
             
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${isActive
                      ? `${tab.color} text-white shadow-lg transform -translate-y-0.5`
                      : `text-gray-600 hover:text-gray-900 ${tab.hoverColor} hover:text-white hover:shadow-md`
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
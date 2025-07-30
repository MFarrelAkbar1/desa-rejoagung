// app/potensi-desa/page.tsx - Original Version (tanpa PostTerbaru)

'use client'

import { useState } from 'react'
import { MapPin, Users, Trees, Building } from 'lucide-react'
import Breadcrumb from '@/components/layout/Breadcrumb'
import PotensiUnggulanTab from './components/PotensiUnggulanTab'
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

const tabs: TabConfig[] = [
  {
    id: 'unggulan',
    label: 'Potensi Unggulan',
    icon: MapPin,
    color: 'bg-purple-600',
    hoverColor: 'hover:bg-purple-700'
  },
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
  const [activeTab, setActiveTab] = useState('unggulan')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'unggulan':
        return <PotensiUnggulanTab />
      case 'geografi':
        return <GeografiPendudukTab />
      case 'sda':
        return <SumberDayaAlamTab />
      case 'sarana':
        return <SaranaPrasaranaTab />
      default:
        return <PotensiUnggulanTab />
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
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-b-lg border-t-0 min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
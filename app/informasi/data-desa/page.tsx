// app/informasi/data-desa/page.tsx
'use client'

import { useState } from 'react'
import { BarChart3, Users, GraduationCap, Heart, Music, Trophy } from 'lucide-react'
import { tabsConfig } from '@/data/dataDesaConstants'
import KependudukanTab from '@/components/tabs/KependudukanTab'
import PendidikanTab from '@/components/tabs/PendidikanTab'
import KesehatanTab from '@/components/tabs/KesehatanTab'
import SeniTab from '@/components/tabs/SeniTab'
import OlahragaTab from '@/components/tabs/OlahragaTab'

export default function DataDesaPage() {
  const [activeTab, setActiveTab] = useState('kependudukan')

  const getTabIcon = (tab: string) => {
    const icons = {
      kependudukan: Users,
      pendidikan: GraduationCap,
      kesehatan: Heart,
      seni: Music,
      olahraga: Trophy
    }
    return icons[tab as keyof typeof icons] || Users
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'kependudukan':
        return <KependudukanTab />
      case 'pendidikan':
        return <PendidikanTab />
      case 'kesehatan':
        return <KesehatanTab />
      case 'seni':
        return <SeniTab />
      case 'olahraga':
        return <OlahragaTab />
      default:
        return <KependudukanTab />
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Data Desa</h1>
              <p className="text-gray-600">Informasi Data Desa Rejoagung</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabsConfig.map((tab) => {
              const IconComponent = getTabIcon(tab.id)
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${activeTab === tab.id 
                      ? `${tab.color} text-white shadow-lg` 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
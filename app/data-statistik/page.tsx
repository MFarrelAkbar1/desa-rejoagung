'use client'

import { useState } from 'react'
import { BarChart3, Users, GraduationCap, Heart } from 'lucide-react'
import { tabsConfig } from '@/data/dataDesaConstants'
import KependudukanTab from '@/components/tabs/KependudukanTab'
import PendidikanTab from '@/components/tabs/PendidikanTab'
import KesehatanTab from '@/components/tabs/KesehatanTab'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function DataDesaPage() {
  const [activeTab, setActiveTab] = useState('kependudukan')

  const getTabIcon = (tab: string) => {
    const icons = {
      kependudukan: Users,
      pendidikan: GraduationCap,
      kesehatan: Heart
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
      default:
        return <KependudukanTab />
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Informasi', href: '/informasi' },
            { label: 'Data Desa', href: '/informasi/data-desa' },
          ]}
        />
       
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
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
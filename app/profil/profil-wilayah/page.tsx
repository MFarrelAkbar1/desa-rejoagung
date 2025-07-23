// app/profil/profil-wilayah/page.tsx
'use client'

import { useState } from 'react'
import { BarChart3, Users, GraduationCap, Heart, Briefcase } from 'lucide-react'
import { tabsWilayahConfig } from '@/data/dataWilayahConstants'
import DemografisTab from '@/components/tabs/DemografisTab'
import EkonomiTab from '@/components/tabs/EkonomiTab'
import PendidikanWilayahTab from '@/components/tabs/PendidikanWilayahTab'
import KesehatanWilayahTab from '@/components/tabs/KesehatanWilayahTab'
import Breadcrumb from '@/components/layout/Breadcrumb'

export default function ProfilWilayahPage() {
  const [activeTab, setActiveTab] = useState('demografis')

  const getTabIcon = (tab: string) => {
    const icons = {
      demografis: Users,
      ekonomi: Briefcase,
      pendidikan: GraduationCap,
      kesehatan: Heart
    }
    return icons[tab as keyof typeof icons] || Users
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'demografis':
        return <DemografisTab />
      case 'ekonomi':
        return <EkonomiTab />
      case 'pendidikan':
        return <PendidikanWilayahTab />
      case 'kesehatan':
        return <KesehatanWilayahTab />
      default:
        return <DemografisTab />
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb - Tambahkan di sini */}
        <Breadcrumb
          items={[
            { label: 'Profil', href: '/profil' },
            { label: 'Profil Wilayah', href: '/profil/profil-wilayah' },
          ]}
        />

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 mt-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Profil Wilayah</h1>
              <p className="text-gray-600">Kondisi geografis dan demografis Desa Rejoagung</p>
            </div>
          </div>

          {/* Intro Text */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
            <p className="text-emerald-800 text-sm leading-relaxed">
              Desa Rejoagung adalah salah satu Desa di Kecamatan Srono yang mempunyai luas wilayah 668,883 Ha. 
              Terdiri dari 5 (Lima) Dusun yaitu Dusun Krajan, Dusun Sumberagung, Dusun Rejoharjo, Dusun Purwosari dan Dusun Mekarjaya. 
              Jumlah penduduk Desa Rejoagung akhir 2024 sebanyak 8.574 jiwa yang terdiri dari 3.975 laki-laki dan 4.599 perempuan 
              dengan jumlah Kepala Keluarga sebanyak 2.886 KK. Sedangkan jumlah Keluarga Miskin (Gakin) 876 KK.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabsWilayahConfig.map((tab) => {
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

        {/* Footer Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">ℹ️ Informasi Tambahan</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">📍 Lokasi Geografis</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Koordinat: 8°23'S, 114°18'E</li>
                <li>• Ketinggian: 0,210 mdpl</li>
                <li>• Curah hujan: 1.066 mm/tahun</li>
                <li>• Topografi: Dataran rendah</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🌾 Potensi Unggulan</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Perkebunan kelapa sawit</li>
                <li>• Produksi gula merah tradisional</li>
                <li>• Pertanian padi dan palawija</li>
                <li>• Peternakan skala kecil</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
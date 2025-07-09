'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  FileText, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Home,
  Calendar,
  Eye,
  Edit,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    // Handle logout logic
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      window.location.href = '/'
    }
  }

  const stats = [
    {
      title: 'Total Penduduk',
      value: '2,547',
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Berita Artikel',
      value: '156',
      icon: FileText,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Produk Unggulan',
      value: '24',
      icon: Package,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Pengunjung Hari Ini',
      value: '1,234',
      icon: Eye,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  const quickActions = [
    {
      title: 'Tambah Berita',
      description: 'Buat artikel atau berita baru',
      icon: Plus,
      color: 'bg-emerald-500',
      href: '/admin/berita/create'
    },
    {
      title: 'Kelola Penduduk',
      description: 'Data dan informasi penduduk',
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/penduduk'
    },
    {
      title: 'Galeri Foto/Video',
      description: 'Upload dan kelola galeri',
      icon: Settings,
      color: 'bg-orange-500',
      href: '/admin/galeri'
    },
    {
      title: 'Laporan Website',
      description: 'Statistik dan analitik',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/admin/laporan'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'Berita baru "Panen Raya Kelapa Sawit 2025" telah dipublikasi',
      time: '2 jam yang lalu',
      type: 'publish'
    },
    {
      id: 2,
      action: 'Data penduduk diperbarui oleh Admin',
      time: '4 jam yang lalu',
      type: 'update'
    },
    {
      id: 3,
      action: 'Foto baru ditambahkan ke galeri',
      time: '6 jam yang lalu',
      type: 'upload'
    },
    {
      id: 4,
      action: 'Login admin dari IP 192.168.1.100',
      time: '8 jam yang lalu',
      type: 'login'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-md">
                <Image
                  src="/logo-rejoagung.png"
                  alt="Logo Desa Rejoagung"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Dashboard Admin</h1>
                <p className="text-sm text-gray-600">Desa Rejoagung</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600">Selamat datang, Admin</p>
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <Link
                href="/"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Website</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Selamat Datang di Dashboard Admin</h2>
            <p className="text-emerald-100">Kelola konten dan data Desa Rejoagung dengan mudah</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Aksi Cepat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => alert(`Navigasi ke ${action.href}`)}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${action.color} p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-emerald-600">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Aktivitas Terbaru</h3>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-4">
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
// components/navbar/menuData.ts

import {
  Home,
  User,
  FileText,
  MapPin,
  Target,
  Newspaper,
  Package,
  Utensils,
  BarChart3,
  Mountain,
  Facebook,
  Globe,
  UserCheck,
  Award,
  BookOpen,  // Tambahan icon untuk Booklet
  Leaf,      // Tambahan icon untuk Flora
  GraduationCap  // Tambahan icon untuk GuideBook UGM
} from 'lucide-react'

export interface MenuItem {
  id: string
  label: string
  icon: any
  href?: string
  submenu?: SubMenuItem[]
}

export interface SubMenuItem {
  id: string
  label: string
  icon: any
  href: string
}

export const menuItems: MenuItem[] = [
  {
    id: 'beranda',
    label: 'Beranda',
    icon: Home,
    href: '/'
  },
  {
    id: 'profil',
    label: 'Profil Desa',
    icon: User,
    submenu: [
      {
        id: 'tentang-desa',
        label: 'Tentang Desa',
        icon: FileText,
        href: '/profil/tentang-desa'
      },
      {
        id: 'kepala-desa',
        label: 'Profil Kepala Desa',
        icon: UserCheck,
        href: '/profil/kepala-desa'
      },
      {
        id: 'struktur-organisasi',
        label: 'Struktur Organisasi Desa',
        icon: Award,
        href: '/profil/struktur-organisasi'
      },
      {
        id: 'visi-misi',
        label: 'Visi dan Misi',
        icon: Target,
        href: '/profil/visi-misi'
      },
      {
        id: 'peta-desa',
        label: 'Peta Desa',
        icon: MapPin,
        href: '/profil/peta-desa'
      }
    ]
  },
  {
    id: 'data-statistik',
    label: 'Data Statistik Desa',
    icon: BarChart3,
    href: '/data-statistik'
  },
  // MENU BARU: Booklet
  {
    id: 'booklet',
    label: 'Booklet',
    icon: BookOpen,
    submenu: [
      {
        id: 'booklet-guidebook',
        label: 'E-GuideBook Desa UGM',
        icon: GraduationCap,
        href: '/booklet/guidebook'
      },
      {
        id: 'booklet-statistik',
        label: 'Statistik Desa',
        icon: BarChart3,
        href: '/booklet/statistik'
      },
      {
        id: 'booklet-flora',
        label: 'Arsip Flora',
        icon: Leaf,
        href: '/booklet/flora'
      }
    ]
  },
  {
    id: 'potensi-desa',
    label: 'Potensi Desa',
    icon: Mountain,
    href: '/potensi-desa'
  },
  {
    id: 'produk-kuliner',
    label: 'Produk & Kuliner',
    icon: Package,
    submenu: [
      {
        id: 'produk',
        label: 'Produk Unggulan',
        icon: Package,
        href: '/produk-kuliner/produk'
      },
      {
        id: 'kuliner',
        label: 'Kuliner Lokal',
        icon: Utensils,
        href: '/produk-kuliner/kuliner'
      }
    ]
  },
  {
    id: 'berita',
    label: 'Berita & Artikel',
    icon: Newspaper,
    submenu: [
      {
        id: 'berita-facebook',
        label: 'Berita Facebook',
        icon: Facebook,
        href: '/berita'
      },
      {
        id: 'berita-umum',
        label: 'Berita Umum',
        icon: Globe,
        href: '/berita/umum'
      }
    ]
  }
]
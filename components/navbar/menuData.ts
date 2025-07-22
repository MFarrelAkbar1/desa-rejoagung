// data/menuData.ts

import { 
  Home, 
  User, 
  FileText, 
  MapPin, 
  Target, 
  Newspaper,
  Package, 
  Utensils, 
  Info, 
  Database, 
  Settings, 
  GraduationCap, 
  Camera, 
  ImageIcon, 
  Video,
  Facebook,
  Globe
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
        id: 'profil-kepala-desa',
        label: 'Profil Kepala Desa',
        icon: User,
        href: '/profil/kepala-desa'
      },
      {
        id: 'profil-wilayah',
        label: 'Profil Wilayah',
        icon: MapPin,
        href: '/profil/profil-wilayah'
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
    id: 'informasi',
    label: 'Informasi',
    icon: Info,
    submenu: [
      {
        id: 'data-desa',
        label: 'Data Desa',
        icon: Database,
        href: '/informasi/data-desa'
      },
      {
        id: 'layanan',
        label: 'Layanan',
        icon: Settings,
        href: '/informasi/layanan'
      }
    ]
  },
  {
    id: 'peta-sekolah',
    label: 'Peta Sekolah',
    icon: GraduationCap,
    href: '/peta-sekolah'
  },
  {
    id: 'galeri',
    label: 'Galeri',
    icon: Camera,
    submenu: [
      {
        id: 'galeri-foto',
        label: 'Galeri Foto',
        icon: ImageIcon,
        href: '/galeri/foto'
      },
      {
        id: 'galeri-video',
        label: 'Galeri Video',
        icon: Video,
        href: '/galeri/video'
      }
    ]
  }
]
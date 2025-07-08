import {
  Home,
  User,
  Newspaper,
  Package,
  Utensils,
  Settings,
  Users,
  Heart,
  FileText,
  GraduationCap,
  Camera,
  Video,
  Image as ImageIcon,
  MapPin,
  Eye,
  Target
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
        href: '/profil/wilayah'
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
    href: '/berita'
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
    id: 'layanan-desa',
    label: 'Layanan Desa',
    icon: Settings,
    submenu: [
      {
        id: 'data-penduduk',
        label: 'Data Penduduk',
        icon: Users,
        href: '/layanan-desa/data-penduduk'
      },
      {
        id: 'layanan-kesehatan',
        label: 'Layanan Kesehatan',
        icon: Heart,
        href: '/layanan-desa/layanan-kesehatan'
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
  },
  {
    id: 'wisata',
    label: 'Wisata',
    icon: FileText,
    href: '/wisata'
  }
]
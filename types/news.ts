// types/news.ts - Type definitions untuk sistem berita
export interface ContentBlock {
  id?: string
  type: 'text' | 'subtitle' | 'image'
  content: string
  order_index: number
  style?: {
    textAlign?: 'left' | 'center' | 'right' | 'justify'
    fontSize?: 'small' | 'medium' | 'large'
    caption?: string
  }
  created_at?: string
  updated_at?: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  excerpt?: string
  image_url?: string
  category?: string
  is_published: boolean
  is_announcement: boolean
  author: string
  slug?: string
  created_at: string
  updated_at?: string
  content_blocks?: ContentBlock[]
  content_blocks_count?: number
  // NEW: Alignment fields
  content_alignment?: 'left' | 'center' | 'right' | 'justify'
  excerpt_alignment?: 'left' | 'center' | 'right' | 'justify'
}

export interface NewsFormData {
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  is_published: boolean
  is_announcement: boolean
  author: string
  content_blocks: ContentBlock[]
  content_alignment?: 'left' | 'center' | 'right' | 'justify'
  excerpt_alignment?: 'left' | 'center' | 'right' | 'justify'
}

export interface NewsListItem {
  id: string
  title: string
  content: string
  excerpt?: string
  image_url?: string
  category?: string
  is_published: boolean
  is_announcement: boolean
  author: string
  slug?: string
  created_at: string
  updated_at?: string
  content_blocks_count?: number
}

export interface NewsSearchParams {
  query?: string
  category?: string
  is_published?: boolean
  is_announcement?: boolean
  author?: string
  page?: number
  limit?: number
  sort_by?: 'created_at' | 'updated_at' | 'title'
  sort_order?: 'asc' | 'desc'
}

export interface NewsApiResponse {
  success: boolean
  data?: NewsArticle | NewsArticle[]
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

// Validation schemas
export const newsFormValidation = {
  title: {
    minLength: 3,
    maxLength: 200,
    required: true
  },
  content: {
    minLength: 50,
    required: true
  },
  excerpt: {
    maxLength: 500,
    required: false
  },
  category: {
    maxLength: 50,
    required: false
  },
  author: {
    maxLength: 100,
    required: true
  }
}

// Category options
export const newsCategories = [
  { value: '', label: 'Pilih Kategori' },
  { value: 'Berita', label: 'Berita' },
  { value: 'Pengumuman', label: 'Pengumuman' },
  { value: 'Kegiatan', label: 'Kegiatan' },
  { value: 'Ekonomi', label: 'Ekonomi' },
  { value: 'Kesehatan', label: 'Kesehatan' },
  { value: 'Pendidikan', label: 'Pendidikan' },
  { value: 'Infrastruktur', label: 'Infrastruktur' },
  { value: 'Budaya', label: 'Budaya' }
] as const

// Content block types
export const contentBlockTypes = [
  { value: 'text', label: 'Paragraf', icon: 'Type' },
  { value: 'subtitle', label: 'Sub Judul', icon: 'Heading' },
  { value: 'image', label: 'Gambar', icon: 'ImageIcon' }
] as const

// Text alignment options
export const textAlignmentOptions = [
  { value: 'left', label: 'Rata Kiri', icon: 'AlignLeft' },
  { value: 'center', label: 'Rata Tengah', icon: 'AlignCenter' },
  { value: 'right', label: 'Rata Kanan', icon: 'AlignRight' },
  { value: 'justify', label: 'Rata Kiri-Kanan', icon: 'AlignJustify' }
] as const

export type NewsCategory = typeof newsCategories[number]['value']
export type ContentBlockType = typeof contentBlockTypes[number]['value']
export type TextAlignment = typeof textAlignmentOptions[number]['value']
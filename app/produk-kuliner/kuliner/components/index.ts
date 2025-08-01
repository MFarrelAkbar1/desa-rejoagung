// app/produk-kuliner/kuliner/components/index.ts

// Main components (REMOVED KulinerInfo export)
export { default as KulinerPageHeader } from './KulinerPageHeader'
export { default as KulinerGrid } from './OptimizedKulinerGrid'
export { default as KulinerStats } from './KulinerStats'
export { default as KulinerFilter } from './KulinerFilter'

// Simple modal components
export { default as CreateKulinerModal } from './CreateKulinerModal'
export { default as EditKulinerModal } from './EditKulinerModal'

// Basic types (simple version)
export interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients?: string[]
  price?: string
  location?: string
  image_url?: string
  rating?: number
  is_signature: boolean
  cooking_time?: string
  serving_size?: string
  benefits?: string[]
  contact?: string
  created_at: string
  updated_at: string
}
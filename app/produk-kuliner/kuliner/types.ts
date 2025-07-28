// app/produk-kuliner/kuliner/types.ts

// Main culinary item interface
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
  content_blocks?: ContentBlock[]
}

// Content block interface (similar to news)
export interface ContentBlock {
  id?: string
  culinary_id?: string
  type: 'text' | 'image'
  content: string
  order_index: number
  created_at?: string
  updated_at?: string
}

// Form data interface
export interface CulinaryFormData {
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
  content_blocks?: Omit<ContentBlock, 'id' | 'culinary_id' | 'created_at' | 'updated_at'>[]
}

// API Response interfaces
export interface CulinaryApiResponse {
  data?: CulinaryItem | CulinaryItem[]
  error?: string
  success?: boolean
  message?: string
}

export interface CreateCulinaryRequest {
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients?: string[]
  price?: string
  location?: string
  image_url?: string
  rating?: number
  is_signature?: boolean
  cooking_time?: string
  serving_size?: string
  benefits?: string[]
  contact?: string
  content_blocks?: Omit<ContentBlock, 'id' | 'culinary_id' | 'created_at' | 'updated_at'>[]
}

export interface UpdateCulinaryRequest extends CreateCulinaryRequest {
  id: string
  updated_at?: string
}

// Filter and search interfaces
export interface CulinaryFilters {
  category?: 'all' | 'makanan' | 'minuman' | 'camilan'
  signature_only?: boolean
  search_query?: string
  location?: string
  price_range?: [number, number]
  rating_min?: number
}

// Statistics interface
export interface CulinaryStats {
  total_items: number
  signature_items: number
  average_rating: number
  unique_locations: number
  category_distribution: {
    makanan: number
    minuman: number
    camilan: number
  }
}

// Component props interfaces
export interface KulinerPageHeaderProps {
  isAdmin: boolean
  totalItems: number
  filteredCount: number
  onAddKuliner: () => void
}

export interface KulinerGridProps {
  items: CulinaryItem[]
  loading: boolean
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

export interface KulinerStatsProps {
  items: CulinaryItem[]
}

export interface KulinerFilterProps {
  selectedCategory: string
  showSignatureOnly: boolean
  filteredCount: number
  searchQuery: string
  onCategoryChange: (category: string) => void
  onSignatureToggle: () => void
  onSearchChange: (query: string) => void
}

export interface KulinerCardProps {
  item: CulinaryItem
  isAdmin: boolean
  onEdit: (item: CulinaryItem) => void
  onDelete: (item: CulinaryItem) => void
}

export interface CreateKulinerModalProps {
  onClose: () => void
  onSuccess: () => void
}

export interface EditKulinerModalProps {
  item: CulinaryItem
  onClose: () => void
  onSuccess: () => void
}

// Category configuration
export interface CategoryConfig {
  [key: string]: {
    color: string
    icon: any // Lucide icon component
    label: string
  }
}

// Database row interfaces (for Supabase when ready)
export interface CulinaryRow {
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
  updated_at?: string
}

export interface ContentBlockRow {
  id: string
  culinary_id: string
  type: 'text' | 'image'
  content: string
  order_index: number
  created_at: string
  updated_at?: string
}
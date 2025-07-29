// app/produk-kuliner/produk/types.ts

// Main product item interface
export interface ProductItem {
  id: string
  name: string
  category: string
  description: string
  price?: string
  location?: string
  image_url?: string
  is_featured: boolean
  contact?: string
  created_at: string
  updated_at: string
}

// Form data interface
export interface ProductFormData {
  name: string
  category: string
  description: string
  price?: string
  location?: string
  image_url?: string
  is_featured: boolean
  contact?: string
}

// API Response interfaces
export interface ProductApiResponse {
  data?: ProductItem | ProductItem[]
  error?: string
  success?: boolean
  message?: string
}

export interface CreateProductRequest {
  name: string
  category: string
  description: string
  price?: string
  location?: string
  image_url?: string
  is_featured?: boolean
  contact?: string
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string
  updated_at?: string
}

// Filter and search interfaces
export interface ProductFilters {
  category?: string
  featured_only?: boolean
  search_query?: string
  location?: string
}

// Component props interfaces
export interface ProductPageHeaderProps {
  isAdmin: boolean
  totalItems: number
  filteredCount: number
  onAddProduct: () => void
}

export interface ProductGridProps {
  items: ProductItem[]
  loading: boolean
  isAdmin: boolean
  onEdit: (item: ProductItem) => void
  onDelete: (item: ProductItem) => void
}

export interface ProductFilterProps {
  selectedCategory: string
  showFeaturedOnly: boolean
  filteredCount: number
  searchQuery: string
  onCategoryChange: (category: string) => void
  onFeaturedToggle: () => void
  onSearchChange: (query: string) => void
}

export interface ProductCardProps {
  item: ProductItem
  isAdmin: boolean
  onEdit: (item: ProductItem) => void
  onDelete: (item: ProductItem) => void
}

export interface CreateProductModalProps {
  onClose: () => void
  onSuccess: () => void
}

export interface EditProductModalProps {
  item: ProductItem
  onClose: () => void
  onSuccess: () => void
}

// Category configuration
export interface ProductCategoryConfig {
  [key: string]: {
    color: string
    emoji: string
    label: string
  }
}
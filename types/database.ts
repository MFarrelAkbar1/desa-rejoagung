export interface Product {
  id: string
  name: string
  description: string
  price: string
  image_url?: string
  category: string
  is_featured: boolean
  contact: string
  location: string
  created_at: string
  updated_at: string
}
export interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients: string[]
  price: string
  location: string
  image_url?: string
  rating: number
  is_signature: boolean
  cooking_time?: string
  serving_size?: string
  benefits?: string[]
  contact: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image_url?: string
  category: string
  is_featured: boolean
  contact: string
  location: string
  created_at: string
  updated_at: string
}

export interface News {
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
  updated_at: string
}

export interface Gallery {
  id: string
  title: string
  image_url: string
  category: 'kegiatan' | 'infrastruktur' | 'pertanian' | 'budaya'
  description?: string
  is_featured: boolean
  created_at: string
}
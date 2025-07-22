// data/culinary.ts

export interface CulinaryItem {
  id: string
  name: string
  category: 'makanan' | 'minuman' | 'camilan'
  description: string
  ingredients?: string[]
  price?: string
  location?: string
  image?: string
  rating: number
  isSignature: boolean
  cookingTime?: string
  servingSize?: string
  benefits?: string[]
  contact: string
}

// DUMMY DATA DIHAPUS - Data akan diambil dari Supabase
export const culinaryData: CulinaryItem[] = []

export const culinaryCategories = {
  makanan: {
    label: 'Makanan Utama',
    icon: '🍛',
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300'
  },
  minuman: {
    label: 'Minuman',
    icon: '🥤',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300'
  },
  camilan: {
    label: 'Camilan & Jajanan',
    icon: '🍡',
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300'
  }
}
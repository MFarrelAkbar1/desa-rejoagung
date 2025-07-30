// types/news.ts
export interface ContentBlock {
  id: string
  type: 'text' | 'image'
  content: string
  order_index: number
  created_at?: string
}

export interface NewsItem {
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
  views?: number
}

export interface NewsFormData {
  title: string
  content: string
  excerpt?: string
  image_url?: string
  category?: string
  is_published: boolean
  is_announcement: boolean
  author: string
}

export interface NewsWithBlocks extends NewsItem {
  content_blocks: ContentBlock[]
}
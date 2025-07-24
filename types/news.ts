// types/news.ts

export interface ContentBlock {
  id?: string;
  type: 'text' | 'image';
  content: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  image_url?: string | null;
  category?: string | null;
  is_published: boolean;
  is_announcement: boolean;
  author: string;
  slug?: string | null;
  created_at: string;
  updated_at?: string | null;
  view_count?: number;
  featured_image_alt?: string;
}

export interface NewsWithBlocks extends News {
  content_blocks: ContentBlock[];
  content_blocks_count?: number;
}

export interface NewsListItem extends News {
  content_blocks_count: number;
}

// Database types untuk Supabase
export interface NewsRow {
  id: string;
  title: string;
  content: string;
  excerpt?: string | null;
  image_url?: string | null;
  category?: string | null;
  is_published: boolean;
  is_announcement: boolean;
  author: string;
  slug?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface ContentBlockRow {
  id: string;
  news_id: string;
  type: 'text' | 'image';
  content: string;
  order_index: number;
  created_at: string;
  updated_at?: string | null;
}

// Form types
export interface NewsFormData {
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  category?: string;
  is_published: boolean;
  is_announcement: boolean;
  author: string;
  content_blocks?: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>[];
}

// API Response types
export interface NewsApiResponse {
  data?: NewsWithBlocks | NewsListItem[];
  error?: string;
  success?: boolean;
}

export interface CreateNewsRequest {
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  category?: string;
  is_published?: boolean;
  is_announcement?: boolean;
  author?: string;
  content_blocks?: Omit<ContentBlock, 'id' | 'created_at' | 'updated_at'>[];
}

export interface UpdateNewsRequest extends CreateNewsRequest {
  updated_at?: string;
}
// app/berita/umum/components/NewsViewMode.tsx

import { Calendar, User } from 'lucide-react'
import ContentBlockRenderer from '@/components/News/ContentBlockRenderer'

interface ContentBlock {
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
}

interface NewsDetail {
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
}

interface NewsViewModeProps {
  currentNews: NewsDetail
  contentBlocks: ContentBlock[]
  formatDate: (dateString: string) => string
}

// 🚀 Helper function to format text with proper paragraph spacing
const formatTextWithParagraphs = (text: string) => {
  if (!text) return text
  
  // Split by multiple line breaks and rejoin with proper spacing
  return text
    .split(/\n\s*\n/) // Split by double line breaks (empty lines)
    .map(paragraph => paragraph.trim()) // Trim each paragraph
    .filter(paragraph => paragraph.length > 0) // Remove empty paragraphs
    .join('\n\n') // Join with double line breaks for proper spacing
}

export default function NewsViewMode({
  currentNews,
  contentBlocks,
  formatDate
}: NewsViewModeProps) {
  return (
    <div>
      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {currentNews.title}
        </h1>
        
        {/* Meta Information */}
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(currentNews.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{currentNews.author}</span>
          </div>
          {currentNews.is_announcement && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              📢 Pengumuman Penting
            </span>
          )}
          {currentNews.category && (
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
              {currentNews.category}
            </span>
          )}
        </div>

        {/* Featured Image */}
        {currentNews.image_url && (
          <div className="mb-6">
            <img
              src={currentNews.image_url}
              alt={currentNews.title}
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-sm bg-gray-50"
            />
          </div>
        )}
      </div>

      {/* Article Content - FIXED: Better paragraph spacing */}
      <div className="prose prose-lg max-w-none mb-8">
        <div className="text-gray-700 leading-relaxed text-justify">
          {formatTextWithParagraphs(currentNews.content).split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') {
              return <br key={index} />
            }
            return (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            )
          })}
        </div>
      </div>

      {/* Content Blocks - FIXED: Removed "Konten Tambahan" text */}
      {contentBlocks.length > 0 && (
        <div className="space-y-6 border-t pt-6">
          {contentBlocks
            .sort((a, b) => a.order_index - b.order_index)
            .map((block, index) => (
              <div key={block.id || `block-${index}`} className="content-block-view">
                <ContentBlockRenderer
                  block={{
                    ...block,
                    // 🚀 FIXED: Better content formatting for text blocks
                    content: block.type === 'text' ? formatTextWithParagraphs(block.content) : block.content
                  }}
                  isEditing={false}
                  showControls={false}
                />
              </div>
            ))}
        </div>
      )}

      {/* Custom CSS for better text rendering */}
      <style jsx>{`
        .content-block-view :global(.text-content) {
          white-space: pre-line;
          line-height: 1.8;
        }
        
        .content-block-view :global(.text-content p) {
          margin-bottom: 1rem;
        }
        
        .content-block-view :global(.text-content p:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}
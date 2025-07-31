// components/news/ContentBlockRenderer.tsx
'use client'

import SubJudulEditor from './SubJudulEditor'
import ParagrafEditor from './ParagrafEditor'
import GambarEditor from './GambarEditor'
import { ContentBlock } from '@/types/news'

interface ContentBlockRendererProps {
  block: ContentBlock
  onEdit: (blockId: string, content: string, style?: any) => void
  onDelete: (blockId: string) => void
  onMoveUp: (blockId: string) => void
  onMoveDown: (blockId: string) => void
  isFirst: boolean
  isLast: boolean
  isEditing?: boolean
  showControls?: boolean
}

export default function ContentBlockRenderer(props: ContentBlockRendererProps) {
  const { block } = props

  switch (block.type) {
    case 'subtitle':
      return <SubJudulEditor {...props} />
    case 'text':
      return <ParagrafEditor {...props} />
    case 'image':
      return <GambarEditor {...props} />
    default:
      return null
  }
}
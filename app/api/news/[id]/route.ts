// app/api/news/[id]/route.ts - FINAL FIXED VERSION
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/news/[id] - Ambil berita berdasarkan ID dengan content blocks
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('=== GET NEWS BY ID API DEBUG ===')
    
    // Await params sebelum digunakan (Next.js 15 requirement)
    const { id } = await params
    console.log('Fetching news ID:', id)

    // Ambil data berita
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()

    if (newsError || !newsData) {
      console.error('Error fetching news:', newsError)
      return NextResponse.json({ error: 'Berita tidak ditemukan' }, { status: 404 })
    }

    console.log('Fetched news data:', newsData)

    // Ambil content blocks untuk berita ini
    const { data: blocksData, error: blocksError } = await supabase
      .from('news_content_blocks')
      .select('id, type, content, order_index, style, created_at, updated_at')
      .eq('news_id', id)
      .order('order_index', { ascending: true })

    if (blocksError) {
      console.error('Error fetching content blocks:', blocksError)
    }

    console.log('Fetched content blocks:', blocksData)

    // Parse style field if it's a string (from JSONB)
    const processedBlocks = (blocksData || []).map(block => {
      let parsedStyle
      try {
        parsedStyle = typeof block.style === 'string' 
          ? JSON.parse(block.style) 
          : block.style || { textAlign: block.type === 'text' ? 'justify' : 'left' }
      } catch (e) {
        console.warn('Error parsing style for block:', block.id, e)
        parsedStyle = { textAlign: block.type === 'text' ? 'justify' : 'left' }
      }
      
      return {
        ...block,
        style: parsedStyle
      }
    })

    console.log('Processed content blocks with parsed styles:', processedBlocks)

    // Gabungkan data
    const transformedData = {
      ...newsData,
      content_blocks: processedBlocks
    }

    console.log('Returning transformed data with', processedBlocks.length, 'content blocks')
    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error in GET /api/news/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/news/[id] - Update berita dengan content blocks
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('=== UPDATE NEWS API DEBUG ===')
    
    // Await params sebelum digunakan (Next.js 15 requirement)
    const { id } = await params
    console.log('Updating news ID:', id)
    
    const body = await request.json()
    const { content_blocks = [], ...newsData } = body

    console.log('Received update request body:', body)
    console.log('News data to update:', newsData)
    console.log('Content blocks to update:', content_blocks)
    console.log('Content blocks count:', content_blocks.length)

    // Validate required fields
    if (!newsData.title || !newsData.content) {
      console.error('Validation failed: Missing title or content')
      return NextResponse.json(
        { error: 'Title and content are required' }, 
        { status: 400 }
      )
    }

    // Update news data
    const newsUpdateData = {
      title: newsData.title,
      content: newsData.content,
      excerpt: newsData.excerpt || null,
      image_url: newsData.image_url || null,
      category: newsData.category || null,
      is_published: newsData.is_published || false,
      is_announcement: newsData.is_announcement || false,
      author: newsData.author || 'Admin Desa',
      updated_at: new Date().toISOString()
    }

    console.log('Updating news with data:', newsUpdateData)

    const { data: updatedNews, error: newsError } = await supabase
      .from('news')
      .update(newsUpdateData)
      .eq('id', id)
      .select()
      .single()

    if (newsError) {
      console.error('Error updating news:', newsError)
      return NextResponse.json({ error: newsError.message }, { status: 500 })
    }

    console.log('News updated successfully:', updatedNews)

    // Delete existing content blocks
    console.log('Deleting existing content blocks...')
    const { error: deleteError } = await supabase
      .from('news_content_blocks')
      .delete()
      .eq('news_id', id)

    if (deleteError) {
      console.error('Error deleting content blocks:', deleteError)
    } else {
      console.log('Existing content blocks deleted successfully')
    }

    // Insert new content blocks if any
    let insertedBlocks = []
    if (content_blocks.length > 0) {
      console.log('Processing content blocks for update...')
      
      const blocksToInsert = content_blocks.map((block: any, index: number) => {
        const blockData = {
          news_id: id,
          type: block.type,
          content: block.content,
          order_index: block.order_index !== undefined ? block.order_index : index,
          style: block.style ? JSON.stringify(block.style) : JSON.stringify({ textAlign: block.type === 'text' ? 'justify' : 'left' })
        }
        console.log('Block to insert:', blockData)
        return blockData
      })

      console.log('Inserting new content blocks:', blocksToInsert)

      const { data: blocksData, error: insertError } = await supabase
        .from('news_content_blocks')
        .insert(blocksToInsert)
        .select()

      if (insertError) {
        console.error('Error inserting content blocks:', insertError)
        console.warn('Content blocks failed to save, but news was updated successfully')
      } else {
        console.log('Content blocks inserted successfully:', blocksData)
        insertedBlocks = blocksData || []
      }
    }

    const response = {
      ...updatedNews,
      content_blocks: insertedBlocks,
      content_blocks_count: insertedBlocks.length
    }

    console.log('Returning update response:', response)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in PUT /api/news/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/news/[id] - Hapus berita
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('=== DELETE NEWS API DEBUG ===')
    
    // Await params sebelum digunakan (Next.js 15 requirement)
    const { id } = await params
    console.log('Deleting news ID:', id)

    // Content blocks will be deleted automatically due to CASCADE foreign key
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting news:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('News deleted successfully')
    return NextResponse.json({ 
      message: 'Berita berhasil dihapus',
      success: true 
    })
  } catch (error) {
    console.error('Error in DELETE /api/news/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
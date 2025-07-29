// app/api/upload/route.ts - FIXED untuk menggunakan CLOUDINARY_CLOUD_NAME biasa seperti kuliner/produk
import { NextRequest, NextResponse } from 'next/server'

// Cloudinary configuration - menggunakan env variables yang sudah ada
const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,  
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'
}

// Validate Cloudinary config
function validateCloudinaryConfig() {
  if (!cloudinaryConfig.cloudName) {
    throw new Error('CLOUDINARY_CLOUD_NAME is required in .env.local')
  }
  return true
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Upload API called for berita')
    
    // Validate Cloudinary configuration
    try {
      validateCloudinaryConfig()
      console.log('✅ Cloudinary config valid:', {
        cloudName: cloudinaryConfig.cloudName,
        hasApiKey: !!cloudinaryConfig.apiKey,
        hasApiSecret: !!cloudinaryConfig.apiSecret,
        uploadPreset: cloudinaryConfig.uploadPreset
      })
    } catch (configError) {
      console.error('❌ Cloudinary config error:', configError)
      return NextResponse.json(
        { 
          error: 'Cloudinary not configured',
          details: 'Pastikan CLOUDINARY_CLOUD_NAME ada di .env.local'
        },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'berita'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('📁 File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
      folder
    })

    // Validate file type - SAMA seperti di kuliner/produk
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',   // JPG support
      'image/png', 
      'image/webp',
      'image/gif'
    ]
    
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      console.error('❌ Invalid file type:', file.type)
      return NextResponse.json(
        { 
          error: `Hanya file gambar (JPG, JPEG, PNG, WEBP, GIF) yang diperbolehkan. File type: ${file.type}`
        },
        { status: 400 }
      )
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Ukuran file maksimal ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log('🔄 Uploading to Cloudinary via API...')

    // Upload to Cloudinary - FIXED: hapus transformation untuk unsigned upload
    const uploadFormData = new FormData()
    uploadFormData.append('file', new Blob([buffer], { type: file.type }), file.name)
    uploadFormData.append('upload_preset', cloudinaryConfig.uploadPreset)
    uploadFormData.append('folder', folder)
    
    // JANGAN tambah transformation pada unsigned upload!

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadFormData
      }
    )

    if (!cloudinaryResponse.ok) {
      const errorData = await cloudinaryResponse.json().catch(() => ({}))
      console.error('❌ Cloudinary API error:', {
        status: cloudinaryResponse.status,
        statusText: cloudinaryResponse.statusText,
        error: errorData
      })
      
      return NextResponse.json(
        { 
          error: `Gagal upload ke Cloudinary: ${cloudinaryResponse.status}`,
          details: errorData.error?.message || 'Unknown cloudinary error'
        },
        { status: 500 }
      )
    }

    const result = await cloudinaryResponse.json()
    console.log('✅ Cloudinary upload successful:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      bytes: result.bytes
    })

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      originalName: file.name,
      size: result.bytes,
      format: result.format,
      width: result.width,
      height: result.height
    })

  } catch (error) {
    console.error('❌ Upload API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat mengupload gambar',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({
    message: 'Upload API is running',
    cloudinaryConfigured: Boolean(cloudinaryConfig.cloudName),
    cloudName: cloudinaryConfig.cloudName || 'Not configured',
    timestamp: new Date().toISOString()
  })
}
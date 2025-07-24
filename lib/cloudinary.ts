import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  const dataURI = `data:${file.type};base64,${base64}`

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: `desa-rejoagung/${folder}`,
    resource_type: 'auto',
  })

  return result.secure_url
}

export default cloudinary

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Check configuration
  if (!cloudinaryConfig.cloudName) {
    console.error('Missing environment variables:', {
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    })
    throw new Error('Cloudinary not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment variables.')
  }

  // Validate file
  if (!file.type.startsWith('image/')) {
    throw new Error('File harus berupa gambar')
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    throw new Error('Ukuran file maksimal 5MB')
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', cloudinaryConfig.uploadPreset)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Cloudinary upload error:', errorData)
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Upload error:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to upload image')
  }
}

// Helper untuk mendebug konfigurasi
export const debugCloudinaryConfig = () => {
  console.log('🔍 Cloudinary Configuration Debug:')
  console.log('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '❌ NOT SET')
  console.log('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '❌ NOT SET')
  console.log('Current config:', cloudinaryConfig)
}
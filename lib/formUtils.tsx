// lib/formUtils.ts
import { useState, useCallback } from 'react'

export interface NewsFormData {
  title: string
  content: string
  excerpt: string
  image_url: string
  category: string
  is_published: boolean
  is_announcement: boolean
  author: string
}

export interface FormState {
  isLoading: boolean
  error: string | null
  success: boolean
}

// Form validation rules
export const newsFormValidation = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 200
  },
  content: {
    required: true,
    minLength: 20
  },
  excerpt: {
    maxLength: 300
  },
  category: {
    maxLength: 50
  },
  author: {
    required: true,
    maxLength: 100
  }
}

// Validation function
export const validateNewsForm = (data: NewsFormData): string[] => {
  const errors: string[] = []

  if (!data.title.trim()) {
    errors.push('Judul berita wajib diisi')
  } else if (data.title.length < newsFormValidation.title.minLength) {
    errors.push(`Judul minimal ${newsFormValidation.title.minLength} karakter`)
  } else if (data.title.length > newsFormValidation.title.maxLength) {
    errors.push(`Judul maksimal ${newsFormValidation.title.maxLength} karakter`)
  }

  if (!data.content.trim()) {
    errors.push('Konten berita wajib diisi')
  } else if (data.content.length < newsFormValidation.content.minLength) {
    errors.push(`Konten minimal ${newsFormValidation.content.minLength} karakter`)
  }

  if (data.excerpt && data.excerpt.length > newsFormValidation.excerpt.maxLength) {
    errors.push(`Ringkasan maksimal ${newsFormValidation.excerpt.maxLength} karakter`)
  }

  if (data.category && data.category.length > newsFormValidation.category.maxLength) {
    errors.push(`Kategori maksimal ${newsFormValidation.category.maxLength} karakter`)
  }

  if (!data.author.trim()) {
    errors.push('Nama penulis wajib diisi')
  } else if (data.author.length > newsFormValidation.author.maxLength) {
    errors.push(`Nama penulis maksimal ${newsFormValidation.author.maxLength} karakter`)
  }

  return errors
}

// Custom hook untuk form management
export const useNewsForm = (initialData?: Partial<NewsFormData>) => {
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    category: '',
    is_published: false,
    is_announcement: false,
    author: 'Admin Desa',
    ...initialData
  })

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: null,
    success: false
  })

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }, [])

  const handleImageChange = useCallback((imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }))
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    setFormState(prev => ({ ...prev, isLoading: loading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setFormState(prev => ({ ...prev, error }))
  }, [])

  const setSuccess = useCallback((success: boolean) => {
    setFormState(prev => ({ ...prev, success }))
  }, [])

  const validateForm = useCallback(() => {
    const errors = validateNewsForm(formData)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return false
    }
    setError(null)
    return true
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      category: '',
      is_published: false,
      is_announcement: false,
      author: 'Admin Desa'
    })
    setFormState({
      isLoading: false,
      error: null,
      success: false
    })
  }, [])

  return {
    formData,
    formState,
    setFormData,
    handleInputChange,
    handleImageChange,
    setLoading,
    setError,
    setSuccess,
    validateForm,
    resetForm
  }
}

// API utilities
export const newsApiService = {
  async createNews(data: NewsFormData): Promise<any> {
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Gagal menambahkan berita')
    }

    return response.json()
  },

  async updateNews(id: string, data: NewsFormData): Promise<any> {
    const response = await fetch(`/api/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Gagal mengupdate berita')
    }

    return response.json()
  },

  async deleteNews(id: string): Promise<any> {
    const response = await fetch(`/api/news/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Gagal menghapus berita')
    }

    return response.json()
  }
}

// Utility functions
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength).trim() + '...'
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Form field components
export const FormField = ({ 
  label, 
  required = false, 
  error, 
  children, 
  className = '' 
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
)

export const TextInput = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  type = 'text',
  className = '',
  ...props 
}: {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type?: string
  className?: string
  [key: string]: any
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 ${className}`}
    style={{ color: '#111827' }}
    {...props}
  />
)

export const TextArea = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 4,
  className = '',
  ...props 
}: {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  rows?: number
  className?: string
  [key: string]: any
}) => (
  <textarea
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    rows={rows}
    placeholder={placeholder}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 placeholder-gray-500 resize-vertical ${className}`}
    style={{ color: '#111827' }}
    {...props}
  />
)

export const Checkbox = ({ 
  name, 
  checked, 
  onChange, 
  label, 
  id,
  className = '' 
}: {
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  id?: string
  className?: string
}) => {
  const inputId = id || `checkbox-${name}`
  
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
      />
      <label htmlFor={inputId} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  )
}
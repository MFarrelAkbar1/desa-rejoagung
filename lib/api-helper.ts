// lib/api-helper.ts - Helper untuk mengirim request dengan autentikasi
interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  requireAuth?: boolean
}

export class ApiHelper {
  private static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('admin_token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }

  private static async makeRequest(url: string, options: ApiRequestOptions = {}) {
    const { method = 'GET', body, requireAuth = false } = options

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Tambahkan header autentikasi jika diperlukan
    if (requireAuth) {
      Object.assign(headers, this.getAuthHeaders())
    }

    const requestConfig: RequestInit = {
      method,
      headers,
    }

    if (body && (method === 'POST' || method === 'PUT')) {
      requestConfig.body = JSON.stringify(body)
    }

    const response = await fetch(url, requestConfig)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // PRODUCTS API
  static async getProducts() {
    return this.makeRequest('/api/products')
  }

  static async getProduct(id: string) {
    return this.makeRequest(`/api/products/${id}`)
  }

  static async createProduct(productData: any) {
    return this.makeRequest('/api/products', {
      method: 'POST',
      body: productData,
      requireAuth: true // ✅ Wajib auth untuk create
    })
  }

  static async updateProduct(id: string, productData: any) {
    return this.makeRequest(`/api/products/${id}`, {
      method: 'PUT',
      body: productData,
      requireAuth: true // ✅ Wajib auth untuk update
    })
  }

  static async deleteProduct(id: string) {
    return this.makeRequest(`/api/products?id=${id}`, {
      method: 'DELETE',
      requireAuth: true // ✅ Wajib auth untuk delete
    })
  }

  // CULINARY API
  static async getCulinaryItems() {
    return this.makeRequest('/api/culinary')
  }

  static async getCulinaryItem(id: string) {
    return this.makeRequest(`/api/culinary/${id}`)
  }

  static async createCulinaryItem(culinaryData: any) {
    return this.makeRequest('/api/culinary', {
      method: 'POST',
      body: culinaryData,
      requireAuth: true // ✅ Wajib auth untuk create
    })
  }

  static async updateCulinaryItem(id: string, culinaryData: any) {
    return this.makeRequest(`/api/culinary/${id}`, {
      method: 'PUT',
      body: culinaryData,
      requireAuth: true // ✅ Wajib auth untuk update
    })
  }

  static async deleteCulinaryItem(id: string) {
    return this.makeRequest(`/api/culinary?id=${id}`, {
      method: 'DELETE',
      requireAuth: true // ✅ Wajib auth untuk delete
    })
  }
}

// Contoh penggunaan di komponen React
export const useApiWithAuth = () => {
  const handleCreateProduct = async (productData: any) => {
    try {
      const result = await ApiHelper.createProduct(productData)
      console.log('Product created:', result)
      return result
    } catch (error) {
      if (error instanceof Error) {
        // Handle different error types
        if (error.message.includes('Token tidak valid') || 
            error.message.includes('Akses ditolak')) {
          // Redirect to login or show login modal
          console.error('Authentication failed:', error.message)
          // Optional: logout user
          localStorage.removeItem('admin_token')
          window.location.href = '/admin/login'
        } else {
          console.error('API Error:', error.message)
        }
      }
      throw error
    }
  }

  return {
    handleCreateProduct,
    // Add other handlers as needed
  }
}
// lib/auth.ts

'use client'

import { useState, useEffect } from 'react'

export interface AdminUser {
  id: string
  username: string
  email?: string
  full_name: string
  role: string
}

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        setIsLoading(false)
        return
      }

      // Verify token dengan API
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setIsAdmin(true)
        setAdminUser(userData.user)
      } else {
        // Token invalid, hapus dari localStorage
        localStorage.removeItem('admin_token')
        setIsAdmin(false)
        setAdminUser(null)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      localStorage.removeItem('admin_token')
      setIsAdmin(false)
      setAdminUser(null)
    } finally {
      setIsLoading(false)
    }
  }
// Perbaikan untuk function loginAdmin di lib/auth.tsx

const loginAdmin = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('admin_token', data.token)
      setIsAdmin(true)
      setAdminUser(data.user)
      return true
    } else {
      // Perbaikan error handling
      try {
        const errorData = await response.json()
        console.error('Login error:', errorData.error || 'Authentication failed')
        return false
      } catch (parseError) {
        // Jika response tidak bisa di-parse sebagai JSON
        console.error('Login error: Failed to parse error response')
        return false
      }
    }
  } catch (error) {
    // Network error atau error lainnya
    console.error('Login error:', error instanceof Error ? error.message : 'Network error')
    return false
  }
}
  const logoutAdmin = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (token) {
        // Optional: Call logout API to invalidate token
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin_token')
      setIsAdmin(false)
      setAdminUser(null)
    }
  }

  return { 
    isAdmin, 
    isLoading, 
    adminUser, 
    loginAdmin, 
    logoutAdmin, 
    checkAuthStatus 
  }
}
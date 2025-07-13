'use client'

import { useState, useEffect } from 'react'

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Cek dari localStorage apakah admin sudah login
    const adminStatus = localStorage.getItem('isAdminLoggedIn')
    setIsAdmin(adminStatus === 'true')
    setIsLoading(false)
  }, [])

  const loginAdmin = (password: string) => {
    // Password sederhana, bisa diganti dengan sistem yang lebih aman
    if (password === 'admin123') {
      localStorage.setItem('isAdminLoggedIn', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    localStorage.removeItem('isAdminLoggedIn')
    setIsAdmin(false)
  }

  return { isAdmin, isLoading, loginAdmin, logoutAdmin }
}
// app/admin/reset-password/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, CheckCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [token, setToken] = useState('')
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const tokenParam = searchParams?.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setError('Token reset password tidak valid')
    }
  }, [searchParams])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    })
  }

  const togglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    })
  }

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    return requirements
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Konfirmasi password tidak sama')
      setIsLoading(false)
      return
    }

    const passwordRequirements = validatePassword(passwords.newPassword)
    if (!passwordRequirements.length) {
      setError('Password minimal 8 karakter')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: passwords.newPassword
        })
      })

      if (response.ok) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/admin/login')
        }, 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Terjadi kesalahan')
      }
    } catch {
      setError('Terjadi kesalahan koneksi')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
           
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Password Berhasil Direset!</h1>
           
            <p className="text-gray-600 mb-6">
              Password Anda telah berhasil diperbarui. Anda akan diarahkan ke halaman login dalam beberapa detik.
            </p>
           
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Silakan gunakan password baru untuk login ke sistem.
              </p>
              
              <Link 
                href="/admin/login"
                className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Login Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <div className="text-center p-8 pb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">Masukkan password baru Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Baru
              </label>
              <div className="relative">
                <input
                  type={showPasswords.newPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Masukkan password baru"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.newPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Konfirmasi password baru"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {passwords.newPassword && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">Syarat Password:</p>
                <ul className="space-y-1 text-xs">
                  {Object.entries(validatePassword(passwords.newPassword)).map(([key, valid]) => (
                    <li key={key} className={`flex items-center ${valid ? 'text-green-600' : 'text-red-600'}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${valid ? 'bg-green-600' : 'bg-red-600'}`}></span>
                      {key === 'length' && 'Minimal 8 karakter'}
                      {key === 'uppercase' && 'Mengandung huruf besar'}
                      {key === 'lowercase' && 'Mengandung huruf kecil'}
                      {key === 'number' && 'Mengandung angka'}
                      {key === 'special' && 'Mengandung karakter khusus'}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memproses...
                </div>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link 
            href="/admin/login"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke Login
          </Link>
        </div>
      </div>
    </div>
  )
}

// Loading component for Suspense fallback
function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  )
}
// app/admin/reset-password/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, CheckCircle, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ResetPasswordPage() {
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
    const tokenParam = searchParams.get('token')
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
    } catch (err) {
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
            
            <Link
              href="/admin/login"
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const passwordRequirements = validatePassword(passwords.newPassword)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to Login Link */}
        <Link
          href="/admin/login"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Login
        </Link>

        {/* Reset Password Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Image
                src="/logo-rejoagung.png"
                alt="Logo Desa Rejoagung"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-emerald-100">Buat password baru untuk akun admin Anda</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {!token ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Token Tidak Valid</h3>
                <p className="text-gray-600">Link reset password tidak valid atau sudah expired.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.newPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      required
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-12"
                      placeholder="Masukkan password baru"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.newPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {passwords.newPassword && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-600">Requirements:</p>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <span className={passwordRequirements.length ? 'text-green-600' : 'text-red-500'}>
                          ✓ Min 8 karakter
                        </span>
                        <span className={passwordRequirements.uppercase ? 'text-green-600' : 'text-red-500'}>
                          ✓ Huruf besar
                        </span>
                        <span className={passwordRequirements.lowercase ? 'text-green-600' : 'text-red-500'}>
                          ✓ Huruf kecil
                        </span>
                        <span className={passwordRequirements.number ? 'text-green-600' : 'text-red-500'}>
                          ✓ Angka
                        </span>
                        <span className={passwordRequirements.special ? 'text-green-600' : 'text-red-500'}>
                          ✓ Karakter khusus
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-12"
                      placeholder="Konfirmasi password baru"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {passwords.confirmPassword && (
                    <p className={`mt-1 text-xs ${
                      passwords.newPassword === passwords.confirmPassword 
                        ? 'text-green-600' 
                        : 'text-red-500'
                    }`}>
                      {passwords.newPassword === passwords.confirmPassword 
                        ? '✓ Password cocok' 
                        : '✗ Password tidak cocok'
                      }
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isLoading || 
                    !passwords.newPassword || 
                    !passwords.confirmPassword ||
                    passwords.newPassword !== passwords.confirmPassword ||
                    !passwordRequirements.length
                  }
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Mereset Password...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-700">
                <strong>Keamanan:</strong> Gunakan password yang kuat dengan kombinasi huruf besar, kecil, angka, dan karakter khusus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// components/ui/Toast.tsx - Alternative lightweight notification

'use client'

import { useEffect } from 'react'
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface ToastProps {
  isOpen: boolean
  onClose: () => void
  message: string
  type?: 'error' | 'success' | 'warning' | 'info'
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center'
}

export default function Toast({
  isOpen,
  onClose,
  message,
  type = 'error',
  duration = 5000,
  position = 'top-right'
}: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  if (!isOpen) return null

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          icon: <CheckCircle className="w-5 h-5 text-white" />
        }
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          icon: <AlertTriangle className="w-5 h-5 text-white" />
        }
      case 'info':
        return {
          bg: 'bg-blue-500',
          icon: <Info className="w-5 h-5 text-white" />
        }
      default: // error
        return {
          bg: 'bg-red-500',
          icon: <AlertCircle className="w-5 h-5 text-white" />
        }
    }
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      default: // top-right
        return 'top-4 right-4'
    }
  }

  const styles = getTypeStyles()

  return (
    <>
      <div 
        className={`fixed ${getPositionStyles()} z-50 max-w-sm w-full animate-slide-in`}
      >
        <div className={`${styles.bg} text-white rounded-lg shadow-lg p-4 flex items-center space-x-3`}>
          {/* Icon */}
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
          
          {/* Message */}
          <div className="flex-1 text-sm font-medium">
            {message}
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}

// Hook untuk menggunakan Toast dengan mudah
import { useState, useCallback } from 'react'

export function useToast() {
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    type: 'error' as 'error' | 'success' | 'warning' | 'info'
  })

  const showToast = useCallback((message: string, type: 'error' | 'success' | 'warning' | 'info' = 'error') => {
    setToast({
      isOpen: true,
      message,
      type
    })
  }, [])

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isOpen: false
    }))
  }, [])

  return {
    toast,
    showToast,
    hideToast
  }
}
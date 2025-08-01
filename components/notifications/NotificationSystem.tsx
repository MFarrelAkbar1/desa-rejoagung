// components/notifications/NotificationSystem.tsx - Complete Elegant Notification System

'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Trash2 } from 'lucide-react'

// Types
type NotificationType = 'success' | 'error' | 'warning' | 'info'
type ConfirmationType = 'delete' | 'warning' | 'info'

interface Notification {
  id: string
  type: NotificationType
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ConfirmationModal {
  id: string
  type: ConfirmationType
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  requireTyping?: boolean
  typingText?: string
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  destructive?: boolean
}

interface NotificationContextType {
  // Notifications
  showNotification: (notification: Omit<Notification, 'id'>) => void
  showSuccess: (message: string, title?: string) => void
  showError: (message: string, title?: string) => void
  showWarning: (message: string, title?: string) => void
  showInfo: (message: string, title?: string) => void
  
  // File Upload Specific
  showFileError: (error: 'size' | 'type' | 'network', details?: string) => void
  
  // Confirmations
  showConfirmation: (confirmation: Omit<ConfirmationModal, 'id'>) => Promise<boolean>
  showDeleteConfirmation: (itemName: string, onConfirm: () => void | Promise<void>) => Promise<boolean>
  
  // Generic confirm (replaces window.confirm)
  confirm: (message: string, title?: string) => Promise<boolean>
}

const NotificationContext = createContext<NotificationContextType | null>(null)

// Provider Component
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [confirmations, setConfirmations] = useState<ConfirmationModal[]>([])

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substring(2, 15)

  // Add notification
  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = generateId()
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }, notification.duration || 5000)
    }
  }, [])

  // Convenience methods
  const showSuccess = useCallback((message: string, title?: string) => {
    showNotification({ type: 'success', message, title })
  }, [showNotification])

  const showError = useCallback((message: string, title?: string) => {
    showNotification({ type: 'error', message, title, duration: 7000 })
  }, [showNotification])

  const showWarning = useCallback((message: string, title?: string) => {
    showNotification({ type: 'warning', message, title })
  }, [showNotification])

  const showInfo = useCallback((message: string, title?: string) => {
    showNotification({ type: 'info', message, title })
  }, [showNotification])

  // File upload specific errors
  const showFileError = useCallback((error: 'size' | 'type' | 'network', details?: string) => {
    const messages = {
      size: `Ukuran file terlalu besar. ${details || 'Maksimal 5MB.'}`,
      type: `Tipe file tidak didukung. ${details || 'Hanya gambar JPG, PNG, WEBP yang diperbolehkan.'}`,
      network: `Gagal mengupload file. ${details || 'Periksa koneksi internet Anda.'}`
    }
    
    showError(messages[error], 'Upload Gagal')
  }, [showError])

  // Show confirmation modal
  const showConfirmation = useCallback((confirmation: Omit<ConfirmationModal, 'id'>) => {
    return new Promise<boolean>((resolve) => {
      const id = generateId()
      const newConfirmation = {
        ...confirmation,
        id,
        onConfirm: async () => {
          setConfirmations(prev => prev.filter(c => c.id !== id))
          await confirmation.onConfirm()
          resolve(true)
        },
        onCancel: () => {
          setConfirmations(prev => prev.filter(c => c.id !== id))
          confirmation.onCancel?.()
          resolve(false)
        }
      }
      
      setConfirmations(prev => [...prev, newConfirmation])
    })
  }, [])

  // Delete confirmation
  const showDeleteConfirmation = useCallback((itemName: string, onConfirm: () => void | Promise<void>) => {
    return showConfirmation({
      type: 'delete',
      title: 'Konfirmasi Hapus',
      message: `Apakah Anda yakin ingin menghapus "${itemName}"? Tindakan ini tidak dapat dibatalkan.`,
      confirmText: 'Hapus',
      cancelText: 'Batal',
      requireTyping: itemName.length > 20, // Require typing for long names
      typingText: itemName.length > 20 ? itemName : undefined,
      onConfirm,
      destructive: true
    })
  }, [showConfirmation])

  // Generic confirm (replaces window.confirm)
  const confirm = useCallback((message: string, title = 'Konfirmasi') => {
    return showConfirmation({
      type: 'warning',
      title,
      message,
      confirmText: 'Ya',
      cancelText: 'Tidak',
      onConfirm: () => Promise.resolve()
    })
  }, [showConfirmation])

  // Remove notification
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showFileError,
    showConfirmation,
    showDeleteConfirmation,
    confirm
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Render Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(notification => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      {/* Render Confirmation Modals */}
      {confirmations.map(confirmation => (
        <ConfirmationModal
          key={confirmation.id}
          confirmation={confirmation}
        />
      ))}
    </NotificationContext.Provider>
  )
}

// Notification Card Component
function NotificationCard({ 
  notification, 
  onClose 
}: { 
  notification: Notification
  onClose: () => void 
}) {
  const getTypeStyles = () => {
    switch (notification.type) {
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

  const styles = getTypeStyles()

  return (
    <div className="animate-slide-in-right">
      <div className={`${styles.bg} text-white rounded-lg shadow-lg p-4 flex items-start space-x-3 min-w-0`}>
        {/* Icon */}
        <div className="flex-shrink-0 pt-0.5">
          {styles.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {notification.title && (
            <h4 className="text-sm font-semibold mb-1">{notification.title}</h4>
          )}
          <p className="text-sm leading-relaxed break-words">{notification.message}</p>
          
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-2 text-sm underline hover:no-underline"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Confirmation Modal Component
function ConfirmationModal({ confirmation }: { confirmation: ConfirmationModal }) {
  const [isLoading, setIsLoading] = useState(false)
  const [typedText, setTypedText] = useState('')

  const handleConfirm = async () => {
    if (confirmation.requireTyping && typedText !== confirmation.typingText) {
      return
    }

    setIsLoading(true)
    try {
      await confirmation.onConfirm()
    } finally {
      setIsLoading(false)
    }
  }

  const canConfirm = confirmation.requireTyping 
    ? typedText === confirmation.typingText
    : true

  const getTypeStyles = () => {
    switch (confirmation.type) {
      case 'delete':
        return {
          iconBg: 'bg-red-100',
          icon: <Trash2 className="w-6 h-6 text-red-600" />,
          confirmBg: 'bg-red-600 hover:bg-red-700'
        }
      case 'warning':
        return {
          iconBg: 'bg-yellow-100',
          icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
          confirmBg: 'bg-yellow-600 hover:bg-yellow-700'
        }
      default: // info
        return {
          iconBg: 'bg-blue-100',
          icon: <Info className="w-6 h-6 text-blue-600" />,
          confirmBg: 'bg-blue-600 hover:bg-blue-700'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`${styles.iconBg} p-2 rounded-full`}>
              {styles.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{confirmation.title}</h2>
          </div>
          {confirmation.onCancel && (
            <button
              onClick={confirmation.onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">
            {confirmation.message}
          </p>

          {/* Typing Confirmation */}
          {confirmation.requireTyping && confirmation.typingText && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ketik <span className="font-bold text-red-600">"{confirmation.typingText}"</span> untuk konfirmasi:
              </label>
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder={confirmation.typingText}
                autoComplete="off"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {confirmation.onCancel && (
              <button
                onClick={confirmation.onCancel}
                disabled={isLoading}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {confirmation.cancelText || 'Batal'}
              </button>
            )}
            <button
              onClick={handleConfirm}
              disabled={isLoading || !canConfirm}
              className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 ${styles.confirmBg}`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading...
                </>
              ) : (
                confirmation.confirmText || 'Konfirmasi'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook to use the notification system
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// CSS for animations (add to globals.css)
export const notificationStyles = `
@keyframes slide-in-right {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
`
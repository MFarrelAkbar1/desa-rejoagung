// components/common/TextAlignmentControl.tsx - Reusable alignment control component

'use client'

import { useState } from 'react'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react'

interface TextAlignmentControlProps {
  value: 'left' | 'center' | 'right' | 'justify'
  onChange: (align: 'left' | 'center' | 'right' | 'justify') => void
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  disabled?: boolean
}

export default function TextAlignmentControl({
  value = 'left',
  onChange,
  label = 'Perataan',
  className = '',
  size = 'md',
  showLabel = true,
  disabled = false
}: TextAlignmentControlProps) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          button: 'p-1.5',
          icon: 'w-3 h-3',
          text: 'text-xs',
          container: 'p-0.5'
        }
      case 'lg':
        return {
          button: 'p-3',
          icon: 'w-5 h-5',
          text: 'text-base',
          container: 'p-1.5'
        }
      default: // md
        return {
          button: 'p-2',
          icon: 'w-4 h-4',
          text: 'text-sm',
          container: 'p-1'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, title: 'Rata Kiri' },
    { value: 'center', icon: AlignCenter, title: 'Rata Tengah' },
    { value: 'right', icon: AlignRight, title: 'Rata Kanan' },
    { value: 'justify', icon: AlignJustify, title: 'Rata Kanan-Kiri (Justify)' }
  ] as const

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <span className={`text-gray-600 mr-2 ${sizeClasses.text}`}>
          {label}:
        </span>
      )}
      
      <div className={`flex bg-gray-100 rounded-lg ${sizeClasses.container} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {alignmentOptions.map(({ value: optionValue, icon: Icon, title }) => (
          <button
            key={optionValue}
            type="button"
            onClick={() => !disabled && onChange(optionValue)}
            disabled={disabled}
            className={`
              ${sizeClasses.button} rounded transition-colors
              ${value === optionValue 
                ? 'bg-white shadow-sm text-emerald-600' 
                : 'hover:bg-gray-200 text-gray-600'
              }
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            title={title}
            aria-label={title}
            aria-pressed={value === optionValue}
          >
            <Icon className={sizeClasses.icon} />
          </button>
        ))}
      </div>
    </div>
  )
}

// Utility function to get CSS class for text alignment
export const getTextAlignmentClass = (align: string): string => {
  switch (align) {
    case 'center': return 'text-center'
    case 'right': return 'text-right'
    case 'justify': return 'text-justify'
    default: return 'text-left'
  }
}

// Hook for managing text alignment state
export const useTextAlignment = (initialValue: 'left' | 'center' | 'right' | 'justify' = 'left') => {
  const [alignment, setAlignment] = useState(initialValue)
  
  const getAlignmentClass = () => getTextAlignmentClass(alignment)
  
  return {
    alignment,
    setAlignment,
    getAlignmentClass,
    alignmentClass: getAlignmentClass()
  }
}
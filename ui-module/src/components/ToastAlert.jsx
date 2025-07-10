import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const ToastAlert = ({ message, actionText, onAction, onClose, visible }) => {
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (visible && !hovered) {
      timerRef.current = setTimeout(() => {
        if (onClose) onClose()
      }, 5000)
    }
    return () => clearTimeout(timerRef.current)
  }, [visible, hovered, onClose])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 shadow-lg rounded-xl px-6 py-4 flex items-center space-x-4 animate-fade-in"
      role="alert"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
    >
      <span className="text-gray-800 text-sm flex-1">{message}</span>
      {actionText && (
        <button
          className="text-primary-600 hover:underline text-sm font-medium focus:outline-none"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
      <button
        className="text-gray-400 hover:text-primary-600 focus:outline-none ml-2"
        aria-label="Close alert"
        onClick={onClose}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default ToastAlert 
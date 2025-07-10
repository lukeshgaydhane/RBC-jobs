import React from 'react'

const MobileFilterDrawer = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} bg-black bg-opacity-40`}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
      aria-modal="true"
      role="dialog"
    >
      <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        tabIndex={-1}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-primary-600 focus:outline-none"
          onClick={onClose}
          aria-label="Close filters"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default MobileFilterDrawer 
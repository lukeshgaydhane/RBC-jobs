import React, { useState, useRef, useEffect } from 'react'
import { Bell, X } from 'lucide-react'

const NotificationBell = ({ notifications = [], onClickNotification, onClearAll }) => {
  const [open, setOpen] = useState(false)
  const bellRef = useRef(null)
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={bellRef}>
      <button
        className="relative bg-white rounded-full p-2 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label="Notifications"
        onClick={() => setOpen(o => !o)}
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg z-40">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-900">Notifications</span>
            <button
              className="text-gray-400 hover:text-primary-600 focus:outline-none"
              aria-label="Clear all notifications"
              onClick={onClearAll}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
            {notifications.length === 0 && (
              <li className="px-4 py-4 text-gray-500 text-sm">No notifications</li>
            )}
            {notifications.map((n, i) => (
              <li
                key={n.id || i}
                className={`px-4 py-3 cursor-pointer hover:bg-primary-50 ${!n.read ? 'bg-primary-50/50' : ''}`}
                onClick={() => onClickNotification(n)}
                tabIndex={0}
                aria-label={n.text}
              >
                <div className="text-sm text-gray-800">{n.text}</div>
                {n.time && <div className="text-xs text-gray-400 mt-1">{n.time}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default NotificationBell 
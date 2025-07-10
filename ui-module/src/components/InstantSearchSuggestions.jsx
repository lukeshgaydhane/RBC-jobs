import React, { useRef, useEffect, useState } from 'react'

function highlightMatch(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig')
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className="bg-yellow-200 text-primary-800">{part}</mark> : part
  )
}

const typeLabels = {
  title: 'Job Title',
  company: 'Company',
  location: 'Location'
}

const InstantSearchSuggestions = ({ query, suggestions, onSelect, loading }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef(null)

  useEffect(() => {
    setActiveIndex(-1)
  }, [suggestions, query])

  const handleKeyDown = (e) => {
    if (!suggestions.length) return
    if (e.key === 'ArrowDown') {
      setActiveIndex(i => (i + 1) % suggestions.length)
      e.preventDefault()
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(i => (i - 1 + suggestions.length) % suggestions.length)
      e.preventDefault()
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      onSelect(suggestions[activeIndex])
      e.preventDefault()
    } else if (e.key === 'Escape') {
      setActiveIndex(-1)
    }
  }

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex]
      if (el) el.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  if (!query || (!suggestions.length && !loading)) return null

  return (
    <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-72 overflow-y-auto" role="listbox">
      {loading && (
        <div className="p-4 text-gray-500 text-sm">Loading...</div>
      )}
      <ul ref={listRef} tabIndex={-1}>
        {suggestions.map((s, i) => (
          <li
            key={s.type + '-' + s.value + '-' + i}
            className={`px-4 py-2 cursor-pointer flex items-center ${i === activeIndex ? 'bg-primary-50 text-primary-800' : 'hover:bg-gray-100'}`}
            role="option"
            aria-selected={i === activeIndex}
            onMouseDown={() => onSelect(s)}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <span className="text-xs text-gray-400 mr-2">{typeLabels[s.type]}</span>
            <span>{highlightMatch(s.value, query)}</span>
          </li>
        ))}
        {!loading && suggestions.length === 0 && (
          <li className="px-4 py-2 text-gray-500 text-sm">No suggestions found</li>
        )}
      </ul>
    </div>
  )
}

export default InstantSearchSuggestions 
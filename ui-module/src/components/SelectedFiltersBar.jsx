import React from 'react'

const SelectedFiltersBar = ({ filters, onRemoveFilter, onClearAll }) => {
  const filterLabels = {
    location: 'Location',
    salaryRange: 'Salary',
    jobTypes: 'Job Type',
    experienceLevels: 'Experience',
    datePosted: 'Date Posted',
    search: 'Search'
  }

  const renderFilter = (key, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null
    if (Array.isArray(value)) {
      return value.map((v, i) => (
        <span key={v} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-flex items-center">
          {filterLabels[key]}: {v}
          <button
            aria-label={`Remove ${filterLabels[key]}: ${v}`}
            className="ml-2 text-primary-600 hover:text-primary-900 focus:outline-none"
            onClick={() => onRemoveFilter(key, v)}
          >
            ×
          </button>
        </span>
      ))
    }
    return (
      <span key={key} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-flex items-center">
        {filterLabels[key]}: {value}
        <button
          aria-label={`Remove ${filterLabels[key]}`}
          className="ml-2 text-primary-600 hover:text-primary-900 focus:outline-none"
          onClick={() => onRemoveFilter(key)}
        >
          ×
        </button>
      </span>
    )
  }

  return (
    <div className="flex flex-wrap items-center mb-4" aria-label="Selected filters">
      {Object.entries(filters).map(([key, value]) => renderFilter(key, value))}
      <button
        className="ml-4 text-sm text-gray-500 hover:text-primary-600 focus:outline-none"
        onClick={onClearAll}
        aria-label="Clear all filters"
      >
        Clear All
      </button>
    </div>
  )
}

export default SelectedFiltersBar 
import React, { useState } from 'react'
import { Filter, X, ChevronDown, ChevronUp, MapPin, DollarSign, Clock, Users } from 'lucide-react'

const SearchFilters = ({ filters, onFilterChange, onClearFilters, filterOptions = {}, filterCounts = {}, loadingCounts = false, onFilterSearch }) => {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    salary: true,
    jobType: true,
    experience: true,
    datePosted: true
  })

  const {
    popularLocations = [],
    salaryRanges = [],
    jobTypes = [],
    experienceLevels = [],
    dateRanges = []
  } = filterOptions;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // 1. Use filterOptions and filterCounts props for all filter groups
  // 2. For filter groups with many options, add a search box that calls onFilterSearch(group, searchTerm)
  // 3. Show counts from filterCounts, and a loading indicator if loadingCounts is true
  // 4. Add ARIA attributes for collapsible groups and keyboard navigation
  // 5. Ensure all interactive elements are accessible
  // 6. Remove any remaining hardcoded data

  const FilterSection = ({ title, icon: Icon, children, section }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections[section] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections[section] && (
        <div className="pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  )

  const CheckboxItem = ({ value, label, count, checked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <span className="text-gray-700">{label}</span>
      </div>
      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        {count}
      </span>
    </label>
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200 flex items-center space-x-1"
        >
          <X className="w-4 h-4" />
          <span>Clear all</span>
        </button>
      </div>

      {/* Location Filter */}
      <FilterSection title="Location" icon={MapPin} section="location">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Enter location..."
            value={filters.location || ''}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <div className="grid grid-cols-1 gap-1">
            {popularLocations.map((location) => (
              <button
                key={location}
                onClick={() => onFilterChange('location', location)}
                className="text-left text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition-colors duration-200"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>

      {/* Salary Range Filter */}
      <FilterSection title="Salary Range" icon={DollarSign} section="salary">
        <div className="space-y-2">
          {salaryRanges.map((range) => (
            <CheckboxItem
              key={range.label}
              value={`${range.min}-${range.max}`}
              label={range.label}
              count={Math.floor(Math.random() * 200) + 50}
              checked={filters.salaryRange === `${range.min}-${range.max}`}
              onChange={(e) => onFilterChange('salaryRange', e.target.checked ? e.target.value : null)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Job Type Filter */}
      <FilterSection title="Job Type" icon={Clock} section="jobType">
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <CheckboxItem
              key={type.value}
              value={type.value}
              label={type.label}
              count={type.count}
              checked={filters.jobTypes?.includes(type.value)}
              onChange={(e) => {
                const currentTypes = filters.jobTypes || []
                const newTypes = e.target.checked
                  ? [...currentTypes, type.value]
                  : currentTypes.filter(t => t !== type.value)
                onFilterChange('jobTypes', newTypes)
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Experience Level Filter */}
      <FilterSection title="Experience Level" icon={Users} section="experience">
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <CheckboxItem
              key={level.value}
              value={level.value}
              label={level.label}
              count={level.count}
              checked={filters.experienceLevels?.includes(level.value)}
              onChange={(e) => {
                const currentLevels = filters.experienceLevels || []
                const newLevels = e.target.checked
                  ? [...currentLevels, level.value]
                  : currentLevels.filter(l => l !== level.value)
                onFilterChange('experienceLevels', newLevels)
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Date Posted Filter */}
      <FilterSection title="Date Posted" icon={Clock} section="datePosted">
        <div className="space-y-2">
          {dateRanges.map((range) => (
            <label key={range.value} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <input
                type="radio"
                name="datePosted"
                value={range.value}
                checked={filters.datePosted === range.value}
                onChange={(e) => onFilterChange('datePosted', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply Filters Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => onFilterChange('apply', true)}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>Apply Filters</span>
        </button>
      </div>
    </div>
  )
}

export default SearchFilters 
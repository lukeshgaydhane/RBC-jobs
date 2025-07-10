import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Star, Bookmark, Share2, Building, Calendar } from 'lucide-react'

const JobCard = ({ job, onSave, onShare }) => {
  const formatSalary = (min, max) => {
    if (!min && !max) return 'Salary not specified'
    if (!max) return `₹${(min / 100000).toFixed(1)}L+`
    if (!min) return `Up to ₹${(max / 100000).toFixed(1)}L`
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`
  }

  const getExperienceColor = (level) => {
    const colors = {
      'ENTRY': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'JUNIOR': 'bg-blue-100 text-blue-800 border-blue-200',
      'MID': 'bg-amber-100 text-amber-800 border-amber-200',
      'SENIOR': 'bg-orange-100 text-orange-800 border-orange-200',
      'LEAD': 'bg-red-100 text-red-800 border-red-200',
      'EXECUTIVE': 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getJobTypeColor = (type) => {
    const colors = {
      'FULL_TIME': 'bg-green-100 text-green-800',
      'PART_TIME': 'bg-blue-100 text-blue-800',
      'CONTRACT': 'bg-purple-100 text-purple-800',
      'INTERNSHIP': 'bg-yellow-100 text-yellow-800',
      'FREELANCE': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  const formatPostedDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Posted today'
    if (diffDays === 2) return 'Posted yesterday'
    if (diffDays < 7) return `Posted ${diffDays - 1} days ago`
    if (diffDays < 30) return `Posted ${Math.floor((diffDays - 1) / 7)} weeks ago`
    return `Posted ${Math.floor((diffDays - 1) / 30)} months ago`
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link to={`/jobs/${job.id}`} className="block">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2 line-clamp-2">
                {job.title}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 mb-3">
              <Building className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">{job.company}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => onSave(job.id)}
              className="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors duration-200 group/btn"
              title="Save job"
            >
              <Bookmark className="w-4 h-4 text-gray-500 group-hover/btn:text-primary-600" />
            </button>
            <button
              onClick={() => onShare(job)}
              className="w-8 h-8 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors duration-200 group/btn"
              title="Share job"
            >
              <Share2 className="w-4 h-4 text-gray-500 group-hover/btn:text-primary-600" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeColor(job.jobType)}`}>
            {job.jobType?.replace('_', ' ')}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getExperienceColor(job.experienceLevel)}`}>
            {job.experienceLevel}
          </span>
        </div>

        {/* Skills */}
        {job.skills && (
          <div className="flex flex-wrap gap-1">
            {job.skills.split(',').slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                {skill.trim()}
              </span>
            ))}
            {job.skills.split(',').length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                +{job.skills.split(',').length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium text-gray-900">{formatSalary(job.minSalary, job.maxSalary)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatPostedDate(job.postedDate)}</span>
            </div>
          </div>
          
          <Link
            to={`/jobs/${job.id}`}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 group/btn"
          >
            <span>View Details</span>
            <div className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200">
              →
            </div>
          </Link>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
    </div>
  )
}

export default JobCard 
import React from 'react'

const RecommendedCarousel = ({ jobs = [], onViewAll, userSkills = [] }) => {
  if (!jobs.length) return null

  const getMatchReason = (job) => {
    if (!userSkills.length || !job.skills) return null
    const matched = job.skills.filter(skill => userSkills.includes(skill))
    if (matched.length) return `Skill match: ${matched.join(', ')}`
    return 'Based on your profile'
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
        {onViewAll && (
          <button onClick={onViewAll} className="text-primary-600 hover:underline text-sm font-medium">View All</button>
        )}
      </div>
      <div className="overflow-x-auto pb-2">
        <ul className="flex space-x-4 min-w-full" role="list">
          {jobs.map((job, idx) => (
            <li key={job.id || idx} className="min-w-[260px] max-w-xs bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex-shrink-0 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{job.title}</h3>
                <div className="text-sm text-gray-700 mb-1">{job.company}</div>
                <div className="text-xs text-gray-500 mb-2">{job.location}</div>
                {getMatchReason(job) && (
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full mb-2">{getMatchReason(job)}</span>
                )}
              </div>
              <button className="mt-2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-lg text-sm font-medium">View Job</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default RecommendedCarousel 
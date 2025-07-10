import React from 'react'

const SkillGapHeatmap = ({ userSkills = [], jobs = [] }) => {
  if (!jobs.length) return null

  // Aggregate missing skills across jobs
  const missingSkills = {}
  jobs.forEach(job => {
    (job.skills || []).forEach(skill => {
      if (!userSkills.includes(skill)) {
        missingSkills[skill] = (missingSkills[skill] || 0) + 1
      }
    })
  })
  const topMissing = Object.entries(missingSkills).sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Skill-Gap Heatmap</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Job</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Required Skills</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, idx) => (
              <tr key={job.id || idx} className="border-t border-gray-100">
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{job.title}</td>
                <td className="px-4 py-2">
                  {(job.skills || []).map(skill => (
                    <span
                      key={skill}
                      className={`inline-block px-2 py-1 mr-2 mb-1 rounded-full text-xs font-medium ${userSkills.includes(skill) ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
                      aria-label={userSkills.includes(skill) ? 'You have this skill' : 'Missing skill'}
                    >
                      {skill}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {topMissing.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Top Missing Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {topMissing.map(([skill, count]) => (
              <li key={skill} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                {skill} <span className="ml-1 text-gray-500">({count} jobs)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default SkillGapHeatmap 
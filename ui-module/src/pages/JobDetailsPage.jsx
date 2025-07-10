import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Briefcase, Calendar, DollarSign, Star, Share2, ArrowLeft } from 'lucide-react'

const JobDetailsPage = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const mockJob = {
          id: parseInt(id),
          title: 'Senior Software Engineer',
          company: 'TCS (Tata Consultancy Services)',
          location: 'Bangalore, Karnataka',
          jobType: 'FULL_TIME',
          experienceLevel: 'SENIOR',
          minSalary: 1200000,
          maxSalary: 1800000,
          description: `We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions that drive our business forward.

Key Responsibilities:
• Design and implement scalable software solutions
• Collaborate with cross-functional teams to define and implement new features
• Write clean, maintainable, and efficient code
• Participate in code reviews and technical discussions
• Mentor junior developers and contribute to team growth
• Stay up-to-date with emerging technologies and best practices

Requirements:
• 5+ years of experience in software development
• Strong proficiency in Java, Spring Boot, and React
• Experience with cloud platforms (AWS, Azure, or GCP)
• Knowledge of database design and SQL
• Experience with microservices architecture
• Strong problem-solving and communication skills
• Bachelor's degree in Computer Science or related field

Nice to Have:
• Experience with Docker and Kubernetes
• Knowledge of CI/CD pipelines
• Experience with Agile methodologies
• Contributions to open-source projects`,
          skills: ['Java', 'Spring Boot', 'React', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'Microservices'],
          postedDate: '2024-01-15',
          applicationDeadline: '2024-02-15',
          isActive: true,
          companyDescription: 'TCS (Tata Consultancy Services) is a leading global IT services, consulting, and business solutions organization. We work with Fortune 500 companies to deliver cutting-edge applications that transform businesses.',
          benefits: [
            'Competitive salary and performance bonuses',
            'Comprehensive health insurance coverage',
            'Provident Fund and gratuity benefits',
            'Flexible work arrangements and remote options',
            'Professional development and training programs',
            'Modern office with great amenities',
            'Team events and social activities'
          ]
        }
        setJob(mockJob)
        setLoading(false)
      }, 1000)
    }

    fetchJobDetails()
  }, [id])

  const formatSalary = (min, max) => {
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`
  }

  const getExperienceColor = (level) => {
    const colors = {
      'ENTRY': 'bg-green-100 text-green-800',
      'JUNIOR': 'bg-blue-100 text-blue-800',
      'MID': 'bg-yellow-100 text-yellow-800',
      'SENIOR': 'bg-orange-100 text-orange-800',
      'LEAD': 'bg-red-100 text-red-800',
      'EXECUTIVE': 'bg-purple-100 text-purple-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/jobs" className="inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary">
                    <Star className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button className="btn-secondary">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm">{job.jobType.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Posted {job.postedDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="text-sm">{formatSalary(job.minSalary, job.maxSalary)}</span>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(job.experienceLevel)}`}>
                    {job.experienceLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this position</h3>
              <div className="space-y-4">
                <button className="w-full btn-primary">
                  Apply Now
                </button>
                <button className="w-full btn-secondary">
                  <Star className="w-4 h-4 mr-2" />
                  Save Job
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Application Deadline</h4>
                <p className="text-gray-600">{job.applicationDeadline}</p>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <p className="text-gray-700 mb-4">{job.companyDescription}</p>
              <button className="w-full btn-secondary">View Company Profile</button>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage 
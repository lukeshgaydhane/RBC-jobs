import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import JobCard from '../components/JobCard'
import RecommendedCarousel from '../components/RecommendedCarousel'
import SkillGapHeatmap from '../components/SkillGapHeatmap'
import ChatWidget from '../components/ChatWidget'
import NotificationBell from '../components/NotificationBell'
import ToastAlert from '../components/ToastAlert'
import { 
  TrendingUp, Users, Award, Zap, ArrowRight, Sparkles, 
  Search, MapPin, Briefcase, Star, Play, BookOpen, 
  MessageCircle, Calendar, Building, Globe, Target,
  ChevronLeft, ChevronRight, CheckCircle, Clock
} from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New job match: Senior Java Developer in NYC', read: false, time: '2m ago' },
    { id: 2, text: 'Recruiter message: Interview request from Infosys', read: false, time: '10m ago' },
    { id: 3, text: 'New job match: Data Scientist in Bangalore', read: true, time: '1h ago' }
  ])
  // Toast state
  const [toast, setToast] = useState({ visible: false, message: '', actionText: '', onAction: null })

  const handleSearch = ({ query, location }) => {
    const params = new URLSearchParams()
    if (query) params.append('search', query)
    if (location) params.append('location', location)
    navigate(`/jobs?${params.toString()}`)
  }

  const handleSaveJob = (jobId) => {
    console.log('Saving job:', jobId)
    // TODO: Implement save functionality
  }

  const handleShareJob = (job) => {
    console.log('Sharing job:', job)
    // TODO: Implement share functionality
  }

  const handleNotificationClick = (n) => {
    setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))
    // Optionally navigate or show detail
  }
  const handleClearAll = () => setNotifications([])

  // Demo: show toast when filters return zero results (simulate with a button)
  const showZeroResultsToast = () => {
    setToast({
      visible: true,
      message: 'No jobs found for your filters. Try related roles like Frontend Developer?',
      actionText: 'Show Related',
      onAction: () => { setToast({ ...toast, visible: false }); /* Optionally update filters */ }
    })
  }

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TCS (Tata Consultancy Services)',
      location: 'Bangalore, Karnataka',
      jobType: 'FULL_TIME',
      experienceLevel: 'SENIOR',
      minSalary: 1200000,
      maxSalary: 1800000,
      skills: 'Java, Spring Boot, React, AWS',
      postedDate: '2024-01-15T10:00:00',
      isActive: true,
      isHot: true
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Infosys Limited',
      location: 'Mumbai, Maharashtra',
      jobType: 'FULL_TIME',
      experienceLevel: 'MID',
      minSalary: 800000,
      maxSalary: 1200000,
      skills: 'Python, Machine Learning, SQL, TensorFlow',
      postedDate: '2024-01-14T10:00:00',
      isActive: true,
      isHot: true
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Wipro Technologies',
      location: 'Hyderabad, Telangana',
      jobType: 'FULL_TIME',
      experienceLevel: 'SENIOR',
      minSalary: 1000000,
      maxSalary: 1500000,
      skills: 'Product Management, Agile, User Research, Analytics',
      postedDate: '2024-01-13T10:00:00',
      isActive: true,
      isHot: false
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'HCL Technologies',
      location: 'Noida, Uttar Pradesh',
      jobType: 'FULL_TIME',
      experienceLevel: 'MID',
      minSalary: 600000,
      maxSalary: 900000,
      skills: 'Figma, User Research, Prototyping, Design Systems',
      postedDate: '2024-01-12T10:00:00',
      isActive: true,
      isHot: false
    }
  ]

  const quickActions = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Search Jobs',
      description: 'Find opportunities across India',
      color: 'from-blue-500 to-blue-600',
      link: '/jobs',
      count: '25K+ Jobs'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'AI Assistant',
      description: 'Get career guidance instantly',
      color: 'from-purple-500 to-purple-600',
      link: '/chatbot',
      count: '24/7 Support'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Skill Match',
      description: 'Match your skills with jobs',
      color: 'from-green-500 to-green-600',
      link: '/jobs',
      count: 'Smart AI'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Career Growth',
      description: 'Track your progress',
      color: 'from-orange-500 to-orange-600',
      link: '/jobs',
      count: 'Personalized'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Senior Software Engineer',
      company: 'TCS',
      content: 'RBC-jobs helped me find my dream role in Bangalore within 3 weeks. The smart recommendations were incredibly accurate!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Product Manager',
      company: 'Infosys',
      content: 'The career guidance and skill matching features are outstanding. Found my perfect role with great salary!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      name: 'Anjali Patel',
      role: 'UX Designer',
      company: 'HCL',
      content: 'Discovered amazing remote opportunities through RBC-jobs. The platform is intuitive and highly effective.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Mock user skills for demo
  const userSkills = ['React', 'Java', 'Python', 'AWS', 'Figma']
  // Convert featuredJobs skills to array for heatmap
  const jobsWithSkills = featuredJobs.map(job => ({
    ...job,
    skills: (job.skills || '').split(',').map(s => s.trim())
  }))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      {/* Personalized Recommendations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <RecommendedCarousel jobs={jobsWithSkills} userSkills={userSkills} onViewAll={() => {}} />
        <SkillGapHeatmap userSkills={userSkills} jobs={jobsWithSkills} />
      </div>
      {/* Quick Actions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Quickly</h2>
            <p className="text-lg text-gray-600">Choose your path to career success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {action.count}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
                </div>
              </Link>
            ))}
          </div>
          {/* Demo button to show toast */}
          <div className="flex justify-center mt-8">
            <button
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium"
              onClick={showZeroResultsToast}
            >
              Simulate Zero Results Toast
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
              <p className="text-lg text-gray-600">Handpicked opportunities for you</p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
            >
              View All Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="relative">
                {job.isHot && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Hot Job
                    </span>
                  </div>
                )}
                <JobCard job={job} onSave={handleSaveJob} onShare={handleShareJob} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Hear from professionals who found their dream jobs</p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentTestimonial ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-4 italic">"{testimonials[currentTestimonial].content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-primary-100 mb-8">Join thousands of professionals who have found their dream jobs</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/jobs')}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Job Search
            </button>
            <button
              onClick={() => navigate('/chatbot')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with AI
            </button>
          </div>
        </div>
      </section>
      <ChatWidget />
      <ToastAlert
        message={toast.message}
        actionText={toast.actionText}
        onAction={toast.onAction}
        onClose={() => setToast({ ...toast, visible: false })}
        visible={toast.visible}
      />
    </div>
  )
}

export default HomePage 
import React from 'react'
import { TrendingUp, Users, Award, Globe, Clock, Star } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '25K+',
      label: 'Active Jobs',
      description: 'Fresh opportunities daily',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Users,
      value: '1M+',
      label: 'Job Seekers',
      description: 'Trusted by professionals',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Award,
      value: '92%',
      label: 'Success Rate',
      description: 'High placement success',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Globe,
      value: '25+',
      label: 'Cities',
      description: 'Pan-India opportunities',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Clock,
      value: '< 24h',
      label: 'Response Time',
      description: 'Quick application process',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      icon: Star,
      value: '4.8/5',
      label: 'User Rating',
      description: 'Excellent user experience',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Millions Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform has helped countless Indian professionals find their dream jobs and advance their careers
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                      <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Why Choose RBC-jobs?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Matching</h4>
                <p className="text-gray-600 text-sm">
                  Advanced algorithms match you with the perfect job opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Guidance</h4>
                <p className="text-gray-600 text-sm">
                  Get personalized career advice from industry experts
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                <p className="text-gray-600 text-sm">
                  Join thousands who have successfully advanced their careers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection 
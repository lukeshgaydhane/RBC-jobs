import React from 'react'
import { Search, TrendingUp, DollarSign, Target, Globe, Sparkles } from 'lucide-react'

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      icon: <Search className="w-5 h-5" />,
      text: 'Find Jobs',
      description: 'Discover opportunities across Indian cities',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Career Advice',
      description: 'Get expert guidance for Indian job market',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      text: 'Salary Guide',
      description: 'Research salaries in Indian Rupees (₹)',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: 'Skill Matching',
      description: 'Match your skills with Indian job requirements',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: 'Remote Jobs',
      description: 'Find remote opportunities across India',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: 'Smart Recommendations',
      description: 'Get personalized job suggestions for India',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action.text)}
            className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-200 text-left"
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              {action.icon}
            </div>
            <h4 className="font-semibold text-gray-900 mb-1 text-sm">{action.text}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions 
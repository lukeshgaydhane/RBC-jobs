import React, { useState, useRef, useEffect } from 'react'
import ChatMessage from '../components/ChatMessage'
import QuickActions from '../components/QuickActions'
import { Send, Bot, Sparkles, Mic, Paperclip, Smile } from 'lucide-react'

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'BOT',
      message: "Hello! I'm your intelligent career assistant. I can help you find jobs, get career advice, research salaries, and much more. What would you like to explore today?",
      timestamp: new Date().toISOString()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'USER',
      message: message.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action) => {
    const actionMessages = {
      'Find Jobs': "I'd be happy to help you find jobs! What type of position are you looking for? You can tell me about your skills, experience level, preferred location, or any specific requirements.",
      'Career Advice': "Great choice! I can provide career guidance on various topics. What specific area would you like advice on? For example: resume writing, interview preparation, skill development, career transitions, or industry insights.",
      'Salary Guide': "I can help you research salary information! What role or industry are you interested in? I can provide data on average salaries, compensation trends, and factors that influence pay.",
      'Skill Matching': "Let's match your skills with job opportunities! What are your key skills and technologies? I can help identify roles that align with your expertise and suggest areas for development.",
      'Remote Jobs': "Remote work opportunities are increasingly popular! What type of remote position interests you? I can help you find remote jobs in your field and provide tips for remote work success.",
      'Smart Recommendations': "I'll provide personalized job recommendations based on your profile! To get the best matches, please share your experience level, skills, preferred location, and career goals."
    }

    handleSendMessage(actionMessages[action] || action)
  }

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Simple response logic - replace with actual AI integration
    let response = "I understand you're interested in that topic. Could you provide more specific details so I can give you the most relevant information and recommendations?"
    
    if (lowerMessage.includes('job') || lowerMessage.includes('position') || lowerMessage.includes('role')) {
      response = "I can help you find job opportunities using our intelligent matching system! To provide the best matches, could you tell me:\n\n• Your desired job title or role\n• Your experience level\n• Preferred location (or remote)\n• Key skills you want to use\n\nThis will help me find positions that align with your career goals."
    } else if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('compensation')) {
      response = "I'd be happy to help with salary research! To provide accurate information, please let me know:\n\n• Job title or role\n• Experience level\n• Location (city/state or remote)\n• Industry or company size\n\nI can then share current salary ranges and compensation trends for your specific situation."
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      response = "Great! I can help you with resume optimization. Here are some key areas we can focus on:\n\n• Formatting and structure\n• Keyword optimization for ATS systems\n• Achievement-focused bullet points\n• Skills section organization\n• Professional summary\n\nWhat specific aspect would you like to improve?"
    } else if (lowerMessage.includes('interview')) {
      response = "Interview preparation is crucial for success! I can help you with:\n\n• Common interview questions and best answers\n• Technical interview preparation\n• Behavioral question strategies\n• Company research tips\n• Follow-up email templates\n\nWhat type of interview are you preparing for?"
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      response = "Skill development is key to career growth! I can help you:\n\n• Identify in-demand skills for your field\n• Find learning resources and courses\n• Understand skill requirements for target roles\n• Plan your skill development roadmap\n\nWhat skills are you looking to develop or showcase?"
    } else if (lowerMessage.includes('remote') || lowerMessage.includes('work from home')) {
      response = "Remote work offers great flexibility! Here are some tips for finding remote opportunities:\n\n• Use remote-specific job boards\n• Highlight remote work experience\n• Demonstrate self-motivation in applications\n• Prepare for virtual interviews\n• Showcase communication skills\n\nWhat type of remote role interests you?"
    }

    return {
      id: Date.now() + 1,
      type: 'BOT',
      message: response,
      timestamp: new Date().toISOString()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Intelligent Career Assistant</h1>
              <p className="text-gray-600">Get personalized job recommendations and career guidance for the Indian job market</p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && <ChatMessage message={{}} isTyping={true} />}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-200 p-6">
                <QuickActions onActionClick={handleQuickAction} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        rows="3"
                      />
                      <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
                      <Mic className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim()}
                      className="p-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl transition-colors duration-200"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Be specific about your skills</li>
                    <li>• Mention your experience level</li>
                    <li>• Include preferred location</li>
                    <li>• Ask about salary ranges</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🚀 Popular Queries</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickAction('Find Jobs')}
                      className="block w-full text-left text-sm text-green-800 hover:text-green-900 transition-colors duration-200"
                    >
                      • Find Jobs
                    </button>
                    <button
                      onClick={() => handleQuickAction('Career Advice')}
                      className="block w-full text-left text-sm text-green-800 hover:text-green-900 transition-colors duration-200"
                    >
                      • Career Advice
                    </button>
                    <button
                      onClick={() => handleQuickAction('Salary Guide')}
                      className="block w-full text-left text-sm text-green-800 hover:text-green-900 transition-colors duration-200"
                    >
                      • Salary Guide
                    </button>
                    <button
                      onClick={() => handleQuickAction('Smart Recommendations')}
                      className="block w-full text-left text-sm text-green-800 hover:text-green-900 transition-colors duration-200"
                    >
                      • Smart Recommendations
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🎯 Features</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Smart job matching</li>
                    <li>• Personalized recommendations</li>
                    <li>• Career path analysis</li>
                    <li>• Skill gap insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBotPage 
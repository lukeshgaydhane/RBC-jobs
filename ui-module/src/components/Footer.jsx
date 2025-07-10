import React from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  RBC-jobs
                </h3>
                <p className="text-sm text-gray-400">Intelligent Career Platform</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Transform your career with our intelligent job search platform. Find your dream job, 
              get personalized recommendations, and accelerate your professional growth with 
              modern technology and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">For Job Seekers</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  AI Assistant
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Salary Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Resume Builder
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support & Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group">
                  <div className="w-1 h-1 bg-primary-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-200"></div>
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email Us</p>
                <p className="text-white font-medium">info@rsingbusiness.in</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Call Us</p>
                <p className="text-white font-medium">+91 8382043280</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Visit Us</p>
                <p className="text-white font-medium">Sector-39, Gurgaon, Haryana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 RBC-jobs Platform. Designed and Built by Lukesh Gaydhane. | Made with ❤️ for career growth
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, Briefcase, MessageCircle, Bell, Building2, Settings, MoreVertical, LogOut, Settings as SettingsIcon, User as UserIcon } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0) // Demo notification count - change this to test different states
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Demo login state - change to true to test logged-in state
  const navigate = useNavigate();
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const authDropdownRef = React.useRef();

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (authDropdownRef.current && !authDropdownRef.current.contains(e.target)) {
        setIsAuthDropdownOpen(false);
      }
    }
    if (isAuthDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isAuthDropdownOpen]);

  // Function to render notification badge
  const renderNotificationBadge = () => {
    if (notificationCount === 0) {
      // Show red dot for 0 notifications
      return (
        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
      )
    } else if (notificationCount > 0) {
      // Show number for 1+ notifications
      return (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1">
          {notificationCount > 9 ? '9+' : notificationCount}
        </span>
      )
    }
    return null
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center shadow-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RBC-jobs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/jobs" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 text-sm"
            >
              Jobs
            </Link>
            <Link 
              to="/companies" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 text-sm flex items-center space-x-1"
            >
              <Building2 className="w-4 h-4" />
              <span>Companies</span>
            </Link>
            <Link 
              to="/services" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 text-sm flex items-center space-x-1"
            >
              <Settings className="w-4 h-4" />
              <span>Services</span>
            </Link>
            <Link 
              to="/chatbot" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 text-sm flex items-center space-x-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI Assistant</span>
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-all duration-200">
              <Bell className="w-5 h-5" />
              {renderNotificationBadge()}
            </button>
            
            {/* Profile Section */}
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Profile Picture */}
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    JD
                  </div>
                  {/* 3-dot menu */}
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          JD
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">John Doe</p>
                          <p className="text-xs text-gray-500">john.doe@example.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                        <UserIcon className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={authDropdownRef}>
                <button
                  onClick={() => setIsAuthDropdownOpen((open) => !open)}
                  className="btn-primary text-sm px-6 py-2 flex items-center space-x-2"
                  aria-haspopup="listbox"
                  aria-expanded={isAuthDropdownOpen}
                  aria-label="Show authentication options"
                >
                  <User className="w-4 h-4" />
                  <span>Auth</span>
                </button>
                {isAuthDropdownOpen && (
                  <ul
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 animate-fade-in"
                    role="listbox"
                    tabIndex={-1}
                  >
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100"
                        onClick={() => {
                          setIsLoggedIn(true); // Instantly sign in
                          setIsAuthDropdownOpen(false);
                        }}
                        role="option"
                      >
                        Sign In
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100"
                        onClick={() => {
                          setIsAuthDropdownOpen(false);
                          navigate('/register');
                          setTimeout(() => {
                            // Optionally, could trigger register mode in AuthPage
                          }, 100);
                        }}
                        role="option"
                      >
                        Register
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                to="/jobs"
                className="px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase className="w-5 h-5" />
                <span>Jobs</span>
              </Link>
              <Link
                to="/companies"
                className="px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Building2 className="w-5 h-5" />
                <span>Companies</span>
              </Link>
              <Link
                to="/services"
                className="px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Services</span>
              </Link>
              <Link
                to="/chatbot"
                className="px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center space-x-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>AI Assistant</span>
              </Link>
              
              {/* Mobile notification */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Notifications</span>
                </div>
                {notificationCount === 0 ? (
                  <span className="bg-red-500 rounded-full w-3 h-3"></span>
                ) : (
                  <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold px-1">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </div>
              
              {/* Mobile Profile Section */}
              <div className="px-4 pt-2">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full text-sm px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="relative" ref={authDropdownRef}>
                    <button
                      onClick={() => setIsAuthDropdownOpen((open) => !open)}
                      className="btn-primary w-full text-sm px-6 py-3 flex items-center justify-center space-x-2"
                      aria-haspopup="listbox"
                      aria-expanded={isAuthDropdownOpen}
                      aria-label="Show authentication options"
                    >
                      <User className="w-4 h-4" />
                      <span>Auth</span>
                    </button>
                    {isAuthDropdownOpen && (
                      <ul
                        className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 animate-fade-in"
                        role="listbox"
                        tabIndex={-1}
                      >
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100"
                            onClick={() => {
                              setIsLoggedIn(true); // Instantly sign in
                              setIsAuthDropdownOpen(false);
                            }}
                            role="option"
                          >
                            Sign In
                          </button>
                        </li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100"
                            onClick={() => {
                              setIsAuthDropdownOpen(false);
                              navigate('/register');
                              setTimeout(() => {
                                // Optionally, could trigger register mode in AuthPage
                              }, 100);
                            }}
                            role="option"
                          >
                            Register
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 
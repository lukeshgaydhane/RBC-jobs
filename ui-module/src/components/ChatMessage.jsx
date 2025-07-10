import React, { useState } from 'react'
import { Bot, User, Sparkles, Copy, Check } from 'lucide-react'

const ChatMessage = ({ message, isTyping = false }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatMessage = (text) => {
    // Convert line breaks to proper formatting
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ))
  }

  if (isTyping) {
    return (
      <div className="flex justify-start mb-6">
        <div className="flex items-start space-x-3 max-w-3xl">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (message.type === 'BOT') {
    return (
      <div className="flex justify-start mb-6 animate-fade-in">
        <div className="flex items-start space-x-3 max-w-3xl">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm relative group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-gray-900 leading-relaxed">
                  {formatMessage(message.message)}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(message.message)}
                className="ml-2 p-1 text-gray-400 hover:text-primary-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                title="Copy message"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-1 left-4 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      </div>
    )
  }

  if (message.type === 'USER') {
    return (
      <div className="flex justify-end mb-6 animate-fade-in">
        <div className="flex items-start space-x-3 max-w-3xl flex-row-reverse">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="bg-primary-600 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-sm relative">
            <div className="text-white leading-relaxed">
              {formatMessage(message.message)}
            </div>
            <div className="text-xs text-primary-200 mt-2">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            {/* Decorative element */}
            <div className="absolute -top-1 right-4 w-2 h-2 bg-primary-600 transform rotate-45"></div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default ChatMessage 
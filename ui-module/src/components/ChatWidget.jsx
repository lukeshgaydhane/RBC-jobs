import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const defaultTemplates = [
  'Show me senior Java roles in NYC',
  'What are the top remote React jobs?',
  'Find me data scientist jobs in Bangalore',
  'How do I improve my resume?'
]

const ChatWidget = ({ onSend, messages = [], templates = defaultTemplates }) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [localMessages, setLocalMessages] = useState(messages)
  const inputRef = useRef(null)
  const chatRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [localMessages, open])

  const handleSend = (msg) => {
    const text = msg || input.trim()
    if (!text) return
    setLocalMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    // Mock AI response
    setTimeout(() => {
      setLocalMessages(prev => [...prev, { from: 'ai', text: 'This is a mock AI response for: ' + text }])
    }, 800)
    if (onSend) onSend(text)
  }

  return (
    <>
      {/* Floating Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label="Open chat assistant"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <MessageCircle className="w-7 h-7" />
      </button>
      {/* Chat Overlay */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col" role="dialog" aria-modal="true">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-900">AI Assistant</span>
            <button
              className="text-gray-400 hover:text-primary-600 focus:outline-none"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 320 }}>
            {localMessages.length === 0 && (
              <div className="text-gray-500 text-sm">How can I help you today?</div>
            )}
            {localMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-primary-100 text-primary-900' : 'bg-gray-100 text-gray-800'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          {/* Quick Ask Templates */}
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {templates.map((tpl, i) => (
              <button
                key={i}
                className="bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-800 px-3 py-1 rounded-full text-xs font-medium focus:outline-none"
                onClick={() => handleSend(tpl)}
                tabIndex={0}
              >
                {tpl}
              </button>
            ))}
          </div>
          {/* Input */}
          <form
            className="flex items-center border-t border-gray-100 px-3 py-2"
            onSubmit={e => { e.preventDefault(); handleSend() }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              aria-label="Type your question"
            />
            <button
              type="submit"
              className="ml-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full w-9 h-9 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-400"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget 
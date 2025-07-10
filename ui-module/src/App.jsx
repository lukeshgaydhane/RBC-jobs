import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import JobSearchPage from './pages/JobSearchPage'
import JobDetailsPage from './pages/JobDetailsPage'
import ChatBotPage from './pages/ChatBotPage'
import ResumePage from "./pages/ResumePage";
import RegistrationPage from './pages/RegistrationPage';
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobSearchPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/chatbot" element={<ChatBotPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/register" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

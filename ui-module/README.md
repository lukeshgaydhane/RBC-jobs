# RBC-jobs UI Module

A modern, responsive React.js frontend for the RBC-jobs platform - Designed and Built by Lukesh Gaydhane learning modern frontend development, specifically tailored for the Indian job market with localized features including Indian Rupees (₹), major Indian cities, and Indian companies.

## About This Module

This UI module represents my journey into React development and modern frontend technologies. It's my first attempt at building a comprehensive user interface with real-world features like job search, chat functionality, and responsive design.

## Features

- **Modern UI/UX**: Built with React 18, Vite, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful responsive layouts
- **Smart Features**: Integration with intelligent job matching technology
- **Real-time Chat**: AI-powered career assistant for personalized guidance
- **Job Search**: Advanced filtering and search capabilities
- **Career Tools**: Resume builder, salary research, and skill matching

## Resume Uploader & Editor

A drag-and-drop, paste, or browse resume uploader with instant preview of parsed fields (role, skills, education) and inline "fix" suggestions for missing dates or inconsistent formatting.

**Features:**
- Drag-and-drop, paste, or browse to upload PDF, DOCX, RTF, or TXT resumes
- Instant parsing and preview of key fields (role, skills, education)
- Inline suggestions for missing or inconsistent data (e.g., missing end dates, inconsistent skill formatting)
- Accessible (keyboard navigation, ARIA labels, focus management)
- Responsive design for mobile and desktop

**Usage:**
- Navigate to `/resume` in the app
- Upload your resume and review parsed fields and suggestions
- Click "Fix" on suggestions to address issues (future: inline editing)

## Registration & Sign-In

- The `/register` route provides a unified authentication page with two tabs: **Sign In** and **Register**.
- The **Sign In** tab allows users to log in with their email and password (demo only; replace with real API integration).
- The **Register** tab provides a multi-step, Naukri-inspired registration flow with progress bar, validation, and modern UX.
- All logic is handled in `src/pages/AuthPage.jsx`, using `SignInForm` and `RegistrationStepper` components.

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Navigate to the UI module directory:
```bash
cd ui-module
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   ├── HeroSection.jsx # Landing page hero
│   ├── JobCard.jsx     # Job listing card
│   ├── SearchFilters.jsx # Job search filters
│   ├── ChatMessage.jsx # Chat message component
│   ├── QuickActions.jsx # Quick action buttons
│   └── StatsSection.jsx # Statistics display
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── JobSearchPage.jsx # Job search page
│   ├── JobDetailsPage.jsx # Job details page
│   └── ChatBotPage.jsx # AI assistant page
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## Key Components

### Header
- Navigation menu with responsive design
- Search functionality
- User authentication status

### HeroSection
- Compelling landing page introduction
- Job search form
- Platform statistics and features

### JobCard
- Displays job information in an attractive card format
- Quick apply and save actions
- Company branding and job details

### SearchFilters
- Advanced filtering options
- Location, salary, experience level filters
- Real-time search results

### ChatBotPage
- Intelligent career assistant
- Real-time chat interface
- Quick action buttons for common queries

## Styling

The project uses Tailwind CSS for styling with a custom color palette:

- **Primary**: Blue gradient (`primary-500` to `primary-600`)
- **Secondary**: Purple gradient for accents
- **Success**: Green for positive actions
- **Warning**: Orange for alerts
- **Error**: Red for errors

## API Integration

The UI communicates with the backend API modules:

- **API Module**: Job data, user management, search functionality
- **Bot Module**: AI assistant, career guidance, recommendations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes for styling
- Maintain responsive design principles

## Learning Notes

### What I Learned Building This
- **React Hooks**: useState, useEffect, useRef for state management
- **Component Architecture**: Building reusable, modular components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Routing**: Client-side routing with React Router
- **API Integration**: Connecting frontend with backend services
- **State Management**: Managing application state effectively

### Challenges I Faced
- Understanding React's component lifecycle
- Implementing responsive design across different screen sizes
- Managing complex state in the chat interface
- Optimizing performance with proper component structure
- Learning Tailwind CSS utility classes

## Deployment

### Docker

The project includes a Dockerfile for containerized deployment:

```bash
docker build -t rbc-jobs-ui .
docker run -p 80:80 rbc-jobs-ui
```

### Nginx Configuration

Includes optimized nginx.conf for production serving.

## Future Improvements

As I continue learning React and frontend development, I plan to add:
- TypeScript integration
- State management with Redux or Zustand
- Unit testing with Jest and React Testing Library
- Performance optimization with React.memo and useMemo
- Progressive Web App (PWA) features
- Accessibility improvements

## Contributing

This is a learning project, but I welcome feedback and suggestions for improvement. Feel free to:
1. Follow the existing code style
2. Test on multiple screen sizes
3. Ensure accessibility standards
4. Update documentation as needed

## License

This project is part of the RBC-jobs platform and follows the same licensing terms.

---

Built with ❤️ by a beginner web developer passionate about learning React and modern frontend development. 
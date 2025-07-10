#!/bin/bash

echo "🚀 Setting up Job Search Platform - Microservices Architecture"
echo "=============================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Create necessary directories
echo "📁 Creating project structure..."
mkdir -p logs
mkdir -p data/mysql

# Set up environment variables
echo "🔧 Setting up environment variables..."
if [ ! -f .env ]; then
    cat > .env << EOF
# Database Configuration
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=job_search_db
MYSQL_USER=jobuser
MYSQL_PASSWORD=jobpass

# API Service Configuration
API_PORT=8080
API_CONTEXT_PATH=/api/v1

# BOT Service Configuration
BOT_PORT=8081
BOT_CONTEXT_PATH=/bot/v1

# UI Service Configuration
UI_PORT=5173

# Development Configuration
NODE_ENV=development
SPRING_PROFILES_ACTIVE=dev
EOF
    echo "✅ Created .env file"
else
    echo "ℹ️  .env file already exists"
fi

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🏥 Checking service health..."

# Check API service
if curl -f http://localhost:8080/api/v1/actuator/health &> /dev/null; then
    echo "✅ API Service is running on http://localhost:8080"
else
    echo "❌ API Service is not responding"
fi

# Check BOT service
if curl -f http://localhost:8081/bot/v1/bot/health &> /dev/null; then
    echo "✅ BOT Service is running on http://localhost:8081"
else
    echo "❌ BOT Service is not responding"
fi

# Check UI service
if curl -f http://localhost:5173 &> /dev/null; then
    echo "✅ UI Service is running on http://localhost:5173"
else
    echo "❌ UI Service is not responding"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Service URLs:"
echo "   • Frontend (UI): http://localhost:5173"
echo "   • API Service: http://localhost:8080/api/v1"
echo "   • BOT Service: http://localhost:8081/bot/v1"
echo "   • Database: localhost:3306"
echo ""
echo "🔧 Useful Commands:"
echo "   • View logs: docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart services: docker-compose restart"
echo "   • Rebuild services: docker-compose up --build"
echo ""
echo "📚 Next Steps:"
echo "   1. Open http://localhost:5173 in your browser"
echo "   2. Explore the job search functionality"
echo "   3. Try the AI assistant at http://localhost:5173/chatbot"
echo "   4. Check the API documentation at http://localhost:8080/api/v1"
echo ""
echo "🐛 Troubleshooting:"
echo "   • If services are not responding, check logs: docker-compose logs"
echo "   • Ensure ports 8080, 8081, and 5173 are not in use"
echo "   • Restart Docker if you encounter issues"
echo "" 
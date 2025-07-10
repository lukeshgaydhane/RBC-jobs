@echo off
echo 🚀 Setting up Job Search Platform - Microservices Architecture
echo ==============================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Create necessary directories
echo 📁 Creating project structure...
if not exist "logs" mkdir logs
if not exist "data\mysql" mkdir data\mysql

REM Set up environment variables
echo 🔧 Setting up environment variables...
if not exist ".env" (
    (
        echo # Database Configuration
        echo MYSQL_ROOT_PASSWORD=password
        echo MYSQL_DATABASE=job_search_db
        echo MYSQL_USER=jobuser
        echo MYSQL_PASSWORD=jobpass
        echo.
        echo # API Service Configuration
        echo API_PORT=8080
        echo API_CONTEXT_PATH=/api/v1
        echo.
        echo # BOT Service Configuration
        echo BOT_PORT=8081
        echo BOT_CONTEXT_PATH=/bot/v1
        echo.
        echo # UI Service Configuration
        echo UI_PORT=5173
        echo.
        echo # Development Configuration
        echo NODE_ENV=development
        echo SPRING_PROFILES_ACTIVE=dev
    ) > .env
    echo ✅ Created .env file
) else (
    echo ℹ️  .env file already exists
)

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo ⏳ Waiting for services to be ready...
timeout /t 30 /nobreak >nul

REM Check service health
echo 🏥 Checking service health...

REM Check API service
curl -f http://localhost:8080/api/v1/actuator/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API Service is running on http://localhost:8080
) else (
    echo ❌ API Service is not responding
)

REM Check BOT service
curl -f http://localhost:8081/bot/v1/bot/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ BOT Service is running on http://localhost:8081
) else (
    echo ❌ BOT Service is not responding
)

REM Check UI service
curl -f http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ UI Service is running on http://localhost:5173
) else (
    echo ❌ UI Service is not responding
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Service URLs:
echo    • Frontend (UI): http://localhost:5173
echo    • API Service: http://localhost:8080/api/v1
echo    • BOT Service: http://localhost:8081/bot/v1
echo    • Database: localhost:3306
echo.
echo 🔧 Useful Commands:
echo    • View logs: docker-compose logs -f
echo    • Stop services: docker-compose down
echo    • Restart services: docker-compose restart
echo    • Rebuild services: docker-compose up --build
echo.
echo 📚 Next Steps:
echo    1. Open http://localhost:5173 in your browser
echo    2. Explore the job search functionality
echo    3. Try the AI assistant at http://localhost:5173/chatbot
echo    4. Check the API documentation at http://localhost:8080/api/v1
echo.
echo 🐛 Troubleshooting:
echo    • If services are not responding, check logs: docker-compose logs
echo    • Ensure ports 8080, 8081, and 5173 are not in use
echo    • Restart Docker Desktop if you encounter issues
echo.
pause 
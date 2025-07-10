# RBC-jobs Platform API Documentation

Comprehensive API documentation for the RBC-jobs platform - Designed and Built by Lukesh Gaydhane learning backend development and API design, specifically tailored for the Indian job market.

## About This Documentation

This documentation represents my learning journey into API design and backend development. It covers the RESTful APIs I built for the RBC-jobs platform, demonstrating my understanding of Spring Boot, database design, and microservices architecture.

## Overview

The RBC-jobs platform provides a comprehensive REST API for job search functionality, built with Spring Boot and following microservices architecture. The API is designed to be RESTful, scalable, and easy to integrate with frontend applications.

## Base URL

- **Development**: `http://localhost:8080/api/v1`
- **Production**: `https://api.rbc-jobs.com/api/v1`

## Authentication

Currently, the API does not require authentication for basic operations. Future versions will include JWT-based authentication as I learn more about security practices.

## API Endpoints

### Jobs

#### Get All Jobs
```http
GET /jobs
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Senior Software Engineer",
    "company": "Tech Solutions Inc",
    "description": "We are looking for a Senior Software Engineer...",
    "location": "San Francisco, CA",
    "jobType": "FULL_TIME",
    "experienceLevel": "SENIOR",
    "minSalary": 120000.00,
    "maxSalary": 160000.00,
    "skills": "Java, Spring Boot, React, AWS",
    "postedDate": "2024-01-15T10:00:00",
    "applicationDeadline": "2024-02-15T23:59:59",
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00",
    "updatedAt": "2024-01-15T10:00:00"
  }
]
```

#### Get Job by ID
```http
GET /jobs/{id}
```

**Parameters:**
- `id` (path): Job ID

**Response:**
```json
{
  "id": 1,
  "title": "Senior Software Engineer",
  "company": "Tech Solutions Inc",
  "description": "We are looking for a Senior Software Engineer...",
  "location": "San Francisco, CA",
  "jobType": "FULL_TIME",
  "experienceLevel": "SENIOR",
  "minSalary": 120000.00,
  "maxSalary": 160000.00,
  "skills": "Java, Spring Boot, React, AWS",
  "postedDate": "2024-01-15T10:00:00",
  "applicationDeadline": "2024-02-15T23:59:59",
  "isActive": true,
  "createdAt": "2024-01-15T10:00:00",
  "updatedAt": "2024-01-15T10:00:00"
}
```

#### Create Job
```http
POST /jobs
```

**Request Body:**
```json
{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "description": "We are looking for a Software Engineer...",
  "location": "New York, NY",
  "jobType": "FULL_TIME",
  "experienceLevel": "MID",
  "minSalary": 80000.00,
  "maxSalary": 120000.00,
  "skills": "Java, Spring Boot, React",
  "applicationDeadline": "2024-02-15T23:59:59"
}
```

#### Update Job
```http
PUT /jobs/{id}
```

**Parameters:**
- `id` (path): Job ID

**Request Body:** Same as Create Job

#### Delete Job
```http
DELETE /jobs/{id}
```

**Parameters:**
- `id` (path): Job ID

#### Search Jobs
```http
GET /jobs/search?keyword={keyword}
```

**Parameters:**
- `keyword` (query): Search term for job title, description, or skills

#### Get Jobs by Company
```http
GET /jobs/company/{company}
```

**Parameters:**
- `company` (path): Company name

#### Get Jobs by Location
```http
GET /jobs/location/{location}
```

**Parameters:**
- `location` (path): Job location

#### Get Jobs by Type
```http
GET /jobs/type/{jobType}
```

**Parameters:**
- `jobType` (path): Job type (FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, FREELANCE)

#### Get Jobs by Experience Level
```http
GET /jobs/experience/{experienceLevel}
```

**Parameters:**
- `experienceLevel` (path): Experience level (ENTRY, JUNIOR, MID, SENIOR, LEAD, EXECUTIVE)

#### Get Jobs by Salary Range
```http
GET /jobs/salary?minSalary={minSalary}&maxSalary={maxSalary}
```

**Parameters:**
- `minSalary` (query): Minimum salary
- `maxSalary` (query): Maximum salary

#### Get All Companies
```http
GET /jobs/companies
```

**Response:**
```json
[
  "Tech Solutions Inc",
  "AI Analytics Corp",
  "Innovation Labs"
]
```

#### Get All Locations
```http
GET /jobs/locations
```

**Response:**
```json
[
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX"
]
```

## BOT Service API

### Base URL
- **Development**: `http://localhost:8081/bot/v1`
- **Production**: `https://bot.rbc-jobs.com/bot/v1`

### Get Job Recommendations
```http
POST /recommendations
```

**Request Body:**
```json
{
  "userId": "user123",
  "skills": ["Java", "Spring Boot", "React"],
  "experience": "MID",
  "location": "San Francisco, CA",
  "preferences": {
    "jobType": "FULL_TIME",
    "minSalary": 80000,
    "remote": false
  }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "jobId": 1,
      "title": "Software Engineer",
      "company": "Tech Solutions Inc",
      "matchScore": 0.92,
      "reason": "Strong match for your Java and Spring Boot skills"
    }
  ],
  "totalCount": 15
}
```

### Chat Interface
```http
POST /chat/message
```

**Request Body:**
```json
{
  "message": "I'm looking for software engineering jobs in San Francisco",
  "userId": "user123",
  "sessionId": "session456"
}
```

**Response:**
```json
{
  "id": "msg789",
  "message": "I can help you find software engineering jobs in San Francisco using our intelligent matching system. What's your experience level and preferred technologies?",
  "type": "BOT",
  "timestamp": "2024-01-15T10:00:00",
  "recommendations": [
    {
      "jobId": 1,
      "title": "Senior Software Engineer",
      "company": "Tech Solutions Inc",
      "matchScore": 0.95
    }
  ]
}
```

## Error Handling

### Standard Error Response
```json
{
  "timestamp": "2024-01-15T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid request parameters",
  "path": "/api/v1/jobs"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Data Models

### Job Entity
```json
{
  "id": "number",
  "title": "string",
  "company": "string",
  "description": "string",
  "location": "string",
  "jobType": "FULL_TIME | PART_TIME | CONTRACT | INTERNSHIP | FREELANCE",
  "experienceLevel": "ENTRY | JUNIOR | MID | SENIOR | LEAD | EXECUTIVE",
  "minSalary": "number",
  "maxSalary": "number",
  "skills": "string",
  "postedDate": "datetime",
  "applicationDeadline": "datetime",
  "isActive": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### JobRecommendation Entity
```json
{
  "jobId": "number",
  "title": "string",
  "company": "string",
  "matchScore": "number",
  "reason": "string"
}
```

### ChatMessage Entity
```json
{
  "id": "string",
  "message": "string",
  "type": "USER | BOT",
  "timestamp": "datetime",
  "sessionId": "string",
  "userId": "string"
}
```

## CORS Configuration

The API supports Cross-Origin Resource Sharing (CORS) for web applications:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## Testing

### Using cURL

#### Get all jobs
```bash
curl -X GET "http://localhost:8080/api/v1/jobs" \
  -H "Content-Type: application/json"
```

#### Search jobs
```bash
curl -X GET "http://localhost:8080/api/v1/jobs/search?keyword=software" \
  -H "Content-Type: application/json"
```

#### Get job recommendations
```bash
curl -X POST "http://localhost:8081/bot/v1/recommendations" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "skills": ["Java", "Spring Boot"],
    "experience": "MID",
    "location": "San Francisco, CA"
  }'
```

### Using Postman

Import the following collection for testing:

```json
{
  "info": {
    "name": "RBC-jobs API",
    "description": "API collection for RBC-jobs platform"
  },
  "item": [
    {
      "name": "Get All Jobs",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/v1/jobs"
      }
    },
    {
      "name": "Search Jobs",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/v1/jobs/search?keyword=software"
      }
    },
    {
      "name": "Get Job Recommendations",
      "request": {
        "method": "POST",
        "url": "http://localhost:8081/bot/v1/recommendations",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"userId\": \"user123\",\n  \"skills\": [\"Java\", \"Spring Boot\"],\n  \"experience\": \"MID\",\n  \"location\": \"San Francisco, CA\"\n}"
        }
      }
    }
  ]
}
```

## Deployment

### Environment Variables

#### API Service
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/rbc_jobs
SPRING_DATASOURCE_USERNAME=rbc_user
SPRING_DATASOURCE_PASSWORD=rbc_password
JWT_SECRET=your-jwt-secret-key
```

#### Bot Service
```bash
SPRING_PROFILES_ACTIVE=prod
AI_SERVICE_URL=https://api.openai.com/v1
AI_SERVICE_KEY=your-ai-service-key
```

### Docker Deployment

```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Monitoring and Health Checks

### Health Check Endpoint
```http
GET /actuator/health
```

**Response:**
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP"
    },
    "diskSpace": {
      "status": "UP"
    }
  }
}
```

### Metrics Endpoint
```http
GET /actuator/metrics
```

## Rate Limiting

API endpoints are rate-limited to ensure fair usage:

- **Standard endpoints**: 100 requests per minute
- **Search endpoints**: 50 requests per minute
- **Bot endpoints**: 30 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
```

## Learning Notes

### What I Learned Building These APIs
- **Spring Boot**: Creating RESTful web services
- **JPA/Hibernate**: Database operations and entity management
- **Microservices**: Service separation and communication
- **API Design**: RESTful principles and best practices
- **Error Handling**: Proper HTTP status codes and error responses
- **CORS**: Cross-origin resource sharing configuration
- **Docker**: Containerization and deployment

### Challenges I Faced
- Understanding Spring Boot's auto-configuration
- Managing database relationships with JPA
- Implementing proper error handling
- Setting up microservices communication
- Learning Docker and containerization
- API documentation and testing

## Future Improvements

As I continue learning backend development, I plan to add:
- JWT authentication and authorization
- API versioning
- Swagger/OpenAPI documentation
- Unit and integration testing
- Performance monitoring and logging
- Database optimization
- Security enhancements

## Support

For questions about this learning project:
- Email: info@rsingbusiness.in
- Documentation: This file
- GitHub Issues: [Repository Issues](https://github.com/rbc/rbc-jobs/issues)

---

This documentation is maintained by a beginner web developer passionate about learning backend development and API design. 
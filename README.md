# Real Estate Management System

A full-stack real estate application built with **Spring Boot** and **React**, using **MongoDB** database.

## 🛠️ Tech Stack

- **Backend:** Spring Boot 3.2.5, Java 17
- **Database:** MongoDB
- **Frontend:** React
- **Authentication:** HTTP Basic Auth

## 📋 Features

### User Features
- Browse real estate properties
- View property details (price, location, bedrooms, etc.)
- Submit contact forms
- Subscribe to newsletters

### Admin Features
- Manage projects (Create, Update, Delete)
- View contact submissions
- View newsletter subscriptions
- Manage client testimonials

## 🚀 Quick Start

### 1. Prerequisites
- Java 17+
- MongoDB (local or cloud)
- Node.js 14+ (for frontend)

### 2. Configure Application

**Create `src/main/resources/application.properties`:**

```properties
# MongoDB Connection
spring.data.mongodb.uri=mongodb://localhost:27017/real_estate_db

# Admin Authentication
admin.username=admin
admin.password=admin123

# Server Port
server.port=8080
```

**What these properties do:**

| Property | Description | Example Value |
|----------|-------------|---------------|
| `spring.data.mongodb.uri` | MongoDB connection URL | `mongodb://localhost:27017/real_estate_db` |
| `admin.username` | Admin login username | `admin` |
| `admin.password` | Admin login password | `admin123` |
| `server.port` | Backend server port | `8080` |

**MongoDB URI Options:**

- **Local MongoDB:** `mongodb://localhost:27017/real_estate_db`
- **MongoDB Atlas (Cloud):** `mongodb+srv://username:password@cluster.mongodb.net/real_estate_db`
- **With Authentication:** `mongodb://username:password@localhost:27017/real_estate_db`

### 3. Run Backend

```bash
# Clone repository
git clone https://github.com/Vamsi1807/Flipr_project_22bq1a1249.git
cd Flipr_project_22bq1a1249

# Run application
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8080`

### 4. Run Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

## 📡 API Endpoints

### Public Endpoints (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | Get all properties |
| `GET` | `/api/clients` | Get client testimonials |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/subscribe` | Subscribe to newsletter |

### Admin Endpoints (Auth Required 🔒)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/projects` | Create property |
| `PUT` | `/api/projects/{id}` | Update property |
| `DELETE` | `/api/projects/{id}` | Delete property |
| `POST` | `/api/clients` | Add client testimonial |
| `GET` | `/api/contact` | View all contacts |
| `GET` | `/api/subscribe` | View all subscriptions |

### Authentication

Admin endpoints require **Basic Auth** header:

```bash
# Using cURL
curl -u admin:admin123 http://localhost:8080/api/contact

# Or with Authorization header
curl -H "Authorization: Basic YWRtaW46YWRtaW4xMjM=" http://localhost:8080/api/contact
```

## 📝 API Examples

### Get All Properties
```bash
curl http://localhost:8080/api/projects
```

### Create Property (Admin)
```bash
curl -X POST http://localhost:8080/api/projects \
  -u admin:admin123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxury Villa",
    "type": "Villa",
    "location": "Beverly Hills",
    "imageUrl": "https://example.com/villa.jpg"
  }'
```

### Submit Contact Form
```bash
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "city": "New York",
    "message": "Interested in properties"
  }'
```

### Subscribe to Newsletter
```bash
curl -X POST http://localhost:8080/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

## 🗄️ Data Models

### Project
```json
{
  "id": "auto-generated",
  "name": "Modern Apartments",
  "type": "Apartment",
  "location": "Manhattan, NY",
  "imageUrl": "https://...",
  "description": "Luxurious apartments..."
}
```

### Contact
```json
{
  "id": "auto-generated",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "city": "New York",
  "message": "..."
}
```

### Client
```json
{
  "id": "auto-generated",
  "name": "Jane Smith",
  "image": "https://...",
  "description": "Great service!",
  "designation": "CEO, Tech Corp"
}
```

### Subscription
```json
{
  "id": "auto-generated",
  "email": "user@example.com"
}
```

## 📂 Project Structure

```
Flipr_project_22bq1a1249/
├── src/main/java/com/project/demo_real_estate/
│   ├── controller/     # REST API endpoints
│   ├── model/          # Data models
│   ├── repository/     # MongoDB repositories
│   └── service/        # Business logic
├── src/main/resources/
│   └── application.properties  # Configuration (YOU NEED TO CREATE THIS)
├── frontend/           # React application
└── pom.xml            # Maven dependencies
```

## ⚙️ Configuration Notes

### Required: `application.properties`

This file **does not exist** in the repository. You must create it at:
```
src/main/resources/application.properties
```

**Minimum required content:**
```properties
spring.data.mongodb.uri=mongodb://localhost:27017/real_estate_db
admin.username=admin
admin.password=admin123
server.port=8080
```

### MongoDB Setup

**Option 1: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB: `mongod`
3. Use URI: `mongodb://localhost:27017/real_estate_db`

**Option 2: MongoDB Atlas (Free Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Use URI: `mongodb+srv://user:pass@cluster.mongodb.net/real_estate_db`

## 🔒 Security

- Admin credentials are in `application.properties`
- Basic Authentication is used (username:password)
- CORS enabled for `http://localhost:3000`

**For production:**
- Use environment variables for credentials
- Enable HTTPS
- Use JWT tokens instead of Basic Auth

## 📞 Support

**Author:** Vamsi1807  
**GitHub:** [@Vamsi1807](https://github.com/Vamsi1807)  
**Project:** Flipr Internship Assignment (22bq1a1249)

---

**Happy Coding! 🏡**

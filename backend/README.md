# Gurukul Website Backend

Spring Boot backend API for the Gurukul website.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup

1. Create MySQL database:

```sql
CREATE DATABASE mydb;
```

2. Update `application.properties` with your MySQL credentials:

```
spring.datasource.username=root
spring.datasource.password=your_password
```

3. Build and run:

```bash
mvn clean install
mvn spring-boot:run
```

The server will start on `https://gurukulschools.org/api`

## API Endpoints

### Public APIs (No Authentication)

- `GET /api/public/data` - Get all website data
- `GET /api/public/unit/{unitId}` - Get specific unit data
- `POST /api/public/admission-inquiry` - Submit admission inquiry

### Admin APIs (JWT Authentication Required)

- `POST /api/auth/login` - Admin login
- `GET /api/admin/data` - Get all data for admin
- `POST /api/admin/media/upload` - Upload image/file
- Various CRUD endpoints for managing website content

## Default Admin Credentials

- Username: `gurukul_admin@gmail.com`
- Password: `Gurukul@123`

## Database

The application uses JPA/Hibernate with auto-update. On first run, tables will be created automatically.

## File Uploads

Uploaded files are stored in the `uploads/` directory and served from `/uploads/**` endpoint.

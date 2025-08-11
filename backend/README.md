# ScorpionChess Backend API

A complete Node.js/Express backend API for the ScorpionChess application with PostgreSQL database, JWT authentication, and comprehensive chess platform features.

## 🚀 Features

- **Authentication System**: JWT-based authentication with email verification
- **User Management**: Complete user profiles and account management
- **Course System**: Chess courses with enrollment tracking
- **Tournament Management**: Tournament creation, registration, and management
- **Coach Profiles**: Coach profiles with specialties and ratings
- **Email Integration**: Password reset and verification emails
- **Security**: Rate limiting, input validation, and secure password hashing
- **Database**: PostgreSQL with automatic table initialization

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=scorpionchess
   DB_USER=postgres
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d

   # Email Configuration (for password reset)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Set up PostgreSQL database:**
   ```sql
   CREATE DATABASE scorpionchess;
   ```

5. **Start the server:**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## 📊 Database Schema

The application automatically creates the following tables:

- **users**: User accounts and authentication
- **courses**: Chess courses with instructor relationships
- **tournaments**: Tournament information and management
- **coaches**: Coach profiles and specialties
- **user_courses**: Course enrollment tracking
- **tournament_participants**: Tournament registration
- **sessions**: User session management

## 🔐 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password with token | Public |
| POST | `/api/auth/verify-email` | Verify email with token | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/logout` | Logout user | Private |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update user profile | Private |
| PUT | `/api/users/change-password` | Change password | Private |
| GET | `/api/users/enrollments` | Get user course enrollments | Private |
| GET | `/api/users/tournaments` | Get user tournament participations | Private |
| DELETE | `/api/users/account` | Delete user account | Private |

### Courses

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/courses` | Get all courses | Public |
| GET | `/api/courses/:id` | Get course by ID | Public |
| POST | `/api/courses` | Create new course | Private (Admin/Instructor) |
| PUT | `/api/courses/:id` | Update course | Private (Admin/Instructor) |
| POST | `/api/courses/:id/enroll` | Enroll in course | Private |
| DELETE | `/api/courses/:id` | Delete course | Private (Admin/Instructor) |

### Tournaments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/tournaments` | Get all tournaments | Public |
| GET | `/api/tournaments/:id` | Get tournament by ID | Public |
| POST | `/api/tournaments` | Create new tournament | Private (Admin) |
| PUT | `/api/tournaments/:id` | Update tournament | Private (Admin) |
| POST | `/api/tournaments/:id/register` | Register for tournament | Private |
| DELETE | `/api/tournaments/:id` | Delete tournament | Private (Admin) |

### Coaches

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/coaches` | Get all coaches | Public |
| GET | `/api/coaches/:id` | Get coach by ID | Public |
| GET | `/api/coaches/my-profile` | Get current user's coach profile | Private |
| POST | `/api/coaches` | Create coach profile | Private |
| PUT | `/api/coaches/:id` | Update coach profile | Private |
| DELETE | `/api/coaches/:id` | Delete coach profile | Private |

## 🔧 Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a course (requires authentication)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Chess Fundamentals",
    "description": "Learn the basics of chess",
    "difficultyLevel": "beginner",
    "durationHours": 10,
    "price": 49.99
  }'
```

### Get all courses
```bash
curl -X GET http://localhost:5000/api/courses
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Express-validator for all inputs
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers middleware
- **Email Verification**: Required for full account access

## 📧 Email Configuration

For password reset and verification emails, configure your email settings in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in EMAIL_PASS

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_NAME | Database name | scorpionchess |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRES_IN | JWT expiration time | 7d |
| EMAIL_HOST | SMTP host | - |
| EMAIL_PORT | SMTP port | 587 |
| EMAIL_USER | SMTP username | - |
| EMAIL_PASS | SMTP password | - |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:5173 |

## 🚀 Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production database credentials
3. Set up proper JWT secret
4. Configure email settings
5. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name scorpionchess-api
   ```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, please open an issue in the repository or contact the development team. 
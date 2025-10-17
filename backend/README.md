# EmpowerLearn Stories - Backend API

Backend API for the EmpowerLearn Stories platform built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **Products Marketplace** - CRUD operations for local products
- **Job Board** - Job listings and applications
- **Investor Connect** - Investment opportunities and funding requests
- **Community Stories** - User-generated success stories with moderation
- **Story Packs** - Interactive learning content
- **Messaging System** - Real-time messaging between users
- **Progress Tracking** - Badges, levels, and achievements
- **RESTful API** - Well-structured REST endpoints
- **Error Handling** - Centralized error handling
- **Validation** - Input validation with express-validator
- **Security** - Helmet.js, CORS, and secure headers

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the variables with your configuration

   ```env
   NODE_ENV=development
   PORT=5000
   
   # MongoDB (choose one)
   MONGODB_URI=mongodb://localhost:27017/empowerlearn
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/empowerlearn
   
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   
   CLIENT_URL=http://localhost:5173
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/             # Route controllers
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── jobController.ts
│   │   ├── investorRequestController.ts
│   │   ├── communityStoryController.ts
│   │   ├── storyPackController.ts
│   │   ├── messageController.ts
│   │   └── progressController.ts
│   ├── middleware/
│   │   ├── auth.ts              # Authentication middleware
│   │   └── errorHandler.ts     # Error handling
│   ├── models/                  # Mongoose models
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Job.ts
│   │   ├── JobApplication.ts
│   │   ├── InvestorRequest.ts
│   │   ├── CommunityStory.ts
│   │   ├── StoryPack.ts
│   │   ├── Story.ts
│   │   ├── Message.ts
│   │   ├── MessageThread.ts
│   │   ├── Badge.ts
│   │   └── UserProgress.ts
│   ├── routes/                  # API routes
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   ├── job.routes.ts
│   │   ├── investorRequest.routes.ts
│   │   ├── communityStory.routes.ts
│   │   ├── story.routes.ts
│   │   ├── message.routes.ts
│   │   └── progress.routes.ts
│   ├── utils/
│   │   ├── generateToken.ts     # JWT token generation
│   │   └── validators.ts        # Input validation rules
│   └── server.ts                # Express app entry point
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)
- `GET /api/products/user/my-products` - Get user's products (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Protected)
- `PUT /api/jobs/:id` - Update job (Protected)
- `DELETE /api/jobs/:id` - Delete job (Protected)
- `POST /api/jobs/:jobId/apply` - Apply for job (Protected)
- `GET /api/jobs/:jobId/applications` - Get job applications (Protected)
- `GET /api/jobs/applications/my-applications` - Get user's applications (Protected)

### Investor Requests
- `GET /api/investor-requests` - Get all requests
- `GET /api/investor-requests/:id` - Get single request
- `POST /api/investor-requests` - Create request (Protected)
- `PUT /api/investor-requests/:id` - Update request (Protected)
- `DELETE /api/investor-requests/:id` - Delete request (Protected)
- `POST /api/investor-requests/:id/bookmark` - Toggle bookmark (Protected)
- `GET /api/investor-requests/user/bookmarks` - Get bookmarked requests (Protected)

### Community Stories
- `GET /api/community-stories` - Get all stories
- `GET /api/community-stories/:id` - Get single story
- `POST /api/community-stories` - Create story (Protected)
- `PUT /api/community-stories/:id` - Update story (Protected)
- `DELETE /api/community-stories/:id` - Delete story (Protected)
- `PUT /api/community-stories/:id/moderate` - Moderate story (Admin)

### Story Packs & Stories
- `GET /api/stories/packs` - Get all story packs
- `GET /api/stories/packs/:id` - Get single pack with stories
- `GET /api/stories/:id` - Get single story
- `POST /api/stories/:id/complete` - Complete story (Protected)
- `POST /api/stories/packs` - Create story pack (Admin)
- `POST /api/stories` - Create story (Admin)

### Messages
- `GET /api/messages/threads` - Get user's threads (Protected)
- `POST /api/messages/threads` - Get or create thread (Protected)
- `GET /api/messages/threads/:threadId` - Get thread messages (Protected)
- `POST /api/messages` - Send message (Protected)
- `PUT /api/messages/threads/:threadId/read` - Mark as read (Protected)

### Progress & Badges
- `GET /api/progress` - Get user progress (Protected)
- `POST /api/progress/badges/:badgeId` - Award badge (Protected)
- `GET /api/progress/badges` - Get all badges
- `POST /api/progress/badges` - Create badge (Admin)
- `GET /api/progress/leaderboard` - Get leaderboard

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. **Register or Login** to get a token
2. **Include the token** in the Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10  // for list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🧪 Testing

Test the API using tools like:
- Postman
- Thunder Client (VS Code extension)
- cURL
- Your frontend application

Health check endpoint:
```bash
curl http://localhost:5000/health
```

## 🚀 Deployment

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Deploy to Production
- **Heroku**, **Railway**, **Render**, or **DigitalOcean**
- Set environment variables
- Update `CLIENT_URL` for CORS

## 📝 Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC

## 👥 Authors

EmpowerLearn Team

---

**Built with ❤️ for empowering communities through education and collaboration**

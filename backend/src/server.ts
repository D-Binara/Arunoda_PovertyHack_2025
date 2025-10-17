import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import connectDB from './config/database';
import { errorHandler, notFound } from './middleware/errorHandler';

// Load env vars
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import jobRoutes from './routes/job.routes';
import investorRequestRoutes from './routes/investorRequest.routes';
import communityStoryRoutes from './routes/communityStory.routes';
import storyRoutes from './routes/story.routes';
import messageRoutes from './routes/message.routes';
import progressRoutes from './routes/progress.routes';

// Initialize express app
const app: Application = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:8081',
  ],
  credentials: true,
}));
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'EmpowerLearn API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/investor-requests', investorRequestRoutes);
app.use('/api/community-stories', communityStoryRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/progress', progressRoutes);

// Welcome route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to EmpowerLearn Stories API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      products: '/api/products',
      jobs: '/api/jobs',
      investorRequests: '/api/investor-requests',
      communityStories: '/api/community-stories',
      stories: '/api/stories',
      messages: '/api/messages',
      progress: '/api/progress',
    },
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║   🚀 EmpowerLearn API Server Running          ║
  ║                                               ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                        ║
  ║   Port: ${PORT}                                    ║
  ║   URL: http://localhost:${PORT}                    ║
  ║                                               ║
  ║   Health Check: http://localhost:${PORT}/health   ║
  ╚═══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

export default app;

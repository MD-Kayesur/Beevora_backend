import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import httpStatus from 'http-status';
import globalErrorHandler from './middlewares/error.middleware';
import routes from './routes';
import mongoose from 'mongoose';
import config from './config/env';

const app: Application = express();

// Connect to MongoDB (needed for serverless environments like Vercel)
mongoose.connect(config.database_url as string)
  .then(() => console.log('📦 Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));


// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://beevora-frontend.vercel.app'
];

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));

// Test route
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to Beevora API 🎯',
    version: '1.0.0',
  });
});

// App routes
app.use('/api/v1', routes);

// Global Errorm Handler
app.use(globalErrorHandler);

// Handle Not Found
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found 🛑',
    path: req.originalUrl,
  });
});

export default app;

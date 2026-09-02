import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import researchRoutes from './routes/researchRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Connect DB (also initializes GridFS bucket)
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://duhitha-dental-care-frontend-bvjn.vercel.app',
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
];

// Also allow any Vercel preview/deployment URL for this project
const vercelPattern = /^https:\/\/[\w-]+\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (vercelPattern.test(origin)) return callback(null, true);
      // Return false instead of Error to avoid 500 on preflight
      callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many login attempts. Please try again in 15 minutes.' },
});

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 12,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many booking requests. Please try again later or call the clinic.' },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 600,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.use('/api', apiLimiter);
app.use('/api/auth/login', loginLimiter);

// Serve legacy uploads from disk (fallback for files uploaded before GridFS migration).
// On Render these will be gone after redeploy, but locally they still work.
// All NEW uploads go to GridFS via /api/files — no disk writes happen anymore.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', (req, res, next) => (req.method === 'POST' ? bookingLimiter(req, res, next) : next()), appointmentRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/files', fileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Duhita Dental API is running smoothly' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

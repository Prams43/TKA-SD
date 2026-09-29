import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Konfigurasi CORS
app.use(
  cors({
    origin: [env.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

// Middleware parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint cek kesehatan server
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend API TKA SD siap melayani request.',
    timestamp: new Date().toISOString(),
  });
});

// Pendaftaran route autentikasi
app.use('/api', authRoutes);

// Middleware penanganan 404
app.use(notFoundHandler);

// Middleware penanganan error terpusat
app.use(errorHandler);

export default app;

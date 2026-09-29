import dotenv from 'dotenv';

// Muat variabel lingkungan dari file .env
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  cfAccountId: process.env.CF_ACCOUNT_ID || '',
  cfDatabaseId: process.env.CF_DATABASE_ID || '',
  cfApiToken: process.env.CF_API_TOKEN || '',
  jwtSecret: process.env.JWT_SECRET || 'kunci_rahasia_default_tka_sd',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

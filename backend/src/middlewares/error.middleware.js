/**
 * Middleware untuk menangani route yang tidak ditemukan (404)
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route tidak ditemukan: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Middleware penanganan error terpusat
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server.';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

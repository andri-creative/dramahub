/**
 * Error Middleware
 * Centralized error handling for the application
 */

/**
 * Global Error Handler
 * Catches and logs all unhandled errors
 */
export function errorHandler(err, req, res, next) {
  console.error('❌ Server Error:', err);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
}

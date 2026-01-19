/**
 * Not Found Middleware
 * Handles 404 errors for undefined routes
 */

/**
 * 404 Handler
 * Returns available endpoints when route not found
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      'GET /api/home',
      'GET /api/drama/:id',
      'GET /api/search?q=query',
      'GET /api/drama/:id/episode/:episode',
      'GET /api/tabs/:tabId',
    ],
  });
}

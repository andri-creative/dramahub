/**
 * Server Configuration
 * Centralized configuration for server settings
 */

export const config = {
  port: parseInt(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  
  // API Information
  api: {
    name: 'DramaDash API Backend',
    version: '1.0.0',
    description: 'REST API wrapper for DramaDash application',
  },
  
  // Available endpoints for documentation
  endpoints: {
    home: 'GET /api/home',
    drama: 'GET /api/drama/:id',
    search: 'GET /api/search?q=:query',
    episode: 'GET /api/drama/:id/episode/:episode',
    tabs: 'GET /api/tabs/:tabId',
  },
};

/**
 * Index Routes
 * Root endpoint for API information
 */

import express from 'express';
import { config } from '../config/server.config.js';

const router = express.Router();

/**
 * GET / - API Information
 */
router.get('/', (req, res) => {
  res.json({
    name: config.api.name,
    version: config.api.version,
    description: config.api.description,
    endpoints: config.endpoints,
  });
});

export default router;

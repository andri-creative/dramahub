/**
 * Drama Routes
 * All drama-related API endpoints
 */

import express from 'express';
import * as dramaController from '../controllers/drama.controller.js';

const router = express.Router();

/**
 * GET /api/home - Get home page data
 */
router.get('/home', dramaController.getHome);

/**
 * GET /api/drama/:id - Get drama details by ID
 */
router.get('/drama/:id', dramaController.getDramaById);

/**
 * GET /api/search?q=query - Search dramas
 */
router.get('/search', dramaController.searchDrama);

/**
 * GET /api/drama/:id/episode/:episode - Get specific episode
 */
router.get('/drama/:id/episode/:episode', dramaController.getEpisode);

/**
 * GET /api/tabs/:tabId - Get tab-specific data
 */
router.get('/tabs/:tabId', dramaController.getTabs);

export default router;

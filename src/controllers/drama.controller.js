/**
 * Drama Controller
 * Handles all drama-related request handlers and business logic
 */

import { getDramaService } from '../services/drama.service.js';

/**
 * Get home page data
 * GET /api/home
 */
export async function getHome(req, res) {
  try {
    const dd = getDramaService();
    const data = await dd.getHome();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch home data',
      message: error.message,
    });
  }
}

/**
 * Get drama details by ID
 * GET /api/drama/:id
 */
export async function getDramaById(req, res) {
  const dramaId = parseInt(req.params.id);
  
  try {
    if (isNaN(dramaId)) {
      return res.status(400).json({
        error: 'Invalid drama ID',
        message: 'Drama ID must be a number',
      });
    }
    
    const dd = getDramaService();
    const data = await dd.getDrama(dramaId);
    res.json(data);
  } catch (error) {
    const statusCode = error.response?.status || error.statusCode || 500;
    const errorType = statusCode === 404 
      ? 'Drama not found' 
      : 'Failed to fetch drama details';
    
    res.status(statusCode).json({
      error: errorType,
      message: error.response?.data?.message || error.message,
      dramaId: dramaId,
    });
  }
}

/**
 * Search dramas
 * GET /api/search?q=query
 */
export async function searchDrama(req, res) {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({
        error: 'Missing query parameter',
        message: 'Please provide a search query using ?q=yourquery',
      });
    }
    
    const dd = getDramaService();
    const data = await dd.searchDrama(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to search dramas',
      message: error.message,
    });
  }
}

/**
 * Get specific episode
 * GET /api/drama/:id/episode/:episode
 */
export async function getEpisode(req, res) {
  const dramaId = parseInt(req.params.id);
  const episodeNum = parseInt(req.params.episode);

  try {
    if (isNaN(dramaId) || isNaN(episodeNum)) {
      return res.status(400).json({
        error: 'Invalid parameters',
        message: 'Drama ID and episode number must be numbers',
      });
    }

    const dd = getDramaService();
    const data = await dd.getEpisode(dramaId, episodeNum);
    res.json(data);
  } catch (error) {
    const statusCode = error.response?.status || error.statusCode || 500;
    const errorType = statusCode === 404
      ? 'Episode or drama not found'
      : 'Failed to fetch episode data';
    
    res.status(statusCode).json({
      error: errorType,
      message: error.response?.data?.message || error.message,
      dramaId: dramaId,
      episode: episodeNum,
    });
  }
}

/**
 * Get tab-specific data
 * GET /api/tabs/:tabId
 */
export async function getTabs(req, res) {
  try {
    const tabId = parseInt(req.params.tabId);
    
    if (isNaN(tabId)) {
      return res.status(400).json({
        error: 'Invalid tab ID',
        message: 'Tab ID must be a number',
      });
    }
    
    const dd = getDramaService();
    const data = await dd.getTabs(tabId);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch tab data',
      message: error.message,
    });
  }
}

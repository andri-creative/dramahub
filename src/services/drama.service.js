/**
 * Drama Service
 * Handles DramaDash instance initialization and management
 * Uses singleton pattern to ensure only one instance exists
 */

import DramaDash from '../../api/DramaDash.js';

let ddInstance = null;

/**
 * Initialize DramaDash service
 * @returns {Promise<DramaDash>} Initialized DramaDash instance
 */
export async function initDramaService() {
  if (ddInstance) {
    console.log('⚠️  DramaDash already initialized, returning existing instance');
    return ddInstance;
  }

  try {
    console.log('🔄 Initializing DramaDash API...');
    ddInstance = await new DramaDash().init();
    console.log('✅ DramaDash API initialized successfully!');
    return ddInstance;
  } catch (error) {
    console.error('❌ Failed to initialize DramaDash:', error.message);
    throw error;
  }
}

/**
 * Get DramaDash instance
 * @returns {DramaDash} DramaDash instance
 * @throws {Error} If service not initialized
 */
export function getDramaService() {
  if (!ddInstance) {
    throw new Error('DramaDash service not initialized. Call initDramaService() first.');
  }
  return ddInstance;
}

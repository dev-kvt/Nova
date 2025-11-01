/**
 * Setup Command
 * Interactive setup wizard for Nova configuration
 */

import { colors } from '../../utils/colors.js';
import { ensureDir } from '../../utils/file-system.js';
import logger from '../../utils/logger.js';
import { resolve } from 'path';

export const setupCommand = async () => {
  try {
    console.log(colors.title('\n🚀 Welcome to Nova!\n'));
    console.log("Let's configure your environment.\n");

    // For now, just create config structure
    console.log(colors.info('Setting up configuration...\n'));

    // Create global config directory if needed
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    const globalConfigDir = resolve(homeDir, '.nova');
    await ensureDir(globalConfigDir);

    console.log(colors.success('✓') + ' Configuration directories created');

    console.log('\n' + colors.info('Manual Setup:'));
    console.log('1. Copy .nova.config.json.example to .nova.config.json');
    console.log('2. Add your OPENAI_API_KEY to .env file');
    console.log('3. Or configure OLLAMA_BASE_URL for offline mode\n');

    console.log(colors.success('✓') + ' Setup completed!\n');
  } catch (error) {
    logger.error(`Setup command failed: ${error.message}`);
    console.error(colors.error('✗ Error:') + ' ' + error.message);
    process.exit(1);
  }
};

export default setupCommand;

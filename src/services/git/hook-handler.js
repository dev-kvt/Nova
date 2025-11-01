/**
 * Git Hook Handler
 * Handles prepare-commit-msg git hook
 */

import { readFileSync, writeFileSync } from 'fs';
import { improveCommand } from '../../cli/commands/improve.js';
import logger from '../../utils/logger.js';

export class HookHandler {
  /**
   * Process prepare-commit-msg hook
   */
  static async processCommitMsg(commitMsgPath, _source, _sha) {
    try {
      // Read current commit message
      const originalMessage = readFileSync(commitMsgPath, 'utf8').trim();

      // Don't process if already in good format
      if (
        originalMessage.match(
          /^(feat|fix|docs|style|refactor|test|chore|perf|build|ci):/i
        )
      ) {
        logger.debug('Message already in conventional format, skipping');
        return originalMessage;
      }

      // Don't process if user explicitly skips
      if (originalMessage.includes('[skip-nova]')) {
        logger.debug('Skip flag detected, not processing');
        return originalMessage.replace(/\[skip-nova\]\s*/g, '');
      }

      // Enhance message
      logger.info('Enhancing commit message with Nova...');
      const enhanced = await improveCommand(originalMessage, { silent: true });

      // Write back to file
      writeFileSync(commitMsgPath, enhanced, 'utf8');
      logger.info(`Enhanced commit message: ${enhanced}`);

      return enhanced;
    } catch (error) {
      logger.error(`Hook processing failed: ${error.message}`);
      // Don't fail the commit, just return original
      return readFileSync(commitMsgPath, 'utf8');
    }
  }

  /**
   * Install git hook
   */
  static async installHook(hookPath, hookName = 'prepare-commit-msg') {
    try {
      const hookContent = `#!/bin/sh
# Nova Git Hook
node "${process.argv[1]}" hook-pre-commit "$1" "$2" "$3"
`;
      writeFileSync(hookPath, hookContent, 'utf8');
      // Make executable
      require('fs').chmodSync(hookPath, '755');
      logger.info(`Installed ${hookName} hook`);
      return true;
    } catch (error) {
      logger.error(`Failed to install hook: ${error.message}`);
      return false;
    }
  }

  /**
   * Remove git hook
   */
  static async removeHook(hookPath) {
    try {
      require('fs').unlinkSync(hookPath);
      logger.info('Removed git hook');
      return true;
    } catch (error) {
      logger.error(`Failed to remove hook: ${error.message}`);
      return false;
    }
  }
}

export default HookHandler;

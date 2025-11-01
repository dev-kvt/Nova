/**
 * Improve Command
 * Command handler for message improvement
 */

import { AIClient } from '../../ai/index.js';
import { loadConfig } from '../../config/index.js';
import {
  classifyMessage,
  sanitizeMessage,
} from '../../core/message-processor.js';
import { formatConventional } from '../../core/formatter.js';
import { validateConventional, scoreMessage } from '../../core/validator.js';
import { colors } from '../../utils/colors.js';
import { AIProviderError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';

export const improveCommand = async (message, options = {}) => {
  try {
    // Load configuration
    const config = await loadConfig(options.projectRoot);

    // Apply options override
    if (options.provider) {
      config.ai.provider = options.provider;
    }

    // Sanitize input
    const sanitized = sanitizeMessage(message);
    const original = sanitized;

    // Check if already in conventional format
    const validation = validateConventional(sanitized);

    if (validation.isValid && !options.force) {
      logger.info('Message already follows Conventional Commits format');
      console.log(
        colors.success('✓') + ' Message is already well-formatted:\n'
      );
      console.log(colors.highlight(sanitized));
      return sanitized;
    }

    // Display original message
    console.log(colors.info('Original:') + ' ' + original + '\n');

    // Try to enhance with AI
    try {
      const aiClient = new AIClient(config.ai);
      const enhanced = await aiClient.enhance(original);

      // Score the enhanced message
      const score = scoreMessage(enhanced);

      // Display enhanced message
      console.log(colors.success('✓') + ' Enhanced message:\n');
      console.log(colors.highlight(enhanced));

      if (score.feedback.length > 0) {
        console.log(
          '\n' + colors.info('Quality:') + ' ' + score.score + '/100'
        );
        score.feedback.forEach((f) =>
          console.log(
            '  ' +
              (f.startsWith('✓') ? colors.success('') : colors.warning('')) +
              f
          )
        );
      }

      return enhanced;
    } catch (error) {
      if (error instanceof AIProviderError) {
        logger.warn('AI enhancement failed, using fallback');

        // Fallback: classify and format manually
        const type = classifyMessage(original);
        const description = original
          .replace(/^[a-zA-Z]+(\(.+\))?:\s*/, '')
          .trim();
        const formatted = formatConventional(
          type,
          null,
          description || 'update'
        );

        console.log(
          colors.warning('⚠') + ' AI unavailable, formatted using fallback:\n'
        );
        console.log(colors.highlight(formatted));

        return formatted;
      }
      throw error;
    }
  } catch (error) {
    logger.error(`Improve command failed: ${error.message}`);
    console.error(colors.error('✗ Error:') + ' ' + error.message);
    process.exit(1);
  }
};

export default improveCommand;

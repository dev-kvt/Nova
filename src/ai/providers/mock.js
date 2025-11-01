/**
 * Mock AI Provider
 * Testing provider that returns predictable responses
 */

import { BaseAIProvider } from '../base-provider.js';
import logger from '../../utils/logger.js';

export class MockProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'mock';
    this.delay = config.delay || 10; // Simulate network delay
  }

  async enhance(message) {
    logger.debug('Mock provider enhancing message');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, this.delay));

    // Simple enhancement logic for testing
    const type = this.inferType(message);
    const enhanced = `${type}: ${this.formatDescription(message)}`;

    logger.debug(`Mock enhanced: ${enhanced}`);
    return enhanced;
  }

  async isAvailable() {
    return true;
  }

  /**
   * Infer type from message
   */
  inferType(message) {
    const lower = message.toLowerCase();
    if (lower.includes('fix') || lower.includes('bug')) return 'fix';
    if (
      lower.includes('add') ||
      lower.includes('new') ||
      lower.includes('feat')
    )
      return 'feat';
    if (lower.includes('doc')) return 'docs';
    if (lower.includes('refactor')) return 'refactor';
    if (lower.includes('test')) return 'test';
    return 'chore';
  }

  /**
   * Format description
   */
  formatDescription(message) {
    return message
      .replace(/^(add|fix|update|change|remove)\b/gi, '')
      .trim()
      .replace(/^./, (match) => match.toLowerCase());
  }
}

export default MockProvider;

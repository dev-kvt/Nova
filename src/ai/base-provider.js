/**
 * Base AI Provider
 * Abstract base class for AI providers
 */

import { AIProviderError } from '../utils/errors.js';

export class BaseAIProvider {
  constructor(config = {}) {
    this.config = config;
    this.name = 'base';
  }

  /**
   * Enhance a commit message using AI
   * Must be implemented by subclasses
   */
  async enhance(_message) {
    throw new AIProviderError('enhance method must be implemented', this.name);
  }

  /**
   * Check if provider is available
   * Must be implemented by subclasses
   */
  async isAvailable() {
    throw new AIProviderError(
      'isAvailable method must be implemented',
      this.name
    );
  }

  /**
   * Build prompt for enhancing commit message
   */
  buildPrompt(message) {
    return `Improve the following Git commit message to follow the Conventional Commits specification:

Original: "${message}"

Requirements:
- Use the format: type(scope): description
- Types: feat, fix, docs, style, refactor, test, chore, perf, etc.
- Keep it concise and clear
- Use imperative mood ("fix bug" not "fixed bug")
- Focus on what and why, not how

Enhanced message:`;
  }

  /**
   * Parse AI response to extract enhanced message
   */
  parseResponse(response) {
    // Try to extract message from various response formats
    const trimmed = response.trim();

    // Remove quotes if present
    let message = trimmed;
    if (
      (message.startsWith('"') && message.endsWith('"')) ||
      (message.startsWith("'") && message.endsWith("'"))
    ) {
      message = message.slice(1, -1);
    }

    // Extract first line
    message = message.split('\n')[0].trim();

    return message;
  }

  /**
   * Retry logic wrapper
   */
  async withRetry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
      }
    }

    throw lastError;
  }
}

export default BaseAIProvider;

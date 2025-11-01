/**
 * Message Processor
 * Core logic for processing and normalizing commit messages
 */

import {
  normalizeWhitespace,
  extractCommitType,
  extractScope,
} from '../utils/text.js';
import { ValidationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

/**
 * Process and normalize a commit message
 */
export const processMessage = (message) => {
  if (!message || typeof message !== 'string') {
    throw new ValidationError('Message must be a non-empty string');
  }

  // Normalize whitespace
  const normalized = normalizeWhitespace(message);

  // Extract message components
  const type = extractCommitType(normalized);
  const scope = extractScope(normalized);

  logger.debug(`Processing message: ${normalized}`);
  logger.debug(`Type: ${type}, Scope: ${scope}`);

  return {
    original: message,
    normalized,
    type,
    scope,
    isValid: !!type,
  };
};

/**
 * Classify message type (if not in conventional format)
 */
export const classifyMessage = (message) => {
  if (!message) return 'chore';

  const lower = message.toLowerCase();

  // Feature detection
  if (lower.match(/\b(add|new|create|implement|feature)\b/)) {
    return 'feat';
  }

  // Bug fix detection
  if (lower.match(/\b(fix|bug|error|issue|wrong|broken)\b/)) {
    return 'fix';
  }

  // Documentation
  if (lower.match(/\b(doc|readme|comment|explain)\b/)) {
    return 'docs';
  }

  // Refactoring
  if (lower.match(/\b(refactor|restructure|cleanup|organize)\b/)) {
    return 'refactor';
  }

  // Performance
  if (lower.match(/\b(perf|performance|speed|optimize|faster)\b/)) {
    return 'perf';
  }

  // Testing
  if (lower.match(/\b(test|spec|coverage)\b/)) {
    return 'test';
  }

  // Styling
  if (lower.match(/\b(style|format|indent|whitespace|lint)\b/)) {
    return 'style';
  }

  // Default to chore
  return 'chore';
};

/**
 * Sanitize message content
 */
export const sanitizeMessage = (message) => {
  if (!message) return '';

  // Remove control characters
  // eslint-disable-next-line no-control-regex
  let sanitized = message.replace(/[\x00-\x1F\x7F]/g, '');

  // Limit length
  const maxLength = 500;
  if (sanitized.length > maxLength) {
    logger.warn(
      `Message truncated from ${sanitized.length} to ${maxLength} characters`
    );
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized.trim();
};

export default { processMessage, classifyMessage, sanitizeMessage };

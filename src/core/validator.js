/**
 * Message Validator
 * Validates commit messages according to conventions
 */

import {
  extractCommitType,
  extractScope,
  extractDescription,
} from '../utils/text.js';
import { ValidationError } from '../utils/errors.js';
import { conventionalCommitTypes } from '../config/defaults.js';
import logger from '../utils/logger.js';

/**
 * Validate Conventional Commits format
 */
export const validateConventional = (message, options = {}) => {
  const { strictMode = false, minLength = 10, maxLength = 500 } = options;

  if (!message || typeof message !== 'string') {
    throw new ValidationError('Message must be a non-empty string');
  }

  const errors = [];
  const warnings = [];

  // Check length
  if (message.length < minLength) {
    errors.push(`Message too short (minimum ${minLength} characters)`);
  }

  if (message.length > maxLength) {
    errors.push(`Message too long (maximum ${maxLength} characters)`);
  }

  // Extract components
  const type = extractCommitType(message);
  const scope = extractScope(message);
  const description = extractDescription(message);

  // Validate type
  if (!type) {
    errors.push('Missing commit type');
  } else if (!conventionalCommitTypes.includes(type)) {
    const message = `Unknown commit type: ${type}`;
    if (strictMode) {
      errors.push(message);
    } else {
      warnings.push(message);
    }
  }

  // Validate scope (optional)
  if (scope && scope.length > 20) {
    warnings.push(`Scope too long: ${scope}`);
  }

  // Validate description
  if (!description || description.length < 3) {
    errors.push('Description too short');
  }

  if (description && description.endsWith('.')) {
    warnings.push('Description should not end with period');
  }

  const isValid = errors.length === 0;

  logger.debug(
    `Validation result: ${isValid ? 'valid' : 'invalid'} (${errors.length} errors, ${warnings.length} warnings)`
  );

  return {
    isValid,
    errors,
    warnings,
    type,
    scope,
    description,
  };
};

/**
 * Score message quality
 */
export const scoreMessage = (message) => {
  if (!message) return { score: 0, feedback: [] };

  const feedback = [];
  let score = 50; // Base score

  // Check if in conventional format
  const type = extractCommitType(message);
  if (type) {
    score += 30;
    feedback.push('✓ Follows Conventional Commits format');
  }

  // Check for detailed description
  const description = extractDescription(message);
  if (description && description.length > 30) {
    score += 10;
    feedback.push('✓ Detailed description');
  }

  // Check for scope
  const scope = extractScope(message);
  if (scope) {
    score += 10;
    feedback.push('✓ Includes scope');
  }

  // Penalties
  if (message.length < 15) {
    score -= 20;
    feedback.push('⚠ Too short');
  }

  if (message.length > 200) {
    score -= 10;
    feedback.push('⚠ Too long');
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    feedback,
  };
};

export default { validateConventional, scoreMessage };

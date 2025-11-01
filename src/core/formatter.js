/**
 * Message Formatter
 * Formats messages according to conventions
 */

import { wordWrap, capitalize } from '../utils/text.js';
import { FormatError } from '../utils/errors.js';
import logger from '../utils/logger.js';

/**
 * Format message according to Conventional Commits
 */
export const formatConventional = (type, scope, description, options = {}) => {
  if (!type || !description) {
    throw new FormatError(
      'Type and description are required for Conventional Commits'
    );
  }

  const { wrapLength = 72, capitalizeDescription = false } = options;

  // Format description
  let formattedDescription = description.trim();
  if (capitalizeDescription) {
    formattedDescription = capitalize(formattedDescription);
  }

  // Build header
  let header = type;
  if (scope) {
    header += `(${scope})`;
  }
  header += `: ${formattedDescription}`;

  // Wrap if needed
  if (wrapLength > 0) {
    header = wordWrap(header, wrapLength).split('\n')[0];
  }

  logger.debug(`Formatted conventional commit: ${header}`);
  return header;
};

/**
 * Format message for semantic versioning
 */
export const formatSemantic = (message, options = {}) => {
  const { wrapLength = 72 } = options;

  if (!message || typeof message !== 'string') {
    throw new FormatError('Message is required for semantic format');
  }

  const formatted = message.trim();

  // Wrap if needed
  if (wrapLength > 0) {
    return wordWrap(formatted, wrapLength);
  }

  return formatted;
};

/**
 * Format custom message pattern
 */
export const formatCustom = (message, pattern, options = {}) => {
  if (!message || !pattern) {
    throw new FormatError('Message and pattern are required for custom format');
  }

  const { wrapLength = 72 } = options;

  // Replace placeholders
  let formatted = pattern;

  // Basic placeholders
  formatted = formatted.replace(/{{message}}/g, message);
  formatted = formatted.replace(/{{type}}/g, options.type || '');
  formatted = formatted.replace(/{{scope}}/g, options.scope || '');

  // Wrap if needed
  if (wrapLength > 0) {
    formatted = wordWrap(formatted, wrapLength);
  }

  return formatted;
};

export default { formatConventional, formatSemantic, formatCustom };

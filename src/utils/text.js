/**
 * Text utility functions
 * String manipulation and formatting helpers
 */

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate string to specified length with ellipsis
 */
export const truncate = (str, maxLength = 50) => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
};

/**
 * Remove extra whitespace from string
 */
export const normalizeWhitespace = (str) => {
  if (!str) return str;
  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Word wrap text to specified line length
 */
export const wordWrap = (text, lineLength = 72) => {
  if (!text) return text;

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length <= lineLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines.join('\n');
};

/**
 * Extract commit type from Conventional Commits format
 */
export const extractCommitType = (message) => {
  if (!message) return null;

  const match = message.match(/^(\w+)(\(.+\))?:/);
  return match ? match[1] : null;
};

/**
 * Extract scope from Conventional Commits format
 */
export const extractScope = (message) => {
  if (!message) return null;

  const match = message.match(/^\w+\((.+?)\):/);
  return match ? match[1] : null;
};

/**
 * Extract description from Conventional Commits format
 */
export const extractDescription = (message) => {
  if (!message) return null;

  const match = message.match(/^(\w+(?:\(.+?\))?):\s*(.+)$/);
  return match ? match[2].split('\n')[0] : message;
};

/**
 * Slugify text for use in IDs or filenames
 */
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

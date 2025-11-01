/**
 * File system utility functions
 * Cross-platform file operations
 */

import { promises as fs } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Read JSON file
 */
export const readJSON = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read JSON file: ${filePath} - ${error.message}`);
  }
};

/**
 * Write JSON file
 */
export const writeJSON = async (filePath, data, pretty = true) => {
  try {
    const content = pretty
      ? JSON.stringify(data, null, 2)
      : JSON.stringify(data);
    await fs.writeFile(filePath, content, 'utf8');
  } catch (error) {
    throw new Error(
      `Failed to write JSON file: ${filePath} - ${error.message}`
    );
  }
};

/**
 * Check if file exists
 */
export const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Ensure directory exists
 */
export const ensureDir = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    throw new Error(
      `Failed to create directory: ${dirPath} - ${error.message}`
    );
  }
};

/**
 * Get project root directory
 */
export const getProjectRoot = () => {
  return resolve(__dirname, '../../../');
};

/**
 * Read environment file
 */
export const readEnvFile = async (filePath = '.env') => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const env = {};

    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    }

    return env;
  } catch (error) {
    return {};
  }
};

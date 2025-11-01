/**
 * Configuration loader
 * Loads and merges configuration from multiple sources
 */

import dotenv from 'dotenv';
import { resolve } from 'path';
import { readJSON, fileExists, readEnvFile } from '../utils/file-system.js';
import { defaultConfig } from './defaults.js';
import { ConfigError } from '../utils/errors.js';
import logger from '../utils/logger.js';

/**
 * Load environment variables from .env file
 */
const loadEnv = async () => {
  try {
    dotenv.config();
    const env = await readEnvFile();
    return {
      ...env,
      ...process.env, // Process env takes precedence
    };
  } catch (error) {
    logger.debug('No .env file found, using process environment');
    return process.env;
  }
};

/**
 * Load project configuration file
 */
const loadProjectConfig = async (projectRoot) => {
  const configPath = resolve(projectRoot, '.nova.config.json');

  if (await fileExists(configPath)) {
    try {
      const config = await readJSON(configPath);
      logger.debug('Loaded project configuration');
      return config;
    } catch (error) {
      throw new ConfigError(`Invalid .nova.config.json: ${error.message}`);
    }
  }

  return null;
};

/**
 * Load global configuration file
 */
const loadGlobalConfig = async () => {
  const homeDir = process.env.HOME || process.env.USERPROFILE;
  const configPath = resolve(homeDir, '.nova', 'config.json');

  if (await fileExists(configPath)) {
    try {
      const config = await readJSON(configPath);
      logger.debug('Loaded global configuration');
      return config;
    } catch (error) {
      logger.warn('Invalid global config, ignoring');
    }
  }

  return null;
};

/**
 * Map environment variables to config structure
 */
const mapEnvToConfig = (env) => {
  const config = {};

  if (env.NOVA_CONVENTION) config.convention = env.NOVA_CONVENTION;
  if (env.NOVA_AUTO_FORMAT !== undefined) {
    config.formatting = { autoFormat: env.NOVA_AUTO_FORMAT === 'true' };
  }

  if (env.NOVA_AI_PROVIDER) {
    config.ai = { provider: env.NOVA_AI_PROVIDER };
  }

  if (env.OPENAI_API_KEY) {
    config.ai = config.ai || {};
    config.ai.apiKey = env.OPENAI_API_KEY;
  }

  if (env.OLLAMA_BASE_URL) {
    config.ai = config.ai || {};
    config.ai.ollamaBaseUrl = env.OLLAMA_BASE_URL;
  }

  return config;
};

/**
 * Deep merge configuration objects
 */
const deepMerge = (target, source) => {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
};

/**
 * Load and merge configuration from all sources
 */
export const loadConfig = async (projectRoot = process.cwd()) => {
  try {
    logger.debug('Loading configuration...');

    // Load from all sources in priority order
    const env = await loadEnv();
    const globalConfig = await loadGlobalConfig();
    const projectConfig = await loadProjectConfig(projectRoot);
    const envConfig = mapEnvToConfig(env);

    // Merge in priority order (later sources override earlier ones)
    let config = { ...defaultConfig };
    config = deepMerge(config, envConfig);
    config = deepMerge(config, globalConfig || {});
    config = deepMerge(config, projectConfig || {});

    logger.debug('Configuration loaded successfully');
    return config;
  } catch (error) {
    logger.error(`Failed to load configuration: ${error.message}`);
    throw error;
  }
};

export default loadConfig;

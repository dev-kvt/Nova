/**
 * Config Command
 * Configuration management commands
 */

import { readJSON, writeJSON, fileExists } from '../../utils/file-system.js';
import { loadConfig } from '../../config/index.js';
import { colors } from '../../utils/colors.js';
import logger from '../../utils/logger.js';
import { resolve } from 'path';

export const configCommand = async (action, key, value) => {
  try {
    switch (action) {
      case 'show':
        await showConfig();
        break;
      case 'set':
        if (!key || !value) {
          console.error(colors.error('Usage: nova config set <key> <value>'));
          process.exit(1);
        }
        await setConfig(key, value);
        break;
      case 'get':
        if (!key) {
          console.error(colors.error('Usage: nova config get <key>'));
          process.exit(1);
        }
        await getConfig(key);
        break;
      default:
        console.log(colors.info('Config commands:'));
        console.log('  show - Display current configuration');
        console.log('  set <key> <value> - Set configuration value');
        console.log('  get <key> - Get configuration value');
    }
  } catch (error) {
    logger.error(`Config command failed: ${error.message}`);
    console.error(colors.error('✗ Error:') + ' ' + error.message);
    process.exit(1);
  }
};

async function showConfig() {
  const config = await loadConfig();
  console.log(colors.title('\nConfiguration:\n'));
  console.log(JSON.stringify(config, null, 2));
  console.log('');
}

async function setConfig(key, value) {
  const configPath = resolve(process.cwd(), '.nova.config.json');

  // Load existing config or create new
  let config = {};
  if (await fileExists(configPath)) {
    config = await readJSON(configPath);
  }

  // Set value (simple dot notation support)
  const keys = key.split('.');
  let target = config;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!target[keys[i]]) target[keys[i]] = {};
    target = target[keys[i]];
  }
  target[keys[keys.length - 1]] = value;

  // Write back
  await writeJSON(configPath, config);
  console.log(colors.success('✓') + ` Set ${key} = ${value}`);
}

async function getConfig(key) {
  const config = await loadConfig();
  const keys = key.split('.');
  let value = config;
  for (const k of keys) {
    value = value[k];
    if (value === undefined) {
      console.log(
        colors.warning('⚠') + ` Configuration key not found: ${key}`
      );
      return;
    }
  }
  console.log(value);
}

export default configCommand;

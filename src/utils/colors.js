/**
 * Terminal colors utility
 * Wrapper around Chalk for terminal styling
 */

import chalk from 'chalk';

export const colors = {
  // Status colors
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.blue,
  dim: chalk.dim,

  // UI colors
  title: chalk.bold.cyan,
  subtitle: chalk.bold.magenta,
  highlight: chalk.bold.yellow,

  // Message types
  feat: chalk.green.bold,
  fix: chalk.red.bold,
  docs: chalk.blue.bold,
  style: chalk.cyan.bold,
  refactor: chalk.magenta.bold,
  test: chalk.yellow.bold,
  chore: chalk.gray.bold,
  perf: chalk.bold,
};

export default colors;

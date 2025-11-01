#!/usr/bin/env node

/**
 * Nova CLI Entry Point
 * Main entry point for the Nova CLI tool
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';
import improveCommand from './commands/improve.js';
import setupCommand from './commands/setup.js';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const program = new Command();

program
  .name('nova')
  .description('AI-powered Git commit message enhancement')
  .version(packageJson.version);

program
  .command('improve <message>')
  .description('Improve a commit message using AI')
  .option('-p, --provider <provider>', 'AI provider (openai, ollama, both)')
  .option('-f, --force', 'Force enhancement even if message is valid')
  .action(async (message, options) => {
    await improveCommand(message, options);
  });

program
  .command('setup')
  .description('Configure Nova')
  .action(async (options) => {
    await setupCommand(options);
  });

program.parse();

#!/usr/bin/env node

/**
 * Nova CLI Entry Point
 * Main entry point for the Nova CLI tool
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const program = new Command();

program
  .name('nova')
  .description('AI-powered Git commit message enhancement')
  .version(packageJson.version);

// TODO: Add commands
program
  .command('improve <message>')
  .description('Improve a commit message using AI')
  .action((message) => {
    console.log('Improving message:', message);
    // TODO: Implement message improvement
  });

program
  .command('setup')
  .description('Configure Nova')
  .action(() => {
    console.log('Setup wizard coming soon!');
    // TODO: Implement setup wizard
  });

program.parse();

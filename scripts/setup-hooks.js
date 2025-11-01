#!/usr/bin/env node

/**
 * Setup Git Hooks
 * Install Nova hooks in current repository
 */

import { existsSync, mkdirSync, writeFileSync, chmodSync } from 'fs';
import { join } from 'path';
import { GitClient } from '../src/services/git/git-client.js';
import { colors } from '../src/utils/colors.js';

console.log(colors.title('\n🔧 Installing Nova Git Hooks...\n'));

try {
  // Check if in git repo
  if (!GitClient.isGitRepository()) {
    console.error(colors.error('✗ Error:') + ' Not in a Git repository');
    process.exit(1);
  }

  // Get git directory
  const gitDir = GitClient.exec('rev-parse --git-dir');
  const hooksDir = join(process.cwd(), gitDir, 'hooks');
  const hookPath = join(hooksDir, 'prepare-commit-msg');

  // Create hooks directory if it doesn't exist
  if (!existsSync(hooksDir)) {
    mkdirSync(hooksDir, { recursive: true });
  }

  // Get path to CLI entry point
  const cliPath = join(process.cwd(), 'src', 'cli', 'index.js');

  // Create hook
  const hookContent = `#!/bin/sh
# Nova prepare-commit-msg hook
node "${cliPath}" hook "$1" "$2" "$3"
`;

  writeFileSync(hookPath, hookContent, 'utf8');
  chmodSync(hookPath, '755');

  console.log(colors.success('✓') + ' Installed prepare-commit-msg hook');
  console.log(colors.info('  Location:') + ' ' + hookPath);
  console.log(colors.success('\n✅ Nova Git hooks installed successfully!\n'));

  console.log(colors.info('Next steps:'));
  console.log('  1. Create a .env file: cp env.example .env');
  console.log('  2. Add your OPENAI_API_KEY to .env');
  console.log('  3. Start committing with: git commit -m "your message"');
  console.log('');
} catch (error) {
  console.error(colors.error('✗ Error:') + ' ' + error.message);
  process.exit(1);
}

#!/usr/bin/env node

/**
 * Build script for Nova
 * Handles compilation, bundling, and artifact generation
 */

import { execSync } from 'child_process';

console.log('🔨 Building Nova...\n');

try {
  // Run linting
  console.log('Running linter...');
  execSync('npm run lint', { stdio: 'inherit' });

  // Run tests
  console.log('\nRunning tests...');
  execSync('npm test', { stdio: 'inherit' });

  // TODO: Add build steps as needed
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

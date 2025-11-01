/**
 * Git Client
 * Interface for Git operations
 */

import { execSync } from 'child_process';
import { GitError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';

export class GitClient {
  /**
   * Execute git command
   */
  static exec(command, options = {}) {
    try {
      const result = execSync(`git ${command}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
        ...options,
      });
      return result.trim();
    } catch (error) {
      logger.debug(`Git command failed: git ${command}`);
      throw new GitError(`Git command failed: ${error.message}`);
    }
  }

  /**
   * Check if in a git repository
   */
  static isGitRepository(cwd = process.cwd()) {
    try {
      this.exec('rev-parse --git-dir', { cwd });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get repository root
   */
  static getRepositoryRoot() {
    try {
      return this.exec('rev-parse --show-toplevel');
    } catch {
      return null;
    }
  }

  /**
   * Check if file is tracked by git
   */
  static isFileTracked(filePath) {
    try {
      this.exec(`ls-files --error-unmatch ${filePath}`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get staged files diff
   */
  static getStagedDiff() {
    try {
      return this.exec('diff --cached --name-only');
    } catch {
      return '';
    }
  }

  /**
   * Read git config
   */
  static getConfig(key) {
    try {
      return this.exec(`config --get ${key}`);
    } catch {
      return null;
    }
  }
}

export default GitClient;

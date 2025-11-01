// Test setup file
import { jest } from '@jest/globals';

// Set test timeout
jest.setTimeout(10000);

// Global test configuration
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

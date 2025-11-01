export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.spec.js', '!src/**/index.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
};

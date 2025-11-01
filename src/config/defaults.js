/**
 * Default configuration values for Nova
 */

export const defaultConfig = {
  version: '1.0.0',
  convention: 'conventional',

  ai: {
    provider: 'openai',
    fallback: true,
    model: 'gpt-4-turbo-preview',
  },

  formatting: {
    autoFormat: true,
    wrapLength: 72,
  },

  validation: {
    strictMode: false,
    minLength: 10,
    maxLength: 500,
  },

  cache: {
    enabled: true,
    ttl: 3600, // 1 hour
  },

  timeout: 2000, // 2 seconds
  retry: {
    attempts: 3,
    delay: 1000,
  },

  output: {
    colored: true,
    verbose: false,
  },
};

/**
 * OpenAI specific defaults
 */
export const openAIDefaults = {
  model: 'gpt-4-turbo-preview',
  temperature: 0.3,
  maxTokens: 200,
  presencePenalty: 0.1,
  frequencyPenalty: 0.1,
};

/**
 * Ollama specific defaults
 */
export const ollamaDefaults = {
  baseUrl: 'http://localhost:11434',
  model: 'llama2',
  temperature: 0.3,
  context: [],
};

/**
 * Conventional Commits types
 */
export const conventionalCommitTypes = [
  'feat', // A new feature
  'fix', // A bug fix
  'docs', // Documentation only changes
  'style', // Changes that do not affect the meaning of the code
  'refactor', // A code change that neither fixes a bug nor adds a feature
  'perf', // A code change that improves performance
  'test', // Adding missing tests or correcting existing tests
  'build', // Changes that affect the build system or external dependencies
  'ci', // Changes to CI configuration files and scripts
  'chore', // Other changes that don't modify src or test files
  'revert', // Reverts a previous commit
];

export default defaultConfig;

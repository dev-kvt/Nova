/**
 * Custom error classes for Nova
 */

export class NovaError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ConfigError extends NovaError {
  constructor(message) {
    super(message, 'CONFIG_ERROR');
  }
}

export class AIProviderError extends NovaError {
  constructor(message, provider = 'unknown') {
    super(message, 'AI_PROVIDER_ERROR');
    this.provider = provider;
  }
}

export class ValidationError extends NovaError {
  constructor(message, field = null) {
    super(message, 'VALIDATION_ERROR');
    this.field = field;
  }
}

export class FormatError extends NovaError {
  constructor(message) {
    super(message, 'FORMAT_ERROR');
  }
}

export class GitError extends NovaError {
  constructor(message) {
    super(message, 'GIT_ERROR');
  }
}

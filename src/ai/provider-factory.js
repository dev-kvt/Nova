/**
 * AI Provider Factory
 * Creates and manages AI provider instances
 */

import { OpenAIProvider } from './providers/openai.js';
import { OllamaProvider } from './providers/ollama.js';
import { AIProviderError } from '../utils/errors.js';
import logger from '../utils/logger.js';

class ProviderFactory {
  constructor() {
    this.providers = new Map();
    this.defaultProvider = null;
  }

  /**
   * Create a provider instance
   */
  createProvider(type, config = {}) {
    switch (type.toLowerCase()) {
      case 'openai':
        return new OpenAIProvider(config);
      case 'ollama':
        return new OllamaProvider(config);
      default:
        throw new AIProviderError(`Unknown provider type: ${type}`);
    }
  }

  /**
   * Get or create a provider
   */
  getProvider(type, config = {}) {
    const key = `${type}-${JSON.stringify(config)}`;

    if (!this.providers.has(key)) {
      logger.debug(`Creating new ${type} provider instance`);
      this.providers.set(key, this.createProvider(type, config));
    }

    return this.providers.get(key);
  }

  /**
   * Set default provider
   */
  setDefaultProvider(provider) {
    this.defaultProvider = provider;
  }

  /**
   * Get default provider
   */
  getDefaultProvider() {
    return this.defaultProvider;
  }

  /**
   * Clear cached providers
   */
  clearCache() {
    this.providers.clear();
    this.defaultProvider = null;
  }
}

// Singleton instance
const factory = new ProviderFactory();

export default factory;
export { ProviderFactory };

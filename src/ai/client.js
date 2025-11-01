/**
 * AI Client
 * Main interface for AI message enhancement with fallback support
 */

import providerFactory from './provider-factory.js';
import { AIProviderError } from '../utils/errors.js';
import logger from '../utils/logger.js';

export class AIClient {
  constructor(config = {}) {
    this.config = config;
    this.providers = this.initializeProviders();
  }

  /**
   * Initialize providers based on configuration
   */
  initializeProviders() {
    const providers = [];
    const providerType = this.config.provider || 'openai';

    if (providerType === 'both' || providerType === 'openai') {
      try {
        const openai = providerFactory.getProvider('openai', this.config);
        providers.push(openai);
      } catch (error) {
        logger.warn('Could not initialize OpenAI provider');
      }
    }

    if (providerType === 'both' || providerType === 'ollama') {
      try {
        const ollama = providerFactory.getProvider('ollama', this.config);
        providers.push(ollama);
      } catch (error) {
        logger.warn('Could not initialize Ollama provider');
      }
    }

    return providers;
  }

  /**
   * Enhance message with AI using available providers
   */
  async enhance(message, context = {}) {
    if (this.providers.length === 0) {
      throw new AIProviderError('No AI providers available');
    }

    // Try providers in order
    for (const provider of this.providers) {
      try {
        logger.debug(`Trying ${provider.name} provider...`);

        // Check if provider is available
        const isAvailable = await provider.isAvailable();
        if (!isAvailable) {
          logger.warn(`${provider.name} is not available`);
          continue;
        }

        // Attempt enhancement
        const enhanced = await provider.enhance(message, context);
        logger.info(`Successfully enhanced message with ${provider.name}`);
        return enhanced;
      } catch (error) {
        logger.warn(`${provider.name} failed: ${error.message}`);

        // If this is the last provider, rethrow error
        if (provider === this.providers[this.providers.length - 1]) {
          throw error;
        }

        // Otherwise, try next provider
        continue;
      }
    }

    throw new AIProviderError('All AI providers failed');
  }
}

export default AIClient;

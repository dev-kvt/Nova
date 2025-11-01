/**
 * Ollama Provider
 * Integration with local Ollama API
 */

import axios from 'axios';
import { BaseAIProvider } from '../base-provider.js';
import { AIProviderError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';
import { ollamaDefaults } from '../../config/defaults.js';

export class OllamaProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'ollama';
    this.baseURL =
      config.baseUrl || ollamaDefaults.baseURL || ollamaDefaults.baseUrl;
    this.model = config.model || ollamaDefaults.model;

    // Remove trailing slash
    if (this.baseURL.endsWith('/')) {
      this.baseURL = this.baseURL.slice(0, -1);
    }
  }

  async enhance(message, context = {}) {
    const prompt = this.buildPrompt(message, context);

    try {
      logger.debug(`Calling Ollama API at ${this.baseURL}...`);

      const response = await axios.post(
        `${this.baseURL}/api/generate`,
        {
          model: this.model,
          prompt,
          stream: false,
          options: {
            temperature: ollamaDefaults.temperature,
          },
        },
        {
          timeout: this.config.timeout || 30000, // Ollama can be slower
        }
      );

      const enhanced = response.data?.response;
      if (!enhanced) {
        throw new AIProviderError('Invalid response from Ollama', this.name);
      }

      const parsed = this.parseResponse(enhanced);
      logger.debug(`Enhanced message: ${parsed}`);

      return parsed;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new AIProviderError(
          'Ollama is not running. Start it with: ollama serve',
          this.name
        );
      }
      logger.error(`Ollama error: ${error.message}`);
      throw new AIProviderError(
        `Ollama API error: ${error.message}`,
        this.name
      );
    }
  }

  async isAvailable() {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`, {
        timeout: 2000,
      });
      return response.status === 200;
    } catch (error) {
      logger.debug(`Ollama not available: ${error.message}`);
      return false;
    }
  }
}

export default OllamaProvider;

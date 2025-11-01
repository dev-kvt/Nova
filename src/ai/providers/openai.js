/**
 * OpenAI Provider
 * Integration with OpenAI API
 */

import axios from 'axios';
import { BaseAIProvider } from '../base-provider.js';
import { AIProviderError } from '../../utils/errors.js';
import logger from '../../utils/logger.js';
import { openAIDefaults } from '../../config/defaults.js';

export class OpenAIProvider extends BaseAIProvider {
  constructor(config = {}) {
    super(config);
    this.name = 'openai';
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    this.model = config.model || openAIDefaults.model;
    this.baseURL = 'https://api.openai.com/v1';

    if (!this.apiKey) {
      logger.warn('OpenAI API key not found');
    }
  }

  async enhance(message, context = {}) {
    if (!this.apiKey) {
      throw new AIProviderError('OpenAI API key is required', this.name);
    }

    const prompt = this.buildPrompt(message, context);

    try {
      logger.debug('Calling OpenAI API...');

      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant that improves Git commit messages to follow the Conventional Commits specification.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: openAIDefaults.temperature,
          max_tokens: openAIDefaults.maxTokens,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: this.config.timeout || 10000,
        }
      );

      const enhanced = response.data.choices[0]?.message?.content;
      if (!enhanced) {
        throw new AIProviderError('Invalid response from OpenAI', this.name);
      }

      const parsed = this.parseResponse(enhanced);
      logger.debug(`Enhanced message: ${parsed}`);

      return parsed;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new AIProviderError('Invalid OpenAI API key', this.name);
      }
      if (error.response?.status === 429) {
        throw new AIProviderError('OpenAI rate limit exceeded', this.name);
      }
      logger.error(`OpenAI error: ${error.message}`);
      throw new AIProviderError(
        `OpenAI API error: ${error.message}`,
        this.name
      );
    }
  }

  async isAvailable() {
    return !!this.apiKey;
  }
}

export default OpenAIProvider;

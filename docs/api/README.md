# Nova API Documentation

This document provides API documentation for developers integrating with Nova programmatically.

## Overview

Nova provides both a CLI interface and programmatic APIs for processing commit messages.

## Core APIs

### Message Processing

```javascript
import { processMessage } from 'nova-commit/core';

const result = await processMessage({
  message: 'fix bug',
  options: {
    provider: 'openai',
    convention: 'conventional',
  },
});

console.log(result.enhanced); // e.g., "fix(auth): resolve authentication bug"
```

### Configuration

```javascript
import { loadConfig } from 'nova-commit/config';

const config = await loadConfig();
console.log(config);
```

### AI Provider

```javascript
import { createAIProvider } from 'nova-commit/ai';

const provider = createAIProvider('openai', {
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await provider.enhance('fix bug');
console.log(response);
```

## More Documentation

Detailed API documentation coming soon. For now, see:

- [Basic Usage Examples](../examples/basic-usage.md)
- [Configuration Examples](../examples/configuration.md)
- [Development Guide](../development.md)

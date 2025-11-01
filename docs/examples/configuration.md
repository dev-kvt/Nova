# Configuration Examples

## Configuration Sources

Nova loads configuration from multiple sources (in priority order):

1. Environment variables
2. `.nova.config.json` (project)
3. `~/.nova/config.json` (global)
4. Built-in defaults

## Basic Configuration

### `.nova.config.json`

```json
{
  "version": "1.0.0",
  "convention": "conventional",
  "ai": {
    "provider": "openai",
    "fallback": true
  }
}
```

### Environment Variables

```bash
export NOVA_AI_PROVIDER=openai
export NOVA_CONVENTION=conventional
export OPENAI_API_KEY=your_key_here
```

## AI Provider Setup

### OpenAI

```json
{
  "ai": {
    "provider": "openai",
    "model": "gpt-4-turbo-preview"
  }
}
```

```bash
export OPENAI_API_KEY=your_key_here
```

### Ollama

```json
{
  "ai": {
    "provider": "ollama",
    "baseUrl": "http://localhost:11434",
    "model": "llama2"
  }
}
```

### Fallback

```json
{
  "ai": {
    "provider": "both",
    "fallback": true
  }
}
```

## Conventions

### Conventional Commits

```json
{
  "convention": "conventional",
  "formatting": {
    "autoFormat": true,
    "wrapLength": 72
  }
}
```

### Semantic Versioning

```json
{
  "convention": "semantic"
}
```

### Custom

```json
{
  "convention": "custom",
  "customFormat": "{{type}}: {{message}}"
}
```

## Performance Tuning

```json
{
  "cache": {
    "enabled": true,
    "ttl": 3600
  },
  "timeout": 2000,
  "retry": {
    "attempts": 3,
    "delay": 1000
  }
}
```

## Validation Rules

```json
{
  "validation": {
    "strictMode": false,
    "minLength": 10,
    "maxLength": 500
  }
}
```

## More Resources

- [Basic Usage](basic-usage.md)
- [Git Hooks](git-hook-setup.md)
- [API Documentation](../api/README.md)

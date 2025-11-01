# Environment Setup Guide

This guide will help you configure Nova with your AI provider credentials.

## Quick Setup

### 1. Create `.env` file

Copy the example file:

```bash
cp env.example .env
```

### 2. Configure Your AI Provider

Open `.env` and configure at least one AI provider:

#### Option A: OpenAI (Cloud)

```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
NOVA_AI_PROVIDER=openai
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

#### Option B: Ollama (Local/Offline)

```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
NOVA_AI_PROVIDER=ollama
```

Install Ollama: https://ollama.ai/

#### Option C: Both (with fallback)

```bash
OPENAI_API_KEY=sk-your-key-here
OLLAMA_BASE_URL=http://localhost:11434
NOVA_AI_PROVIDER=both
NOVA_FALLBACK_TO_OFFLINE=true
```

### 3. Test Configuration

```bash
# Test with a simple message
npm start improve "fix bug"

# Should show enhanced message
```

## Environment Variables Reference

### AI Provider Settings

| Variable                   | Description                                    | Default  | Required |
| -------------------------- | ---------------------------------------------- | -------- | -------- |
| `NOVA_AI_PROVIDER`         | Provider to use: `openai`, `ollama`, or `both` | `openai` | Yes      |
| `NOVA_FALLBACK_TO_OFFLINE` | Fallback to Ollama if OpenAI fails             | `true`   | No       |

### OpenAI Configuration

| Variable         | Description         | Default               | Required              |
| ---------------- | ------------------- | --------------------- | --------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key | -                     | Yes (if using OpenAI) |
| `OPENAI_MODEL`   | Model to use        | `gpt-4-turbo-preview` | No                    |

### Ollama Configuration

| Variable          | Description       | Default                  | Required |
| ----------------- | ----------------- | ------------------------ | -------- |
| `OLLAMA_BASE_URL` | Ollama server URL | `http://localhost:11434` | No       |
| `OLLAMA_MODEL`    | Model to use      | `llama2`                 | No       |

### Behavior Settings

| Variable               | Description                                         | Default        |
| ---------------------- | --------------------------------------------------- | -------------- |
| `NOVA_CONVENTION`      | Commit format: `conventional`, `semantic`, `custom` | `conventional` |
| `NOVA_AUTO_FORMAT`     | Automatically format messages                       | `true`         |
| `NOVA_COLORED_OUTPUT`  | Use colored terminal output                         | `true`         |
| `NOVA_VERBOSE_LOGGING` | Enable verbose logging                              | `false`        |

### Performance Settings

| Variable             | Description                    | Default |
| -------------------- | ------------------------------ | ------- |
| `NOVA_CACHE_ENABLED` | Enable response caching        | `true`  |
| `NOVA_CACHE_TTL`     | Cache time-to-live (seconds)   | `3600`  |
| `NOVA_TIMEOUT_MS`    | Request timeout (milliseconds) | `2000`  |

### Advanced Settings

| Variable              | Description                | Default |
| --------------------- | -------------------------- | ------- |
| `NOVA_RETRY_ATTEMPTS` | Number of retry attempts   | `3`     |
| `NOVA_RETRY_DELAY_MS` | Delay between retries (ms) | `1000`  |

## Configuration Priority

Nova loads configuration from multiple sources (in order of priority):

1. **Environment variables** (`.env` file and `process.env`)
2. **Project config** (`.nova.config.json`)
3. **Global config** (`~/.nova/config.json`)
4. **Built-in defaults**

## Security Best Practices

### API Keys

- **Never** commit `.env` files to git
- **Never** share your API keys
- Use different keys for development/production
- Rotate keys regularly

### .gitignore

The `.env` file is already in `.gitignore`, but verify:

```bash
cat .gitignore | grep "\.env"
```

Should show:

```
.env
.env.local
.env.development.local
```

### Checking Configuration

```bash
# List all config values (without secrets)
node -e "const c = require('./src/config/config-loader.js'); c.loadConfig().then(c => console.log(JSON.stringify(c, null, 2)))" | grep -v "apiKey\|key"
```

## Troubleshooting

### OpenAI Not Working

```bash
# Check if API key is set
echo $OPENAI_API_KEY

# Test connection
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Ollama Not Working

```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2
```

### Both Providers Failing

If both AI providers fail, Nova will use its built-in fallback:

```bash
# Force fallback mode
NOVA_FALLBACK_TO_OFFLINE=false npm start improve "fix bug"
```

## Examples

### Development Setup

```bash
# Minimal OpenAI setup
cat > .env << EOF
OPENAI_API_KEY=sk-dev-key
NOVA_AI_PROVIDER=openai
NOVA_VERBOSE_LOGGING=true
EOF
```

### Production Setup

```bash
# Full production setup with fallback
cat > .env << EOF
OPENAI_API_KEY=sk-prod-key
OLLAMA_BASE_URL=http://localhost:11434
NOVA_AI_PROVIDER=both
NOVA_FALLBACK_TO_OFFLINE=true
NOVA_CACHE_ENABLED=true
NOVA_TIMEOUT_MS=5000
EOF
```

### Offline Setup

```bash
# Local only setup
cat > .env << EOF
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
NOVA_AI_PROVIDER=ollama
EOF
```

## Next Steps

After setting up your `.env` file:

1. Run `npm start setup` for interactive configuration
2. Test with `npm start improve "test message"`
3. See [Configuration Guide](examples/configuration.md) for advanced options
4. Read [Development Guide](development.md) for setup details

## Getting Help

- See [Configuration Examples](examples/configuration.md)
- Check [Development Setup](development.md)
- Review [Architecture Documentation](architecture.md)
- Open an [Issue](https://github.com/your-org/nova/issues)

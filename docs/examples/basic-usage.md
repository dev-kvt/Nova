# Basic Usage Examples

## Installation

```bash
npm install -g nova-commit
```

## Setup

First, configure your AI provider:

```bash
# Copy example file
cp env.example .env

# Edit .env and add your API key
# OPENAI_API_KEY=sk-your-key-here
# OR configure Ollama: OLLAMA_BASE_URL=http://localhost:11434
```

See [Environment Setup Guide](../ENV_SETUP.md) for detailed instructions.

## Quick Start

### Improve a Single Message

```bash
nova "fixed the bug"
```

Output:

```
✓ fix: resolve authentication bug
```

### Git Hook Integration

```bash
# Setup
nova setup

# Now commit normally
git commit -m "add user feature"

# Output:
# [nova] Enhanced: feat(user): add user registration feature
```

### Interactive Mode

```bash
nova improve
# Prompts for message input
```

### With Configuration

```bash
# Use specific convention
nova "update docs" --convention semantic

# Use Ollama (offline)
nova "fix bug" --provider ollama

# Verbose output
nova "improve code" --verbose
```

## More Examples

- [Git Hook Setup](git-hook-setup.md)
- [Configuration](configuration.md)

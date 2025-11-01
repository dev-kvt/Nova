# Basic Usage Examples

## Installation

```bash
npm install -g nova-commit
```

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

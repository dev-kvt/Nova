# Git Hook Setup Guide

## Automatic Setup

### Setup Wizard

```bash
nova setup
```

This will:

1. Guide you through configuration
2. Install Git hooks automatically
3. Create `.nova.config.json`
4. Verify setup

### Manual Hook Installation

```bash
# Install prepare-commit-msg hook
nova install-hooks

# Verify installation
ls .git/hooks/prepare-commit-msg
```

## Using Hooks

Once installed, Nova automatically enhances commit messages:

```bash
# Normal commit
git commit -m "fix bug"

# Nova enhances:
# [nova] Enhanced: fix(auth): resolve authentication bug
```

## Configuration

### Enable/Disable

```bash
# Temporarily disable
git commit --no-verify -m "your message"

# Or in config
{
  "hooks": {
    "enabled": false
  }
}
```

### Selective Enhancement

```bash
# Skip Nova for specific message
git commit -m "[skip-nova] fix urgent bug"
```

## Troubleshooting

### Hook Not Running

```bash
# Check hook exists
cat .git/hooks/prepare-commit-msg

# Reinstall
nova install-hooks
```

### Performance Issues

```bash
# Use offline mode
nova config set ai.provider ollama
```

## More Information

- [Basic Usage](basic-usage.md)
- [Configuration](configuration.md)
- [API Documentation](../api/README.md)

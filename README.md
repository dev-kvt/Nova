# Nova - AI-Powered Git Commit Message Enhancement

> Transform vague commit messages into clear, convention-compliant professional messages—automatically.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 🎯 Overview

Nova is a production-grade command-line utility that leverages AI to automatically enhance and standardize Git commit messages. It ensures developers maintain clarity, consistency, and adherence to established conventions like [Conventional Commits](https://www.conventionalcommits.org/).

### Key Features

- 🤖 **AI-Powered Enhancement** - Transforms vague messages using OpenAI or Ollama
- 📏 **Convention Enforcement** - Automatic Conventional Commits compliance
- 🔗 **Git Integration** - Seamless hook-based automation
- 🌐 **Dual Mode** - Cloud (OpenAI) and offline (Ollama) support
- ⚡ **Lightning Fast** - Sub-2-second response times
- 🛡️ **Production Ready** - Robust error handling and logging

---

## 📚 Documentation

This repository contains comprehensive documentation for understanding, developing, and contributing to Nova:

### Core Documents

| Document                                           | Description                                | Audience               |
| -------------------------------------------------- | ------------------------------------------ | ---------------------- |
| **[PROJECT_OVERVIEW](docs/PROJECT_OVERVIEW.md)**   | High-level project vision and overview     | All stakeholders       |
| **[ARCHITECTURE](docs/architecture.md)**           | Detailed system architecture and design    | Developers, architects |
| **[PROJECT_STRUCTURE](docs/PROJECT_STRUCTURE.md)** | Complete folder structure and organization | Developers             |

### Quick Navigation

- **New to the project?** Start with [PROJECT_OVERVIEW](docs/PROJECT_OVERVIEW.md)
- **Want to understand the design?** Read [ARCHITECTURE](docs/architecture.md)
- **Planning to contribute?** See [PROJECT_STRUCTURE](docs/PROJECT_STRUCTURE.md) and [CONTRIBUTING.md](CONTRIBUTING.md)
- **Looking for examples?** Check [docs/examples/](docs/examples/)

---

## 🚀 Quick Start

### Installation

```bash
npm install -g nova-commit
```

### Basic Usage

```bash
# Improve a single commit message
nova improve "fixed the bug in login"

# Output:
# ✓ fix(auth): resolve login authentication bug
```

### Git Hook Integration

```bash
# Setup automatic enhancement
nova setup
nova install-hooks

# Now commit normally - Nova enhances automatically!
git commit -m "add user feature"
# [nova] Enhanced: feat(user): add user registration feature
```

---

## 🏗️ Project Status

**Current Phase**: Setup & Initial Development ✅

### Completed

- ✅ Project requirements and architecture design
- ✅ Production folder structure
- ✅ Comprehensive documentation
- ✅ Development environment setup

### In Progress

- 🔄 Core CLI implementation
- 🔄 AI provider integrations
- 🔄 Message processing logic

### Upcoming

- ⏳ Git hook integration
- ⏳ Testing infrastructure
- ⏳ Beta release

---

## 📋 Requirements

- **Node.js** v18 or higher
- **Git** (for hook integration)
- **AI Provider**: OpenAI API key OR Ollama (for offline mode)

---

## 🎨 Example

### Before Nova

```bash
git commit -m "fix bug"
# Commit message is vague and non-standard
```

### After Nova

```bash
git commit -m "fix bug"
[nova] Enhanced: fix(auth): resolve null pointer exception in user authentication
# Message is clear, formatted, and convention-compliant
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/nova.git`
3. Install dependencies: `npm install`
4. Create a feature branch
5. Make your changes
6. Run tests: `npm test`
7. Submit a pull request

---

## 📊 Roadmap

### Phase 1: MVP (Week 1)

- Core CLI functionality
- OpenAI integration
- Basic message improvement
- Unit tests

### Phase 2: Beta (Week 2)

- Git hook integration
- Ollama (offline) support
- Conventional Commits validation
- Integration tests

### Phase 3: Release (Week 3)

- Documentation completion
- Performance optimization
- npm publication
- Community setup

---

## 🛡️ Security & Privacy

- **No Code Transmission**: Only commit message text is sent to AI
- **Local Option**: Ollama mode keeps all data local
- **API Key Protection**: Secure environment variable handling
- **Input Sanitization**: Validation and length limits

---

## 🤖 Technology Stack

- **Runtime**: Node.js v18+ (ES Modules)
- **CLI**: Commander.js
- **AI**: OpenAI SDK, Ollama
- **Testing**: Jest
- **Logging**: Winston
- **Linting**: ESLint, Prettier

---

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Conventional Commits](https://www.conventionalcommits.org/) for the commit standard
- [OpenAI](https://openai.com/) for GPT models
- [Ollama](https://ollama.ai/) for local AI capabilities

---

**Built with ❤️ for developers who care about code quality**

---

_Nova is currently in active development. Documentation and features are subject to change._

# Nova - Production Folder Structure

## Complete Directory Tree

```
Nova/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Continuous Integration
│   │   ├── release.yml            # Automated releases
│   │   └── security.yml           # Security scanning
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .husky/
│   ├── pre-commit               # Pre-commit hooks
│   └── pre-push                 # Pre-push hooks
│
├── docs/
│   ├── api/
│   │   └── README.md            # API documentation
│   ├── architecture.md          # Architecture deep dive
│   ├── contributing.md          # Contribution guidelines
│   ├── development.md           # Development setup
│   ├── examples/
│   │   ├── basic-usage.md
│   │   ├── git-hook-setup.md
│   │   └── configuration.md
│   └── README.md                # Documentation index
│
├── scripts/
│   ├── build.js                 # Build script
│   ├── release.js               # Release script
│   ├── setup-hooks.js           # Git hooks installer
│   ├── validate-config.js       # Config validator
│   └── generate-types.js        # Type generation
│
├── src/
│   ├── cli/
│   │   ├── index.js             # CLI entry point
│   │   ├── router.js            # Command router
│   │   └── commands/
│   │       ├── improve.js       # Main improve command
│   │       ├── setup.js         # Setup wizard
│   │       ├── config.js        # Config commands
│   │       ├── version.js       # Version info
│   │       └── help.js          # Help system
│   │
│   ├── core/
│   │   ├── index.js             # Core exports
│   │   ├── message-processor.js # Message processing
│   │   ├── formatter.js         # Formatting engine
│   │   ├── validator.js         # Validation logic
│   │   └── conventions/
│   │       ├── conventional.js  # Conventional Commits
│   │       ├── semantic.js      # Semantic versioning
│   │       └── custom.js        # Custom formats
│   │
│   ├── ai/
│   │   ├── index.js             # AI exports
│   │   ├── client.js            # AI client abstraction
│   │   ├── provider-factory.js  # Provider factory
│   │   ├── base-provider.js     # Base provider class
│   │   └── providers/
│   │       ├── openai.js        # OpenAI service
│   │       ├── ollama.js        # Ollama service
│   │       └── mock.js          # Mock provider (testing)
│   │
│   ├── services/
│   │   ├── index.js             # Services exports
│   │   ├── git/
│   │   │   ├── git-client.js    # Git operations
│   │   │   └── hook-handler.js  # Hook integration
│   │   ├── cache/
│   │   │   ├── cache-manager.js # Caching logic
│   │   │   └── storage.js       # Cache storage
│   │   └── rate-limiter.js      # Rate limiting
│   │
│   ├── config/
│   │   ├── index.js             # Config exports
│   │   ├── config-loader.js     # Configuration loader
│   │   ├── config-validator.js  # Schema validation
│   │   ├── defaults.js          # Default values
│   │   └── schemas/
│   │       ├── global.schema.js # Global schema
│   │       └── provider.schema.js # Provider schema
│   │
│   ├── utils/
│   │   ├── index.js             # Utils exports
│   │   ├── logger.js            # Logging utilities
│   │   ├── errors.js            # Error definitions
│   │   ├── colors.js            # Terminal colors
│   │   ├── text.js              # Text utilities
│   │   └── file-system.js       # FS operations
│   │
│   ├── integrations/
│   │   ├── index.js             # Integration exports
│   │   ├── github-actions.js    # GitHub Actions
│   │   └── ide-plugins.js       # IDE integration
│   │
│   └── types/
│       ├── index.d.ts           # TypeScript definitions
│       ├── config.d.ts          # Config types
│       ├── message.d.ts         # Message types
│       └── provider.d.ts        # Provider types
│
├── tests/
│   ├── unit/
│   │   ├── cli/
│   │   │   ├── commands.test.js
│   │   │   └── router.test.js
│   │   ├── core/
│   │   │   ├── message-processor.test.js
│   │   │   ├── formatter.test.js
│   │   │   └── validator.test.js
│   │   ├── ai/
│   │   │   ├── client.test.js
│   │   │   └── providers.test.js
│   │   ├── config/
│   │   │   └── config-loader.test.js
│   │   └── utils/
│   │       ├── logger.test.js
│   │       └── text.test.js
│   │
│   ├── integration/
│   │   ├── cli-integration.test.js
│   │   ├── git-hook.test.js
│   │   └── provider-integration.test.js
│   │
│   ├── e2e/
│   │   ├── improve-command.test.js
│   │   ├── setup-flow.test.js
│   │   └── error-handling.test.js
│   │
│   ├── fixtures/
│   │   ├── configs/             # Test configs
│   │   ├── messages/            # Sample messages
│   │   └── responses/           # Mock responses
│   │
│   ├── setup.js                 # Test setup
│   ├── teardown.js              # Test cleanup
│   └── jest.config.js           # Jest configuration
│
├── .env.example                 # Environment template
├── .editorconfig                # Editor configuration
├── .eslintrc.js                 # ESLint configuration
├── .gitignore                   # Git ignore rules
├── .nvmrc                       # Node version
├── .prettierrc                  # Prettier config
├── CHANGELOG.md                 # Version history
├── CODE_OF_CONDUCT.md           # Community guidelines
├── CONTRIBUTING.md              # Contribution guide
├── LICENSE                      # License file
├── package.json                 # Package manifest
├── pnpm-workspace.yaml          # Workspace config (if using pnpm)
├── README.md                    # Project README
├── prd.md                       # Original PRD
├── architecture.md              # Architecture document
└── PROJECT_STRUCTURE.md         # This file

```

---

## Directory Descriptions

### Root Level

#### `.github/`

**Purpose:** GitHub-specific configurations and workflows

**Contents:**

- **workflows/**: CI/CD pipelines for automated testing, security scanning, and releases
- **ISSUE_TEMPLATE/**: Templates for bug reports and feature requests
- **PULL_REQUEST_TEMPLATE.md**: Standard PR template

**Responsibilities:**

- Automated testing on pull requests
- Semantic versioning and releases
- Security vulnerability scanning
- Community issue tracking

#### `.husky/`

**Purpose:** Git hooks management

**Contents:**

- **pre-commit**: Run linting and tests before commit
- **pre-push**: Run comprehensive tests before push

**Responsibilities:**

- Enforce code quality standards
- Prevent broken code from being committed
- Run automated checks

#### `docs/`

**Purpose:** Documentation and guides

**Contents:**

- **api/**: Technical API documentation
- **examples/**: Usage examples and tutorials
- **architecture.md**: Deep dive into system design
- **contributing.md**: How to contribute to the project

**Responsibilities:**

- User onboarding and education
- Developer documentation
- API reference
- Best practices and examples

#### `scripts/`

**Purpose:** Build, release, and utility scripts

**Contents:**

- **build.js**: Build and compilation
- **release.js**: Release automation
- **setup-hooks.js**: Git hooks installation
- **validate-config.js**: Configuration validation

**Responsibilities:**

- Automate repetitive tasks
- Ensure consistent build processes
- Simplify release management

#### `src/`

**Purpose:** Core source code

**Subdirectories:**

- **cli/**: Command-line interface
- **core/**: Business logic
- **ai/**: AI provider integrations
- **services/**: Supporting services
- **config/**: Configuration management
- **utils/**: Utilities and helpers
- **integrations/**: Third-party integrations
- **types/**: TypeScript definitions

**Responsibilities:**

- Implement all functionality
- Organize code logically
- Enable modular architecture

#### `tests/`

**Purpose:** Test suites

**Contents:**

- **unit/**: Unit tests for individual components
- **integration/**: Integration tests for subsystems
- **e2e/**: End-to-end tests for full workflows
- **fixtures/**: Test data and mocks

**Responsibilities:**

- Ensure code correctness
- Prevent regressions
- Validate functionality
- Maintain code quality

---

### Source Code (`src/`)

#### `src/cli/`

**Purpose:** Command-line interface implementation

**Key Files:**

- **index.js**: Main entry point, parses arguments, initializes CLI
- **router.js**: Routes commands to appropriate handlers
- **commands/**: Individual command implementations

**Architecture:**

```
Commands/
├── improve.js      # Main message improvement
├── setup.js        # Initial setup wizard
├── config.js       # Config management commands
├── version.js      # Version information
└── help.js         # Help system
```

#### `src/core/`

**Purpose:** Core business logic

**Components:**

- **message-processor.js**: Process and normalize commit messages
- **formatter.js**: Format messages according to conventions
- **validator.js**: Validate message structure and content
- **conventions/**: Convention implementations (Conventional, Semantic, Custom)

**Responsibilities:**

- Message analysis and processing
- Convention enforcement
- Quality validation
- Structure standardization

#### `src/ai/`

**Purpose:** AI provider abstraction and implementations

**Architecture:**

```
AI Layer/
├── client.js              # Unified AI client interface
├── provider-factory.js    # Dynamic provider creation
├── base-provider.js       # Abstract base class
└── providers/
    ├── openai.js         # OpenAI GPT integration
    ├── ollama.js         # Local Ollama integration
    └── mock.js           # Mock for testing
```

**Key Features:**

- Provider-agnostic interface
- Easy provider switching
- Retry and fallback logic
- Unified error handling

#### `src/services/`

**Purpose:** Supporting services and integrations

**Components:**

- **git/**: Git operations and hook handling
- **cache/**: Response caching
- **rate-limiter.js**: API rate limiting

**Responsibilities:**

- Git repository interaction
- Performance optimization
- Resource management
- External service integration

#### `src/config/`

**Purpose:** Configuration management

**Components:**

- **config-loader.js**: Load and merge configurations
- **config-validator.js**: Validate against schemas
- **defaults.js**: Default configuration values
- **schemas/**: JSON schemas for validation

**Configuration Sources (Priority Order):**

1. Environment variables (.env)
2. Project config (.nova.config.json)
3. Global config (~/.nova/config.json)
4. Built-in defaults

#### `src/utils/`

**Purpose:** Shared utilities and helpers

**Files:**

- **logger.js**: Winston-based logging
- **errors.js**: Custom error classes
- **colors.js**: Chalk wrapper for terminal colors
- **text.js**: String manipulation utilities
- **file-system.js**: File operations

#### `src/types/`

**Purpose:** TypeScript type definitions

**Files:**

- **index.d.ts**: Main type exports
- **config.d.ts**: Configuration types
- **message.d.ts**: Message-related types
- **provider.d.ts**: AI provider types

---

### Testing (`tests/`)

#### Test Structure

```
Unit Tests/         → Individual components
Integration Tests/  → Component interactions
E2E Tests/          → Full user workflows
Fixtures/           → Test data and mocks
```

**Testing Philosophy:**

- **Unit Tests**: 80%+ coverage, fast, isolated
- **Integration Tests**: Validate component interactions
- **E2E Tests**: Validate complete user flows
- **Fixtures**: Reusable test data

---

### Key Configuration Files

#### `package.json`

```json
{
  "name": "nova-commit",
  "version": "0.1.0",
  "description": "AI-powered Git commit message enhancement",
  "type": "module",
  "main": "src/cli/index.js",
  "bin": {
    "nova": "./src/cli/index.js"
  },
  "scripts": {
    "start": "node src/cli/index.js",
    "dev": "node --watch src/cli/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint .",
    "format": "prettier --write .",
    "build": "node scripts/build.js",
    "release": "node scripts/release.js"
  },
  "keywords": ["git", "commit", "ai", "cli", "productivity"],
  "author": "Your Name",
  "license": "MIT"
}
```

#### `.env.example`

```bash
# AI Provider Configuration
NOVA_AI_PROVIDER=openai  # openai | ollama | both
NOVA_FALLBACK_TO_OFFLINE=true

# OpenAI Configuration
OPENAI_API_KEY=your_openai_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# Behavior Settings
NOVA_CONVENTION=conventional  # conventional | semantic | custom
NOVA_AUTO_FORMAT=true
NOVA_COLORED_OUTPUT=true
NOVA_VERBOSE_LOGGING=false

# Performance
NOVA_CACHE_ENABLED=true
NOVA_CACHE_TTL=3600
NOVA_TIMEOUT_MS=2000

# Advanced
NOVA_RETRY_ATTEMPTS=3
NOVA_RETRY_DELAY_MS=1000
```

#### `.nova.config.json`

```json
{
  "version": "1.0.0",
  "convention": "conventional",
  "ai": {
    "provider": "openai",
    "fallback": true,
    "model": "gpt-4-turbo-preview"
  },
  "formatting": {
    "autoFormat": true,
    "wrapLength": 72
  },
  "validation": {
    "strictMode": false,
    "minLength": 10,
    "maxLength": 500
  }
}
```

---

## File Naming Conventions

### JavaScript Files

- **kebab-case**: Multi-word files (e.g., `message-processor.js`)
- **camelCase**: Class files when appropriate
- **index.js**: Export aggregators in directories

### Test Files

- **pattern**: `<name>.test.js` or `<name>.spec.js`
- **consistent**: Use `.test.js` throughout

### Configuration Files

- **hidden**: Dot-prefixed config files (e.g., `.eslintrc.js`)
- **JSON**: Config files for end users

---

## Import/Export Patterns

### ES Modules

```javascript
// Named exports
export const processMessage = () => {};
export const formatMessage = () => {};

// Default exports (rare)
export default class Nova {}

// Re-exports via index.js
export { processMessage, formatMessage } from './message-processor.js';
```

### Import Conventions

```javascript
// External dependencies
import { Command } from 'commander';
import chalk from 'chalk';

// Internal modules (absolute imports when possible)
import { processMessage } from '../../core/message-processor.js';
import { logger } from '../../utils/logger.js';

// Relative imports for nearby files
import { validate } from './validator.js';
```

---

## Dependency Management

### Production Dependencies

- Minimal and well-maintained
- Security audited regularly
- Version pinned for stability

### Development Dependencies

- Isolated to development environment
- Not included in production builds
- Regularly updated

### Peer Dependencies

- Node.js v18+
- Git (for hook integration)
- AI service installation (Ollama for offline mode)

---

## Best Practices

### Code Organization

1. **Single Responsibility**: Each module has one clear purpose
2. **DRY Principle**: Avoid code duplication
3. **Dependency Injection**: Enable testing and flexibility
4. **Separation of Concerns**: UI, business logic, and data layers

### Testing

1. **Test-Driven Development**: Write tests first when applicable
2. **Mock Dependencies**: Isolate units under test
3. **High Coverage**: Maintain >80% code coverage
4. **Fast Tests**: Unit tests run in < 100ms each

### Documentation

1. **Code Comments**: Explain why, not what
2. **JSDoc**: Document public APIs
3. **README**: Clear setup and usage instructions
4. **Examples**: Practical usage examples

### Error Handling

1. **Graceful Degradation**: Never crash the CLI
2. **User-Friendly Messages**: Clear, actionable errors
3. **Logging**: Detailed logs for debugging
4. **Recovery**: Automatic retry and fallback

---

## Build & Distribution

### Build Process

1. Lint and format check
2. Type checking (if using TypeScript)
3. Run test suite
4. Bundle and minify (if needed)
5. Generate documentation

### Distribution

1. Publish to npm
2. GitHub Releases
3. Homebrew formula (optional)
4. Docker images (optional)

---

## Conclusion

This folder structure provides a solid foundation for a production-grade CLI tool. It promotes:

- **Maintainability**: Clear organization and separation of concerns
- **Scalability**: Easy to add new features and integrations
- **Testability**: Comprehensive test structure
- **Usability**: Well-documented and easy to onboard
- **Reliability**: Production-ready error handling and logging

The structure follows Node.js and JavaScript best practices while remaining flexible enough to accommodate future growth and feature additions.

# Nova Development Guide

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nova.git
cd nova

# Install dependencies
npm install

# Run tests
npm test
```

## Project Structure

See [PROJECT_STRUCTURE.md](../../Documentations/PROJECT_STRUCTURE.md) for complete structure.

Key directories:

- `src/` - Source code
- `tests/` - Test suites
- `scripts/` - Build and utility scripts
- `docs/` - Documentation

## Development Workflow

### Running in Development

```bash
# Watch mode
npm run dev

# Run specific command
node src/cli/index.js improve "your message"
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Building

```bash
# Build project
npm run build

# Prepare release
npm run release
```

## Adding Features

1. Create a feature branch
2. Write tests first (TDD)
3. Implement feature
4. Ensure all tests pass
5. Update documentation
6. Create pull request

## Code Style

- Use ES Modules
- Follow ESLint configuration
- Format with Prettier
- Write descriptive commit messages
- Add JSDoc comments for public APIs

## Git Workflow

1. Create branch from `main`
2. Make changes and commit
3. Run tests and linting
4. Push and create PR
5. Address review comments
6. Merge after approval

## More Resources

- [Contributing Guide](../../CONTRIBUTING.md)
- [Architecture Documentation](../../Documentations/architecture.md)
- [API Reference](api/README.md)

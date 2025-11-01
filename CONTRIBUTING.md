# Contributing to Nova

Thank you for your interest in contributing to Nova! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/nova.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Run tests: `npm test`
7. Run linter: `npm run lint`
8. Format code: `npm run format`
9. Commit your changes
10. Push and create a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
npm install
```

### Running Tests

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

# Check formatting
npm run format:check
```

## Code Style

- Use ES Modules
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test changes
- `chore:` for build/tool changes

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Questions?

Feel free to open an issue for any questions or concerns.

# Nova - System Architecture

## 1. Project Overview

Nova is an AI-powered command-line utility designed to enhance and standardize Git commit messages. It acts as an intelligent middleware between developers and Git, ensuring consistency, clarity, and adherence to established conventions like Conventional Commits.

**Core Value Proposition:**

- Automatic commit message improvement using AI
- Standard format enforcement (Conventional Commits)
- Seamless Git integration via hooks
- Dual AI backend support (cloud + local)
- Production-grade reliability and performance

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Layer                                │
│  ┌─────────────────────┐         ┌──────────────────────────┐   │
│  │   Direct CLI Usage  │         │   Git Hook Integration   │   │
│  │   $ nova <message>  │         │   prepare-commit-msg     │   │
│  └─────────────────────┘         └──────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Command Layer                               │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │              CLI Parser & Router                        │    │
│  │  - Argument parsing (Commander.js)                      │    │
│  │  - Command routing                                      │    │
│  │  - Input validation                                     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Core Layer                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │  Message         │  │  AI Client       │  │  Formatter     │ │
│  │  Processor       │→ │  Abstraction     │→ │  & Validator   │ │
│  │  - Normalize     │  │  - Provider      │  │  - Convention  │ │
│  │  - Sanitize      │  │    Factory       │  │    Check       │ │
│  │  - Classify      │  │  - Retry Logic   │  │  - Formatting  │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Service Layer                                 │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │  OpenAI Service  │         │  Ollama Service  │             │
│  │  - API Client    │         │  - HTTP Client   │             │
│  │  - Prompt Builder│         │  - Local Model   │             │
│  │  - Rate Limiting │         │  - Health Check  │             │
│  └──────────────────┘         └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │  Configuration   │  │  Error Handling  │  │  Logging       │ │
│  │  - .env          │  │  - Retries       │  │  - Winston     │ │
│  │  - .nova.config  │  │  - Graceful      │  │  - Levels      │ │
│  └──────────────────┘  └──────────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Output Layer                                 │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │  Console Output  │         │  File Output     │             │
│  │  - Colored Text  │         │  - Commit Hook   │             │
│  │  - User Feedback │         │  - Integration   │             │
│  └──────────────────┘         └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

**Standard Flow:**

1. User inputs commit message via CLI or Git hook
2. CLI parser validates and normalizes input
3. Message processor analyzes and classifies the message
4. AI Client abstraction layer selects appropriate provider
5. Service layer calls OpenAI or Ollama with structured prompt
6. Response is validated and formatted according to conventions
7. Output is returned to user or written to commit message file

**Fallback Flow:**

1. AI provider fails or times out
2. Error handler captures failure
3. Retry logic attempts alternate provider
4. If all providers fail, return sanitized original message
5. Log error with context for debugging

---

## 3. Core Components

### 3.1 Command Layer

**Purpose:** Entry point for all user interactions

**Responsibilities:**

- Parse command-line arguments
- Route commands to appropriate handlers
- Validate user input
- Handle help and version commands

**Key Files:**

- `src/cli/index.js` - Main CLI entry point
- `src/cli/commands/*.js` - Individual command handlers
- `src/cli/router.js` - Command routing logic

### 3.2 Core Layer

**Purpose:** Business logic and orchestration

**Components:**

#### Message Processor

- Input normalization
- Content sanitization
- Message type classification
- Pre-processing for AI

#### AI Client Abstraction

- Provider factory pattern
- Unified interface for all AI backends
- Retry and fallback logic
- Response caching (optional)

#### Formatter & Validator

- Conventional Commits validation
- Output formatting
- Style enforcement
- Quality scoring

### 3.3 Service Layer

**Purpose:** AI provider integrations

#### OpenAI Service

- REST API client
- Prompt template management
- Token usage tracking
- Rate limit handling

#### Ollama Service

- Local HTTP client
- Model detection
- Health monitoring
- Connection pooling

### 3.4 Infrastructure Layer

**Configuration Management:**

- Environment variable loading
- Config file parsing
- Validation and defaults
- Runtime updates

**Error Handling:**

- Try-catch wrappers
- Circuit breaker pattern
- Graceful degradation
- User-friendly messages

**Logging:**

- Structured logging
- Multiple output targets
- Log levels (debug, info, warn, error)
- Performance monitoring

---

## 4. Design Patterns

### 4.1 Strategy Pattern

**AI Provider Selection:** Abstract AI client interface with concrete implementations for each provider (OpenAI, Ollama).

### 4.2 Factory Pattern

**Service Creation:** Dynamic provider instantiation based on configuration.

### 4.3 Adapter Pattern

**Provider Integration:** Unified interface across different AI providers with varying APIs.

### 4.4 Chain of Responsibility

**Message Processing:** Sequential processing pipeline for normalization, enhancement, and validation.

### 4.5 Circuit Breaker

**Error Resilience:** Prevent cascading failures with automatic circuit breaking after repeated failures.

### 4.6 Dependency Injection

**Testing & Flexibility:** Loose coupling through injected dependencies for easier testing and extensibility.

---

## 5. Technology Stack

### 5.1 Runtime & Language

- **Node.js** v18+ (LTS)
- **ES Modules** for modern JavaScript
- **Async/Await** for asynchronous operations

### 5.2 Core Dependencies

- **Commander.js** - CLI argument parsing
- **Chalk** - Terminal styling and colors
- **dotenv** - Environment configuration
- **Winston** - Logging framework
- **joi** - Schema validation

### 5.3 AI Integration

- **OpenAI SDK** - Cloud AI provider
- **axios** - HTTP client for Ollama
- **prompts** - Interactive prompts (optional)

### 5.4 Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Husky** - Git hooks management
- **lint-staged** - Pre-commit checks

### 5.5 DevOps & CI/CD

- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization (optional)
- **npm/pnpm** - Package management
- **Semantic Release** - Automated versioning

---

## 6. Security Considerations

### 6.1 Data Privacy

- **No Code Transmission:** Only commit message text is sent to AI
- **Git Diff Exclusion:** Never transmit file contents or diffs
- **Local Processing:** Ollama mode keeps all data local
- **API Key Protection:** Secure environment variable handling

### 6.2 Input Sanitization

- **Content Validation:** Strip potentially sensitive patterns
- **Length Limits:** Prevent token exhaustion
- **Injection Prevention:** Sanitize user inputs
- **Rate Limiting:** Prevent abuse

### 6.3 Error Handling

- **Information Leakage Prevention:** No internal errors exposed
- **Safe Defaults:** Graceful degradation on failures
- **Audit Logging:** Track important operations

---

## 7. Performance Optimization

### 7.1 Response Time Targets

- **Local (Ollama):** < 1 second
- **Cloud (OpenAI):** < 2 seconds
- **Fallback:** < 0.1 seconds

### 7.2 Optimization Strategies

- **Prompt Caching:** Reuse optimized prompts
- **Connection Pooling:** HTTP connection reuse
- **Lazy Loading:** Load providers on demand
- **Parallel Processing:** Concurrent operations where possible

### 7.3 Monitoring

- **Performance Metrics:** Response time tracking
- **Error Rates:** Success/failure tracking
- **Resource Usage:** Memory and CPU monitoring

---

## 8. Testing Strategy

### 8.1 Unit Testing

- **Target:** 80%+ code coverage
- **Tools:** Jest
- **Focus:** Core business logic, utilities

### 8.2 Integration Testing

- **API Mocking:** MockAI provider responses
- **CLI Testing:** End-to-end command execution
- **Git Hook Testing:** Hook integration scenarios

### 8.3 Performance Testing

- **Load Testing:** Concurrent request handling
- **Latency Testing:** Response time validation
- **Stress Testing:** Failure recovery

---

## 9. Deployment & Distribution

### 9.1 Package Distribution

- **npm Registry:** Primary distribution channel
- **Binaries:** Potential future native binary support
- **Installation:** Global and local installation support

### 9.2 Configuration Files

- **Global Config:** `~/.nova/config.json`
- **Project Config:** `.nova.config.json`
- **Environment:** `.env` files

### 9.3 Version Management

- **Semantic Versioning:** MAJOR.MINOR.PATCH
- **Automated Releases:** Semantic Release
- **Migration Path:** Config version upgrades

---

## 10. Scalability & Extensibility

### 10.1 Adding New AI Providers

1. Create new service class extending `BaseAIProvider`
2. Implement required interface methods
3. Register in provider factory
4. Add configuration schema
5. Write integration tests

### 10.2 Custom Message Formats

1. Define format schema
2. Implement validator
3. Create formatter
4. Add configuration option
5. Update documentation

### 10.3 Additional Features

- **Plugin System:** Event-driven hooks
- **Custom Commands:** Extensible command registry
- **Template Engine:** Flexible message templates
- **Multi-Language Support:** i18n framework

---

## 11. Monitoring & Observability

### 11.1 Logging Strategy

- **Structured Logging:** JSON format for parsing
- **Multiple Levels:** DEBUG, INFO, WARN, ERROR
- **Context Enrichment:** Request IDs, user info
- **Log Aggregation:** Winston transports

### 11.2 Metrics Collection

- **Operation Success Rate:** Track completion percentages
- **Latency Percentiles:** P50, P95, P99
- **Error Classification:** Categorize failures
- **Usage Patterns:** Feature adoption tracking

### 11.3 Health Checks

- **Provider Health:** AI service availability
- **Configuration Validity:** Config verification
- **Dependency Status:** External service checks

---

## 12. Error Handling Strategy

### 12.1 Error Categories

**Recoverable Errors:**

- Network timeouts
- Rate limit exceeded
- Service unavailable

**Non-Recoverable Errors:**

- Invalid configuration
- Authentication failures
- Malformed input

**User Errors:**

- Missing required arguments
- Invalid command syntax
- Insufficient permissions

### 12.2 Error Response Flow

1. **Detection:** Identify error type
2. **Classification:** Categorize severity
3. **Recovery Attempt:** Retry or fallback
4. **User Notification:** Friendly message
5. **Logging:** Detailed error context

---

## 13. Future Considerations

### 13.1 Planned Enhancements

- **Multi-language Support:** i18n for commit messages
- **Custom Template System:** User-defined formats
- **Batch Processing:** Multiple commits at once
- **Git History Analysis:** Learning from past commits
- **Team Collaboration:** Shared configurations

### 13.2 Potential Integrations

- **GitHub Actions:** CI/CD integration
- **IDE Extensions:** Editor plugins
- **Slack/Discord:** Team notifications
- **Jira/Linear:** Issue tracking links

---

## 14. Success Criteria

### 14.1 Technical Metrics

- **Response Time:** < 2 seconds (cloud), < 1 second (local)
- **Success Rate:** > 99% for valid inputs
- **Code Coverage:** > 80%
- **Zero Dependency Vulnerabilities**

### 14.2 Business Metrics

- **User Adoption:** 1000+ installations (Q1)
- **Acceptance Rate:** > 80% of improved messages
- **Community Engagement:** Active GitHub community
- **Documentation Quality:** 5-star readability

---

## 15. Risk Mitigation

### 15.1 Technical Risks

- **AI Provider Downtime:** Local fallback, circuit breaker
- **Performance Degradation:** Caching, connection pooling
- **Breaking Changes:** Semantic versioning, migration guides

### 15.2 Business Risks

- **Low Adoption:** Comprehensive documentation, examples
- **Privacy Concerns:** Transparent privacy policy, local option
- **Competition:** Unique features, community support

---

## 16. Conclusion

Nova is architected as a production-grade CLI tool with a focus on reliability, performance, and extensibility. The modular design allows for easy maintenance, testing, and feature additions while maintaining a clean separation of concerns. The dual AI backend support ensures flexibility, and the comprehensive error handling guarantees a robust user experience.

The architecture is designed to scale with user needs while remaining lightweight and maintainable. By following industry best practices and design patterns, Nova will provide a solid foundation for long-term success and community growth.

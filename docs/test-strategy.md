# Test Strategy – Birthday Briefing

## Overview

The Birthday Briefing project employs a comprehensive, multi-layered testing strategy that balances speed, reliability, and maintainability. The strategy is designed to support strict Test-Driven Development (TDD) workflows while ensuring the application works correctly with real-world CardDAV servers.

## Testing Philosophy

### Core Principles

1. **Test-Driven Development First**: All production code is written using strict TDD (red-green-refactor cycles).
2. **Fast Feedback Loops**: The majority of tests run in sub-second timeframes to maintain developer flow.
3. **Real-World Validation**: Critical integration points are validated against real implementations before deployment.
4. **Quality Through Mutation Testing**: Test effectiveness is validated using mutation testing with target scores >75%.
5. **Privacy-First Testing**: Test data and credentials are never committed to version control.

### Design for Testability

The codebase is structured to maximize testability:

- **Separation of Concerns**: Business logic is extracted into pure functions (e.g., `src/utils/dateUtils.js`, `src/utils/storage.js`).
- **Dependency Injection**: External dependencies (localStorage, sessionStorage, fetch) are mockable in tests.
- **Component Isolation**: React components receive data and callbacks via props, making them testable without complex setup.

## Test Pyramid

The project follows a modified test pyramid optimized for client-side applications:

```
        E2E (Docker)         ~10% - Real CardDAV validation
       /                \
      /   Integration    \   ~30% - MSW mocked integration
     /      (MSW)         \
    /                      \
   /        Unit           \  ~60% - Pure function testing
  /__________________________\
```

### Unit Tests (~60%)

**Purpose**: Validate individual functions and components in isolation.

**Location**: Alongside source files (e.g., `dateUtils.test.js` next to `dateUtils.js`)

**Tools**: Vitest + @testing-library/react

**What to Test**:

- Pure data transformation functions
- Date calculations and filtering logic
- Validation functions
- Storage serialization/deserialization
- React component rendering and user interactions
- Error handling and edge cases

**Example Test Subjects**:

- `src/utils/dateUtils.js` - Date calculations
- `src/utils/storage.js` - Configuration persistence
- `src/components/FirstTimeSetup.jsx` - Form state and validation

**Running Unit Tests**:

```bash
npm test                  # Run all tests once
npm run test:watch        # Watch mode for TDD
npm run test:ui           # Visual test UI
npm run test:coverage     # Generate coverage report
```

### Integration Tests (~30%)

**Purpose**: Validate that modules work together correctly, especially CardDAV data fetching and UI state management.

**Location**: `src/test/integration/`

**Tools**: Vitest + Mock Service Worker (MSW)

**What to Test**:

- CardDAV client fetching and parsing vCard data
- Authentication flow with mocked server responses
- Error handling for network failures and malformed data
- UI components integrated with data fetching logic
- State management across component boundaries

**Mock Strategy** (per ADR 001):

- MSW intercepts network requests in-process (no actual HTTP)
- Response factories in `src/test/factories/` generate valid XML/vCard data
- Fixtures in `src/test/fixtures/` provide representative test data
- Test server configuration in `src/mocks/`

**Example Test Scenarios**:

- Fetch birthdays and parse names/dates correctly
- Handle 401 Unauthorized responses appropriately
- Parse multiple birthdays from the same vCard
- Handle missing BDAY fields gracefully

**Running Integration Tests**:

```bash
npm test src/test/integration/   # Run integration tests only
```

### End-to-End Tests (~10%)

**Purpose**: Validate critical functionality against a real CardDAV server implementation before deployment.

**Location**: `src/test/e2e/`

**Tools**: Vitest + Docker Compose + Radicale

**What to Test** (per ADR 001):

- Authentication handshake with a real CardDAV server
- Request/response XML structure matches real-world servers
- `tsdav` library correctly implements the CardDAV protocol
- Pre-deployment smoke tests

**Infrastructure**:

- `compose.yaml` defines a Radicale service with test data
- Tests run against `http://localhost:5232` (Radicale default)
- Test credentials and data are loaded via environment variables

**Running E2E Tests**:

```bash
# Start the test server
docker compose up -d

# Run E2E tests
npm run test:e2e

# Clean up
docker compose down
```

**CI/CD Integration**:

GitHub Actions workflow:

1. Start Radicale service container
2. Load test data into Radicale
3. Run E2E test suite
4. Stop service container

## Test Quality Metrics

### Code Coverage

**Target**: >80% line coverage on business logic modules

**Measurement**: Vitest with `@vitest/coverage-v8`

**Reporting**: HTML reports generated in `coverage/index.html`

**Exclusions**:

- Test files (`*.test.js`, `*.test.jsx`)
- Mock server setup (`src/mocks/`)
- Test utilities (`src/test/`)

**Current Baseline**:

- `dateUtils.js`: 100%
- `storage.js`: 100%

### Mutation Testing

**Target**: >75% mutation score on all production modules

**Tool**: Stryker Mutator with `@stryker-mutator/vitest-runner`

**Reporting**: JSON and HTML reports in `reports/mutation/`

**When to Run** (per pre-commit workflow):

- Before every git commit
- After implementing new features
- After refactoring existing code

**Running Mutation Tests**:

```bash
npm run test:mutate
```

**Analyzing Results**:

```bash
# View summary statistics
jq '.files | to_entries | map({file: .key, score: .value.mutationScore}) | sort_by(.score)' reports/mutation/mutation.json

# View survived mutants
jq '.files[].mutants[] | select(.status == "Survived")' reports/mutation/mutation.json
```

**Current Baseline** (per ADR 002 library selection):

- Overall: 83.50%
- `dateUtils.js`: 90.48%
- `storage.js`: 80.25%

### Interpreting Mutation Scores

**>90%**: Excellent - Tests are highly effective

**75-90%**: Good - Meets quality standard

**<75%**: Needs Improvement - Add missing test cases or assertions

**Common Survived Mutants**:

- Type checking in validation functions (acceptable)
- Boundary conditions in guard clauses (investigate)
- Error message strings (acceptable)

## Test-Driven Development Workflow

### TDD Cycle Integration

All production code is written following strict TDD cycles:

1. **Red Phase**: Write a minimal failing unit test
2. **Green Phase**: Write minimum code to make the test pass
3. **Refactor Phase**: Improve code design using the Absolute Priority Premise
4. **Commit**: Create a git commit after each green or refactor step

### Test Selection During TDD

**During Red/Green Phases**:

- Write unit tests in watch mode (`npm run test:watch`)
- Focus on a single test file for the feature being developed
- Use `.only()` to run a single test during active development

**During Refactor Phase**:

- Run all unit tests to verify no regressions
- Run mutation tests if refactoring test-critical code

**Before Commit** (per pre-commit workflow):

1. Run all unit tests: `npm test`
2. Run mutation tests: `npm run test:mutate`
3. Update memory bank with test results
4. Create commit with all changes

### Example TDD Session

```bash
# Start TDD session
npm run test:watch

# In editor: Write failing test for new function
# In editor: Implement function to pass test
# Verify test passes in watch mode

# Run full suite before commit
npm test

# Check mutation score
npm run test:mutate

# Commit changes
git add .
git commit -m "feat: add birthday filtering function"
```

## Technology Stack

### Testing Frameworks

- **Vitest**: Fast unit test runner with native ESM support
- **@testing-library/react**: React component testing utilities
- **@testing-library/user-event**: Simulate user interactions
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **jsdom**: Browser environment simulation

### Mocking and Fixtures

- **Mock Service Worker (MSW)**: HTTP request mocking for integration tests
- **Vitest mocking**: Built-in mocks for localStorage, sessionStorage, and modules

### Mutation Testing

- **@stryker-mutator/core**: Mutation testing framework
- **@stryker-mutator/vitest-runner**: Vitest integration

### E2E Infrastructure

- **Docker Compose**: Container orchestration for test services
- **Radicale**: Open-source CardDAV/CalDAV server for E2E validation

## Testing CardDAV Integration

### Mock Server Strategy (ADR 001)

The project uses a hybrid testing strategy for CardDAV integration:

**MSW for Speed** (~90% of CardDAV tests):

- Mock PROPFIND requests for addressbook discovery
- Mock REPORT requests for birthday data fetching
- Generate valid XML responses using factories
- Test error scenarios (401, 404, network failures)
- Validate vCard parsing logic

**Docker for Reliability** (~10% of CardDAV tests):

- Validate authentication with real server
- Verify XML request structure
- Ensure `tsdav` library works correctly
- Pre-deployment smoke tests

### CardDAV Client Library (ADR 002)

**Library**: `tsdav` (actively maintained, TypeScript support)

**Testing Approach**:

1. **Unit Tests**: Test vCard parsing and data transformation
2. **Integration Tests (MSW)**: Test client methods with mocked responses
3. **E2E Tests (Docker)**: Verify real server communication

### Test Data Management

**vCard Fixtures** (`src/test/fixtures/`):

- Representative birthday data with various edge cases
- Past birthdays (within 14-day window)
- Today's birthdays
- Future birthdays
- Missing BDAY fields
- Multiple contacts per day

**XML Response Factories** (`src/test/factories/`):

- Generate valid PROPFIND responses
- Generate valid REPORT responses with vCard data
- Support error responses (401, 404, 500)

## Privacy and Security in Tests

### Credential Management

**Development**:

- Use `.envrc` with `direnv` for local credentials
- Never commit credentials to version control
- `.env` files are in `.gitignore`

**CI/CD**:

- Use GitHub Secrets for E2E test credentials
- Rotate test credentials regularly
- Use separate test accounts, never production

### Test Data

**Synthetic Data Only**:

- All test contact names and birthdays are fictional
- Do not use real personal information in tests
- Generate test data programmatically where possible

## Running Tests Locally

### Quick Reference

```bash
# Fast feedback (unit + integration with MSW)
npm test

# Watch mode for TDD
npm run test:watch

# Visual test UI
npm run test:ui

# Coverage report
npm run test:coverage

# Mutation testing
npm run test:mutate

# E2E tests (requires Docker)
docker compose up -d
npm run test:e2e
docker compose down
```

### First-Time Setup

1. Install dependencies: `npm install`
2. Verify unit tests work: `npm test`
3. Install Docker (for E2E tests)
4. Start test server: `docker compose up -d`
5. Run E2E tests: `npm run test:e2e`
6. Stop test server: `docker compose down`

## CI/CD Pipeline

### GitHub Actions Workflow

**On Every Push**:

1. Install dependencies
2. Run unit tests (`npm test`)
3. Run mutation tests (`npm run test:mutate`)
4. Start Radicale service container
5. Run E2E tests (`npm run test:e2e`)
6. Stop service container
7. Upload test reports as artifacts

**Quality Gates**:

- All tests must pass
- Mutation score must be >75%
- No linter errors

**Deployment**:

- Occurs only if all quality gates pass
- Deploy to demo.boos.systems via FTPS

## Best Practices

### Writing Effective Tests

1. **Test Behavior, Not Implementation**: Focus on observable outcomes
2. **One Assertion per Test**: Makes failures easier to diagnose
3. **Use Descriptive Test Names**: Follow "should..." pattern
4. **Arrange-Act-Assert Structure**: Organize test code clearly
5. **Avoid Test Interdependence**: Each test should run independently

### Maintaining Test Quality

1. **Run Mutation Tests Regularly**: Validate test effectiveness
2. **Refactor Tests**: Apply clean code principles to test code
3. **Review Survived Mutants**: Investigate and add missing assertions
4. **Keep Tests Fast**: Unit tests should complete in milliseconds
5. **Update Test Data**: Keep fixtures representative of real-world data

### Common Pitfalls

**Avoid**:

- Testing implementation details instead of behavior
- Mocking too much (prefer real collaborators when fast)
- Ignoring survived mutants without analysis
- Skipping E2E tests before deployment
- Committing credentials or real personal data

**Prefer**:

- Testing public interfaces
- Using MSW for external dependencies
- Investigating and documenting acceptable survived mutants
- Running full test suite before merging to main
- Synthetic test data with clear naming

## Future Enhancements

### Potential Improvements

- **Visual Regression Testing**: Screenshot comparison for UI changes
- **Performance Testing**: Measure and track rendering performance
- **Accessibility Testing**: Automated a11y checks with axe-core
- **Browser Compatibility**: Test matrix across browsers with Playwright
- **Load Testing**: Verify behavior with large address books (1000+ contacts)

### Monitoring Test Health

- Track mutation score trends over time
- Monitor test execution time
- Measure flaky test frequency
- Review test coverage gaps

## Related Documentation

- [ADR 001: Hybrid Testing Strategy for CardDAV Integration](./architecture-decisions/001-carddav-mock.md)
- [ADR 002: Selection of CardDAV Client Library](./architecture-decisions/002-carddav-client-library.md)
- [Clean Code Rules: Strict TDD](../.cursor/rules/clean-code/600-strict-tdd.mdc)
- [Clean Code Rules: Mutation Testing](../.cursor/rules/clean-code/340-mutation-testing.mdc)
- [Workflow Orchestrator](../.cursor/rules/clean-code/390-workflow-orchestrator.mdc)


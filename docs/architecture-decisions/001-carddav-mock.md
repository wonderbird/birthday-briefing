# Hybrid Testing Strategy for CardDAV Integration

* Status: Accepted
* Date: 2025-11-29
* Supersedes: Initial proposal to use MSW exclusively

## Context and Problem Statement

The Birthday Briefing application fetches birthday data from user-configured CardDAV servers. We need a testing strategy that ensures our CardDAV integration is correct while maintaining fast feedback loops for test-driven development.

**Key Challenge**: Mocking alone (MSW) risks validating incorrect assumptions about the CardDAV protocol, while Docker-only testing is too slow for TDD workflows.

## Decision Drivers

1. **Reliability** (Priority 1): Verify that authentication and data fetching work against a real CardDAV implementation, not just our own mocks.
2. **Speed & Developer Experience** (Priority 2): Maintain sub-second feedback loops for TDD. Developers should not wait for Docker container startup during normal development.
3. **CI/CD Compatibility** (Priority 3): The solution must be automatable in GitHub Actions without excessive complexity.

## Considered Options

* **Option A**: Mock Service Worker (MSW) only
* **Option B**: Dockerized Radicale server only
* **Option C**: Hybrid approach (MSW + Docker)

## Decision Outcome

Chosen option: **Option C - Hybrid Testing Strategy**

We will use both MSW and Docker, each for their specific strengths:

### When to Use MSW (Fast Integration Tests)

Use MSW for the majority of tests (approximately 90%):

- Unit tests for data transformation logic
- Integration tests for UI components and state management
- Testing error handling (401 Unauthorized, network failures, malformed responses)
- Testing edge cases with crafted vCard data
- Running during TDD red-green-refactor cycles

**Location**: `src/test/integration/` and alongside component files

### When to Use Docker (Reliable E2E Tests)

Use Dockerized Radicale for critical verification (approximately 10%):

- Validating authentication handshake with a real server
- Verifying that `tsdav` correctly speaks the CardDAV protocol
- Ensuring request/response XML structure matches real-world servers
- Pre-deployment smoke tests

**Location**: `src/test/e2e/`

### Implementation Details

**MSW Setup**:

- Already configured in test setup (`src/mocks/`)
- Intercepts network requests in-process
- Returns crafted XML responses via response factories

**Docker Setup**:

- A `compose.yaml` file defines a Radicale service
- E2E tests require the service to be running (via `docker compose up`)
- CI will start the service before running E2E tests

**Running Tests Locally**:

```bash
# Fast feedback (MSW only, no Docker required)
npm test

# Full validation (includes E2E tests, Docker required)
docker compose up -d
npm run test:e2e
docker compose down
```

## Pros and Cons of the Options

### Option A: Mock Service Worker (MSW) Only

* Good, because it provides instant feedback (no container startup delay)
* Good, because it requires no additional infrastructure
* Good, because it allows precise control over test data and edge cases
* Bad, because mocks might not match real CardDAV server behavior
* Bad, because we might miss protocol-level issues that only appear with real servers

### Option B: Dockerized Radicale Server Only

* Good, because it tests against a real CardDAV implementation
* Good, because it catches protocol-level issues we might miss with mocks
* Bad, because container startup adds 5-15 seconds to each test run
* Bad, because it makes TDD workflows frustratingly slow
* Bad, because it requires Docker to be installed and running locally

### Option C: Hybrid Approach (Chosen)

* Good, because it provides both speed (MSW) and reliability (Docker)
* Good, because developers can work quickly with MSW during TDD
* Good, because E2E tests catch issues before deployment
* Bad, because it requires maintaining two testing approaches
* Bad, because developers need Docker installed to run the full test suite
* Bad, because CI pipeline becomes slightly more complex

### Consequences

| Type | Impact | Description |
|:---|:---|:---|
| **Positive** | High Confidence | E2E tests verify the app works with a real CardDAV server before deployment |
| **Positive** | Fast Feedback | Developers maintain sub-second TDD loops with MSW during normal development |
| **Positive** | Flexibility | Can test edge cases with MSW that are difficult to reproduce with real servers |
| **Negative** | Complexity | Need to maintain both MSW mocks and Docker configuration |
| **Negative** | Setup Overhead | Developers need Docker installed to run the full E2E test suite locally |
| **Negative** | CI Configuration | GitHub Actions must be configured to start Docker services |

### Mitigations for Negative Consequences

- **Mock Accuracy**: Validate MSW response factories against real server responses during initial setup
- **Documentation**: Provide clear instructions for running both test modes
- **CI Optimization**: Use GitHub Actions service containers to minimize CI complexity

## Links

* [Mock Service Worker Documentation](https://mswjs.io/)
* [Radicale Project](https://radicale.org/)
* [Radicale Docker Image](https://hub.docker.com/r/tomsquest/docker-radicale)
* [CardDAV RFC 6352](https://datatracker.ietf.org/doc/html/rfc6352)

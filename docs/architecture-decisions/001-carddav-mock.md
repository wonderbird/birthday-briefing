# Use Mock Service Worker (MSW) for CardDAV Integration Testing

* Status: Proposed
* Date: 2025-11-29

## Context and Problem Statement

The "Birthday Briefing" application relies on fetching birthday information from a user-provided CardDAV server. To ensure reliability and correctness of the application logic (parsing dates, handling 14-day windows, error states), we need a robust way to test this integration.

We need a testing infrastructure that allows us to verify the client-side CardDAV fetching and parsing logic without:
1. Depending on a live production CardDAV server (privacy/reliability issues).
2. Requiring complex manual setup for every developer or CI run.
3. Introducing excessive latency or flakiness into the test suite.

## Decision Drivers

* **CI/CD Compatibility**: The solution must run headless in GitHub Actions without requiring complex service orchestration if possible.
* **Test Framework Integration**: The solution should integrate seamlessly with Vitest, our chosen test runner.
* **Lightweight / Low Overhead**: We prefer a solution that keeps the project lightweight and easy to onboard (Node.js/React stack).
* **Control over Test Data**: We need precise control to simulate specific scenarios (past birthdays, today, future birthdays, edge cases) by returning custom vCard responses.

## Considered Options

* **Mock Service Worker (MSW)**
* **WireMock**
* **Docker-based CardDAV Server (e.g., Radicale)**

## Decision Outcome

Chosen option: **Mock Service Worker (MSW)**, because it offers the best balance of integration, speed, and simplicity for our client-side React application.

### Positive Consequences

* **Zero Infrastructure**: Runs entirely within the Node.js test process. No need for Docker containers or Java runtimes in the CI pipeline.
* **Speed**: Request interception is immediate; no network latency.
* **Integration**: Native integration with Vitest allows for easy setup and teardown in test files.
* **Stack Alignment**: Uses JavaScript/TypeScript, aligning with the project's technology stack.

### Negative Consequences

* **Manual XML Handling**: MSW requires us to construct the CardDAV XML responses (e.g., `multistatus` bodies) manually. We are responsible for ensuring the mock response matches the CardDAV protocol specification.

### Mitigation Strategies

* **Response Factories**: To mitigate the risk of malformed XML, we will create re-usable helper functions (factories) that generate valid `multistatus` XML strings from simple JavaScript objects (the vCard fixtures). This centralizes the XML construction logic and reduces the chance of typos in individual tests.
* **Golden Master**: We can optionally capture a real server's response once and use it as a template to ensure our factory output matches a compliant server.

## Pros and Cons of the Options

### Mock Service Worker (MSW)

* **Good**: Runs in the same process as the tests; extremely fast.
* **Good**: No extra system dependencies (like Docker or Java).
* **Good**: Allows inspection of request details (headers, body) to verify correctness of client requests.
* **Bad**: Does not "simulate" a server's logic (statefulness, protocol compliance) automatically; we return exactly what we tell it to.

### WireMock

* **Good**: Powerful request matching and stateful behavior simulation.
* **Good**: Can record and playback real server interactions.
* **Bad**: Typically requires a Java runtime or a Docker container, adding complexity to the CI environment.
* **Bad**: "Overkill" for a project that primarily needs to verify client-side parsing logic.

### Docker-based CardDAV Server (e.g., Radicale)

* **Good**: Tests against a real, compliant server implementation. Catches subtle protocol issues.
* **Bad**: Requires Docker integration in CI/CD.
* **Bad**: Slower startup and teardown times.
* **Bad**: Managing state (resetting the database) between tests is complex.

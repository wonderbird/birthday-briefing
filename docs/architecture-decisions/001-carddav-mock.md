# Use Mock Service Worker (MSW) for CardDAV Integration Testing

* Status: Proposed
* Date: 2025-11-29

## Summary

We will use **Mock Service Worker (MSW)** to mock CardDAV server responses in our integration tests. This decision prioritizes CI/CD compatibility and ease of integration with our React/Vite stack, ensuring robust testing of our client-side parsing logic without external dependencies.

## Decision Drivers

1.  **CI/CD Compatibility** (Priority 1): Must run headless in GitHub Actions without complex orchestration.
2.  **Correctness & Reliability** (Priority 2): We value a reliable test signal and are willing to trade some speed for it.
3.  **Test Framework Integration** (Priority 3): Seamless integration with Vitest is preferred.
4.  **Control over Test Data** (Priority 4): Need precise control to simulate specific edge cases.

## Considered Options

*   **Mock Service Worker (MSW)**: A pure Node.js/browser API mocking library.
*   **WireMock**: A powerful, Java-based mock server.
*   **Radicale (Docker)**: A real CardDAV server running in a container.

## Decision Outcome

Chosen option: **Mock Service Worker (MSW)**.

It offers the best balance of integration, speed, and simplicity. It fulfills our top priority (CI/CD) by requiring zero external infrastructure, unlike WireMock (Java) or Radicale (Docker).

### Consequences & Mitigation

| Consequence | Description | Mitigation |
|:---|:---|:---|
| **Positive** | Zero Infrastructure | No Docker/Java needed in CI. |
| **Positive** | Fast Execution | Runs in-process; no network latency. |
| **Positive** | Stack Alignment | Uses JavaScript/TypeScript. |
| **Negative** | Manual XML Handling | We must manually construct CardDAV XML responses. | **Response Factories**: Use helper functions to generate valid XML.<br>**Golden Master**: Validate factories against real server responses once. |

## Detailed Analysis

### Mock Service Worker (MSW)
*   **Pros**: Extremely fast, runs in-process, inspects request details natively.
*   **Cons**: Does not simulate server statefulness automatically.

### WireMock
*   **Pros**: Powerful request matching, stateful simulation.
*   **Cons**: "Overkill" complexity; typically requires Java runtime or Docker.

### Docker-based CardDAV Server (e.g., Radicale)
*   **Pros**: Tests against a compliant server implementation.
*   **Cons**: Slower startup, complex CI/CD setup, state management issues.

## Links
* [Mock Service Worker Documentation](https://mswjs.io/)
* [WireMock Documentation](https://wiremock.org/)
* [Radicale Documentation](https://radicale.org/)

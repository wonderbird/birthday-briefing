# Use Mock Service Worker (MSW) for CardDAV Integration Testing

* Status: Proposed
* Date: 2025-11-29

## Summary

To enable robust integration testing of our client-side Birthday Briefing app, we will use **Mock Service Worker (MSW)** to simulate CardDAV server responses. This decision prioritizes our need for a lightweight, CI/CD-friendly testing infrastructure that runs seamlessly within our existing Node.js and Vitest environment.

## Decision Drivers

1.  **CI/CD Compatibility** (Priority 1): The solution must run purely headless in GitHub Actions, avoiding complex service orchestration (like Docker Compose) to prevent flakiness.
2.  **Correctness & Reliability** (Priority 2): We need a reliable test signal. We accept that mocking is "simulated" correctness, provided we mitigate the risk of bad mock data.
3.  **Control over Test Data** (Priority 3): We require precise control to inject specific vCard edge cases (e.g., leap years, bad data) that are hard to reproduce with a real server.

## Considered Options

*   **Mock Service Worker (MSW)**: A library that intercepts requests at the network level (Node.js/Browser). Pure JavaScript.
*   **WireMock**: A robust, standalone mock server (Java-based) with advanced recording/playback features.
*   **Radicale (Docker)**: A compliant, open-source CardDAV server running in a Docker container.

## Decision Outcome

Chosen option: **Mock Service Worker (MSW)**.

**Why?**
It is the only option that satisfies our top priority (CI/CD Compatibility) with **zero** additional infrastructure. It runs directly inside the test process. WireMock and Radicale would introduce Java or Docker dependencies, increasing the complexity and maintenance cost of our CI pipeline.

### Consequences & Mitigation

| Consequence | Description | Mitigation Strategy |
|:---|:---|:---|
| **Positive** | **Zero Infrastructure** | No Docker containers or Java runtimes required in CI. |
| **Positive** | **Speed** | Requests are intercepted in-process (ms latency). |
| **Positive** | **Stack Alignment** | Written in TypeScript/JS, matching our team's expertise. |
| **Negative** | **Manual XML Handling** | MSW returns exactly what we tell it to. We must manually construct valid CardDAV XML (e.g., `multistatus` responses). | **Response Factories**: We will build helper functions to generate compliant XML from simple JSON fixtures.<br>**Golden Master**: We will validate our factories against a real CardDAV server response once to ensure accuracy. |

## Detailed Analysis

### Mock Service Worker (MSW)
*   **Pros**: Fastest execution; native inspection of request headers/body; easy setup in Vitest `setup.js`.
*   **Cons**: Stateless by default (doesn't remember "saved" contacts unless we code it); requires manual protocol mimicking.

### WireMock
*   **Pros**: Powerful stateful simulation; record/playback capability.
*   **Cons**: Java dependency makes it "heavy" for a Node.js project; typically requires a separate process.

### Docker-based CardDAV Server (e.g., Radicale)
*   **Pros**: High correctness (tests against a real server implementation).
*   **Cons**: Slowest startup; complex database state management (resetting between tests); requires Docker-in-CI.

## Links
* [Mock Service Worker Documentation](https://mswjs.io/)
* [WireMock Documentation](https://wiremock.org/)
* [Radicale Documentation](https://radicale.org/)

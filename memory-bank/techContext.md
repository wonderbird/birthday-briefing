# Tech Context – Birthday Briefing

## Technologies and Platform

- Platform:
  - Browser-based web application, usable on phones, tablets, and desktop computers.
- Frontend framework:
  - React 19.1 for building the user interface and managing component state.
  - Vite as the build tool and development server.
- Styling:
  - Bootstrap 5.3.2 (via CDN) for UI components and responsive layout.
  - Minimal custom CSS for app-specific styling.
- Testing infrastructure:
  - Vitest for unit testing JavaScript and React components.
  - Stryker Mutator for mutation testing to ensure test quality.
  - Test-driven development (TDD) workflow enforced through clean code rules.
- Data storage:
  - Browser local storage for:
    - User configuration (CardDAV URL, first day of week).
    - Cached birthday data needed for the 14-day view.
- External integration:
  - CardDAV-compatible server as the single external data source for birthday information.
  - **Library**: `tsdav` for handling CardDAV protocol communication (per ADR 002).
- Deployment:
  - GitHub Actions for CI/CD pipeline.
  - FTPS deployment to demo.boos.systems.
  - Node.js 24.x (LTS) for build environment.

The focus of this file is to capture the overall technical direction and constraints, without going into low-level implementation details.

## Technical Constraints and Requirements

- Privacy requirements:
  - No analytics or tracking libraries.
  - No external storage of birthday or contact data on application-controlled servers.
  - All sensitive data remains in the user’s browser and in the user’s chosen CardDAV system.
- Open-source and licensing:
  - The project is open-source under the MIT license (LICENSE file formally added).
  - This encourages transparency and allows others to audit the implementation for privacy and correctness.
  - Copyright held by Stefan Boos (2025).
- Multi-device access:
  - The web app should behave well on a variety of screen sizes.
  - The same URL can be opened on different devices; configuration and data are stored per browser.

## Development Goals

- Learning and experimentation:
  - The project serves as a learning environment for React and frontend development.
  - Keep the stack simple to avoid unnecessary complexity while focusing on core concepts and UX.
  - Practice TDD (Test-Driven Development) workflow and mutation testing.
- Maintainability:
  - Use clear component and file structures so that future contributors (or future sessions) can understand the app quickly.
  - Align with the patterns described in `systemPatterns.md` to separate configuration, synchronization, and view concerns.
  - Follow clean code principles documented in `.cursor/rules/clean-code/`.
- Testability:
  - Structure code so that data processing (for example, transforming CardDAV events into birthdays within a 14-day window) can be tested without depending on the browser UI.
  - Maintain high test coverage with unit tests (Vitest).
  - Ensure test quality through mutation testing (Stryker).
  - Follow pre-commit workflow: tests → mutation tests → memory bank update → commit.

## Tools and Dependencies (High-Level)

- Node.js and associated tooling (already present in the project) to:
  - Run the development server.
  - Build the production bundle.
- React and related libraries:
  - React for component-based UI.
  - Supporting packages as needed for routing or state management, chosen to remain lightweight and aligned with the project’s small scope.

Specific dependency versions and configuration details will be captured in the project’s standard configuration files (such as `package.json`) and are not duplicated here.

## Alignment with Other Memory Bank Files

- Fulfills the product goals and constraints from `projectbrief.md`, especially:
  - Privacy-first design.
  - Simplicity and calm usage.
- Supports the user experience goals described in `productContext.md` by:
  - Enabling a smooth, responsive UI across devices.
  - Keeping the implementation focused on a clear 14-day view.
- Provides the technical foundation for the patterns outlined in `systemPatterns.md`:
  - Client-side architecture.
  - Local storage and CardDAV integration.
- Informs the current implementation strategies and next steps in `activeContext.md` and the status tracking in `progress.md`.



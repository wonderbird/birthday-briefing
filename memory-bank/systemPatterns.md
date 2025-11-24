# System Patterns – Birthday Briefing

## High-Level Architecture

- Client-side web application:
  - Runs entirely in the user’s browser.
  - No dedicated backend service for user data.
- External data source:
  - A CardDAV-compatible server that exposes address book and birthday information, configured via a URL.
- Local storage:
  - Browser storage holds:
    - Configuration (CardDAV URL, first day of week).
    - Cached birthday data needed for the 14-day view.

This architecture supports the privacy goal: birthday and contact information are fetched directly to the client and stored locally, without an intermediate application server.

## Core Conceptual Components

### Configuration Component

- Responsibilities:
  - Collect the CardDAV URL and minimal required credentials (if any).
  - Collect the first-day-of-week preference (Monday or Sunday).
  - Validate basic input format where possible.
  - Persist configuration to local storage.
- Interactions:
  - On first run, guides the user through setup.
  - On later runs, allows updating configuration through a simple settings view.

### Data Synchronization and Caching Component

- Responsibilities:
  - Use the stored CardDAV configuration to:
    - Fetch birthday-related data from the external source.
    - Extract the information needed for the 14-day view (dates and associated names).
  - Cache the processed data in local storage.
  - Decide when to refresh data (for example, on app open, with background updates when possible).
- Interactions:
  - Provides the 14-day view component with a ready-to-use list of birthdays.
  - Handles error states (unreachable CardDAV, invalid data) and reports them to the UI layer in a user-friendly manner.

### 14-Day View Component

- Responsibilities:
  - Render birthday information for the current 14-day period, starting from the first day of the current week.
  - Respect the user’s first-day-of-week preference.
  - Apply visual distinctions for:
    - Past days within the visible range.
    - Today.
    - Upcoming days.
- Layout variants:
  - Continuous 14-day list.
  - “This week” and “Next week” blocks.
  - Two-row compact overview (one row per week).
- Day inclusion strategies:
  - Full 14-day timeline (including days without birthdays).
  - Birthday-only days.

The 14-day view component can be structured to make it straightforward to plug in and compare these layout and inclusion strategies using the same underlying birthday data.

## Data Flow Patterns

- One-way data flow from configuration and sync to presentation:
  - Configuration → determines how CardDAV is accessed.
  - Synchronization → fetches and processes data into a normalized format.
  - View → consumes the normalized data for rendering.
- Local storage as a central persistence mechanism:
  - Configuration and birthday cache are written and read by both the configuration and sync components.
  - The view can read from a current in-memory representation that is backed by local storage.

This separation helps keep the rendering logic focused on presentation and interaction, while privacy-sensitive details (such as credentials) are handled in a single, well-defined place.

## Design Principles and Patterns

### Privacy-First Data Handling

- Minimize the data stored:
  - Only store what is needed to render the 14-day view (for example, names and birthday dates).
- Avoid unnecessary duplication:
  - Refer back to configuration rather than copying credentials or URLs in multiple places.
- Explicit boundaries:
  - CardDAV access is isolated to a specific part of the system that can be audited for privacy implications.

### Separation of Concerns

- Configuration, synchronization, and view are treated as distinct responsibilities.
- Layout experiments (different 14-day views) reuse the same data structures and logic wherever possible.

### Extensibility for Future Iterations

- The core patterns are chosen to allow:
  - Adding new layout variants without large changes to data fetching.
  - Introducing optional features (for example, multi-week views) by extending the view logic while reusing configuration and sync patterns.
  - Evolving the CardDAV handling (for example, supporting multiple sources) without changing how the 14-day view is rendered.

## Relationship to Other Memory Bank Files

- Based on the goals and constraints described in `projectbrief.md`.
- Aligned with the user experience goals and privacy requirements in `productContext.md`.
- Provides architectural context that informs the current focus and next steps described in `activeContext.md`.
- Will be updated as concrete implementation patterns, components, and relationships emerge during development, and those updates will be reflected in `progress.md`.



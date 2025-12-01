# Active Context – Birthday Briefing

## Current Product Focus (V1)

- Deliver a simple, reliable 14-day birthday overview:
  - The view always starts on the first day of the current week.
  - The first day of the week (Monday or Sunday) is user-configurable.
  - The visible range covers 14 consecutive days, effectively “this week and next week.”
- Use a CardDAV URL as the single configuration input for birthday data, plus the first-day-of-week preference.
- Keep the experience calm and privacy-first:
  - No notifications.
  - No accounts, no tracking, and no server-side birthday storage.

## Current Priorities (Business and User Perspective)

### 1. First-Time Setup Screen (✅ Completed)

- Implemented minimal first-time setup UI with:
  - App title: "Birthday Briefing"
  - Brief privacy message: "Your data stays on your device. No tracking."
  - CardDAV URL input field
  - First-day-of-week selection (Monday/Sunday radio buttons)
  - "Save" button
  - Footer note about open-source MIT license
- Design decisions made:
  - Single-screen approach (minimal, focused on configuration)
  - Bootstrap 5.3.2 for consistent, responsive UI
  - Vertically centered layout with max-width 500px
  - Clean card-based form design

### 2. Main Screen with 14-Day View (✅ Completed)

- Implemented MainScreen component with hardcoded birthday data for prototyping
- Design decisions finalized:
  - Layout: Continuous list showing only days with birthdays
  - Date format: Short format "Mon, Nov 25"
  - Header: Title with settings gear icon in top right corner
  - Multiple birthdays on same day: Comma-separated names
  - Visual distinction: Color-coded (gray for past, blue/bold for today, default for future)
- App-level state management implemented:
  - Bidirectional navigation between FirstTimeSetup and MainScreen
  - "Save" button triggers transition to main view
  - Settings gear icon returns to configuration screen
- Date calculation logic:
  - 14-day window starts from Monday of current week
  - Birthdays filtered and sorted chronologically
  - Only days with birthdays are displayed

### 3. Testing Infrastructure (✅ Completed)

- Implementation completed in two phases:
  - Phase 1: Vitest setup and validation
    - Installed Vitest and testing libraries (@testing-library/react, jsdom, @testing-library/user-event, @testing-library/jest-dom, @vitest/ui, @vitest/coverage-v8)
    - Created vitest.config.js with jsdom environment and HTML coverage reporting
    - Added test scripts to package.json (test, test:watch, test:ui, test:coverage)
    - Extracted date utility functions to src/utils/dateUtils.js for testability
    - Created comprehensive test suite in src/utils/dateUtils.test.js (14 tests)
    - Achieved 100% code coverage on dateUtils.js
    - Generated HTML coverage report in coverage/index.html
  - Phase 2: Stryker Mutator setup
    - Installed @stryker-mutator/core and @stryker-mutator/vitest-runner
    - Created stryker.config.json with JSON and HTML reporters
    - Added test:mutate script to package.json
    - Configured ignorePatterns to exclude .cursor and .git directories
    - Achieved 90.48% mutation score (38 killed, 4 survived out of 42 mutants)
    - Generated mutation reports in reports/mutation/ (JSON and HTML)
- Testing conventions established:
  - Extract business logic to separate modules for easier testing
  - Use descriptive test names following "should..." pattern
  - Test files named with .test.js extension alongside source files
  - Focus on business logic and data transformation functions
  - Use mutation testing to verify test quality
- Baseline metrics:
  - Code coverage: 100% on dateUtils.js
  - Mutation score: 90.48% (38/42 mutants killed)
  - 4 survived mutants identified for potential test improvement
- Integration with clean code practices:
  - Ready for TDD workflow (red-green-refactor cycles)
  - Test scripts integrated into development workflow
  - Supports pre-commit workflow requirements

### 4. Configuration Persistence (✅ Completed)

Implementation completed using strict TDD workflow.

#### Storage Module

**Module Created:** `src/utils/storage.js` with `src/utils/storage.test.js`

**Functions Implemented:**
- `validateConfig(config)` - Validates URL format and firstDayOfWeek enum
- `saveConfig(config)` - Serializes and stores to localStorage
- `loadConfig()` - Loads with JSON parse error handling
- `clearConfig()` - Removes configuration from localStorage
- `isConfigured()` - Checks for valid configuration existence

**Data Structure:**
- Storage key: `'birthday-briefing-config'`
- Configuration object: `{ carddavUrl: string, firstDayOfWeek: 'monday' | 'sunday' }`

**Test Coverage:**
- 20 test cases covering success, error, and edge cases
- Proper test isolation with beforeEach/afterEach hooks

#### UI Integration

**FirstTimeSetup Component:**
- Captures form state (carddavUrl, firstDayOfWeek) using React useState
- Calls saveConfig() to persist configuration to localStorage
- Passes configuration to parent via onComplete callback
- 3 test cases covering form state and saveConfig integration

**App Component:**
- Calls isConfigured() on mount to detect existing configuration
- Loads configuration with loadConfig() when it exists
- Conditionally renders FirstTimeSetup or MainScreen based on configuration state
- Passes loaded configuration as props to MainScreen
- 4 test cases covering configuration detection and conditional rendering

#### Test Results

**Unit Tests:**
- Total: 41 tests passing
- storage.test.js: 20 tests
- FirstTimeSetup.test.jsx: 3 tests
- App.test.jsx: 4 tests
- dateUtils.test.js: 14 tests

**Mutation Testing:**
- Overall mutation score: 83.50%
- storage.js: 78.69% (48 killed, 13 survived)
- dateUtils.js: 90.48% (38 killed, 4 survived)
- Survivors mostly in validation guard clauses (expected for type checking logic)
- Component tests provide behavioral coverage

**Implementation Process:**
- Followed strict TDD with red-green-refactor cycles
- 6 git commits for UI integration (one per green phase)
- All commits follow conventional commit format with Co-authored-by trailers
- Code review completed - all rules compliant

### 5. Configuration Editing Support (✅ Completed)

Implemented configuration editing support using strict TDD workflow.

#### Implementation Summary

**FirstTimeSetup Component:**
- Added optional `initialConfig` prop with shape: `{ carddavUrl: string, firstDayOfWeek: 'monday' | 'sunday' }`
- Form state initializes from `initialConfig` when provided, otherwise uses empty/default values
- Component works in both modes: initial setup and edit configuration
- Changes: 2 lines modified to use optional chaining with fallback

**App Component:**
- Passes loaded config to FirstTimeSetup via `initialConfig` prop when rendering setup view
- Reloads config from storage after save via `handleSetupComplete` to update App state
- MainScreen receives updated config after edits
- Changes: 3 lines modified (1 in handleSetupComplete, 1 in FirstTimeSetup render)

#### TDD Test Coverage

**FirstTimeSetup.test.jsx (5 tests total):**
- ✓ should initialize with empty values when no initialConfig provided
- ✓ should pre-populate form with values from initialConfig prop
- ✓ should pass CardDAV URL to onComplete when Save is clicked
- ✓ should pass firstDayOfWeek to onComplete when Save is clicked
- ✓ should call saveConfig with form data when Save is clicked

**App.test.jsx (5 tests total):**
- ✓ should check if configuration exists on mount
- ✓ should show FirstTimeSetup when no configuration exists
- ✓ should show MainScreen when configuration exists
- ✓ should load and store config when configuration exists
- ✓ should pass config to FirstTimeSetup when editing configuration

#### Test Results

**Unit Tests:**
- Total: 44 tests passing (up from 41)
- All existing tests continue to pass
- No regressions

**Mutation Testing:**
- Overall mutation score: 83.50% (maintained >80% target)
- dateUtils.js: 90.48% (38 killed, 4 survived)
- storage.js: 78.69% (48 killed, 13 survived)
- Survived mutants primarily in validation guard clauses (expected for type checking)

#### Implementation Process

Followed strict TDD with 5 git commits:
1. test: FirstTimeSetup should initialize with empty values when no initialConfig provided (RED/GREEN)
2. test: FirstTimeSetup should pre-populate form with values from initialConfig prop (RED)
3. feat: FirstTimeSetup accepts initialConfig prop for editing mode (GREEN)
4. test: App should pass config to FirstTimeSetup when editing configuration (RED)
5. feat: App passes config to FirstTimeSetup for editing mode (GREEN)

All commits follow conventional commit format with Co-authored-by trailers.

### 6. CardDAV Testing Infrastructure (✅ Completed)

**Iteration Goal**: Establish testing infrastructure that balances speed (for TDD) with reliability (for production confidence).

**Product Value**: Enable rapid development with MSW while ensuring real-world compatibility with Docker-based E2E tests.

**Decision Made (ADR 001)**:
- **Hybrid Testing Strategy**: MSW for fast integration tests (~90%), Docker/Radicale for reliable E2E tests (~10%)
- **Rationale**: MSW enables sub-second TDD feedback; Docker validates against real CardDAV implementation
- **Implementation**: MSW in `src/test/integration/`, Docker E2E in `src/test/e2e/`

**Deliverables Completed**:
- ADR 001 revised to document hybrid approach with clear usage guidelines
- MSW mock server implemented:
  - Runs in-process with zero infrastructure
  - Serves representative birthday data in vCard format
  - Response factories ensure valid XML structure
- Integration test suite with happy path test case:
  - Fetches birthday data from mock server
  - Validates correct parsing of birthday information
  - Confirms identification of past, today, and future birthdays
- Representative test dataset:
  - Birthdays in the past (within 14-day window)
  - Birthday today
  - Upcoming birthdays

**Proof of Concept**:
- ✅ Standalone PoC script (`scripts/poc-carddav.js`) created and verified
- ✅ Successfully connects to real CardDAV server using `tsdav` library
- ✅ Fetches and parses vCard data (name and birthday fields)
- ✅ Uses environment variables for credentials (`.envrc` with `direnv`)
- ✅ Demonstrates authentication and data retrieval flow

**Next Steps for E2E**:
- Create `compose.yaml` for Radicale service
- Implement E2E tests in `src/test/e2e/`
- Configure CI to run Docker service before E2E tests

### 7. Authentication Integration (✅ Completed)

**Implementation completed using strict TDD workflow.**

#### Storage Module Extensions

**Module**: `src/utils/storage.js` with `src/utils/storage.test.js`

**Functions Implemented**:
- `saveCredentials(username, password)` - Saves to sessionStorage
- `loadCredentials()` - Loads from sessionStorage with error handling
- `clearCredentials()` - Removes credentials from sessionStorage
- `hasCredentials()` - Checks for valid credentials in sessionStorage

**Data Structure**:
- Storage key: `'birthday-briefing-credentials'`
- Credential object: `{ username: string, password: string }`
- Session-based storage (cleared on browser close)

**Test Coverage**:
- 7 new test cases for credential functions
- All tests pass (60 total tests)
- Mutation score: 80.25% on storage.js (exceeds >75% target)

#### UI Integration

**FirstTimeSetup Component**:
- Added username text input field
- Added password input field (type='password')
- Added privacy help text: "Credentials will be deleted when you close the browser"
- Integrated saveCredentials call in handleSave
- 4 new test cases covering credential fields and save integration

**Implementation Process**:
- Followed strict TDD with 8 git commits (one per green phase)
- All commits follow conventional commit format with Co-authored-by trailers
- Code review completed - all rules compliant
- No linter errors

**Test Results**:
- Total: 60 tests passing
- storage.test.js: 27 tests (7 new for credentials)
- FirstTimeSetup.test.jsx: 9 tests (4 new for credentials)
- Mutation score: 79.23% overall, 80.25% on storage.js

**User Experience**:
- First time: Enter CardDAV URL, username, password, and firstDayOfWeek
- Subsequent opens (same session): Credentials available in sessionStorage
- After browser close: Credentials cleared, URL and settings retained

### 8. Connect Real CardDAV Data (🔄 In Progress)

**Module Structure Created**:
- Created `src/services/carddavClient.js` with `fetchBirthdays()` function stub
- Created `src/services/carddavClient.test.js` with initial test structure
- tsdav dependency already installed (v2.1.6)
- Test results: 61 tests passing (1 new), 78.03% mutation score

**Next Steps**:
- Implement CardDAV connection using tsdav
- Parse vCard format to extract birthday information
- Filter birthdays within 14-day window
- Handle authentication using stored credentials
- Add comprehensive error handling

### 8. Deployment Infrastructure (✅ Completed)

- Automated deployment pipeline implemented:
  - GitHub Actions workflow for continuous deployment
  - Deploys to demo.boos.systems via FTPS (secure FTP over TLS)
  - Triggers on push to main branch or manual dispatch
  - Uses Node.js 24.x (LTS - Krypton) for builds
  - Builds project and deploys dist/ folder contents
- Configuration via GitHub Secrets:
  - FTPS_SERVER, FTPS_USERNAME, FTPS_PASSWORD (required)
  - FTPS_DANGEROUS_CLEAN_SLATE: deployment troubleshooting option
  - Secure credential management through GitHub
- Deployment troubleshooting:
  - dangerous-clean-slate option allows complete server cleanup
  - Set to false by default for safety
  - Can be temporarily enabled to resolve upload issues
- Documentation added to README.md:
  - Deployment setup instructions
  - GitHub Secrets configuration guide
  - Deployment trigger information
  - Troubleshooting section for upload problems

### 9. Development Workflow and Quality Standards (✅ Completed)

- Clean code rules established in `.cursor/rules/clean-code/`:
  - Development principles and practices
  - Mutation testing guidelines (340-mutation-testing.mdc)
  - Strict TDD workflow (600-strict-tdd.mdc)
  - Absolute priority premise for refactoring (610-absolute-priority-premise.mdc)
  - Workflow orchestrator for pre-commit checks (390-workflow-orchestrator.mdc)
- MIT License formally added (LICENSE file)
- Pre-commit workflow defined:
  - Run unit tests
  - Run mutation tests
  - Update memory bank
  - Create single commit with all changes
- Test strategy documented (docs/test-strategy.md):
  - Concise 69-line document targeting senior developers
  - Test pyramid distribution (60% unit, 30% integration, 10% E2E)
  - Hybrid testing approach for CardDAV (MSW + Docker)
  - Quality targets (>80% coverage, >75% mutation score)
  - References to config files, ADRs, and package.json (avoids duplication)
  - Key principles and privacy guidelines
- **Rule Clarification (Jan 2025)**:
  - Updated `390-workflow-orchestrator.mdc` to be language-agnostic (removes `dotnet test` command)
  - Updated `600-strict-tdd.mdc` to explicitly reference pre-commit workflow
  - Clarified that pre-commit workflow applies to every commit including TDD micro-commits
  - Acknowledged speed tradeoff of running mutation tests after every green/refactor step
  - Current test results: 60 tests passing, 79.23% mutation score (103 killed, 22 survived)

### 10. Configuration and Error Handling (Future)

- Decide how users can:
  - Change their CardDAV URL later
  - Change the first-day-of-week setting
- Define behavior and messaging when:
  - The CardDAV source is unreachable
  - No birthdays are found in the 14-day window
  - Address book data appears incomplete or inconsistent

## Layout and View Decisions

The initial layout has been implemented and can be refined based on user feedback.

### Current Implementation

- **Layout chosen**: Continuous list
  - Single chronological list showing days with birthdays
  - Clean, scannable format
- **Day inclusion chosen**: Birthday-only days
  - Shows only days that have at least one birthday
  - Reduces visual clutter and focuses attention on relevant dates
- **Visual hierarchy**:
  - Date information comes first, followed by names
  - Color coding provides quick visual scanning:
    - Past days: Muted gray
    - Today: Bold blue
    - Future days: Default black text

### Future Layout Refinements (Optional)

If user testing reveals issues, consider alternative layouts:

- "This week" and "Next week" blocks for clearer week separation
- Full 14-day timeline if users prefer seeing empty days for context
- Two-row compact grid for more compact overview
- Additional visual enhancements (icons, spacing, grouping)

## Open Questions

- CardDAV usability:
  - How easy is it for typical users to obtain and enter a CardDAV URL?
  - Is brief guidance or a help link needed?
- Multiple calendars:
  - Should V1 support only a single CardDAV source?
  - How should multiple birthday sources be handled in later versions?
- Edge cases:
  - What is the best wording when there are no birthdays in the next 14 days?
  - How should the app behave if the CardDAV source is intermittently unavailable?

## Next Steps (Implementation)

- Immediate next step (Authentication Integration):
  - **Completed**: PoC script validates `tsdav` works with real CardDAV server.
  - **Completed**: Authentication strategy decided (session-based credentials).
  - **Completed**: Testing strategy revised to Hybrid (MSW + Docker).
  - **Next**: Extend FirstTimeSetup to collect username and password with help text.
- Short-term (CardDAV Client Implementation):
  - Implement session-based credential storage (sessionStorage)
  - Extend storage module with credential functions
  - Install `tsdav` as production dependency in the main application
  - Implement CardDAV client for fetching birthday data (test-first approach)
  - Parse vCard format to extract birthday information
  - Replace hardcoded birthday data in MainScreen with real CardDAV fetching
  - Handle missing credentials case
  - Add error handling for connection failures
- Medium-term (Data Sync and Polish):
  - Build data synchronization and caching layer
  - Add loading states during data fetch
  - Handle empty state (no birthdays in 14-day window)
  - Add comprehensive error handling:
    - CardDAV connection failures
    - Authentication errors
    - Invalid or incomplete data
  - Add data refresh functionality
  - Consider adding manual refresh button

## Memory Bank Update Practices

- Update `activeContext.md` when:
  - The current implementation focus changes (for example, moving from onboarding to layout refinement).
  - New UX decisions are made about the 14-day view or configuration behavior.
  - New insights are gained from experimenting with layouts or user feedback.
- Ensure `progress.md` is updated alongside this file to reflect:
  - What has been completed.
  - What is currently in progress.
  - What remains to be explored or built.

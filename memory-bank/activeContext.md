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

### 4. Configuration Persistence (✅ Completed - Strategy)

Research and planning completed for local storage implementation:

#### Implementation Strategy

**Storage Module Design:**
- Location: `src/utils/storage.js`
- Functions to implement:
  - `saveConfig(config)` - Serialize and store configuration
  - `loadConfig()` - Load and deserialize configuration
  - `clearConfig()` - Remove configuration (for testing/reset)
  - `isConfigured()` - Check if valid configuration exists
  - `validateConfig(config)` - Validate configuration structure and values

**Data Structure:**
- Storage key: `'birthday-briefing-config'`
- Configuration object:
  ```javascript
  {
    carddavUrl: string,    // CardDAV URL, may contain embedded credentials
    firstDayOfWeek: 'monday' | 'sunday'  // User's week start preference
  }
  ```

**Validation Rules:**
- CardDAV URL: Must be valid URL format (validated using URL constructor)
- firstDayOfWeek: Must be 'monday' or 'sunday' (enum validation)
- Validate on both save and load operations

**Error Handling Strategy:**
- localStorage disabled (private browsing): Use in-memory state, app works for session only
- Corrupted data: Clear storage and return to FirstTimeSetup
- Validation failures: Clear storage and return to FirstTimeSetup
- QuotaExceededError: Log error and return to FirstTimeSetup
- All errors handled gracefully with user-friendly fallbacks

**Security Decisions:**
- No encryption needed for V1: Browser's same-origin policy provides adequate protection
- CardDAV URLs with embedded credentials are protected by origin-based security
- All loaded data will be validated and sanitized
- XSS prevention through proper React practices (avoid dangerouslySetInnerHTML)

**Component Integration Plan:**
- FirstTimeSetup.jsx:
  - Capture form values using React useState hooks
  - Validate inputs on Save button click
  - Call saveConfig() utility function
  - Pass configuration to parent via onComplete callback
- App.jsx:
  - Call isConfigured() on component mount
  - Show FirstTimeSetup if no valid config exists
  - Show MainScreen if valid config exists
  - Pass configuration as props to MainScreen
- MainScreen.jsx:
  - Accept configuration as props
  - Use firstDayOfWeek for 14-day calculation
  - Store carddavUrl for future CardDAV data fetching

**TDD Test Coverage Plan:**
- Unit tests for all storage utility functions
- Tests for successful operations (save, load, clear)
- Tests for error conditions (disabled storage, quota exceeded, corrupted data)
- Tests for validation (valid/invalid URLs, valid/invalid enum values)
- Mock localStorage in all tests
- Target: >95% code coverage, >90% mutation score

#### Next Steps for Implementation

1. Write failing test for validateConfig with valid URL (RED)
2. Implement validateConfig to pass test (GREEN)
3. Refactor if needed
4. Write failing test for saveConfig (RED)
5. Implement saveConfig (GREEN)
6. Continue TDD cycle for loadConfig, clearConfig, isConfigured
7. Integrate with FirstTimeSetup component (TDD approach)
8. Integrate with App.jsx for config detection (TDD approach)
9. Run mutation tests and improve as needed

### 5. Connect Real CardDAV Data (🔄 Next Priority After Storage)

- Replace hardcoded birthday data with CardDAV integration:
  - Implement CardDAV client for fetching birthday data
  - Parse vCard format to extract birthday information
  - Handle authentication if required
- Use stored configuration from local storage:
  - Retrieve CardDAV URL and firstDayOfWeek preference
  - Use configuration to fetch birthday data
- Add basic error handling:
  - Handle connection failures
  - Provide helpful error messages

### 6. Deployment Infrastructure (✅ Completed)

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

### 7. Development Workflow and Quality Standards (✅ Completed)

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

### 8. Configuration and Error Handling (Future)

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

- Immediate next steps (Configuration Persistence Implementation - following TDD):
  - Create src/utils/storage.js with storage utility functions
  - Write failing test for validateConfig function (red phase)
  - Implement validateConfig to pass test (green phase)
  - Write failing test for saveConfig function (red phase)
  - Implement saveConfig to pass test (green phase)
  - Write failing test for loadConfig function (red phase)
  - Implement loadConfig to pass test (green phase)
  - Continue TDD cycle for clearConfig and isConfigured
  - Write tests for error scenarios (disabled storage, corrupted data, quota exceeded)
  - Integrate with FirstTimeSetup: capture form values and call saveConfig
  - Integrate with App.jsx: check isConfigured and render appropriate component
  - Run mutation tests and improve as needed
  - Achieve target metrics: >95% coverage, >90% mutation score
- Short-term (CardDAV Integration):
  - Research and select CardDAV library (tsdav, dav, or similar)
  - Implement CardDAV client for fetching birthday data (following TDD)
  - Parse vCard format to extract birthday information
  - Replace hardcoded birthday data with real CardDAV fetching
  - Handle authentication if required
  - Add error handling for connection failures
- Medium-term (Data Sync and Polish):
  - Build data synchronization and caching layer
  - Add loading states during data fetch
  - Handle empty state (no birthdays in 14-day window)
  - Add comprehensive error handling:
    - CardDAV connection failures
    - Authentication errors
    - Invalid or incomplete data
  - Implement settings/configuration screen for updating CardDAV URL
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



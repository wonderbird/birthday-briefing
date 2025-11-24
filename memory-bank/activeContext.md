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

### 3. Connect Real CardDAV Data (Next Priority)

- Replace hardcoded birthday data with CardDAV integration:
  - Implement CardDAV client for fetching birthday data
  - Parse vCard format to extract birthday information
  - Handle authentication if required
- Implement form submission handling:
  - Capture CardDAV URL from input
  - Capture first-day-of-week preference (currently hardcoded to Monday)
  - Validate inputs before proceeding
  - Store configuration in browser local storage
- Add basic input validation:
  - Ensure CardDAV URL is properly formatted
  - Provide helpful error messages if validation fails

### 4. Deployment Infrastructure (✅ Completed)

- Automated deployment pipeline implemented:
  - GitHub Actions workflow for continuous deployment
  - Deploys to demo.boos.systems via SFTP
  - Triggers on push to main branch or manual dispatch
  - Uses Node.js 24.x (LTS - Krypton) for builds
  - Builds project and deploys dist/ folder contents
- Configuration via GitHub Secrets:
  - SFTP_SERVER, SFTP_USERNAME, SFTP_PASSWORD, SFTP_PORT
  - Secure credential management through GitHub
- Documentation added to README.md:
  - Deployment setup instructions
  - GitHub Secrets configuration guide
  - Deployment trigger information

### 5. Configuration and Error Handling (Future)

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

- Immediate next steps:
  - Implement CardDAV client library integration
  - Connect FirstTimeSetup form to capture and store configuration
  - Replace hardcoded birthday data with real CardDAV fetching
  - Implement local storage for configuration persistence
- Short-term:
  - Add URL validation for CardDAV input
  - Implement first-day-of-week preference (currently hardcoded to Monday)
  - Build data synchronization and caching layer
  - Add loading states during data fetch
  - Handle empty state (no birthdays in 14-day window)
- Medium-term:
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



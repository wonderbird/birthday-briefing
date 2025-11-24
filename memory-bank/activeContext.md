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
  - "Get Started" button
  - Footer note about open-source MIT license
- Design decisions made:
  - Single-screen approach (minimal, focused on configuration)
  - Bootstrap 5.3.2 for consistent, responsive UI
  - Vertically centered layout with max-width 500px
  - Clean card-based form design

### 2. Connect Configuration to Logic (Next Priority)

- Implement form submission handling:
  - Capture CardDAV URL from input
  - Capture first-day-of-week preference
  - Validate inputs before proceeding
  - Store configuration in browser local storage
- Add basic input validation:
  - Ensure CardDAV URL is properly formatted
  - Provide helpful error messages if validation fails

### 3. Define the 14-Day View

- Clarify the main framing and wording:
  - Title such as "Birthdays this and next week" or similar
  - Subtext that reinforces privacy and the 14-day scope if needed
- Design how birthdays are displayed:
  - Primary reading order: date → name
  - Include weekday and date information for each birthday
- Ensure it is easy to see:
  - Which birthdays are today
  - Which have already passed within the 14-day window
  - Which are upcoming

### 4. Configuration and Error Handling (Future)

- Decide how users can:
  - Change their CardDAV URL later
  - Change the first-day-of-week setting
- Define behavior and messaging when:
  - The CardDAV source is unreachable
  - No birthdays are found in the 14-day window
  - Address book data appears incomplete or inconsistent

## Layout and View Experiments

The project will intentionally explore multiple layouts for the 14-day view to find the version that best supports quick understanding of “who has a birthday when.”

### Layout Variants

- Continuous 14-day list:
  - A single, chronological list from Day 1 to Day 14.
- “This week” and “Next week” blocks:
  - Two sections:
    - This week (days 1–7)
    - Next week (days 8–14)
- Two-row compact overview:
  - Two rows, each representing one week.
  - Each day represented as a small cell with birthdays indicated.

### Day Inclusion Variants

For each layout, two day-inclusion strategies will be compared:

- Full timeline:
  - Show all 14 days, including those without birthdays.
- Birthday-only days:
  - Show only days that have at least one birthday.

### Evaluation Approach

- Main decision criterion:
  - How quickly and effortlessly it feels to answer the question: “Who has a birthday when in the next 14 days?”
- Evaluation method:
  - Rely on subjective feeling of ease and effort when scanning each layout.
  - Prefer the variant that feels most natural, fast, and low-friction to read.
- Current hypothesis:
  - Birthday-only days lists may be faster to scan than full 14-day timelines, because they contain less visual information and focus only on relevant dates.

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
  - Add form handling logic to FirstTimeSetup component
  - Implement local storage persistence for configuration
  - Add basic URL validation for CardDAV input
  - Create routing/state logic to transition from setup to main view
- Short-term:
  - Design and implement the 14-day birthday view UI (static/mock data first)
  - Create sample birthday data structure for prototyping
  - Experiment with layout variants:
    - Continuous list vs. week blocks vs. compact grid
    - Full timeline vs. birthday-only days
- Medium-term:
  - Implement CardDAV client for fetching birthday data
  - Build data synchronization and caching layer
  - Add error handling for network and data issues

## Memory Bank Update Practices

- Update `activeContext.md` when:
  - The current implementation focus changes (for example, moving from onboarding to layout refinement).
  - New UX decisions are made about the 14-day view or configuration behavior.
  - New insights are gained from experimenting with layouts or user feedback.
- Ensure `progress.md` is updated alongside this file to reflect:
  - What has been completed.
  - What is currently in progress.
  - What remains to be explored or built.



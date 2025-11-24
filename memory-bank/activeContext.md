# Active Context – Birthday Briefing

## Current Product Focus (V1)

- Deliver a simple, reliable 14-day birthday overview:
  - The view always starts on the first day of the current week.
  - The first day of the week (Monday or Sunday) is user-configurable.
  - The visible range covers 14 consecutive days, effectively “this week and next week.”
- Use a CalDAV URL as the single configuration input for birthday data, plus the first-day-of-week preference.
- Keep the experience calm and privacy-first:
  - No notifications.
  - No accounts, no tracking, and no server-side birthday storage.

## Current Priorities (Business and User Perspective)

### 1. Define the 14-Day View

- Clarify the main framing and wording, for example:
  - Title such as “Birthdays this and next week” or similar.
  - Subtext that reinforces privacy and the 14-day scope if needed.
- Design how birthdays are displayed:
  - Primary reading order: date → name.
  - Include weekday and date information for each birthday.
- Ensure it is easy to see:
  - Which birthdays are today.
  - Which have already passed within the 14-day window.
  - Which are upcoming.

### 2. Onboarding and Privacy Messaging

- First-run configuration flow:
  - Request CalDAV URL (and credentials only if necessary).
  - Ask for first-day-of-week preference (Monday or Sunday).
- Provide a concise, clear privacy explanation:
  - Data stays on the device and in local storage.
  - No accounts, ads, or tracking.
  - Open-source under MIT license.

### 3. Configuration and Error Handling

- Decide how users can:
  - Change their CalDAV URL later.
  - Change the first-day-of-week setting.
- Define behavior and messaging when:
  - The CalDAV source is unreachable.
  - No birthdays are found in the 14-day window.
  - Calendar data appears incomplete or inconsistent (for example, birthdays with missing names).

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

- CalDAV usability:
  - How easy is it for typical users to obtain and enter a CalDAV URL?
  - Is brief guidance or a help link needed?
- Multiple calendars:
  - Should V1 support only a single CalDAV source?
  - How should multiple birthday sources be handled in later versions?
- Edge cases:
  - What is the best wording when there are no birthdays in the next 14 days?
  - How should the app behave if the CalDAV source is intermittently unavailable?

## Next Steps (Business and UX)

- Finalize wording for:
  - Screen titles and subtitles in the 14-day view.
  - Empty states (no birthdays in the 14-day period).
  - Privacy explanation on first use.
  - Configuration labels and any brief help text.
- Sketch low-fidelity versions of:
  - First-run setup screen (CalDAV + first-day-of-week).
  - 14-day view in the different layout variants.
  - Simple settings screen for changing configuration.
- Prototype layout variants with realistic sample data to:
  - Compare continuous vs. “this week/next week” vs. 2-row views.
  - Compare full timeline vs. birthday-only days.

## Memory Bank Update Practices

- Update `activeContext.md` when:
  - The current implementation focus changes (for example, moving from onboarding to layout refinement).
  - New UX decisions are made about the 14-day view or configuration behavior.
  - New insights are gained from experimenting with layouts or user feedback.
- Ensure `progress.md` is updated alongside this file to reflect:
  - What has been completed.
  - What is currently in progress.
  - What remains to be explored or built.



# Product Context – Birthday Briefing

## Why This Project Exists

Missing or overlooking birthdays feels bad, especially for close friends and valued colleagues. It can create a sense of guilt or embarrassment and send the wrong signal about how much a relationship is valued.

In practice, birthdays often stop appearing reliably when people:

- Switch phones (for example, between Android and iOS)
- Change calendar or contacts apps
- Move between ecosystems or adjust privacy settings

At the same time, many users are uncomfortable sharing detailed contact and birthday information with large platforms such as Google, Apple, or Microsoft. They want the benefits of birthday reminders without the privacy trade-offs.

This project exists to provide a small, focused, privacy-first tool that restores confidence in remembering upcoming birthdays, independent of any specific vendor ecosystem.

## Problems This Product Solves

### Fragile Birthday Visibility

- Birthdays are often stored in calendars or contacts that are tightly coupled to specific platforms.
- When users change devices, apps, or accounts, birthdays can disappear from their visible calendars even though the underlying data still exists.

### Overloaded Calendars

- Traditional calendars mix birthdays with meetings, appointments, and tasks.
- Birthdays become just another event type, which makes it harder to see them at a glance during weekly planning.

### Privacy Concerns

- Getting automated birthday reminders from major platforms usually requires sharing detailed personal information about contacts.
- Privacy-conscious users may be unwilling to grant that level of access, even if they value the functionality.

This product aims to address these issues by offering a dedicated, privacy-respecting birthday overview tied to a CalDAV source that the user controls.

## Target User Context and Behaviors

### Planning Moments

- Users typically plan their week or short-term horizon once or a few times per week, for example:
  - Sunday evening, looking ahead to the coming week
  - Monday morning, during or before work planning
- In these moments, they may check:
  - A main calendar
  - A task manager
  - Notes or planning documents

The birthday app becomes one more intentional check in this planning routine: “Who has a birthday in the coming days?”

### Devices and Access

- Primary access is via a phone, but tablets and personal computers are also used for planning.
- A browser-based web application is therefore a good fit:
  - It works on multiple device types.
  - It does not require installing a native app for each platform.

### User Behavior Patterns

- Users are willing to open a dedicated tool for birthdays when planning.
- They prefer calm tools that do not send notifications or demand constant attention.
- They value clear, trustworthy privacy assurances and control over where their contacts’ data flows.

## Value Proposition

### Functional Value

- A clear, single-purpose 14-day birthday overview:
  - Anchored to the first day of the current week (Monday or Sunday, user preference).
  - Always shows “this week and next week” together as a continuous period.
- Reliable alignment with the user’s CalDAV-based birthday data.
- Quick understanding of “who has a birthday when” in the short-term horizon.

### Emotional Value

- Confidence: “With this app, I will be sure to remember your birthday.”
- Reduced guilt and embarrassment from forgotten birthdays.
- A stronger sense of being organized and in control of important social dates.

### Privacy Value

- No server-side storage of birthday data.
- No accounts, no ads, and no tracking.
- Data remains on the device, apart from the necessary access to the user’s CalDAV resource.
- Open-source under an MIT license, allowing others to inspect and trust the implementation.

## User Experience Goals

### Simplicity

- Minimal configuration:
  - CalDAV URL (with required credentials if necessary)
  - First day of the week (Monday or Sunday)
- Limited number of screens and decisions.
- Clear language that aligns with how users think: “birthdays in the next 14 days.”

### Calm Design

- No notifications or alerts.
- The app does not push the user; instead, it is used intentionally during planning.
- Wording favors clarity and calm over urgency or pressure.

### Consistent Time Framing

- The view always starts on the user’s configured first day of the current week.
- The visible range is consistently 14 days:
  - This week
  - Next week
- This consistency is intended to help users feel they have their upcoming birthdays “under control.”

### Fast Comprehension

- Layout and ordering prioritize speed of understanding “who has a birthday when.”
- The hierarchy is date → name, reflecting how users scan the view.
- Visual cues distinguish:
  - Past days within the 14-day window
  - Today
  - Upcoming days

## Market and Alternatives

### Common Alternatives

- Built-in calendars (Google Calendar, Apple Calendar, Outlook).
- Social networks that display birthdays.
- Contact managers that show birthdays in contact details.

### Limitations of Alternatives

- Tightly coupled to specific ecosystems and user accounts.
- Often require broad data sharing and permissions.
- Mix birthdays among many other events, reducing visibility.
- May encourage more notifications and noise instead of a calm planning rhythm.

### Positioning

- A niche, focused utility that:
  - Concentrates on the next 14 days of birthdays.
  - Stays independent of any single vendor ecosystem.
  - Emphasizes privacy and calm usage over engagement metrics or growth.

## Relationship to Other Memory Bank Files

- Builds directly on the scope and goals defined in `projectbrief.md`.
- Provides the “why” (motivation, problems, user context) and high-level “how it should feel” for the product.
- Informs:
  - `activeContext.md` for current focus, layout experiments, and UX decisions.
  - `systemPatterns.md` for architectural choices that support privacy and simplicity.
  - `techContext.md` for technical choices that align with the product’s constraints and values.



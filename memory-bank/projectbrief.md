# Project Brief – Birthday Briefing

## Core Idea

Create a calm, privacy-first birthday overview app that shows who has a birthday in the next 14 days, based on a CardDAV source, so users can reliably remember and celebrate the people who matter to them.

## Problem Statement

People often forget or notice birthdays too late, especially after changing phones, calendar apps, or contact systems. This leads to feelings of guilt, embarrassment, and missed opportunities to show care.

Today, most users rely on:

- Built-in calendars from large platforms (Google, Apple, Microsoft)
- Social networks or contact apps that surface birthdays

These options have important drawbacks:

- Depend on specific ecosystems, so birthdays can disappear when switching devices or apps
- Mix birthdays with many other events, making them easy to overlook
- Typically require sharing personal contact and birthday data with large providers, which conflicts with privacy preferences

There is a gap for a simple, dedicated, privacy-focused tool that gives a reliable short-term view of upcoming birthdays without tying the user to any specific vendor ecosystem.

## Goals and Success Criteria

### Primary Product Goal (V1)

Help users confidently know whose birthday is coming up in the next 14 days, without leaking personal data and without overwhelming them with complexity or notifications.

### Success Criteria – User

- The user can answer, within a few seconds of opening the app, who has a birthday and on which day during the next 14 days.
- The user no longer feels surprised or embarrassed because they “forgot” an important birthday that was in their calendar source.
- The app feels calm and non-intrusive: the user opens it when planning; it does not push itself onto them.

### Success Criteria – Product

- First-time setup can be completed in under two minutes, using only a CardDAV URL and minimal additional inputs.
- If a birthday exists in the configured CardDAV source and falls within the visible 14-day period, it appears correctly in the app.
- The main 14-day view remains stable and predictable, anchored to the user’s configured first day of the week.

### Success Criteria – Personal Learning

- The project provides a practical, contained environment to learn and practice React and frontend development.
- The scope remains small enough to iterate quickly on UX and layout experiments without overcomplicating the codebase.

## Target Users

### Primary Users

- Privacy-conscious individuals who:
  - Like to acknowledge friends’ and colleagues’ birthdays
  - Intentionally plan their week or short-term horizon
  - Prefer not to share personal contact and birthday data with large platforms

### Secondary Users

- General users who want:
  - A simple, dedicated birthday overview separate from their main calendar
  - A tool that remains usable across devices and platforms via the browser

## Scope for Version 1

### In Scope

- 14-day birthday overview
  - Shows birthdays from the first day of the current week (configurable Monday or Sunday) covering 14 consecutive days.
  - The visible period is always anchored to the start of the current week, ensuring the view feels consistent over time.
  - Birthdays are sorted chronologically within this 14-day window.
  - Each birthday entry focuses on date → name, including weekday and date information.

- Weekly planning alignment
  - The 14-day horizon effectively represents “this week and next week” from the user’s planning perspective.
  - The view clearly distinguishes:
    - Days before today (within the visible 14-day window)
    - Today
    - Upcoming days after today (within the 14-day window)

- Simple onboarding
  - On first open, the app asks for minimal configuration:
    - CardDAV URL (with only the necessary credentials if required to read birthday data)
    - First day of the week (Monday or Sunday)
  - After configuration, the app:
    - Fetches birthdays from the CardDAV source
    - Stores relevant birthday data and configuration locally in the browser

- Data handling and caching
  - On subsequent opens, the app:
    - Immediately shows the cached 14-day birthday view based on local storage
    - Checks in the background for updates from the CardDAV source
    - Updates the visible list if changes affect birthdays in the current 14-day period

- Privacy commitments (experience level)
  - No account creation.
  - No server-side storage of birthday data.
  - No ads and no tracking or analytics scripts.
  - Clear, simple privacy explanation on first use, stating that data stays on the device.
  - Open-source project under the MIT license.

### Out of Scope for V1

- Notifications or reminders (push, email, system notifications).
- Prioritization or tagging of “very important” contacts.
- Gift suggestions, message templates, or sending birthday messages.
- Month, quarter, or year views of birthdays.
- Complex contact management features (adding, editing, or deleting contacts).
- Cross-device synchronization beyond what CardDAV itself provides.
- Any server-side user account system or multi-user features.

## Constraints and Principles

- Privacy-first by design:
  - All birthday and contact-related data stays in the user’s browser storage.
  - The only external interaction is with the user-configured CardDAV source.

- Simplicity:
  - Minimal number of screens and configuration steps.
  - Clear language focused on “birthdays in the next 14 days.”

- Calm usage:
  - The app does not send notifications or attempt to re-engage the user.
  - It is a tool the user chooses to open during their planning moments.

- Portability:
  - Implemented as a browser-based web app, suitable for phones, tablets, and personal computers.

## Relationship to Other Memory Bank Files

- This document defines the core requirements, goals, and scope for the project.
- `productContext.md` expands on why the project exists, the problems it solves, and the broader user experience goals.
- `systemPatterns.md` and `techContext.md` describe how the system is structured and which technologies are used to realize this brief.
- `activeContext.md` translates this brief into the current focus, experiments, and immediate next steps.
- `progress.md` tracks how far the implementation has moved towards fulfilling this brief and what remains to be done.



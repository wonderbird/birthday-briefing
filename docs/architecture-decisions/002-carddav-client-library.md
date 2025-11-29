# Selection of CardDAV Client Library

* Status: proposed
* Date: 2025-11-29

## Context and Problem Statement

The **Birthday Briefing** project is a privacy-centric web application designed to display upcoming birthdays sourced from a user-configured CardDAV server. Currently, the application uses mock data. We need to select a CardDAV client library to fetch real data from the user's CardDAV server directly in the browser. The solution must handle authentication, parsing of vCard data, and potentially data synchronization, while respecting the project's constraints (client-side only, privacy-first, minimal dependencies).

## Decision Drivers

* **Privacy:** The library must run entirely in the browser (client-side) to ensure no user credentials or data are sent to an intermediate server.
* **Bundle Size:** The library should be lightweight to maintain fast load times and optimal performance on mobile devices.
* **Maintenance:** The library should be actively maintained to ensure compatibility with modern browser standards and security updates.
* **Ease of Use:** The API should be straightforward, ideally with good documentation or examples, to facilitate rapid implementation and maintenance.
* **Browser Compatibility:** The library must function reliably across modern web browsers (CORS handling, XML parsing).
* **License:** The library must have a permissive license compatible with the project's MIT license.

## Considered Options

* tsdav
* dav
* vdir
* Custom Implementation (fetch + XML parsing)

## Decision Outcome

Undecided.

## Pros and Cons of the Options

### tsdav

[To be evaluated]

### dav

[To be evaluated]

### vdir

[To be evaluated]

### Custom Implementation (fetch + XML parsing)

[To be evaluated]


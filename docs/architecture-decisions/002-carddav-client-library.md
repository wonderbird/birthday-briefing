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
* dav (npm: dav)
* Custom Implementation (fetch + XML parsing)

## Decision Outcome

Undecided.

## Pros and Cons of the Options

### tsdav

A modern, TypeScript-based library for WebDAV, CalDAV, and CardDAV.

* **Good, because** it is actively maintained and modern (TypeScript support).
* **Good, because** it is designed to work in both browser and Node.js environments.
* **Good, because** it abstracts the complexity of XML parsing and CardDAV protocol details.
* **Bad, because** it might include code for WebDAV/CalDAV that is not needed (larger bundle size).
* **Bad, because** it is relatively new and might have fewer users than established (but old) libraries.

### dav (npm: dav)

A mature JavaScript library for WebDAV, CalDAV, and CardDAV.

* **Good, because** it has been around for a long time.
* **Good, because** it covers the full protocol stack.
* **Bad, because** it appears to be unmaintained (last publish >5 years ago).
* **Bad, because** it relies on older XHR or polyfills that might bloat the bundle or cause issues in modern React 19 environments.
* **Bad, because** it lacks TypeScript definitions out of the box.

### Custom Implementation (fetch + XML parsing)

Implementing a minimal CardDAV client using the browser's native `fetch` API and a lightweight XML parser (e.g., `fast-xml-parser` or DOMParser).

* **Good, because** it offers the smallest possible bundle size (only what is needed).
* **Good, because** it gives full control over the implementation and error handling.
* **Good, because** it avoids dependencies on unmaintained or heavy libraries.
* **Bad, because** it requires implementing the CardDAV protocol (REPORT, PROPFIND, vCard parsing) manually, which is complex and error-prone.
* **Bad, because** it increases the maintenance burden on the project team.
* **Bad, because** edge cases in XML responses from different servers might be missed.


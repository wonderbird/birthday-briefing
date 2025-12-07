# Selection of CardDAV Client Library

* Status: accepted
* Date: 2025-11-29

## Context and Problem Statement

The **Birthday Briefing** project is a privacy-centric web application designed to display upcoming birthdays sourced from a user-configured CardDAV server. Currently, the application uses mock data. We need to select a CardDAV client library to fetch real data from the user's CardDAV server directly in the browser. The solution must handle authentication, parsing of vCard data, and potentially data synchronization, while respecting the project's constraints (client-side only, privacy-first, minimal dependencies).

## Decision Drivers

* **Maintenance Status:** The library should be actively maintained to ensure compatibility with modern browser standards and security updates.
* **Developer Experience:** Preference for TypeScript support, modern APIs, and good documentation to facilitate rapid implementation and maintenance.
* **Bundle Size / Efficiency:** The library should be lightweight to maintain fast load times and optimal performance on mobile devices.

## Constraints

* **Privacy/Architecture:** The library must run entirely in the browser (client-side) to ensure no user credentials or data are sent to an intermediate server.
* **Browser Compatibility:** The library must function reliably across modern web browsers (handling CORS, XML parsing).
* **License:** The library must have a permissive license compatible with the project's MIT license.

## Decision Matrix & Recommendation

| Option | Maintenance Status | Developer Experience | Bundle Size / Efficiency |
| :--- | :---: | :---: | :---: |
| **tsdav** | + | + | / |
| **dav (npm)** | - | - | / |
| **Custom Implementation** | / | - | + |

### Recommendation

We recommend **tsdav**. It is the only actively maintained library with native TypeScript support, which significantly improves developer experience and long-term viability. While it may have a larger bundle size than a custom implementation, this can be mitigated via tree-shaking and is a worthwhile trade-off to avoid the high maintenance burden and complexity of implementing the CardDAV protocol manually.

## Considered Options

* tsdav
* dav (npm: dav)
* Custom Implementation (fetch + XML parsing)

## Decision Outcome

Chosen option: "tsdav", because it offers the best balance of active maintenance, modern developer experience (TypeScript), and functionality, with acceptable trade-offs in bundle size that can be mitigated.

### Browser Compatibility Implementation (Updated: 2025-12-07)

While tsdav is designed for both browser and Node.js environments, it requires specific configuration in Vite to work properly in browsers. Two issues were discovered and resolved during production testing:

#### Issue 1: Node.js Module Polyfills

**Problem:** tsdav depends on Node.js built-in modules (`stream`, `buffer`, `util`, `process`) that don't exist in browsers by default. Vite externalized these modules, causing "Module has been externalized" errors.

**Solution Implemented:**
- Added `vite-plugin-node-polyfills` as a development dependency
- Configured Vite to polyfill required Node.js modules: `stream`, `buffer`, `util`, `process`
- Enabled global shims for `Buffer`, `global`, and `process`

#### Issue 2: cross-fetch "Illegal Invocation" Error

**Problem:** tsdav uses the `cross-fetch` library, which exports `window.fetch` as a named export. When imported as `{ fetch }`, the function loses its binding to the `window` object, causing "Failed to execute 'fetch' on 'Window': Illegal invocation" errors when connecting to real CardDAV servers.

**Root Cause:** The default `cross-fetch` build (ponyfill) exports a reference to `window.fetch` without proper binding. Native browser APIs like `fetch` require `this` to be the `window` object.

**Solution Implemented:**
- Added `resolve.alias` configuration in `vite.config.js`
- Explicitly aliased `cross-fetch` to `cross-fetch/dist/browser-polyfill.js`
- The polyfill version properly patches the global object and maintains correct `this` context

**Bundle Size Impact:**
- Final bundle: 429.28 KB raw / 132.00 KB gzipped
- The polyfill and cross-fetch configurations add minimal overhead compared to alternatives

**Trade-off Assessment:**
The bundle size is acceptable for a privacy-first, client-side-only architecture that avoids proxy servers. The polyfills enable full CardDAV functionality while maintaining the zero-server-side-storage constraint.

**Configuration Details:**
See `vite.config.js` for the complete polyfill and module resolution configuration. The implementation uses selective polyfilling (only required modules) to minimize bundle size impact.

**Lessons Learned:**
- Mocked tests cannot catch context binding issues with native browser APIs
- Module resolution matters for libraries that provide multiple build targets
- "Illegal invocation" errors indicate loss of proper `this` context for native APIs
- `cross-fetch` ponyfill vs polyfill distinction is critical for browser compatibility

## Pros and Cons of the Options

### tsdav

A modern, TypeScript-based library for WebDAV, CalDAV, and CardDAV.

* **Good, because** it is actively maintained and modern (TypeScript support).
* **Good, because** it is designed to work in both browser and Node.js environments.
* **Good, because** it abstracts the complexity of XML parsing and CardDAV protocol details.
* **Bad, because** it might include code for WebDAV/CalDAV that is not needed (larger bundle size).
* **Bad, because** it is relatively new and might have fewer users than established (but old) libraries.

**Mitigations for Negative Consequences:**
* **Tree Shaking:** Ensure that the build process (Vite) is configured to tree-shake unused exports from `tsdav` to minimize the final bundle size.
* **Testing:** Implement comprehensive integration tests (using the already established MSW mock server) to verify behavior across different CardDAV response scenarios.
* **Node.js Polyfills (Implemented):** Use `vite-plugin-node-polyfills` to provide browser-compatible implementations of Node.js modules (`stream`, `buffer`, `util`, `process`) required by tsdav. This adds ~34 KB gzipped to the bundle but enables full browser functionality without architectural changes.

### dav (npm: dav)

A mature JavaScript library for WebDAV, CalDAV, and CardDAV.

* **Good, because** it has been around for a long time.
* **Good, because** it covers the full protocol stack.
* **Bad, because** it appears to be unmaintained (last publish >5 years ago).
* **Bad, because** it relies on older XHR or polyfills that might bloat the bundle or cause issues in modern React 19 environments.
* **Bad, because** it lacks TypeScript definitions out of the box.

**Mitigations for Negative Consequences:**
* **Forking:** If critical bugs are found or modern browser compatibility issues arise, the project could fork the repository to apply fixes.
* **Polyfills:** Use modern polyfills only where strictly necessary.
* **Type Definitions:** Create a `d.ts` declaration file for the specific subset of the API used by the project.

### Custom Implementation (fetch + XML parsing)

Implementing a minimal CardDAV client using the browser's native `fetch` API and a lightweight XML parser (e.g., `fast-xml-parser` or DOMParser).

* **Good, because** it offers the smallest possible bundle size (only what is needed).
* **Good, because** it gives full control over the implementation and error handling.
* **Good, because** it avoids dependencies on unmaintained or heavy libraries.
* **Bad, because** it requires implementing the CardDAV protocol (REPORT, PROPFIND, vCard parsing) manually, which is complex and error-prone.
* **Bad, because** it increases the maintenance burden on the project team.
* **Bad, because** edge cases in XML responses from different servers might be missed.

**Mitigations for Negative Consequences:**
* **Scope Limitation:** Strictly limit the implementation to the minimum required features (fetching birthdays for a date range).
* **Standard parsers:** Use the browser's built-in `DOMParser` to handle XML parsing safely and robustly.
* **Reference Implementation:** Use open-source libraries (like `tsdav` or `dav`) as reference implementations to understand the correct XML structures.

## Links

* [tsdav GitHub Repository](https://github.com/natelindev/tsdav)
* [dav GitHub Repository](https://github.com/pimutils/dav)
* [WebDAV RFC 4918](https://datatracker.ietf.org/doc/html/rfc4918)
* [CardDAV RFC 6352](https://datatracker.ietf.org/doc/html/rfc6352)

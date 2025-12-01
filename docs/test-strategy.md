# Test Strategy

## Philosophy

Strict TDD with hybrid testing approach: MSW for speed (~90%), Docker for real-world validation (~10%). All production code written in red-green-refactor cycles. Test effectiveness validated via mutation testing (target >75%).

## Test Pyramid

```
   E2E (Docker)      ~10% - Real CardDAV validation
  /              \   
 / Integration   \   ~30% - MSW mocked integration
/     (MSW)       \  
/      Unit       \  ~60% - Pure functions, components
/__________________\
```

### Distribution Rationale

- **Unit (~60%)**: Pure functions (dateUtils, storage), React components. Co-located with source files.
- **Integration (~30%)**: CardDAV client + UI state. MSW intercepts fetch in `src/test/integration/`. Mock responses via factories (`src/test/factories/`), fixtures (`src/test/fixtures/`), and server setup (`src/mocks/`).
- **E2E (~10%)**: Real server validation. Docker Compose + Radicale (`compose.yaml`). Tests in `src/test/e2e/`.

**Commands**: See `package.json` scripts section.

## Quality Targets

- **Coverage**: >80% on business logic (config: `vitest.config.js`, reports: `coverage/`)
- **Mutation Score**: >75% overall (config: `stryker.config.json`, reports: `reports/mutation/`)

**Baseline** (as of authentication integration):

- Overall mutation: 83.50%
- dateUtils: 90.48%, storage: 80.25%

**Analysis**: Use `jq` with `reports/mutation/mutation.json` or view HTML reports. Acceptable survived mutants: type checks, error messages. Investigate: boundary conditions.

## TDD Workflow

Red → Green (commit) → Refactor (commit). Use `.only()` during development. Before commit: run all tests + mutation tests + update memory bank. See `.cursor/rules/clean-code/600-strict-tdd.mdc` for details.

**Tool Configuration**: `vitest.config.js`, `stryker.config.json`. Dependencies in `package.json`.

## CardDAV Testing

**Strategy**: Hybrid approach per [ADR 001](./architecture-decisions/001-carddav-mock.md) - MSW for speed, Docker/Radicale for reliability.

**Library**: `tsdav` per [ADR 002](./architecture-decisions/002-carddav-client-library.md).

**Test Data**: vCard fixtures in `src/test/fixtures/`, XML factories in `src/test/factories/`. All synthetic data (no real contacts). Mock server config in `src/mocks/`.

**Privacy**: Never commit credentials. Use `.envrc`/`direnv` locally, GitHub Secrets in CI. Test accounts only.

## Key Principles

- Test behavior, not implementation
- Colocate tests with source files
- Design for testability (pure functions, dependency injection)
- Investigate survived mutants
- Keep unit tests fast (<milliseconds)
- Run full suite before merging to main

## References

- Commands: `package.json` scripts, `README.md`
- Configuration: `vitest.config.js`, `stryker.config.json`, `compose.yaml`
- ADRs: [001 (Testing Strategy)](./architecture-decisions/001-carddav-mock.md), [002 (CardDAV Library)](./architecture-decisions/002-carddav-client-library.md)
- Rules: `.cursor/rules/clean-code/600-strict-tdd.mdc`, `.cursor/rules/clean-code/340-mutation-testing.mdc`, `.cursor/rules/clean-code/390-workflow-orchestrator.mdc`


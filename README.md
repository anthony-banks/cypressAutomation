# cypressAutomation

[![Cypress E2E](https://github.com/anthony-banks/cypressAutomation/actions/workflows/cypress.yml/badge.svg)](https://github.com/anthony-banks/cypressAutomation/actions/workflows/cypress.yml)

End-to-end UI test suite written in Cypress that exercises common web interactions against a live demo site.

## What's under test

The suite targets **[the-internet.herokuapp.com](https://the-internet.herokuapp.com)** — a public sandbox of tricky UI scenarios maintained by Sauce Labs. The current spec (`heroku_app_tests.cy.js`) covers four flows:

- **Checkboxes** — navigates to the Checkboxes page and asserts checkbox count, initial state, and toggling.
- **Context Menu** — triggers a right-click hot spot and verifies the resulting browser alert text.
- **Dropdown** — selects options from a native `<select>` and asserts the chosen value.
- **Basic Auth** — submits HTTP Basic Auth credentials (sourced from a fixture) and confirms access.

## Tech stack

- [Cypress](https://www.cypress.io/) (`^13`)
- JavaScript
- Node.js

## Project structure

```
cypress/
├── e2e/
│   └── tests/
│       └── heroku_app_tests.cy.js   # spec files
├── fixtures/
│   └── auth.json                    # test data (Basic Auth credentials)
└── support/
    ├── commands.js                  # custom Cypress commands
    └── e2e.js                       # global setup, loaded before each spec
cypress.config.js                    # baseUrl, retries, video/screenshot config
```

**Patterns used:**

- **Fixture-driven test data** — the Basic Auth flow loads credentials from `cypress/fixtures/auth.json` via `cy.fixture('auth')` and aliases them, keeping test data out of the spec body.
- **Custom commands** — `cypress/support/commands.js` is the project's extension point for reusable `Cypress.Commands.add(...)` helpers, loaded globally through `support/e2e.js`.

## Running the tests

Install dependencies first:

```bash
npm install
```

**Interactive (Cypress Test Runner):**

```bash
npx cypress open
```

Then select **E2E Testing**, choose a browser, and pick a spec file to run.

**Headless (CI / terminal):**

```bash
npx cypress run
```

## Test artifacts

- **Videos** of every run are recorded to `cypress/videos/`.
- **Screenshots** are captured automatically on failure to `cypress/screenshots/`.

Both directories are git-ignored. In CI they are uploaded as build artifacts when a run fails (see the workflow below).

## Continuous integration

Tests run automatically on every push and pull request to `main` via GitHub Actions using the official [`cypress-io/github-action`](https://github.com/cypress-io/github-action). See [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml).

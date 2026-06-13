# cypressAutomation

[![Cypress E2E](https://github.com/anthony-banks/cypressAutomation/actions/workflows/cypress.yml/badge.svg)](https://github.com/anthony-banks/cypressAutomation/actions/workflows/cypress.yml)

End-to-end UI test suite written in Cypress that exercises common web interactions against a live demo site.

## What's under test

The suite targets **[the-internet.herokuapp.com](https://the-internet.herokuapp.com)** — a public sandbox of tricky UI scenarios maintained by Sauce Labs. It covers 17 tests across these flows:

- **Checkboxes** — asserts checkbox count, initial state, and toggling.
- **Context Menu** — triggers a right-click hot spot and verifies the resulting browser alert text.
- **Dropdown** — selects options from a native `<select>` and asserts the chosen value.
- **Basic Auth** — submits HTTP Basic Auth credentials (sourced from a fixture) and confirms access.
- **Form Authentication** — logs in with valid and invalid credentials, asserting success/error flash messages and redirect to the secure area.
- **Add / Remove Elements** — adds and removes elements, asserting the resulting DOM count.
- **Dynamic Loading** — waits for an element that is hidden (then revealed) and one that is rendered into the DOM after a delay.
- **JavaScript Alerts** — handles native `alert`, `confirm` (OK/Cancel), and `prompt` dialogs and asserts the result text.
- **Status Codes** — navigates to 200/301/404/500 pages and asserts both the page message and the actual HTTP status via `cy.request()`.

## Tech stack

- [Cypress](https://www.cypress.io/) (`^13`)
- JavaScript
- Node.js

## Project structure

```
cypress/
├── e2e/
│   └── tests/
│       ├── heroku_app_tests.cy.js     # checkboxes, context menu, dropdown, basic auth
│       ├── form_authentication.cy.js  # login (valid + invalid)
│       ├── add_remove_elements.cy.js  # add/remove DOM elements
│       ├── dynamic_loading.cy.js      # waiting on async elements
│       ├── javascript_alerts.cy.js    # alert / confirm / prompt
│       └── status_codes.cy.js         # 200 / 301 / 404 / 500
├── fixtures/
│   ├── auth.json                      # Basic Auth credentials
│   └── users.json                     # Form Authentication credentials
└── support/
    ├── commands.js                    # custom Cypress commands (e.g. cy.login)
    └── e2e.js                         # global setup, loaded before each spec
cypress.config.js                      # baseUrl, retries, video/screenshot config
```

**Patterns used:**

- **Fixture-driven test data** — credentials live in `cypress/fixtures/` (`auth.json`, `users.json`) and are loaded via `cy.fixture(...)` and aliased, keeping test data out of the spec bodies.
- **Custom commands** — `cypress/support/commands.js` defines reusable helpers such as `cy.login(username, password)`, loaded globally through `support/e2e.js` and used by the Form Authentication spec.

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

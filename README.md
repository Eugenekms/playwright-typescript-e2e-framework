# Playwright E2E & API Test Automation Suite

An automated UI and API testing framework built with **Playwright** and **TypeScript** for the [Practice Software Testing](https://practicesoftwaretesting.com/) application.

---

## 🛠 Tech Stack & Key Features

- **Automation Tool**: [Playwright](https://playwright.dev/) with **TypeScript**
- **Design Pattern**: Page Object Model (POM) with Custom Fixtures
- **Test Data**: Dynamic data generation using [@faker-js/faker](https://fakerjs.dev/)
- **Reporting**: Allure Reports & Playwright Native HTML Reporter
- **CI/CD & Containerization**: GitHub Actions pipeline & Docker support

---

## 🏗 Architecture & Authentication Strategy

This project leverages Playwright's **Global Authentication Setup** pattern to optimize execution speed:

```text
[.env / CI Secrets] ──(Credentials)──> [auth.setup.ts] ──(Authenticates)──> [user.json] ──> [E2E Tests]
```

1. **Setup Phase (`tests/setup/auth.setup.ts`)**: Runs prior to browser tests. Reads test credentials from `.env`, logs into the application, and saves the session state (cookies & `localStorage`) to `playwright/.auth/user.json`.
2. **State Reuse**: UI test projects (`chromium`) load `user.json` via the `storageState` config option.
3. **Efficiency**: Authentication executes **once per test run** rather than before every single test case, speeding up CI execution times by up to 70%.

---

## 🏃‍♂️ How to Run Tests
### Docker Execution

To run the suite inside a clean, reproducible containerized environment:

```bash
# 1. Build the Docker image
docker build -t playwright-shop-tests .

# 2. Run the tests in the container
docker run --rm playwright-shop-tests
```

---

## 📊 Reporting & Debugging

* **Playwright Native HTML Report**:
  ```bash
  npx playwright show-report
  ```

* **Allure Report**:
  ```bash
  npx allure generate allure-results --clean -o allure-report
  npx allure open allure-report
  ```

* **Trace Viewer**: Traces are recorded automatically on test failure (`retain-on-failure`). Inspect a recorded trace with:
  ```bash
  npx playwright show-trace test-results/<test-folder>/trace.zip
  ```
---
## 📁 Project Structure

```text
├── .github/workflows/   # GitHub Actions CI/CD pipelines
├── fixtures/            # Custom Playwright fixtures (baseTest)
├── pages/               # Page Object Model classes
├── tests/
│   ├── setup/           # Isolated setup scripts (auth.setup.ts)
│   └── *.spec.ts        # UI & API test specifications
├── utils/               # Test data helpers and utilities
├── Dockerfile           # Docker container configuration
├── playwright.config.ts # Global Playwright test runner configuration
└── .env.example         # Template for required environment variables
```

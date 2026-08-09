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

## 📋 Test Coverage & Pyramid Strategy

To balance execution speed, reliability, and maintenance, this project follows the **Testing Pyramid**: critical happy paths run end-to-end in the browser, while edge cases, negative validations, and data contracts are tested at the API level.

### 🌐 Tier 1: E2E Browser Tests (Critical User Journeys)

Focuses exclusively on essential user paths and core interactive UI components.

- [x] **Auth**: Successful user login & session creation (`auth.spec.ts`, `auth.setup.ts`)[cite: 2]
- [x] **Catalog**: Basic product search & single-category filtering (`search.spec.ts`, `categories.spec.ts`)[cite: 2]
- [x] **Checkout**: End-to-end purchasing flow with payment selection (`e2e-purchase.spec.ts`, `checkout.spec.ts`)[cite: 2]
- [x] **Support**: Valid contact form submission with attachments (`contact.spec.ts`)[cite: 2]
- [ ] **Cart**: Modifying item quantities and removing items directly from the cart
- [ ] **Registration**: New user sign-up journey and immediate post-login redirection

### ⚡ Tier 2: API & Integration Tests (Fast Validation & Edge Cases)

Covers negative scenarios, authorization boundaries, and form validation rules faster and cheaper than UI automation.

- [x] **Products API**: GET `/products` status and contract checks (`products-api.spec.ts`)[cite: 2]
- [ ] **Auth API**: POST `/users/login` negative scenarios (invalid passwords, unregistered emails, 401 status)
- [ ] **Cart API**: POST/DELETE `/carts` operations to prepare cart state programmatically
- [ ] **Form Validation API**: POST `/messages` payload checks (empty fields, bad email format, 422 status)
- [ ] **Error Handling**: Non-existent resource behavior (404 Not Found)

### 🎭 Tier 3: UI Mocking Tests (Isolated Frontend Logic)

Uses `page.route()` to test complex UI states without depending on real backend data or side effects.

- [x] **Search Mocking**: Intercepting product search API responses (`search.spec.ts`)[cite: 2]
- [ ] **Empty States**: Simulating zero search results ("No products found")
- [ ] **Inventory States**: Mocking out-of-stock API responses to verify disabled "Add to Cart" buttons

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

- **Playwright Native HTML Report**:

    ```bash
    npx playwright show-report
    ```

- **Allure Report**:

    ```bash
    npx allure generate allure-results --clean -o allure-report
    npx allure open allure-report
    ```

- **Trace Viewer**: Traces are recorded automatically on test failure (`retain-on-failure`). Inspect a recorded trace with:
    ```bash
    npx playwright show-trace test-results/<test-folder>/trace.zip
    ```

---

## 📁 Project Structure

```text
├── .github/workflows/   # CI/CD automation pipelines
├── fixtures/            # Custom Playwright test fixtures (baseTest.ts)
├── pages/               # Page Object Model classes
├── tests/
│   ├── api/             # API contract and integration spec files
│   ├── setup/           # Isolated authentication setup scripts
│   └── ui/              # Browser E2E spec files
├── utils/               # Helper methods and test data generators
├── Dockerfile           # Docker container configuration
├── playwright.config.ts # Global Playwright test runner configuration
└── .env.example         # Template for required environment variables
```

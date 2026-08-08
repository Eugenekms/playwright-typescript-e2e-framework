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

## 📋 Test Coverage & Strategy

### 🔐 1. Authentication & Account Management
- [x] User login with valid credentials (`auth.spec.ts`)[cite: 2]
- [x] Global session state caching via `auth.setup.ts`[cite: 2]
- [ ] User login negative scenarios (invalid password, unregistered email)
- [ ] User registration flow (valid submission, mandatory field validation, duplicate email error)
- [ ] Account profile updates (change address, update profile details)
- [ ] User logout flow and session invalidation

### 🔍 2. Catalog, Search & Filtering
- [x] Basic text search for products (`search.spec.ts`)[cite: 2]
- [x] Single-category filtering (`categories.spec.ts`, `search.spec.ts`)[cite: 2]
- [ ] Multi-category checkbox filtering (combining subcategories)
- [ ] Price slider / price range filtering
- [ ] Product sorting (Price: Low to High / High to Low, Name: A-Z / Z-A)
- [ ] Search zero-results state ("No products found")

### 🛒 3. Cart, Product Details & Checkout
- [x] E2E successful checkout flow (`e2e-purchase.spec.ts`)[cite: 2]
- [x] Payment method selection and installments (`checkout.spec.ts`)[cite: 2]
- [ ] Add item to cart from Product Details page and verify cart badge counter
- [ ] Modify item quantity in cart or remove item from cart
- [ ] Out-of-stock item handling (verify buy button disabled/hidden)
- [ ] Form validation errors on checkout steps (missing address fields, invalid postal code)

### ✉️ 4. Customer Contact & Support
- [x] Valid contact form submission with attachments (`contact.spec.ts`)[cite: 2]
- [ ] Contact form mandatory field validations (empty message, invalid email format)
- [ ] Contact message subject dropdown verification

### 🌐 5. Globalization & UI Preferences
- [x] Basic language switching (`language.spec.ts`)[cite: 2]
- [ ] Full UI string localization verification across main navigation upon language change

### 🔌 6. API Testing Suite
- [x] GET `/products` list response status and contract (`products-api.spec.ts`)[cite: 2]
- [x] Intercepting and mocking product list responses (`search.spec.ts`)[cite: 2]
- [ ] GET `/products/{id}` individual product details contract
- [ ] POST `/users/login` API status and JWT token extraction
- [ ] Unauthorized request handling (401 / 403 response verification)
- [ ] Non-existent route / resource handling (404 response verification)

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
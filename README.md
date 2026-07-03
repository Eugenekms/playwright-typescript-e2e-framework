# E-commerce UI Automation Framework

This repository contains an automated UI testing framework for the [Practice Software Testing](https://practicesoftwaretesting.com/) demo platform. 

## 🛠 Tech Stack & Architecture
* **Automation Tool**: [Playwright](https://playwright.dev/)
* **Language**: TypeScript
* **Test Data Generation**: [Faker.js](https://fakerjs.dev/)
* **Design Patterns**: Page Object Model (POM), Custom Fixtures
* **Key Features**: 
  * Isolated API and UI testing projects
  * Global setup for UI authentication (saving state to avoid repetitive logins)
  * Dynamic API chaining and negative scenarios handling (401, 404, 423)
  * Dynamic test data generation for reliable and independent test runs

## 📁 Project Structure
* `/tests` - Contains UI and API spec files (isolated by Playwright projects)
* `/pages` - Page Object classes (strict separation of actions and assertions)
* `/fixtures` - Custom Playwright fixtures for test setup and state management
* `playwright.config.ts` - Multi-browser and API project configurations
* `Dockerfile` - Containerization instructions for reproducible runs

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/Eugenekms/playwright_shop.git](https://github.com/Eugenekms/playwright_shop.git)
cd playwright_shop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
This project requires environment variables for authentication tests.
1. Create a `.env` file in the root directory.
2. Copy the contents from `.env.example` into your new `.env` file. The default test credentials are provided there.

## 🏃‍♂️ How to Run Tests
### Option A: Local Execution (Node.js required)
1. Install dependencies:
```bash
npm install
```
2. Install Playwright browsers:
```bash
npx playwright install --with-deps
```
3. Execute tests in headless mode (default):
```bash
npx playwright test
```
4. Execute tests in UI mode (highly recommended for debugging):
```bash
npx playwright test --ui
```
### Option B: Isolated Execution (Docker required, Node.js NOT required)
Run the entire test suite in a clean, reproducible containerized environment:
1. Build the Docker image:
```bash
docker build -t playwright-shop-tests .
```
2. Run the tests:
```bash
docker run --rm playwright-shop-tests
```
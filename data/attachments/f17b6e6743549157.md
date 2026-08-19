# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/auth.spec.ts >> check sign in @flaky
- Location: tests/ui/auth.spec.ts:6:5

# Error details

```
Error: ❌ ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables!
```

# Test source

```ts
  1  | import { test, expect } from '@fixtures/baseTest';
  2  | 
  3  | // Reset saved storage session state for this test file
  4  | test.use({ storageState: { cookies: [], origins: [] } });
  5  | 
  6  | test('check sign in @flaky', async ({ mainPage, loginPage }) => {
  7  |     const adminEmail = process.env.ADMIN_EMAIL;
  8  |     const adminPassword = process.env.ADMIN_PASSWORD;
  9  | 
  10 |     // Safety guard against running tests without missing .env credentials
  11 |     if (!adminEmail || !adminPassword) {
> 12 |         throw new Error('❌ ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables!');
     |               ^ Error: ❌ ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables!
  13 |     }
  14 | 
  15 |     await mainPage.open();
  16 |     await mainPage.signInButton.click();
  17 | 
  18 |     await loginPage.login(adminEmail, adminPassword);
  19 | 
  20 |     await expect(loginPage.userNameMenuButton).toBeVisible();
  21 |     await expect(loginPage.salesChartHeader).toBeVisible();
  22 | });
  23 | 
```
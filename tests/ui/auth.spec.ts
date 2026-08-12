import { test, expect } from '@fixtures/baseTest';

// Reset saved storage session state for this test file
test.use({ storageState: { cookies: [], origins: [] } });

test('check sign in @flaky', async ({ mainPage, loginPage }) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Safety guard against running tests without missing .env credentials
    if (!adminEmail || !adminPassword) {
        throw new Error('❌ ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables!');
    }

    await mainPage.open();
    await mainPage.signInButton.click();

    await loginPage.login(adminEmail, adminPassword);

    await expect(loginPage.userNameMenuButton).toBeVisible();
    await expect(loginPage.salesChartHeader).toBeVisible();
});

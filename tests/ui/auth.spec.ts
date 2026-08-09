import { test, expect } from '@fixtures/baseTest';

test.use({ storageState: { cookies: [], origins: [] } });

test('check sign in @flaky', async ({ mainPage, loginPage }) => {
    await mainPage.open();
    await mainPage.signInButton.click();
    await loginPage.login(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!);
    await expect(loginPage.userNameMenuButton).toBeVisible();
    await expect(loginPage.salesChartHeader).toBeVisible();
});

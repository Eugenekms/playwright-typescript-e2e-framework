import { test, expect } from '@fixtures/baseTest';

test.describe('Categories Switching', () => {
    test('Verify category switching', async ({ mainPage }) => {
        await test.step('Open main page', async () => {
            await mainPage.open();
            await expect(mainPage.categoriesBtn).toHaveText('Categories');
        });

        await test.step('Select "Hand Tools" category and verify page title', async () => {
            await mainPage.selectCategories('Hand Tools');
            await expect(mainPage.pageTitle).toContainText('Hand Tools');
        });

        await test.step('Select "Power Tools" category and verify page title', async () => {
            await mainPage.selectCategories('Power Tools');
            await expect(mainPage.pageTitle).toContainText('Power Tools');
        });

        await test.step('Select "Other" category and verify page title', async () => {
            await mainPage.selectCategories('Other');
            await expect(mainPage.pageTitle).toContainText('Other');
        });

        await test.step('Select "Special Tools" category and verify page title', async () => {
            await mainPage.selectCategories('Special Tools');
            await expect(mainPage.pageTitle).toContainText('Special Tools');
        });

        await test.step('Select "Rentals" category and verify page title', async () => {
            await mainPage.selectCategories('Rentals');
            await expect(mainPage.pageTitle).toContainText('Rentals');
        });
    });
});

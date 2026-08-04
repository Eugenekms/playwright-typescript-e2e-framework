import { test, expect } from '../fixtures/baseTest';
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Localization and Language Switching', () => {
    test('check different localization', async ({ mainPage }) => {
        await test.step('Open main page', async () => {
            await mainPage.open();
        });

        await test.step('Switch to German and verified placeholder', async () => {
            await mainPage.selectLanguage('de');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Suche');
        });

        await test.step('Switch to Greek and verified placeholder', async () => {
            await mainPage.selectLanguage('el');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Αναζήτηση');
        });

        await test.step('Switch to English and verified placeholder', async () => {
            await mainPage.selectLanguage('en');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Search');
        });

        await test.step('Switch to Spaish and verified placeholder', async () => {
            await mainPage.selectLanguage('es');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Buscar');
        });

        await test.step('Switch to French and verified placeholder', async () => {
            await mainPage.selectLanguage('fr');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Rechercher');
        });

        await test.step('Switch to Dutch and verified placeholder', async () => {
            await mainPage.selectLanguage('nl');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Zoeken');
        });

        await test.step('Switch to Turkish and verified placeholder', async () => {
            await mainPage.selectLanguage('tr');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Ara');
        });
    });
});

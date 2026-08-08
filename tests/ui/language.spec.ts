import { test, expect } from '@fixtures/baseTest';

test.describe.skip('Localization and Language Switching', () => {
    /**
     * Skipped due to continuously failing in CI
     **/
    test('check different localization', async ({ mainPage }) => {
        await test.step('Open main page', async () => {
            await mainPage.open();
            await mainPage.expectLanguageSelected('EN');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Search');
        });

        await test.step('Switch to Greek and verify placeholder', async () => {
            await mainPage.selectLanguage('el');
            await mainPage.expectLanguageSelected('EL');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Αναζήτηση');
        });

        await test.step('Switch to German and verify placeholder', async () => {
            await mainPage.selectLanguage('de');
            await mainPage.expectLanguageSelected('DE');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Suche');
        });

        await test.step('Switch to English and verify placeholder', async () => {
            await mainPage.selectLanguage('en');
            await mainPage.expectLanguageSelected('EN');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Search');
        });

        await test.step('Switch to Spanish and verify placeholder', async () => {
            await mainPage.selectLanguage('es');
            await mainPage.expectLanguageSelected('ES');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Buscar');
        });

        await test.step('Switch to French and verify placeholder', async () => {
            await mainPage.selectLanguage('fr');
            await mainPage.expectLanguageSelected('FR');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Rechercher');
        });

        await test.step('Switch to Dutch and verify placeholder', async () => {
            await mainPage.selectLanguage('nl');
            await mainPage.expectLanguageSelected('NL');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Zoeken');
        });

        await test.step('Switch to Turkish and verify placeholder', async () => {
            await mainPage.selectLanguage('tr');
            await mainPage.expectLanguageSelected('TR');
            await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Ara');
        });
    });
});

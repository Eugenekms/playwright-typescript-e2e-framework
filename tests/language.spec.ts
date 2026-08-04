import { test, expect } from '../fixtures/baseTest';
test.use({ storageState: { cookies: [], origins: [] } });

test('check different localization', async ({ mainPage }) => {
    await mainPage.open();
    await mainPage.selectLanguage('de');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Suche');

    await mainPage.selectLanguage('el');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Αναζήτηση');

    await mainPage.selectLanguage('en');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Search');

    await mainPage.selectLanguage('es');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Buscar');

    await mainPage.selectLanguage('fr');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Rechercher');

    await mainPage.selectLanguage('nl');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Zoeken');

    await mainPage.selectLanguage('tr');
    await expect(mainPage.searchInput).toHaveAttribute('placeholder', 'Ara');
});

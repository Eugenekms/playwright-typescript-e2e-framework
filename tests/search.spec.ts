import { test, expect } from '../fixtures/baseTest';

test.describe('Product Search & Filtering Suite', () => {
    const searchTerms = ['Hammer', 'Pliers', 'drill', 'GoldenAxe'];

    test.describe('Parameterized Product Search', () => {
        for (const term of searchTerms) {
            test(`Verify searching for "${term}" displays expected result header`, async ({
                mainPage,
            }) => {
                await test.step(`Navigate to main page and search for "${term}"`, async () => {
                    await mainPage.open();
                    await mainPage.searchInput.waitFor({ state: 'visible' });
                    await mainPage.searchForProduct(term);
                });

                await test.step(`Verify search result heading contains "${term}"`, async () => {
                    await expect(mainPage.searchCountResult).toContainText(term, {
                        ignoreCase: true,
                    });
                });
            });
        }
    });

    test('Verify filtering products by single category checkbox', async ({ mainPage }) => {
        await test.step('Navigate to main page', async () => {
            await mainPage.open();
            await mainPage.searchInput.waitFor({ state: 'visible' });
        });

        await test.step('Select "Hammer" category checkbox filter', async () => {
            await mainPage.handToolHammer.check();
        });

        await test.step('Verify all filtered product cards contain "Hammer"', async () => {
            await expect(mainPage.cardProductName.first()).toContainText('Hammer', {
                ignoreCase: true,
            });

            const allCards = await mainPage.cardProductName.all();
            for (const card of allCards) {
                await expect(card).toContainText('Hammer', { ignoreCase: true });
            }
        });
    });

    test('Verify product grid renders custom mocked API payload', async ({ page, mainPage }) => {
        await test.step('Mock products API response', async () => {
            await page.route('**/products*', async (route) => {
                const fakeResponse = {
                    current_page: 1,
                    data: [
                        {
                            id: 'fake-id-123',
                            name: 'Titanium QA Hammer',
                            description: 'Молот для разбивания багов',
                            price: 9999.99,
                            is_location_offer: false,
                            is_rental: false,
                            in_stock: true,
                            product_image: {
                                id: '01KVTPSX24QW6AQQW178CY4C64',
                                file_name: 'pliers01.avif',
                                title: 'Titanium Hammer',
                            },
                        },
                    ],
                    total: 1,
                };

                await route.fulfill({ json: fakeResponse });
            });
        });

        await test.step('Navigate to main page and verify mocked product title', async () => {
            await mainPage.open();
            await mainPage.searchInput.waitFor({ state: 'visible' });
            await expect(mainPage.cardProductName.first()).toContainText('Titanium QA Hammer');
        });
    });
});

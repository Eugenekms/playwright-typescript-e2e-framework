import { test, expect } from '@fixtures/baseTest';

test.describe('checking cart', () => {
    test('check add, change, delete product', async ({ mainPage, productPage, checkoutPage }) => {
        await test.step('open main page', async () => {
            await mainPage.open();
            await expect(mainPage.categoriesBtn).toHaveText('Categories');
        });

        await test.step('add product to cart', async () => {
            await mainPage.choseInStock();
            await expect(productPage.addToCartButton).toBeVisible();
        });

        await test.step('add to cart', async () => {
            await productPage.addToCartButton.click();
            await expect(mainPage.cartLink).toBeVisible();
        });

        await test.step('go to the cart', async () => {
            await mainPage.cartLink.click();
            await expect(checkoutPage.productPrice).toBeVisible();
        });

        await test.step('check price', async () => {
            const priceText = (await checkoutPage.productPrice.textContent()) || '0';
            const priceFloat = parseFloat(priceText.replace('$', ''));

            await checkoutPage.productQuantity.clear();
            await checkoutPage.productQuantity.fill('2');

            const expectedPrice = (priceFloat * 2).toFixed(2);

            await expect(checkoutPage.linePrice).toHaveText(`$${expectedPrice}`);
        });

        await test.step('delete product from cart', async () => {
            await checkoutPage.deleteBtn.click();
            await expect(checkoutPage.emptyCartMessage).toBeVisible();
        });
    });
});

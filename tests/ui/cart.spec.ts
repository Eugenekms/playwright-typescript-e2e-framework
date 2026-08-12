import { test, expect } from '@fixtures/baseTest';

test.describe('Shopping Cart Management', () => {
    test('Verify adding, updating quantity, and removing product from cart', async ({
        mainPage,
        productPage,
        checkoutPage,
    }) => {
        await test.step('Add an in-stock product to cart and navigate to checkout', async () => {
            await mainPage.open();
            await mainPage.choseInStock();
            await productPage.addToCartButton.click();
            await mainPage.cartLink.click();

            await expect(checkoutPage.productPrice).toBeVisible();
        });

        await test.step('Update item quantity and verify total line price calculation', async () => {
            const priceText = (await checkoutPage.productPrice.textContent()) || '0';
            // Extract numeric price safely (e.g. "$14.15" -> 14.15)
            const priceFloat = parseFloat(priceText.replace(/[^0-9.]/g, ''));

            await checkoutPage.productQuantity.fill('2');

            const expectedPrice = (priceFloat * 2).toFixed(2);
            await expect(checkoutPage.linePrice).toHaveText(`$${expectedPrice}`);
        });

        await test.step('Delete product and verify empty cart state', async () => {
            await checkoutPage.deleteBtn.click();
            await expect(checkoutPage.emptyCartMessage).toBeVisible();
        });
    });
});

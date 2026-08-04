import { faker } from '@faker-js/faker';
import { test, expect } from '../fixtures/baseTest';

test('e2e purchase flow', async ({ mainPage, productPage, checkoutPage }) => {
    const zipCode = faker.location.zipCode();
    const houseNumber = faker.location.buildingNumber();
    const shippingAddressCountry = 'United States of America (the)';

    await mainPage.open();
    await mainPage.choseInStock();
    await productPage.addToCartButton.click();
    await mainPage.cartLink.click();

    await checkoutPage.proceedToCheckoutButton1.click();

    await checkoutPage.proceedToCheckoutButton2.click();

    await checkoutPage.selectAnyCountry(shippingAddressCountry);
    await checkoutPage.postalCode.fill(zipCode);
    await checkoutPage.houseNumber.fill(houseNumber);
    await checkoutPage.houseNumber.blur(); // To pass in CI
    await checkoutPage.proceedToCheckoutButton3.click();

    await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
    await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.paymentSuccessMessage).toContainText('Payment was successful');

    await checkoutPage.finishButton.click();

    await expect(checkoutPage.confirmOrder).toContainText(
        'Thanks for your order! Your invoice number is',
    );
});

test('should handle payment gateway 500 error gracefully', async ({
    mainPage,
    productPage,
    checkoutPage,
    page,
}) => {
    await mainPage.open();
    await mainPage.choseInStock();
    await productPage.addToCartButton.click();
    await mainPage.cartLink.click();

    await checkoutPage.proceedToCheckoutButton1.click();
    await checkoutPage.proceedToCheckoutButton2.click();

    await checkoutPage.selectAnyCountry('United States of America (the)');
    await checkoutPage.postalCode.fill('12345');
    await checkoutPage.houseNumber.fill('42');
    await checkoutPage.houseNumber.blur(); // To pass in CI
    await checkoutPage.proceedToCheckoutButton3.click();

    await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
    await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');

    await page.route('**/payment/check', async (route) => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: 'Payment Gateway is currently down',
            }),
        });
    });

    await checkoutPage.finishButton.click();

    await expect(checkoutPage.paymentErrorMessage).toContainText('Internal Server Error');
});

test('e2e fake invoice flow', async ({ mainPage, productPage, checkoutPage, page }) => {
    const zipCode = faker.location.zipCode();
    const houseNumber = faker.location.buildingNumber();
    const shippingAddressCountry = 'United States of America (the)';

    await mainPage.open();
    await mainPage.choseInStock();
    await productPage.addToCartButton.click();
    await mainPage.cartLink.click();

    await checkoutPage.proceedToCheckoutButton1.click();

    await checkoutPage.proceedToCheckoutButton2.click();

    await checkoutPage.selectAnyCountry(shippingAddressCountry);
    await checkoutPage.postalCode.fill(zipCode);
    await checkoutPage.houseNumber.fill(houseNumber);
    await checkoutPage.houseNumber.blur(); // To pass in CI
    await checkoutPage.proceedToCheckoutButton3.click();

    await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
    await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.paymentSuccessMessage).toContainText('Payment was successful');

    await page.route('**/invoices', async (route) => {
        await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
                invoice_number: 'INV-UR-MILLIONER',
            }),
        });
    });

    await checkoutPage.finishButton.click();

    await expect(checkoutPage.confirmOrder).toContainText(
        'Thanks for your order! Your invoice number is INV-UR-MILLIONER',
    );
});

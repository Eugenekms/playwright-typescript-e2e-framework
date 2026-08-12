import { faker } from '@faker-js/faker';
import { test, expect } from '@fixtures/baseTest';

test.describe('E2E Checkout & Purchase Suite', () => {
    test('Verify successful purchase flow with "Buy Now Pay Later"', async ({
        mainPage,
        productPage,
        checkoutPage,
    }) => {
        const zipCode = faker.location.zipCode();
        const houseNumber = faker.location.buildingNumber();
        const shippingAddressCountry = 'United States of America (the)';

        await test.step('Navigate to cart with an in-stock product and begin checkout', async () => {
            await mainPage.open();
            await mainPage.choseInStock();
            await productPage.addToCartButton.click();
            await mainPage.cartLink.click();

            await checkoutPage.proceedToCheckoutButton1.click();
            await checkoutPage.proceedToCheckoutButton2.click();
        });

        await test.step('Fill and validate shipping address details', async () => {
            await checkoutPage.selectAnyCountry(shippingAddressCountry);

            await checkoutPage.postalCode.fill(zipCode);
            await expect(checkoutPage.postalCode).toHaveValue(zipCode);

            await checkoutPage.houseNumber.fill(houseNumber);
            await expect(checkoutPage.houseNumber).toHaveValue(houseNumber);

            await checkoutPage.houseNumber.blur(); // Pass CI form validation
            await checkoutPage.proceedToCheckoutButton3.click();
        });

        await test.step('Select payment method and verify successful payment message', async () => {
            await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
            await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
            await checkoutPage.finishButton.click();

            await expect(checkoutPage.paymentSuccessMessage).toContainText(
                'Payment was successful',
            );
        });

        await test.step('Finalize order and verify invoice generation message', async () => {
            await checkoutPage.finishButton.click();
            await checkoutPage.confirmOrder.waitFor({ state: 'visible' });
            await expect(checkoutPage.confirmOrder).toContainText(
                'Thanks for your order! Your invoice number is',
            );
        });
    });

    test('Verify payment gateway 500 error handling during checkout', async ({
        mainPage,
        productPage,
        checkoutPage,
        page,
    }) => {
        await test.step('Navigate to cart with an in-stock product and begin checkout', async () => {
            await mainPage.open();
            await mainPage.choseInStock();
            await productPage.addToCartButton.click();
            await mainPage.cartLink.click();

            await checkoutPage.proceedToCheckoutButton1.click();
            await checkoutPage.proceedToCheckoutButton2.click();
        });

        await test.step('Fill and validate shipping address details', async () => {
            await checkoutPage.selectAnyCountry('United States of America (the)');

            await checkoutPage.postalCode.fill('12345');
            await expect(checkoutPage.postalCode).toHaveValue('12345');

            await checkoutPage.houseNumber.fill('42');
            await expect(checkoutPage.houseNumber).toHaveValue('42');

            await checkoutPage.houseNumber.blur();
            await checkoutPage.proceedToCheckoutButton3.click();
        });

        await test.step('Mock payment gateway 500 response and submit payment', async () => {
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
        });

        await test.step('Verify error banner message is displayed to user', async () => {
            await expect(checkoutPage.paymentErrorMessage).toContainText('Internal Server Error');
        });
    });

    test('Verify invoice generation with mocked API response', async ({
        mainPage,
        productPage,
        checkoutPage,
        page,
    }) => {
        const zipCode = faker.location.zipCode();
        const houseNumber = faker.location.buildingNumber();
        const shippingAddressCountry = 'United States of America (the)';

        await test.step('Navigate to cart with an in-stock product and begin checkout', async () => {
            await mainPage.open();
            await mainPage.choseInStock();
            await productPage.addToCartButton.click();
            await mainPage.cartLink.click();

            await checkoutPage.proceedToCheckoutButton1.click();
            await checkoutPage.proceedToCheckoutButton2.click();
        });

        await test.step('Fill and validate shipping address details', async () => {
            await checkoutPage.selectAnyCountry(shippingAddressCountry);

            await checkoutPage.postalCode.fill(zipCode);
            await expect(checkoutPage.postalCode).toHaveValue(zipCode);

            await checkoutPage.houseNumber.fill(houseNumber);
            await expect(checkoutPage.houseNumber).toHaveValue(houseNumber);

            await checkoutPage.houseNumber.blur();
            await checkoutPage.proceedToCheckoutButton3.click();
        });

        await test.step('Complete initial payment step', async () => {
            await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
            await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
            await checkoutPage.finishButton.click();

            await expect(checkoutPage.paymentSuccessMessage).toContainText(
                'Payment was successful',
            );
        });

        await test.step('Mock invoice creation endpoint and verify order confirmation text', async () => {
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
    });
});

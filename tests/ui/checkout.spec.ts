import { faker } from '@faker-js/faker';
import { test, expect } from '@fixtures/baseTest';

test('check contact form', async ({ mainPage, contactPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const emailAddress = faker.internet.email();
    const message = faker.lorem.words(15);
    await mainPage.open();
    await mainPage.contactLink.click();
    await contactPage.contactFirstName.fill(firstName);
    await contactPage.contactLastName.fill(lastName);
    await contactPage.contactEmail.fill(emailAddress);
    await contactPage.contactSelectSubject('Webmaster');
    await contactPage.contactMessage.fill(message);
    await contactPage.contactSubmit.click();

    await expect(contactPage.alerts).toHaveText(
        'Thanks for your message! We will contact you shortly.',
    );
});

test('check proceed button is disabled when address is empty', async ({
    mainPage,
    productPage,
    checkoutPage,
}) => {
    await mainPage.open();
    await mainPage.choseInStock();
    await productPage.addToCartButton.click();
    await mainPage.cartLink.click();

    await checkoutPage.proceedToCheckoutButton1.click();
    await checkoutPage.proceedToCheckoutButton2.click();

    await expect(checkoutPage.proceedToCheckoutButton3).toBeDisabled();
});

// Group security tests requiring clean state
test.describe('Unauthorized User Security - Checkout', () => {
    // Clear browser state: remove cookies and origins for unauthenticated context
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should redirect anonymous user to login page when trying to access account profile', async ({
        page,
    }) => {
        // 1. Navigate directly to protected account endpoint
        await page.goto('/account');

        // 2. Expect automatic redirect to login page
        await expect(page).toHaveURL(/.*\/auth\/login/);

        // 3. Verify login form heading is displayed
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
});

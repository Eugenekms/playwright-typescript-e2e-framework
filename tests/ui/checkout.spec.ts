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

// Оборачиваем в describe, чтобы чистый стейт применился только к этому сценарию
test.describe('Unauthorized User Security - Checkout', () => {
    // Стираем память браузеру: удаляем куки и origins
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should redirect anonymous user to login page when trying to access account profile', async ({
        page,
    }) => {
        // 1. Стучимся на правильный URL (БЕЗ решетки!)
        await page.goto('/account');

        // 2. Ожидаем редирект на логин
        await expect(page).toHaveURL(/.*\/auth\/login/);

        // 3. Убеждаемся, что форма входа появилась
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });
});

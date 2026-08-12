import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { MainPage } from '@pages/MainPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { ContactPage } from '@pages/ContactPage';
import { ProductPage } from '@pages/ProductPage';

type MyFixtures = {
    loginPage: LoginPage;
    mainPage: MainPage;
    checkoutPage: CheckoutPage;
    contactPage: ContactPage;
    productPage: ProductPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
});

export { expect };

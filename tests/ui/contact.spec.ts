import { test, expect } from '../fixtures/baseTest';
import { createContactData } from '../utils/testData';

test.describe('Contact Form E2E Tests', () => {
    test.beforeEach(async ({ contactPage }) => {
        await contactPage.navigate();
    });

    test('should successfully submit form and return 200 OK from server', async ({
        contactPage,
    }) => {
        const contactData = createContactData({ subject: 'Payments' });

        await contactPage.fillContactForm(contactData);
        const statusCode = await contactPage.submitFormAndWaitForResponse();

        expect(statusCode).toBe(200);
        await contactPage.expectSuccessAlert(/thanks|sent|successfully/i);
    });

    test('should fail to submit when email format is invalid', async ({ contactPage }) => {
        const invalidData = createContactData({ email: 'invalid-email-format' });

        await contactPage.fillContactForm(invalidData);
        await contactPage.contactSubmit.click();
        await expect(contactPage.page.getByText('Email format is invalid')).toBeVisible();
    });
});

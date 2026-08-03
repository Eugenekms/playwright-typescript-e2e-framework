import { test, expect } from '../fixtures/baseTest';
import { createContactData } from '../utils/testData';

test.describe('Contact Form E2E Tests', () => {
    test.beforeEach(async ({ contactPage }) => {
        await contactPage.navigate();
    });

    test('should successfully submit form and return 200 OK from server', async ({
        contactPage,
    }) => {
        // 1. Arrange dynamic test data
        const contactData = createContactData({ subject: 'Payments' });

        // 2. Act (Fluent chaining + API synchronization)
        await contactPage.fillContactForm(contactData);
        const statusCode = await contactPage.submitFormAndWaitForResponse();

        // 3. Assert Backend & UI
        expect(statusCode).toBe(200);
        await contactPage.expectSuccessAlert(/thanks|sent|successfully/i);
    });

    test('should fail to submit when email format is invalid', async ({ contactPage }) => {
        const invalidData = createContactData({ email: 'invalid-email-format' });

        await contactPage.fillContactForm(invalidData);
        await contactPage.contactSubmit.click();

        // Verify browser HTML5 validation or application error toast
        const isInvalid = await contactPage.contactEmail.evaluate(
            (input: HTMLInputElement) => !input.checkValidity(),
        );
        expect(isInvalid).toBe(true);
    });
});

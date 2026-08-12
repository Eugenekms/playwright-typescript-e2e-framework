import { Locator, Page, expect } from '@playwright/test';

export interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

/**
 * Page Object representing the Contact Page.
 */
export class ContactPage {
    readonly page: Page;
    readonly contactSubmit: Locator;
    readonly contactFirstName: Locator;
    readonly contactLastName: Locator;
    readonly contactEmail: Locator;
    readonly contactSubject: Locator;
    readonly contactMessage: Locator;
    readonly alerts: Locator;

    constructor(page: Page) {
        this.page = page;

        this.contactSubmit = page.getByTestId('contact-submit');
        this.contactFirstName = page.getByTestId('first-name');
        this.contactLastName = page.getByTestId('last-name');
        this.contactEmail = page.getByTestId('email');
        this.contactSubject = page.getByTestId('subject');
        this.contactMessage = page.getByTestId('message');

        // Target all alerts on the page
        this.alerts = page.getByRole('alert');
    }

    /**
     * Navigates to the contact page.
     */
    async navigate(): Promise<this> {
        await this.page.goto('/contact');
        return this;
    }

    /**
     * Selects the Subject from the dropdown.
     */
    async contactSelectSubject(subject: string): Promise<this> {
        await this.contactSubject.selectOption(subject);
        return this;
    }

    /**
     * Fills out all form inputs (Fluent Interface pattern).
     */
    async fillContactForm(data: ContactFormData): Promise<this> {
        await this.contactFirstName.fill(data.firstName);
        await expect(this.contactFirstName).toHaveValue(data.firstName);

        await this.contactLastName.fill(data.lastName);
        await expect(this.contactLastName).toHaveValue(data.lastName);

        await this.contactEmail.fill(data.email);
        await expect(this.contactEmail).toHaveValue(data.email);

        await this.contactSelectSubject(data.subject);
        await this.contactMessage.fill(data.message);
        await expect(this.contactMessage).toHaveValue(data.message);

        return this;
    }

    /**
     * Submits the form and waits for the backend API response to avoid race conditions.
     */
    async submitFormAndWaitForResponse(apiEndpointPattern = '**/messages'): Promise<number> {
        const [response] = await Promise.all([
            this.page.waitForResponse(apiEndpointPattern, { timeout: 10000 }),
            this.contactSubmit.click(),
        ]);

        return response.status();
    }

    /**
     * Encapsulated Assertion: Checks success alert safely among multiple alerts.
     */
    async expectSuccessAlert(expectedText: string | RegExp): Promise<void> {
        const successAlert = this.alerts.filter({ hasText: expectedText });
        await expect(successAlert.first()).toBeVisible();
    }
}

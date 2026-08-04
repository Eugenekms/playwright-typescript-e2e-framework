import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the Main Page of the e-commerce application.
 */
export class MainPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchCountResult: Locator;
    readonly signInButton: Locator;
    readonly handToolHammer: Locator;
    readonly cardProductName: Locator;
    readonly cardProductInstock: Locator;
    readonly cartLink: Locator;
    readonly contactLink: Locator;
    readonly languageBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('search-query');
        this.searchCountResult = page.getByTestId('search-result-count');
        this.signInButton = page.getByRole('link', { name: 'Sign in' });
        this.handToolHammer = page.getByRole('checkbox', { name: 'Hammer' });
        this.cardProductName = page.getByTestId('product-name');
        this.cardProductInstock = page.locator('.card');
        this.cartLink = page.getByTestId('nav-cart');
        this.contactLink = page.getByTestId('nav-contact');
        this.languageBtn = page.getByTestId('language-select');
    }

    /**
     * Searches for a product by its name using the top search bar.
     * @param {string} productName - The exact name of the product to search for.
     */
    async searchForProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Navigates directly to the main page of the application.
     */
    async open() {
        await this.page.goto('/');
    }

    /**
     * Waits for the product cards to be visible, filters out items that are
     * 'Out of stock', and clicks on the title of the first available product.
     */
    async choseInStock() {
        await this.cardProductInstock.first().waitFor({ state: 'visible' });
        const availbleCard = this.cardProductInstock.filter({ hasNotText: 'Out of stock' }).first();
        await availbleCard.getByTestId('product-name').click();
    }

    /**
     * Opens the language selection dropdown and clicks on the specified language
     * option based on the provided language code.
     */
    async selectLanguage(langCode: string) {
        await this.languageBtn.click();
        await this.page.getByTestId(`lang-${langCode}`).click();
    }
}

import { Locator, Page } from '@playwright/test';

/**
 * Page Object representing the Checkout and Payment process.
 */
export class CheckoutPage {
    readonly page: Page;
    readonly proceedToCheckoutButton1: Locator;
    readonly proceedToCheckoutButton2: Locator;
    readonly proceedToCheckoutButton3: Locator;
    readonly selectCountry: Locator;
    readonly postalCode: Locator;
    readonly houseNumber: Locator;
    readonly state: Locator;
    readonly paymentMethod: Locator;
    readonly monthlyInstallments: Locator;
    readonly finishButton: Locator;
    readonly paymentSuccessMessage: Locator;
    readonly confirmOrder: Locator;
    readonly paymentErrorMessage: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    readonly linePrice: Locator;
    readonly deleteBtn: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton1 = page.getByTestId('proceed-1');
        this.proceedToCheckoutButton2 = page.getByTestId('proceed-2');
        this.proceedToCheckoutButton3 = page.getByTestId('proceed-3');
        this.selectCountry = page.getByTestId('country');
        this.postalCode = page.getByTestId('postal_code');
        this.houseNumber = page.getByTestId('house_number');
        this.state = page.getByTestId('state');
        this.paymentMethod = page.getByTestId('payment-method');
        this.monthlyInstallments = page.getByTestId('monthly_installments');
        this.finishButton = page.getByTestId('finish');
        this.paymentSuccessMessage = page.getByTestId('payment-success-message');
        this.confirmOrder = page.locator('#order-confirmation');
        this.paymentErrorMessage = page.getByTestId('payment-error-message');
        this.productPrice = page.getByTestId('product-price');
        this.productQuantity = page.getByTestId('product-quantity');
        this.linePrice = page.getByTestId('line-price');
        this.deleteBtn = page.locator('.btn-danger');
        this.emptyCartMessage = page.getByText('The cart is empty. Nothing to display.');
    }

    /**
     * Selects a country from the billing/shipping country dropdown.
     * @param {string} countryName - The exact name of the country to select.
     */
    async selectAnyCountry(countryName: string) {
        await this.selectCountry.selectOption(countryName);
    }

    /**
     * Selects the desired payment method.
     * @param {string} paymentMethod - The payment method to choose (e.g., 'Credit Card', 'Bank Transfer').
     */
    async selectPaymentMethod(paymentMethod: string) {
        await this.paymentMethod.selectOption(paymentMethod);
    }

    /**
     * Selects the number of monthly installments if an applicable payment method is chosen.
     * @param {string} monthlyInstallments - The installment option to select (e.g., '3', '6', '12').
     */
    async selectMonthlyInstallments(monthlyInstallments: string) {
        await this.monthlyInstallments.selectOption(monthlyInstallments);
    }
}

# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui/e2e-purchase.spec.ts >> E2E Checkout & Purchase Suite >> Verify invoice generation with mocked API response
- Location: tests/ui/e2e-purchase.spec.ts:108:9

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('house_number')
Expected: "6930"
Received: ""
Timeout:  10000ms

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('house_number')
    24 × locator resolved to <input type="text" id="house_number" placeholder="e.g. 42 *" data-test="house_number" formcontrolname="house_number" class="form-control ng-untouched ng-dirty ng-invalid"/>
       - unexpected value ""

```

```yaml
- textbox "House number":
  - /placeholder: e.g. 42 *
```

# Test source

```ts
  35  | 
  36  |         await test.step('Select payment method and verify successful payment message', async () => {
  37  |             await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
  38  |             await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
  39  |             await checkoutPage.finishButton.click();
  40  | 
  41  |             await expect(checkoutPage.paymentSuccessMessage).toContainText(
  42  |                 'Payment was successful',
  43  |             );
  44  |         });
  45  | 
  46  |         await test.step('Finalize order and verify invoice generation message', async () => {
  47  |             await checkoutPage.finishButton.click();
  48  |             await checkoutPage.confirmOrder.waitFor({ state: 'visible' });
  49  |             await expect(checkoutPage.confirmOrder).toContainText(
  50  |                 'Thanks for your order! Your invoice number is',
  51  |             );
  52  |         });
  53  |     });
  54  | 
  55  |     test('Verify payment gateway 500 error handling during checkout', async ({
  56  |         mainPage,
  57  |         productPage,
  58  |         checkoutPage,
  59  |         page,
  60  |     }) => {
  61  |         await test.step('Navigate to cart with an in-stock product and begin checkout', async () => {
  62  |             await mainPage.open();
  63  |             await mainPage.choseInStock();
  64  |             await productPage.addToCartButton.click();
  65  |             await mainPage.cartLink.click();
  66  | 
  67  |             await checkoutPage.proceedToCheckoutButton1.click();
  68  |             await checkoutPage.proceedToCheckoutButton2.click();
  69  |         });
  70  | 
  71  |         await test.step('Fill and validate shipping address details', async () => {
  72  |             await checkoutPage.selectAnyCountry('United States of America (the)');
  73  | 
  74  |             await checkoutPage.postalCode.click();
  75  |             await checkoutPage.postalCode.fill('12345');
  76  |             await expect(checkoutPage.postalCode).toHaveValue('12345');
  77  | 
  78  |             await checkoutPage.houseNumber.fill('42');
  79  |             await expect(checkoutPage.houseNumber).toHaveValue('42');
  80  | 
  81  |             await checkoutPage.houseNumber.blur();
  82  |             await checkoutPage.proceedToCheckoutButton3.click();
  83  |         });
  84  | 
  85  |         await test.step('Mock payment gateway 500 response and submit payment', async () => {
  86  |             await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
  87  |             await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
  88  | 
  89  |             await page.route('**/payment/check', async (route) => {
  90  |                 await route.fulfill({
  91  |                     status: 500,
  92  |                     contentType: 'application/json',
  93  |                     body: JSON.stringify({
  94  |                         error: 'Internal Server Error',
  95  |                         message: 'Payment Gateway is currently down',
  96  |                     }),
  97  |                 });
  98  |             });
  99  | 
  100 |             await checkoutPage.finishButton.click();
  101 |         });
  102 | 
  103 |         await test.step('Verify error banner message is displayed to user', async () => {
  104 |             await expect(checkoutPage.paymentErrorMessage).toContainText('Internal Server Error');
  105 |         });
  106 |     });
  107 | 
  108 |     test('Verify invoice generation with mocked API response', async ({
  109 |         mainPage,
  110 |         productPage,
  111 |         checkoutPage,
  112 |         page,
  113 |     }) => {
  114 |         const zipCode = faker.location.zipCode();
  115 |         const houseNumber = faker.location.buildingNumber();
  116 |         const shippingAddressCountry = 'United States of America (the)';
  117 | 
  118 |         await test.step('Navigate to cart with an in-stock product and begin checkout', async () => {
  119 |             await mainPage.open();
  120 |             await mainPage.choseInStock();
  121 |             await productPage.addToCartButton.click();
  122 |             await mainPage.cartLink.click();
  123 | 
  124 |             await checkoutPage.proceedToCheckoutButton1.click();
  125 |             await checkoutPage.proceedToCheckoutButton2.click();
  126 |         });
  127 | 
  128 |         await test.step('Fill and validate shipping address details', async () => {
  129 |             await checkoutPage.selectAnyCountry(shippingAddressCountry);
  130 | 
  131 |             await checkoutPage.postalCode.fill(zipCode);
  132 |             await expect(checkoutPage.postalCode).toHaveValue(zipCode);
  133 | 
  134 |             await checkoutPage.houseNumber.fill(houseNumber);
> 135 |             await expect(checkoutPage.houseNumber).toHaveValue(houseNumber);
      |                                                    ^ Error: expect(locator).toHaveValue(expected) failed
  136 | 
  137 |             await checkoutPage.houseNumber.blur();
  138 |             await checkoutPage.proceedToCheckoutButton3.click();
  139 |         });
  140 | 
  141 |         await test.step('Complete initial payment step', async () => {
  142 |             await checkoutPage.selectPaymentMethod('Buy Now Pay Later');
  143 |             await checkoutPage.selectMonthlyInstallments('12 Monthly Installments');
  144 |             await checkoutPage.finishButton.click();
  145 | 
  146 |             await expect(checkoutPage.paymentSuccessMessage).toContainText(
  147 |                 'Payment was successful',
  148 |             );
  149 |         });
  150 | 
  151 |         await test.step('Mock invoice creation endpoint and verify order confirmation text', async () => {
  152 |             await page.route('**/invoices', async (route) => {
  153 |                 await route.fulfill({
  154 |                     status: 201,
  155 |                     contentType: 'application/json',
  156 |                     body: JSON.stringify({
  157 |                         invoice_number: 'INV-UR-MILLIONER',
  158 |                     }),
  159 |                 });
  160 |             });
  161 | 
  162 |             await checkoutPage.finishButton.click();
  163 | 
  164 |             await expect(checkoutPage.confirmOrder).toContainText(
  165 |                 'Thanks for your order! Your invoice number is INV-UR-MILLIONER',
  166 |             );
  167 |         });
  168 |     });
  169 | });
  170 | 
```
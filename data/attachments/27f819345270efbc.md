# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/products.spec.ts >> login via api
- Location: tests/api/products.spec.ts:13:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { faker } from '@faker-js/faker';
  3  | 
  4  | test('request main page', async ({ request }) => {
  5  |     const response = await request.get('https://api.practicesoftwaretesting.com/products');
  6  |     expect(response.status()).toBe(200);
  7  | 
  8  |     const body = await response.json();
  9  |     expect(body.data.length).toBeGreaterThan(0);
  10 |     expect(body.data[0].id).toBeTruthy();
  11 | });
  12 | 
  13 | test('login via api', async ({ request }) => {
  14 |     const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
  15 |         data: {
  16 |             email: process.env.CUSTOMER_EMAIL!,
  17 |             password: process.env.CUSTOMER_PASSWORD!,
  18 |         },
  19 |     });
  20 | 
> 21 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  22 |     const body = await response.json();
  23 |     expect(body.access_token).toBeDefined();
  24 | });
  25 | 
  26 | test('login via api negative', async ({ request }) => {
  27 |     const fakeEmail = faker.internet.email();
  28 |     const fakePassword = faker.internet.password();
  29 |     const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
  30 |         data: {
  31 |             email: fakeEmail,
  32 |             password: fakePassword,
  33 |         },
  34 |     });
  35 |     expect(response.status()).toBe(401);
  36 |     const body = await response.json();
  37 |     expect(body.error).toBe('Unauthorized');
  38 | });
  39 | 
  40 | test('request element', async ({ request }) => {
  41 |     const response = await request.get('https://api.practicesoftwaretesting.com/products');
  42 |     expect(response.status()).toBe(200);
  43 | 
  44 |     const body = await response.json();
  45 |     const targetId = body.data[0].id;
  46 |     const productResponse = await request.get(
  47 |         `https://api.practicesoftwaretesting.com/products/${targetId}`,
  48 |     );
  49 |     expect(productResponse.status()).toBe(200);
  50 |     const productBody = await productResponse.json();
  51 |     expect(productBody.id).toBe(targetId);
  52 | });
  53 | 
  54 | test('request non-existent product', async ({ request }) => {
  55 |     const response = await request.get(
  56 |         'https://api.practicesoftwaretesting.com/products/1234567890',
  57 |     );
  58 |     expect(response.status()).toBe(404);
  59 | 
  60 |     const body = await response.json();
  61 |     expect(body.message).toBe('Requested item not found');
  62 | });
  63 | 
```
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('request main page', async ({ request }) => {
    const response = await request.get('https://api.practicesoftwaretesting.com/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0].id).toBeTruthy();
});

test('login via api', async ({ request }) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: process.env.CUSTOMER_EMAIL!,
            password: process.env.CUSTOMER_PASSWORD!,
        },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeDefined();
});

test('login via api negative', async ({ request }) => {
    const fakeEmail = faker.internet.email();
    const fakePassword = faker.internet.password();
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: fakeEmail,
            password: fakePassword,
        },
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Unauthorized');
});

test('request element', async ({ request }) => {
    const response = await request.get('https://api.practicesoftwaretesting.com/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    const targetId = body.data[0].id;
    const productResponse = await request.get(
        `https://api.practicesoftwaretesting.com/products/${targetId}`,
    );
    expect(productResponse.status()).toBe(200);
    const productBody = await productResponse.json();
    expect(productBody.id).toBe(targetId);
});

test('request non-existent product', async ({ request }) => {
    const response = await request.get(
        'https://api.practicesoftwaretesting.com/products/1234567890',
    );
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.message).toBe('Requested item not found');
});

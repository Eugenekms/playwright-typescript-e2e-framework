import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via API', async ({ request }) => {
    const timestamp = Date.now();
    const uniqueEmail = `testuser_${timestamp}@example.com`;

    // Dynamic high-entropy password to pass complexity & data leak rules
    const password = `P@ss_${timestamp}_Xz!`;

    // 1. Register new user
    const registerResponse = await request.post(
        'https://api.practicesoftwaretesting.com/users/register',
        {
            data: {
                first_name: 'Jane',
                last_name: 'Doe',
                dob: '1990-01-01',
                address: {
                    street: '123 Main Street',
                    city: 'Austin',
                    state: 'Texas',
                    country: 'US',
                    postcode: '78701',
                },
                city: 'Austin',
                state: 'Texas',
                country: 'US',
                postcode: '78701',
                phone: '5125550199',
                email: uniqueEmail,
                password: password,
            },
        },
    );

    expect(
        registerResponse.ok(),
        `Registration Failed! Status: ${registerResponse.status()} - ${await registerResponse.text()}`,
    ).toBeTruthy();

    // 2. Authenticate with newly created user
    const loginResponse = await request.post(
        'https://api.practicesoftwaretesting.com/users/login',
        {
            data: {
                email: uniqueEmail,
                password: password,
            },
        },
    );

    expect(
        loginResponse.ok(),
        `Auth Setup Failed! HTTP Status: ${loginResponse.status()} ${loginResponse.statusText()}`,
    ).toBeTruthy();

    const responseBody = await loginResponse.json();
    const token = responseBody.access_token;

    // 3. Save auth state
    const state = {
        cookies: [],
        origins: [
            {
                origin: 'https://practicesoftwaretesting.com',
                localStorage: [
                    {
                        name: 'auth-token',
                        value: token,
                    },
                ],
            },
        ],
    };

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    fs.writeFileSync(authFile, JSON.stringify(state, null, 2));
});

import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const authFile = 'playwright/.auth/user.json';

setup('authenticate via API', async ({ request }) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
        data: {
            email: process.env.CUSTOMER_EMAIL!,
            password: process.env.CUSTOMER_PASSWORD!,
        },
    });

    expect(
        response.ok(),
        `Auth Setup Failed! HTTP Status: ${response.status()} ${response.statusText()}`,
    ).toBeTruthy();

    const responseBody = await response.json();
    const token = responseBody.access_token;

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

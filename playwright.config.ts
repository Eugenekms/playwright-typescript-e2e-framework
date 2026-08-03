import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Standard clean dotenv loading for local runs
if (!process.env.CI) {
    dotenv.config();
}

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results' }],
    ],
    use: {
        baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
        testIdAttribute: 'data-test',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: 'playwright/.auth/user.json',
            },
            dependencies: ['setup'],
            testIgnore: /.*api\.spec\.ts/,
        },
        {
            name: 'api',
            testMatch: /.*api\.spec\.ts/,
            dependencies: [],
        },
    ],
});

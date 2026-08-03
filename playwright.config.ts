import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env only locally AND only if dotenvx hasn't already loaded it
if (!process.env.CI && !process.env.DOTENV_ENV && !process.env.DOTENVX) {
    dotenv.config();
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',

    /* Run tests in files in parallel */
    fullyParallel: true,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    /* Opt out of parallel tests on CI to avoid resource starvation */
    workers: process.env.CI ? 1 : undefined,

    /* Reporters to use */
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results' }],
    ],

    /* Shared settings for all projects */
    use: {
        /* Base URL with environment variable fallback */
        baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',

        /* Custom locator attribute */
        testIdAttribute: 'data-test',

        /* Diagnostic traces & artifacts */
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    /* Configure projects for target test environments */
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
            dependencies: [], // API tests run independently without browser auth setup
        },
    ],
});

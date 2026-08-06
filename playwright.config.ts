import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Standard clean dotenv loading for local runs
if (!process.env.CI) {
    dotenv.config();
}

export default defineConfig({
    testDir: './tests',
    timeout: 60 * 1000, // Overall test execution timeout (60s)
    expect: {
        timeout: 10 * 1000, // Web-first assertions timeout (10s)
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['allure-playwright', { outputFolder: 'allure-results' }],
    ],
    use: {
        baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
        testIdAttribute: 'data-test',
        actionTimeout: 30 * 1000, // Timeout for actions like click(), fill()
        navigationTimeout: 35 * 1000, // Timeout for page.goto()
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'setup',
            testDir: './tests/setup', // Isolated directory for setup tasks
            testMatch: /.*\.setup\.ts/,
        },
        {
            name: 'chromium',
            testMatch: /.*\.spec\.ts/,
            testIgnore: [/.*\.setup\.ts/, /.*api\.spec\.ts/], // Exclude setup and API specs
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                storageState: 'playwright/.auth/user.json',
            },
            dependencies: ['setup'],
        },
        {
            name: 'api',
            testMatch: /.*api\.spec\.ts/,
            dependencies: [],
        },
    ],
});

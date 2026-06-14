import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',           // Aponta para a pasta correta (pois o config já está dentro de tests/)
  testMatch: '**/*.spec.js',  // Garante que só leia os specs
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev', // Comando para iniciar o servidor
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  }
});
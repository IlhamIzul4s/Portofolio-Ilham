import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:5179', launchOptions: { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' }, reducedMotion: 'reduce' },
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 5179 --strictPort', url: 'http://127.0.0.1:5179', reuseExistingServer: !process.env.CI },
});

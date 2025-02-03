import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Replace with your app's URL
    supportFile: 'cypress/support/e2e.ts', // Path to support file
    specPattern: 'cypress/e2e/**/*.cy.ts', // Test file pattern
    video: false, // Disable video recording (optional)
  },
});

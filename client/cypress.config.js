// Cypress E2E configuration.
// baseUrl points at the Vite dev server (npm run dev), so specs can use
// relative paths like cy.visit("/").
import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        // Vite dev server (npm run dev) serves the client on 5173 by default
        // and proxies /api and /auth calls to the Express backend on 3000.
        baseUrl: "http://localhost:5173",
        setupNodeEvents(on, config) {
            // implement node event listeners here if needed
        },
        video: true,
        screenshotOnRunFailure: true,
    },
});

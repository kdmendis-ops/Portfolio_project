// Vite configuration file for a React project
// This configuration file sets up Vite to work with React. It includes the React plugin and specifies the entry point for the application. The build configuration generates a manifest file and defines the input file for Rollup, which is used by Vite for bundling the application. This setup allows for efficient development and optimized production builds for a React application.


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 3000 } = process.env;
export default defineConfig({
    plugins: [react()],
    server: {
        // Forward /api and /auth requests from the Vite dev server to the
        // Express backend, so the client can call relative URLs without CORS issues.
        proxy: {
            '/api': {
                target: `http://localhost:${PORT}`,
                changeOrigin: true,
            },
            '/auth': {
                target: `http://localhost:${PORT}`,
                changeOrigin: true,
            },
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            input: "./index.html",
        },
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setup.js",
    },
});



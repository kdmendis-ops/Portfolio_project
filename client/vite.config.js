// Vite configuration file for a React project
// This configuration file sets up Vite to work with React. It includes the React plugin and specifies the entry point for the application. The build configuration generates a manifest file and defines the input file for Rollup, which is used by Vite for bundling the application. This setup allows for efficient development and optimized production builds for a React application.


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
});

// Main entry point for the React application
// This file imports necessary modules and renders the App component into the root DOM element. It uses React's StrictMode for highlighting potential problems in the application during development. The App component is the main component of the application, and it is imported from the App.jsx file.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// StrictMode double-invokes some functions in development to help surface
// side-effect bugs; it has no effect on the production build.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);


// Main entry point for the React application
// This file imports necessary modules and renders the App component into the root DOM element. It uses React's StrictMode for highlighting potential problems in the application during development. The App component is the main component of the application, and it is imported from the App.jsx file.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

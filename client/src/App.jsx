
// This is the main entry point of the React application. It defines the App component, which is the root component of the application. The App component uses the useState hook to manage a count state variable, which is initialized to 0. The component renders a simple welcome message and can be expanded to include more functionality as needed.

//import React from 'react'; // Optional in React 17+ if using JSX transform
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; //  Updated import for MUI v5
import CssBaseline from '@mui/material/CssBaseline';  // Optional: resets browser styling
import MainRouter from '../MainRouter';
import theme from '../theme';

const App = () => {
  return (
    // Router enables client-side navigation (no full page reloads).
    <Router>
      {/* ThemeProvider makes the MUI theme available to all descendant components */}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Optional but recommended for consistent baseline styles */}
        {/* MainRouter renders the nav bar and swaps pages based on the URL */}
        <MainRouter />
      </ThemeProvider>
    </Router>
  );
};

export default App;


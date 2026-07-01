
// This is the main entry point of the React application. It defines the App component, which is the root component of the application. The App component uses the useState hook to manage a count state variable, which is initialized to 0. The component renders a simple welcome message and can be expanded to include more functionality as needed.

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Welcome to Frontend</h1>
      </div>


    </>
  )

}

export default App

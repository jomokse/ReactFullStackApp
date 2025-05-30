// App.tsx
// Main application component for the React Full Stack App.
// Handles routing, navigation, and the home page background/branding.

import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

import Forecast from './Forecast';
import Fibonacci from './Fibonacci';
import Doggies from './Doggies';
import DogFacts from "./DogFactsPage";

// Home page component with project introduction and background image
function Home() {
  return (
    // Set up a styled background and project info using TailwindCSS
    <body className="text-right bg-cover bg-top-left min-h-screen justify-center text-white" style={{ backgroundImage: "url('/src/assets/tre01.jpeg')" }} >
      <h1 className="text-slate-200 text-6xl font-bold px-20 py-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Welcome to my first Full Stack project</h1>
      <h1 className="text-slate-200 text-4xl font-bold px-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Front-End: React and Typescript with Vite</h1>
      <h1 className="text-slate-200 text-4xl font-bold px-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">and TailwindCSS and Recharts</h1>
      <h1 className="text-slate-200 text-4xl font-bold px-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Back-End: C#.NET, Entity Framework Core</h1>
      <h1 className="text-slate-200 text-4xl font-bold px-20 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-opacity-50">and SQLite</h1>
    </body>
  );
}

// Main App component: sets up navigation and page routing
function App() {
  return (
    <>    {/* This <> is a fragment wrapper to avoid adding extra DOM elements */}
      <NavBar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/fibonacci" element={<Fibonacci />} />
          <Route path="/doggies" element={<Doggies />} />
          <Route path="/dogFacts" element={<DogFacts />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
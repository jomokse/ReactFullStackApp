// src/components/NavBar.tsx
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">My React Full Stack Demo</div>
        <div className="space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/forecast" className="nav-link">Forecast</Link>
            <Link to="/fibonacci" className="nav-link">Fibonacci</Link>
            <Link to="/doggies" className="nav-link">Doggie</Link>
            <Link to="/dogFacts" className="nav-link">SQLite</Link>
        </div>
      </div>
    </nav>
  )
}
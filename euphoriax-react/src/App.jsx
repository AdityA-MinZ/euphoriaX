import { Routes, Route, Link } from "react-router-dom"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: 'white' }}>
      <nav style={{ padding: '1rem', background: '#111', borderBottom: '1px solid #7c3aed' }}>
        <Link to="/" style={{ marginRight: '1rem', color: '#7c3aed' }}>Events</Link>
        <Link to="/about" style={{ marginRight: '1rem', color: 'white' }}>About</Link>
        <Link to="/contact" style={{ color: 'white' }}>Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<div>Your events iframe content here</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App

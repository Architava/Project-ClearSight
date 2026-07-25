import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the new component
import Inventory from './pages/Inventory';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Render the Navbar here so it appears on every route */}
        <Navbar />
        
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <Routes>
            <Route path="/" element={<h1>Dashboard Coming Soon</h1>} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/sales" element={<h1>Sales Coming Soon</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
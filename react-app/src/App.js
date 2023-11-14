import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Groups from './components/Groups/Groups';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/groups" element={<Groups />} />
          {/* Add more routes for other components */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
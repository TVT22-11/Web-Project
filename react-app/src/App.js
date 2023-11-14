import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {/* Your main content here */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
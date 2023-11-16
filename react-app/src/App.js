
// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Groups from './components/Groups/Groups';
import Home from './components/Home/Home';
import Options from './components/Options/Options';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups/*" element={<Groups />} />
          <Route path="/options/*" element={<Options />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


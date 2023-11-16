
// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import GroupRoutes from './components/Groups/groupRoutes';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Options from './components/Options/Options';
import SignUp from './components/Login/SignUp';




function App() {
  return (
    <Router>
      <div className="main-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />


          <Route path="/Login" element={<Login />} />
          <Route path="/groups/*" element={<Groups />} />

          <Route path="/options/*" element={<Options />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/SignUp/*" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;


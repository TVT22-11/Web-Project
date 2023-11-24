
// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import GroupRoutes from './components/Groups/GroupRoutes';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Options from './components/Options/Options';
import SignUp from './components/Login/SignUp';
import Movies from './components/Movies/Movies';
import { DarkModeProvider } from './components/Options/DarkModeContext';



function App() {
  return (
    <Router>
      <DarkModeProvider>
      <div className='app-navbar'>
      <Navbar />
      </div>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/groups/*" element={<GroupRoutes />} />

          <Route path= "/Movies/*" element={<Movies/>} />

          <Route path="/options/*" element={<Options />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/SignUp/*" element={<SignUp />} />
        </Routes>
      </div>
      <Footer />
      </DarkModeProvider>
    </Router>
  );
}

export default App;


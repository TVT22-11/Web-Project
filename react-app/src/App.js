import React, { useState } from 'react';
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
import { UserProvider } from './components/User/UserContext';
import MovieDetail from './components/Movies/MovieDetail';

function App() {
  const [selectedTimezone, setSelectedTimezone] = useState('Your/Default/Timezone');

  return (
    <Router>
      <DarkModeProvider>
      <UserProvider>

             <div className='app-navbar'>
          <Navbar selectedTimezone={selectedTimezone} />
        </div>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/groups/*" element={<GroupRoutes />} />

          <Route path= "/Movies/*" element={<Movies/>} />

          <Route
              path="/options/*"
              element={<Options selectedTimezone={selectedTimezone} setSelectedTimezone={setSelectedTimezone} />}
            />
          <Route path="/login/*" element={<Login />} />
          <Route path="/SignUp/*" element={<SignUp />} />
          <Route path="/movie/:id" Component={MovieDetail} />
        </Routes>
      </div>
      <Footer />
      </UserProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;

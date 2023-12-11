import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountID, setAccountID] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);


  const [username, setUsername] = useState('');
  const [idAccout, setIdAccount] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwtToken');
    if (storedToken) {
      setIsLoggedIn(true);
      fetchAccountID(storedToken);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);
    fetchAccountID(token);
    setIsLoggedOut(false);
  };

  const logout = () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?");

    if (shouldLogout) {
      sessionStorage.removeItem('jwtToken');
      setIsLoggedIn(false);
      setIsLoggedOut(true);
      setShowLogoutNotification(true); 
      navigate('/');
    }
  };

  const fetchAccountID = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/account', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      
      setUsername(data.username);
      setIdAccount(data.id_account);
      setFname(data.fname);
      setLname(data.lname);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const contextValue = {
    isLoggedIn,
    isLoggedOut,
    login,
    logout,
    showLogoutNotification,
    setShowLogoutNotification,
    username,
    idAccout,
    fname,
    lname,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

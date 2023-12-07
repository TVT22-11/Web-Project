import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwtToken');
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setIsLoggedOut(false);
     // Reset logout status when logging in
    // You can add additional logic here based on your global user state needs
  };

  const logout = () => {
    // Display a confirmation dialog
  const shouldLogout = window.confirm("Are you sure you want to log out?");

  if (shouldLogout) {
    sessionStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setIsLoggedOut(true); // Set logout status to true
    setShowLogoutNotification(true); // Show the notification before logging out
    navigate('/');
    // You can add additional logic here based on your global user state needs
  }  
};

const contextValue = {
    isLoggedIn,
    isLoggedOut,
    login,
    logout,
    showLogoutNotification, // Include the showLogoutNotification state in the context
    setShowLogoutNotification, // Include the setShowLogoutNotification function in the context
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
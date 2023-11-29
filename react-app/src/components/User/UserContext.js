import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    setIsLoggedOut(false); // Reset logout status when logging in
    // You can add additional logic here based on your global user state needs
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsLoggedOut(true); // Set logout status to true
    // You can add additional logic here based on your global user state needs
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, isLoggedOut, login, logout }}>
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
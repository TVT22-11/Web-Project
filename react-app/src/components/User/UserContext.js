import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountID, setAccountID] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);

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
    const response = await fetch('http://localhost:3001/account/personal', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
       
      },
    });

      // Process the response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
 /*   if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText);
      const text = await response.json(); // Get the response text (HTML)
      console.error('Response text:', text);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setAccountID(data.account_id);
  } catch (error) {
    console.error('Error fetching account_id:', error);
  }*/
};
const contextValue = {
    isLoggedIn,
    isLoggedOut,
    login,
    logout,
    showLogoutNotification,
    setShowLogoutNotification,
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
// Options.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Preferences from './Preferences';
import Appearance from './Appearance';
import Other from './Other';
import { useUser } from '../User/UserContext';



function Options({ selectedTimezone, setSelectedTimezone }) {
  const { isLoggedIn } = useUser();

  return (
    <div className='OptionsContainer'>
      {!isLoggedIn && <p>Sign in to access options</p>}
      {isLoggedIn && (
    <Routes>
      <Route path="/" element={<Navigate to="preferences" />} />
      <Route
        path="preferences"
        element={<Preferences selectedTimezone={selectedTimezone} setSelectedTimezone={setSelectedTimezone} />}
      />
      <Route path="appearance" element={<Appearance />} />
      <Route path="other" element={<Other />} />
    </Routes>
    )}
    </div>
  );
}

export default Options;

// Options.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Preferences from './Preferences';
import Appearance from './Appearance';
import Other from './Other';

function Options({ selectedTimezone, setSelectedTimezone }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="preferences" />} />
      <Route
        path="preferences"
        element={<Preferences selectedTimezone={selectedTimezone} setSelectedTimezone={setSelectedTimezone} />}
      />
      <Route path="appearance" element={<Appearance />} />
      <Route path="other" element={<Other />} />
    </Routes>
  );
}

export default Options;

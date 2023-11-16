// components/Groups/Groups.js
import React from 'react';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';
import { Route, Routes, Router } from 'react-router-dom';
import creatingPage from './creatingPage';

function Groups() {
  
  return (
  <Router>
      <div>
        <YourGroups />
        <SearchBar />
        <AvailableGroups />
        <CreateGroup />
  <Routes>
  <Route path="/creatingPage/*" element={creatingPage />} />
  </Routes>
      </div>
  </Router>
    );
  
}

export default Groups;
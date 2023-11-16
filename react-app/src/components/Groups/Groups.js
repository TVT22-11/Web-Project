// components/Groups/Groups.js
import React from 'react';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';
import { Route, Routes} from 'react-router-dom';
import CreatingPage from './creatingPage';

function Groups() {
  
  return (
    
      <div>
        <YourGroups />
        <SearchBar />
        <AvailableGroups />
        <CreateGroup />
        <Routes>
          <Route path="/creatingPage/*" element={<CreatingPage />} />
        </Routes>
      </div>
   
  );
  
}

export default Groups;
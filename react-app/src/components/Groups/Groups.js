// components/Groups/Groups.js
import React from 'react';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';


function Groups() {
  return (
    <div>
      <YourGroups />
      <SearchBar />
      <AvailableGroups />
    </div>
  );
}

export default Groups;
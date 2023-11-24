// components/Groups/Groups.js
import React from 'react';
import './Groups.css';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';


function Groups() {
  
  return (

    <div>
      <YourGroups />
      <SearchBar />
      <AvailableGroups />
      <CreateGroup />
      </div>
    

  );
  
}

export default Groups;
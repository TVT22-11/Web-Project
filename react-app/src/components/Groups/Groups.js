// components/Groups/Groups.js
import React from 'react';
import './Groups.css';
import YourGroups from './YourGroups';
import SearchBar from '../Searchbar/searchbar';






import AvailableGroups from './AvailableGroups';
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
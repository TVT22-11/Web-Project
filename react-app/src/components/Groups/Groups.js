// components/Groups/Groups.js
import React from 'react';
import YourGroups from './YourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './AvailableGroups';
import CreateGroup from './CreateGroup';





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
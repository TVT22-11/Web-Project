// components/Groups/Groups.js
import React from 'react';
import YourGroups from './YourGroups';
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
      </div>
    

  );
  
}

export default Groups;
import React from 'react';
import './Groups.css';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';
import { useUser } from '../User/UserContext'; 

function Groups() {
  const { isLoggedIn } = useUser();

  return (
    <div className='group-page'>
      {/* Navbar element */}
      <div>
        {/* Display sign-in message if not signed in */}
        {!isLoggedIn && <p>Sign in to create a group</p>}
        {/* SearchBar component always displayed */}
        {/* YourGroups and AvailableGroups components */}
        <YourGroups />
        <AvailableGroups />
        {/* Render CreateGroup only if user is logged in */}
        {isLoggedIn && <CreateGroup />}
      </div>
    </div>
  );
}

export default Groups;

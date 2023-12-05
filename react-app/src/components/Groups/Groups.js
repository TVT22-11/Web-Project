import React from 'react';
import './Groups.css';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';
import { useUser } from '../User/UserContext'; // Replace 'path-to-your-user-context' with the actual path

function Groups() {
  const { isLoggedIn } = useUser();

  return (
    <div className='group-page'>
      {/* Navbar element */}
      <div>
        {/* Display sign-in message if not signed in */}
        {!isLoggedIn && <p>Sign in to access groups</p>}
        {/* SearchBar component always displayed */}
        {/* YourGroups, AvailableGroups, and CreateGroup components */}
        {isLoggedIn && (
          <>
            <YourGroups />
            <AvailableGroups />
            <CreateGroup />
          </>
        )}
      </div>
    </div>
  );
}

export default Groups;

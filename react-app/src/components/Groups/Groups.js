import React, { useState } from 'react';
import './Groups.css';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';

function Groups() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // You can replace this function with your actual sign-in logic
  const handleSignIn = () => {
    // Implement your sign-in logic here
    // For example, set isSignedIn to true when the user signs in
    setIsSignedIn(true);
  };

  return (
    <div>
      {/* Navbar element */}
      <div>
        {/* Display sign-in message if not signed in */}
        {!isSignedIn && <p >Sign in to access groups</p>}
        {/* SearchBar component always displayed */}
        <SearchBar />
        {/* YourGroups, AvailableGroups, and CreateGroup components */}
        {isSignedIn && (
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

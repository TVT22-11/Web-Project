import React from 'react';
import './Groups.css';
import YourGroups from './yourGroups';
import SearchBar from '../Searchbar/searchbar';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';
import { useUser } from '../User/UserContext';
import { GroupsProvider, useGroups } from './groupsContext'; // Adjust the path accordingly

function Groups() {
  const { isLoggedIn } = useUser();
  const { groups, addGroup } = useGroups();

  return (
    <GroupsProvider>
      <div>
        {/* Navbar element */}
        <div>
          {/* Display sign-in message if not signed in */}
          {!isLoggedIn && <p>Sign in to access groups</p>}
          {/* SearchBar component always displayed */}
          <SearchBar />
          {/* YourGroups, AvailableGroups, and CreateGroup components */}
          {isLoggedIn && (
            <>
              <YourGroups groups={groups} />
              <AvailableGroups groups={groups} />
              <CreateGroup addGroup={addGroup} />
            </>
          )}
        </div>
      </div>
    </GroupsProvider>
  );
}

export default Groups;

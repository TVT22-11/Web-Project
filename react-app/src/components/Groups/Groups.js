import React from 'react';
import './Groups.css';
import YourGroups from './yourGroups';
import AvailableGroups from './availableGroups';
import CreateGroup from './createGroup';
import { useUser } from '../User/UserContext';


function Groups() {
  const { isLoggedIn } = useUser();

  return (
    <div className='group-page'>
      <div>
        <AvailableGroups />
        {!isLoggedIn && <p>Sign in to create a group</p>}
        {isLoggedIn && <YourGroups />}
        {isLoggedIn && <CreateGroup />}
      </div>
    </div>
  );
}

export default Groups;

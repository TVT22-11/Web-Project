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
      <AvailableGroups />
  
      {!isLoggedIn && <p>Sign in to Create or See groups</p>}
      {isLoggedIn && (
        <div className='Groups-Page-Bottom-container'>
          <YourGroups />
          <CreateGroup />
        </div>
      )} 
    </div>
  );
}
export default Groups;

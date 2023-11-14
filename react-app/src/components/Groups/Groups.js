// components/Groups/Groups.js
import React from 'react';
import YourGroups from './yourGroups';
import AvailableGroups from './availableGroups';


function Groups() {
  return (
    <div>
      <YourGroups />
      <AvailableGroups />
    </div>
  );
}

export default Groups;
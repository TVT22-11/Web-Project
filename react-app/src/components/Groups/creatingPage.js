// CreatingPage.js
import React, { useState } from 'react';
import './Groups.css';
import { useGroups } from '.groupsContext'

function CreatingPage() {
  const { addGroup } = useGroups();
  const [groupName, setGroupName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isOptionalFeatureEnabled, setIsOptionalFeatureEnabled] = useState(false);

  const handleCreateGroup = () => {
    const newGroup = {
      name: groupName,
      description: additionalInfo,
      isPrivate: isOptionalFeatureEnabled,
    };
    addGroup(newGroup);
    // Additional logic, such as clearing the input fields, can be added here
  };

  // ... rest of the component code

  return (
    // ... rest of the component code
    <button onClick={handleCreateGroup}>Create</button>
  );
}

export default CreatingPage;

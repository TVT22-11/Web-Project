import React, { useState } from 'react';
import './Groups.css';
import axios from 'axios';

function CreatingPage() {
  // Declare state variables for input values
  const [groupName, setGroupName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isOptionalFeatureEnabled, setIsOptionalFeatureEnabled] = useState(false);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsOptionalFeatureEnabled(!isOptionalFeatureEnabled);
  };

  const handleCreateGroup = async () => {
    // Create a new group object with the input values
    const newGroup = {
      name: groupName,
      description: additionalInfo,
      isprivate: isOptionalFeatureEnabled,
    };

    try {
      // Send a POST request to your server endpoint that adds the group to the database
      const response = await axios.post('http://localhost:3001/group/post', newGroup);

      // Check if the request was successful (you may want to add more error handling)
      if (response.status === 201) {
        console.log('Group created successfully!');
        // Optionally, you can reset the form after successful creation
        setGroupName('');
        setAdditionalInfo('');
        setIsOptionalFeatureEnabled(false);
      } else {
        console.error('Error creating group:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className='creating-form'>
      <div className='creating-form-container'>
        <h3>Create Group</h3>

        <div className='label-1'>
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            placeholder="Enter group name"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </div>
        <div className='label-2'>
          <label htmlFor="additionalInfo">Group Description:</label>
          <input
            type="text"
            id="additionalInfo"
            placeholder="Enter additional information"
            value={additionalInfo}
            onChange={handleAdditionalInfoChange}
          />
        </div>
        <div className='checkbox-container'>
          <label>
            Group Is Private:
          </label>
          <input
            type="checkbox"
            checked={isOptionalFeatureEnabled}
            onChange={handleCheckboxChange}
          />
        </div>
        <button onClick={handleCreateGroup}>Create</button>
      </div>
    </div>
  );
}

export default CreatingPage;

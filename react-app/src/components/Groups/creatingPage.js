import React, { useState, useEffect } from 'react';
import './Groups.css';
import axios from 'axios';

function CreatingPage() {
  const [groupName, setGroupName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isOptionalFeatureEnabled, setIsOptionalFeatureEnabled] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3001/account/user'); 
        setUserId(userResponse.data.id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

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
    const newGroup = {
      name: groupName,
      description: additionalInfo,
      isprivate: isOptionalFeatureEnabled,
      owner: userId, // Set the owner to the user's ID
    };

    try {
      const response = await axios.post('http://localhost:3001/group/post', newGroup);

      if (response.status === 201) {
        console.log('Group created successfully!');
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

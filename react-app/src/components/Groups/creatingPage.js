import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Groups.css';
import axios from 'axios';
import { useUser } from '../User/UserContext';
function CreatingPage() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isOptionalFeatureEnabled, setIsOptionalFeatureEnabled] = useState(false);
  const {accountID} = useUser();

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
      owner: accountID,
    };

    try {

      const response = await axios.post('http://localhost:3001/group/post', newGroup);

      if (response.status === 200) {
        console.log('Group created successfully!');
        
        navigate('/groups'); 
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

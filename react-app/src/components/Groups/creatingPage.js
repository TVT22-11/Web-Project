import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Groups.css';
import axios from 'axios';

function CreatingPage() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isOptionalFeatureEnabled, setIsOptionalFeatureEnabled] = useState(false);
  const [id_account, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user information from the endpoint
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3001/user'); // Replace with your actual user endpoint
        setUserId(userResponse.data.UserData); // Adjust this based on your actual user object structure
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
    // Create a new group object with the input values
    const newGroup = {
      name: groupName,
      description: additionalInfo,
      isprivate: isOptionalFeatureEnabled,
      owner: id_account,
    };

    try {
      // Send a POST request to your server endpoint that adds the group to the database
      const response = await axios.post('http://localhost:3001/group/post', newGroup);

      // Check if the request was successful
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

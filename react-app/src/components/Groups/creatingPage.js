import React, { useState } from 'react';
import './Groups.css';

function CreatingPage() {
  // Declare state variables for input values
  const [groupName, setGroupName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isOptionalFeatureEnabled, setIsOptionalFeatureEnabled] = useState(false);

  // Create functions to handle changes in the inputs
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsOptionalFeatureEnabled(!isOptionalFeatureEnabled);
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
<button>Create</button>

      </div>
    </div>
  );
}

export default CreatingPage;

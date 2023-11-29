// availableGroups.js
import React from 'react';
import './Groups.css';

function AvailableGroups({ groups }) {
  return (
    <div className="groups flex-container">
      <div className="groups-list">
        <h3>Available Groups:</h3>
        {/* Render groups here */}
      </div>
    </div>
  );
}

export default AvailableGroups;

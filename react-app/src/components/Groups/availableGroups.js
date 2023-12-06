import React, { useState, useEffect } from 'react';
import './Groups.css';
import axios from 'axios';

function AvailableGroups() {
  // Declare state variable for storing the fetched groups
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch the available groups from the server when the component mounts
    const fetchGroups = async () => {
      try {
        // Send a GET request to your server endpoint that retrieves the groups from the database
        const response = await axios.get('http://localhost:5432/group');

        // Check if the request was successful (you may want to add more error handling)
        if (response.status === 200) {
          // Ensure that the response data is an array before updating the state
          if (Array.isArray(response.data)) {
            // Update the state with the fetched groups
            setGroups(response.data);
          } else {
            console.error('Invalid data structure received from the server');
          }
        } else {
          console.error('Error fetching groups:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    // Call the fetchGroups function
    fetchGroups();
  }, []); // The empty dependency array ensures that this effect runs only once, equivalent to componentDidMount

  return (
    <div className="groups flex-container">
      <div className="groups-list">
        <h3>Available Groups:</h3>
        
        {/* Render the fetched groups if it's an array */}
        {Array.isArray(groups) ? (
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <p>Group Name: {group.groupName}</p>
                <p>Additional Info: {group.additionalInfo}</p>
                <p>Is Private: {group.isPrivate ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No groups available</p>
        )}
      </div>
    </div>
  );
}

export default AvailableGroups;

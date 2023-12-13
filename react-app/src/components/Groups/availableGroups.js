import React, { useEffect, useState, useRef } from 'react';
import './Groups.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../User/UserContext';

function AvailableGroups() {
  console.log('Component Rendering');
  const [groups, setGroups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { accountID } = useUser();

  useEffect(() => {
    const fetchGroups = async () => {
      
      try {
        const GroupsResponse = await axios.get('http://localhost:3001/group');
        const Groupsdata = GroupsResponse.data.GroupData;

        // Check if the component is still mounted before updating state

          setGroups(Groupsdata);
          setLoading(false);
        
      } catch (error) {
        // Check if the component is still mounted before updating state
      
          console.error('Error fetching groups:', error);
          setLoading(false);
        
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    // Ensure currentIndex is within bounds
    setCurrentIndex((prevIndex) => Math.min(groups.length - 1, Math.max(0, prevIndex)));
  }, [groups.length]);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groups.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + groups.length) % groups.length);
  };
  

  const handleJoinGroup = async (id_party) => {
    try {

      const response = await axios.post(`http://localhost:3001/group/join`, {
        id_account:  accountID ,
        id_party:  id_party 
    });

    if (response.data.success) {
      console.log('Successfully joined the group');
    } else {
      console.error('Failed to join the group');
    }
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };


  const handleDeleteGroup = async (id_party) => {
    console.log('ID Party to Delete:', id_party);
    if (!id_party) {
      console.error('No party selected for deletion');
      return;
    }

    try {
      const response = await axios.delete('http://localhost:3001/group/deleteParty', {
        data: {
          id_party: id_party,
        },
      });
      console.log('deleted party id:', id_party);

      if (response.status === 200) {
        console.log('Successfully deleted member');

      } else {
        console.error('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };


  return (
    <div className="groups flex-container">
      <div className="groups-list">
        <h3>Available Groups:</h3>
        {loading ? (
          <p>Loading Groups...</p>
        ) : groups.length === 0 ? (
          <p>There are no groups.</p>
        ) : (
          <div className="slider-container">
            <ul className="slider" style={{ transform: `translateY(-${currentIndex * 50}%)` }}>
            <div>
            {groups.map((group) => (
              <div className='group-info' key={group.id_party}>
                <h4>Group Name: {group.name}</h4>
                <p>Additional Info: {group.description}</p>
                <p>Private: {group.isprivate ? 'Yes' : 'No'}</p>
                <button className="join-button" onClick={() => handleJoinGroup(group.id_party)}>
                  <Link to={`/Groups/chatpage/${group.id_party}`}>Join</Link>
                </button>
                <button onClick={handleDeleteGroup}>Delete Group</button> 
              </div>

            ))}
          </div>
            </ul>
          </div>
        )}
        <div className="slider-controls">
          <button onClick={handlePrevSlide}>Previous</button>
          <button onClick={handleNextSlide}>Next</button>
        </div>
      </div>
    </div>
  );
  
}

export default AvailableGroups;

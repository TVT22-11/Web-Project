import React, { useState, useEffect } from 'react';
import './Groups.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AvailableGroups() {
  const [groups, setGroups] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/group');
        if (response.status === 200 && response.data && response.data.GroupDataData) {
          setGroups(response.data.GroupDataData);
        } else {
          console.error('Invalid data structure received from the server');
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groups.length);
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + groups.length) % groups.length);
  };

  return (
    <div className="groups flex-container">
      <div className="groups-list">
        <h3>Available Groups:</h3>
        <div className="slider-container">
          <ul className="slider" style={{ transform: `translateY(-${currentIndex * 100}%)` }}>
            {groups.map((group) => (
              <li key={group.id}>
                <div className="group-info">
                  <h4>Group Name: {group.name}</h4>
                  <p>Additional Info: {group.description}</p>
                  <p>Private: {group.isprivate ? 'Yes' : 'No'}</p>
                  <button className="join-button">
  <Link to={`/Groups/chatpage/${group.id_party}`}>Join</Link>
</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="slider-controls">
          <button onClick={handlePrevSlide}>Previous</button>
          <button onClick={handleNextSlide}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default AvailableGroups;

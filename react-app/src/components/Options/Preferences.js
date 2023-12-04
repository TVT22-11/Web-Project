// Preferences.js

import React, { useState, useEffect } from 'react';
import './Options.css';
import './Preferences.css';
import moment from 'moment-timezone';
import 'moment-timezone/data/packed/latest.json';
import Sidebar from './Sidebar';
import { useDarkMode } from './DarkModeContext';

function Preferences({ selectedTimezone, setSelectedTimezone }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {}, []);

  const [allTimezones, setAllTimezones] = useState([]);

  useEffect(() => {
    try {
      const timeZoneList = moment.tz.names().map((timezone) => ({
        value: timezone,
        label: timezone,
      }));

      setAllTimezones(timeZoneList);
    } catch (error) {
      console.error('Error loading timezone data:', error);
    }
  }, []);

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setSelectedTimezone(newTimezone);
    localStorage.setItem('selectedTimezone', newTimezone);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className={`content ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className = "preference-container">
        <ul>
          <li>
            <h2>Preferences</h2>
            <label>
              Light Mode
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
            </label>
          </li>
          <li>
            <label>
              Timezone
              <select
                value={selectedTimezone}
                onChange={(e) => handleTimezoneChange(e)}
              >
                {allTimezones.map((timezone) => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </label>
          </li>
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Preferences;

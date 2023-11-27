// Preferences.js

import React, { useState, useEffect } from 'react';
import './Options.css';
import './Preferences.css';
import Clock from './Clock';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';
import { useDarkMode } from './DarkModeContext';

function Preferences({ selectedTimezone, setSelectedTimezone }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Add any other initialization code here
  }, []); // Empty dependency array to run the effect only once on mount

  const storedTimezone = localStorage.getItem('selectedTimezone') || 'Europe/Helsinki';
  const [allTimezones, setAllTimezones] = useState([]);

  useEffect(() => {
    const timeZoneList = moment.tz.names().map((timezone) => ({
      value: timezone,
      label: timezone,
    }));

    setAllTimezones(timeZoneList);
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
        <ul>
          <li>
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
              <select value={selectedTimezone} onChange={(e) => handleTimezoneChange(e)}>
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
  );
}

export default Preferences;

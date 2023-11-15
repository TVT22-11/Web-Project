// components/options/Preferences.js
import React, { useState, useEffect } from 'react';
import './Options.css';
import './Preferences.css';
import Clock from './Clock';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';

function Preferences() {
  const storedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
  const storedTimezone = localStorage.getItem('selectedTimezone') || 'Europe/Helsinki';

  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const [selectedTimezone, setSelectedTimezone] = useState(storedTimezone);
  const [allTimezones, setAllTimezones] = useState([]);

  useEffect(() => {
    const timeZoneList = moment.tz.names().map((timezone) => ({
      value: timezone,
      label: timezone,
    }));

    setAllTimezones(timeZoneList);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const handleTimezoneChange = (e) => {
    const newTimezone = e.target.value;
    setSelectedTimezone(newTimezone);
    localStorage.setItem('selectedTimezone', newTimezone);
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className={`content ${darkMode ? 'dark-mode' : ''}`}>
        <ul>
          <li>
            <label>
              Dark Mode
              <input
                type="checkbox"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
            </label>
          </li>
          <li>
            <label>
              Timezone
              <select value={selectedTimezone} onChange={handleTimezoneChange}>
                {allTimezones.map((timezone) => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </label>
          </li>
        </ul>
        <Clock selectedTimezone={selectedTimezone} />
      </div>
    </div>
  );
}

export default Preferences;

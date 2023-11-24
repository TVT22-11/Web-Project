// components/options/Preferences.js
import React, { useState, useEffect } from 'react';
import './Options.css';
import './Preferences.css';
import Clock from './Clock';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';

function Preferences() {
  const storedTimezone = localStorage.getItem('selectedTimezone') || 'Europe/Helsinki';

  const [isDarkMode, setIsDarkMode] = useState(false); // Set initial dark mode state
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
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
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
      <div className={`content ${isDarkMode ? 'dark-mode' : ''}`}>
        <ul>
          <li>
            <label>
              Light Mode
              <input
                type="checkbox"
                checked={isDarkMode}
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

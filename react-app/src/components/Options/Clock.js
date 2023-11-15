// Clock.jsx

import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './Clock.css';

function Clock({ selectedTimezone, onTimezoneChange }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  const formattedTime = moment(currentTime).tz(selectedTimezone).format('HH:mm:ss');

  return (
    <div className="Clock">
      <div className="time">{formattedTime}</div>

      {}
    </div>
  );
}

export default Clock;

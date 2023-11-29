// Clock.js

import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './Clock.css';

function Clock({ timezone, defaultTimezone }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = timezone
    ? moment(currentTime).tz(timezone).format('HH:mm')
    : moment(currentTime).tz(defaultTimezone).format('HH:mm');

  return (
    <div className="Clock">
      <div className="time">{formattedTime}</div>
    </div>
  );
}

export default Clock;

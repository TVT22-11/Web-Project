import React, { useState, useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Trigger the onClose callback after the notification disappears
    }, 3000); // Adjust the duration as needed (e.g., 3000 milliseconds or 3 seconds)

    return () => clearTimeout(timeout);
  }, [onClose]);

  return isVisible ? <div className="notification">{message}</div> : null;
};

export default Notification;
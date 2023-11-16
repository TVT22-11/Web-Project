// Other.js
import React from 'react';
import Sidebar from './Sidebar';

const Other = () => {
  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

    if (isConfirmed) {
      console.log('Deleting account...');
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content">
        <ul>
          <li className="other-section">
            <span></span>
            <ul>
              <li>
                <button className="delete-account" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </li>
              {}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Other;

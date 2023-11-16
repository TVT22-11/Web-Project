import React, { useState, useEffect } from 'react';
import './Options.css';
import Sidebar from './Sidebar';
import './Appearance.css';

const presetAvatars = [
  { name: 'Avatar 1', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_1.png` },
  { name: 'Avatar 2', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_2.png` },
  { name: 'Avatar 3', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_3.png` },
  { name: 'Avatar 4', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_4.png` },
  { name: 'Avatar 5', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_5.png` },
  { name: 'Avatar 6', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_6.png` },
  { name: 'Avatar 7', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_7.png` },
  { name: 'Avatar 8', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_8.png` },
  { name: 'Avatar 9', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_9.png` },
  { name: 'Avatar 10', url: `${process.env.PUBLIC_URL}/Avatars/Avatar_10.png` },
];

const Appearance = () => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isChangePopupOpen, setChangePopupOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    const storedAccountName = localStorage.getItem('accountName') || '';
    const storedAvatar = localStorage.getItem('selectedAvatar') || '';

    setAccountName(storedAccountName);
    setSelectedAvatar(storedAvatar);
  }, []);

  const handleSavePassword = () => {
    if (password.length >= 6) {
      console.log('Updating Password:', password);
    } else {
      alert('Password must be at least 6 characters long.');
    }
  };

  const handleSaveAvatar = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setAvatarModalOpen(false);
    localStorage.setItem('selectedAvatar', avatarUrl);
  };

  const handleOpenChangePopup = () => {
    setNewAccountName(''); 
    setChangePopupOpen(true);
  };

  const handleCloseChangePopup = () => {
    setChangePopupOpen(false);
  };

  const handleChangeAccountName = () => {
    if (newAccountName.length >= 4) {
      setAccountName(newAccountName);
      localStorage.setItem('accountName', newAccountName);
      handleCloseChangePopup();
    } else {
      alert('Account name must be at least 4 characters long.');
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content">
        <h2>Account Information</h2>

        <div>
          <label>
            Account Name: {accountName}
            <button onClick={handleOpenChangePopup}>Change</button>
          </label>
        </div>

        <div>
          <label>
            Change Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSavePassword}>Save</button>
          </label>
        </div>

        <div>
          <label>
            Select Avatar:
            <button onClick={() => setAvatarModalOpen(true)}>Choose an Avatar</button>
            {selectedAvatar && (
              <img
                src={selectedAvatar}
                alt="Selected Avatar"
                style={{ width: '100px', height: '100px', marginLeft: '10px' }}
              />
            )}
          </label>
        </div>

        {isChangePopupOpen && (
          <div className="change-popup">
            <input
              type="text"
              placeholder="Enter new account name"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
            />
            <button onClick={handleChangeAccountName}>Save</button>
            <button onClick={handleCloseChangePopup}>Cancel</button>
          </div>
        )}

        {isAvatarModalOpen && (
          <div className="avatar-modal">
            <button onClick={() => setAvatarModalOpen(false)}>Close</button>
            <ul>
              {presetAvatars.map((avatar) => (
                <li key={avatar.url}>
                  <img
                    src={avatar.url}
                    alt={avatar.name}
                    onClick={() => handleSaveAvatar(avatar.url)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appearance;

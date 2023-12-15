import React from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

// Function to parse JWT token and extract information
const parseJwt = (token) => {
  try {
    // Split the token into header, payload, and signature
    const tokenParts = token.split('.');
    
    if (tokenParts.length < 3) {
      throw new Error('Invalid token format');
    }

    // Decode the payload (which is the second part)
    const decodedPayload = JSON.parse(atob(tokenParts[1]));
    console.log('Decoded payload:', decodedPayload);

    return decodedPayload;
  } catch (e) {
    return null;
  }
};

const Other = () => {
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

    if (isConfirmed) {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const decodedToken = parseJwt(token);

        if (!decodedToken || !decodedToken.username) {
          console.error('Invalid or missing username in the token.');
          return;
        }

        const username = decodedToken.username;
        const id_account = decodedToken.id_account;
        const password = decodedToken.password;

        const response = await axios.delete('/auth/delete', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            username: username,
            id_account: id_account,
            password: password,
          },
        });

        if (response.status === 200) {
          console.log('Account deleted successfully.');
          window.location.href = '/';
        } else {
          console.error('Failed to delete account. Server response:', response.data);
        }
      } catch (error) {
        console.error('Error deleting account:', error.message);
      }
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
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Other;

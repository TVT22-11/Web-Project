import React, { useState } from 'react';
import './Options.css';
import Sidebar from './Sidebar';
import './Appearance.css';
import { useUser } from '../User/UserContext';

const Appearance = () => {
  const [password, setPassword] = useState('');
  const { username } = useUser();
  const { fname } = useUser();
  const { lname } = useUser();
 

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content">
        <h2>Account Information</h2>

        <div>
          <label>
            Name: {fname} {lname}
          </label>
        </div>
        <div>
          <label>
            Account Name: {username}
          </label>
        </div>
        <div>
            <h2>Reviews:</h2>
            <label></label>
        </div>
      </div>
    </div>
  );
};

export default Appearance;

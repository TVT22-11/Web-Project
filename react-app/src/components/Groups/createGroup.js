import React from 'react';
import { Link } from 'react-router-dom';
import './Groups.css';

import './CreatingPage'

function createGroup() {
        return (
                <>
                <div className='header'>
                  <h3>Or</h3>
                </div>
                <div className='create-button'>
                  <button>
                    <Link to="CreatingPage">Create Group</Link>
                  </button>
                </div>
              </>
            );
}
export default createGroup;
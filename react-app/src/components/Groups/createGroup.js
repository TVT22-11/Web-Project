import React from 'react';
import { Link } from 'react-router-dom';

function createGroup() {
        return (
                <>
                <div className='header'>
                  <h3>Or</h3>
                </div>
                <div className='create-button'>
                  <button>
                    <Link to="/Groups/CreatingPage">Create Group</Link>
                  </button>
                </div>
              </>
            );
}
export default createGroup;
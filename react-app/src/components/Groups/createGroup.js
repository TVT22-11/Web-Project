import React from 'react';
import { Link } from 'react-router-dom';

function createGroup() {
        return (
                <>
                <div className='header'>
                  <h3>Create Group here</h3>
                </div>
                <div >
                  <button >
                    <Link to="/Groups/CreatingPage">Create Group</Link>
                  </button>
                </div>
              </>
            );
}
export default createGroup;
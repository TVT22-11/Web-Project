import React from 'react';
import './Groups.css';
function availableGroups (){
    return (
<div className="groups flex-container">
        <div className="groups-list">
          <h3>Available Groups:</h3>
          <table>
            <thead>
              <tr>
                <th>Name:</th>
                <th>Members:</th>
                <th>Join:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="/images/popcorn.png"/>Group 1</td>
                <td>5/20</td>
                <td><button>Join Group</button></td>
              </tr>
              <tr>
                <td><img src="/images/popcorn.png"/>Group 2</td>
                <td>2/20</td>
                <td><button>Join Group</button></td>
              </tr>
              <tr>
                <td><img src="/images/popcorn.png"/>Group 3</td>
                <td>7/20</td>
                <td><button>Join Group</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default availableGroups;

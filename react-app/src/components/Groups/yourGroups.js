import React from 'react';
import './Groups.css';
import { Link } from 'react-router-dom';
function yourGroups (){
    return (
        <div className="your-groups-list">
        <h3>Your Groups:</h3>
        <ul>
          <li><img src="/images/popcorn.png"/><Link to="/Groups/ChatPage">Group 1</Link></li>
          <li><img src="/images/popcorn.png"/><Link to="/Groups/ChatPage">Group 2</Link></li>
          <li><img src="/images/popcorn.png"/><Link to="/Groups/ChatPage">Group 3</Link></li>
        </ul>
      </div>

      
    );
 }
 export default yourGroups;
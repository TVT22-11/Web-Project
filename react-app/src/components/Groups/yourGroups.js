import React from 'react';
import './Groups.css';
function yourGroups (){
    return (
        <div className="your-groups-list">
        <h3>Your Groups:</h3>
        <ul>
          <li><img src="/images/popcorn.png"/><a href="">Group 1</a></li>
          <li><img src="/images/popcorn.png"/><a href="">Group 2</a></li>
          <li><img src="/images/popcorn.png"/><a href="">Group 3</a></li>
        </ul>
      </div>

      
    );
 }
 export default yourGroups;
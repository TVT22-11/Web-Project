// Options.js

import React, { useState } from 'react';
import './Assets/Styles/style.css'; // Import the main styles
import './Assets/Styles/style-options.css'; // Import the options-specific styles

const Options = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const loadOption = (option) => {
    // Your logic to load the option goes here
    // For now, let's just update the selected option in state
    setSelectedOption(option);
  };

  return (
    <div>
      <header>
        <nav className="navbar" id="navbar">
          <span className="logo-name">O/L</span>
          <div className="navbar-links">
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="">Reviews</a></li>
              <li><a href="">Movies</a></li>
              <li><a href="">Groups</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="sidebar">
        <h2>Options</h2>
        <button onClick={() => loadOption('preferences')}>Preferences</button>
        <button onClick={() => loadOption('posts')}>Posts</button>
        <button onClick={() => loadOption('alerts')}>Alerts</button>
        <button onClick={() => loadOption('appearance')}>Appearance</button>
      </div>

      <div id="options-container">
        {/* Content will be dynamically loaded here based on the selectedOption */}
        {selectedOption && (
          <div>
            <h3>{selectedOption} content goes here</h3>
            {/* Add specific content for each option */}
          </div>
        )}
      </div>

      <footer>
        <p>&copy; Real movie catalogue</p>
      </footer>
    </div>
  );
};

export default Options;
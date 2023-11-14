// Navbar.js
import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function DDmenuClickHandler() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
  console.log('Dropdown menu clicked!');
}

function Navbar() {
  return (
    <header>
      <nav className="navbar" id="navbar">
        <div className="dropdown">
            <FontAwesomeIcon
            icon={faBars}
            onClick={DDmenuClickHandler}
            className="fa-bars"
          />
          <div id="myDropdown" className="dropdown-content">
            <div className="dd-navbar-links">
              <ul>
                <li><Link to="/reviews">Reviews</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/groups">Groups</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <span className="logo-name">O/L</span>

        <div className="navbar-links">
          <ul>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/groups">Groups</Link></li>
          </ul>
        </div>
        <button className="Sign-in" type="submit">Sign In</button>
      </nav>
    </header>
  );
}

export default Navbar;

import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [show, setShow] = useState(true);

  const DDmenuClickHandler = () => {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
    console.log('Dropdown menu clicked!');
  };



  return (
    <header>
      <nav className={`navbar ${show ? 'visible' : 'hidden'}`} id="navbar">
        <div className="dropdown">
          <FontAwesomeIcon
            icon={faBars}
            onClick={DDmenuClickHandler}
            className="fa-bars"
          />
          <div id="myDropdown" className="dropdown-content">
            <div className="dd-navbar-links">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Reviews">Reviews</Link></li>
                <li><Link to="/Movies">Movies</Link></li>
                <li><Link to="/Groups">Groups</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <span className="logo-name">O/L</span>

        <div className="navbar-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Reviews">Reviews</Link></li>
            <li><Link to="/Movies">Movies</Link></li>
            <li><Link to="/Groups">Groups</Link></li>
            <li><Link to="/options/preferences">Options</Link></li>
          </ul>
        </div>
        <button className="Sign-in" type="submit"><Link to="/Login">Sign In</Link></button>
      </nav>
    </header>
  );
};

export default Navbar;

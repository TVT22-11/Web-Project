// Navbar.js

import React, { useRef, useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Clock from '../Options/Clock';
import { useUser } from '../User/UserContext';

const Navbar = ({ selectedTimezone, defaultTimezone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useUser();
  const dropdownRef = useRef(null);

  const DDmenuClickHandler = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogout = () =>{
    logout();
  };
  const handleLogoutClicked = () => {
    handleLogout();
    handleRefresh();
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const closeDropdownOnLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <header>
      <nav className={`navbar ${isOpen ? 'visible' : ''}`} id="navbar">
        <div className="dropdown" ref={dropdownRef}>
        {isLoggedIn ? (
              <button onClick={handleLogoutClicked} className="log-out-button-ddmenu">Logout</button>
            ) : (
          <Link to="/Login" className="drop-sign-in-button">Sign In</Link>
          )}
          <FontAwesomeIcon
            icon={faBars}
            onClick={DDmenuClickHandler}
            className="fa-bars"
          />
          <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
            <div className="dd-navbar-links">
              <ul>
                <li><Link to="/" onClick={closeDropdownOnLinkClick}>Home</Link></li>
                <li><Link to="/Reviews" onClick={closeDropdownOnLinkClick}>Reviews</Link></li>
                <li><Link to="/Movies" onClick={closeDropdownOnLinkClick}>Movies</Link></li>
                <li><Link to="/Groups" onClick={closeDropdownOnLinkClick}>Groups</Link></li>
                <li><Link to="/options/preferences" onClick={closeDropdownOnLinkClick}>Options</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <span className="logo-name">O/L</span>

        <div className="navbar-links">
          <ul>
            <li><Link to="/" onClick={closeDropdownOnLinkClick}>Home</Link></li>
            <li><Link to="/Reviews" onClick={closeDropdownOnLinkClick}>Reviews</Link></li>
            <li><Link to="/Movies" onClick={closeDropdownOnLinkClick}>Movies</Link></li>
            <li><Link to="/Groups" onClick={closeDropdownOnLinkClick}>Groups</Link></li>
            <li><Link to="/options/preferences" onClick={closeDropdownOnLinkClick}>Options</Link></li>
            {isLoggedIn ? (
              <button onClick={handleLogoutClicked} className="log-out-button">Logout</button>
            ) : (
              <Link to="/Login" className="sign-in-button">Sign In</Link>
            )}
          </ul>
        </div>

        <Clock timezone={selectedTimezone || defaultTimezone} defaultTimezone={defaultTimezone} />
      </nav>
    </header>
  );
};

export default Navbar;
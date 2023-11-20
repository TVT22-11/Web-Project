import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const DDmenuClickHandler = () => {
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
    console.log('Dropdown menu clicked!');
  };

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) {
        setShow(false); 
      } else {
        setShow(true);  
      }

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

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
            <li><Link to="/">Home</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/groups">Groups</Link></li>
            <li><Link to="/options/preferences">Options</Link></li>
          </ul>
        </div>
        <Link to="/Login" className="sign-in-button">Sign In</Link>
      </nav>
    </header>
  );
};

export default Navbar;

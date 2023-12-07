// Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Appearance', path: '/options/appearance' },
    { label: 'Preferences', path: '/options/preferences' },
    { label: 'Other', path: '/options/other' }, // Update the path here
  ];

  return (
    <div className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li key={item.label} className={location.pathname === item.path ? 'selected' : ''}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

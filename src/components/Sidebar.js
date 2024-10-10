import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src="/path-to-profile-icon" alt="Profile Icon" className="profile-icon" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

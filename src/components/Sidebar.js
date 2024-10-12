import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">

        <img src="/logoRH.png" alt="Logo" className="logo-icon" />

      <ul className="nav-links">
        <li><Link to="/"><img src="/home-icon.png" alt="Home" className="nav-icon" />Home</Link></li>
        <li><Link to="/library"><img src="/disc-icon.png" alt="Disc" className="nav-icon" />Library</Link></li>
        <li><Link to="/search"><img src="/search-icon.png" alt="Search" className="nav-icon" />Search</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;

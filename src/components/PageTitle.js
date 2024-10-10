
import React from 'react';
import { useLocation } from 'react-router-dom';
import './PageTitle.css';

const PageTitle = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/library':
        return 'Library';
      case '/search':
        return 'Search';
      default:
        return 'Unknown Page';
    }
  };

  return (
    <div className="page-title-container">
      <h1 className="page-title">{getPageTitle()}</h1>
    </div>
  );
};

export default PageTitle;

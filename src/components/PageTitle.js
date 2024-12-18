import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './PageTitle.scss';

const PageTitle = () => {
  const location = useLocation();
  const { t } = useTranslation(); 

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/pages/profile':
        return t('Profile'); 
      case '/':
        return t('Home');
      case '/library':
        return t('Library'); 
      case '/search':
        return t('Search'); 
      case '/registration':
        return t('Registration'); 
      case '/chats':
        return t('Chats');
      default:
        return t('Unknown Page name'); 
    }
  };

  return (
    <div className="page-title-container">
      <h1 className="page-title">{getPageTitle()}</h1>
    </div>
  );
};

export default PageTitle;

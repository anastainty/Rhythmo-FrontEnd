import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.scss';

const Sidebar = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); 
  };
  return (
    <div className="sidebar">

        <img src="/logoRH.png" alt="Logo" className="logo-icon" />

      <ul className="nav-links">
      <li><Link to="/"><img src="/home-icon.png" alt="Home" className="nav-icon" />{i18n.t('Home')}</Link></li>
      <li><Link to="/library"><img src="/disc-icon.png" alt="Disc" className="nav-icon" />{i18n.t('Library')}</Link></li>
      <li><Link to="/search"><img src="/search-icon.png" alt="Search" className="nav-icon" />{i18n.t('Search')}</Link></li>
      <li><Link to="/chats"><img src="/chat-icon.png" alt="Chats" className="nav-icon" />{i18n.t('Chats')}</Link></li>
      </ul>

      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ru')}>Русский</button>
      </div>
    </div>
  );
};

export default Sidebar;

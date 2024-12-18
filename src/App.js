import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Chats from './pages/Chats';
import PageTitle from './components/PageTitle';
import Registration from './pages/Registration';
import './App.scss';

const App = () => {
  const location = useLocation();
  const { t } = useTranslation(); 
  const isRegistrationPage = location.pathname === '/registration';

  return (
    <div className="app-container">
      {!isRegistrationPage && <Sidebar />}
      <div
        className={`content-container ${isRegistrationPage ? 'registration-style' : ''}`}
      >
        {!isRegistrationPage && (
          <div className="profile-header">
            <PageTitle />
            <li>
              <Link to="/registration" className="logout-button">
                {t('Log out')} 
              </Link>
            </li>
            <Link to="/pages/profile">
              <img src="/profile-picture.jpg" alt="Profile" className="profile-picture" />
            </Link>
          </div>
        )}

        <Routes>
          <Route path="/pages/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/search" element={<Search />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>

      {!isRegistrationPage && <Player />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;

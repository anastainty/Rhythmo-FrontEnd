import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import Profile from './pages/Profile';
import PageTitle from './components/PageTitle'; // Импортируйте PageTitle
import './App.scss';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Боковая панель навигации */}
        <Sidebar />

        {/* Основной контент */}
        <div className="content-container">
          <div className="profile-header">
            <PageTitle /> {/* Заголовок страницы */}
            <button className="logout-button">Log out</button>
            <Link to="/pages/profile">
            <img src="/profile-picture.jpg" alt="Profile" className="profile-picture" />
            </Link>

          </div>

          <Routes>
            <Route path='/pages/profile' element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>

        {/* Плеер внизу */}
        <Player />
      </div>
    </Router>
  );
};

export default App;

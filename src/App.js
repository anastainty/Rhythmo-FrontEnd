import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Library from './pages/Library';
import Search from './pages/Search';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Боковая панель навигации */}
        <Sidebar />

        {/* Основной контент */}
        <div className="content-container">


          <div className="profile-header">
            <button className="logout-button">Log out</button>
            <img src="/profile-picture.jpg" alt="Profile" className="profile-picture" />
          </div>

          <Routes>
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

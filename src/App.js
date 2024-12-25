import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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
    const isRegistrationPage = location.pathname === '/registration';

    // Состояние для текущего трека и аватарки
    const [currentTrack, setCurrentTrack] = useState(null);
    const [profilePicture, setProfilePicture] = useState("/profile-picture.jpg");

    // Функция для обновления аватарки
    const handleProfilePictureChange = (newPicture) => {
        setProfilePicture(newPicture); // Обновляем аватарку в родительском компоненте
    };

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
                            <Link to="/registration" className="logout-button">Log out</Link>
                        </li>
                        <Link to="/pages/profile">
                            <img
                                src={profilePicture} // Используем динамическую аватарку
                                alt="Profile"
                                className="profile-picture"
                            />
                        </Link>
                    </div>
                )}

                <Routes>
                    <Route
                        path="/pages/profile"
                        element={<Profile onProfilePictureChange={handleProfilePictureChange} />}
                    />
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/library"
                        element={<Library onTrackSelect={setCurrentTrack} />}
                    />
                    <Route path="/search" element={<Search onTrackSelect={setCurrentTrack} />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/chats" element={<Chats />} />
                </Routes>
            </div>

            {!isRegistrationPage && <Player currentTrack={currentTrack} />}
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;

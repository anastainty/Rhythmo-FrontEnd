import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { logInfo, logError } from '../utils/logger';

const Profile = ({ onProfilePictureChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Иван",
    surname: "Иванов",
    subscriptions: 120,
    followers: 300,
    profilePicture: "/profile-picture.jpg",
  });

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    if (savedUserData) {
      setUserData(savedUserData);
      logInfo('User profile loaded from localStorage', { user: savedUserData });
    } else {
      logInfo('User profile loaded with default data', { user: userData });
    }
  }, []);

  const handleEditProfileClick = () => {
    setIsEditing(true);
    logInfo('Edit profile button clicked');
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    localStorage.setItem('userData', JSON.stringify(userData));
    logInfo('Profile changes saved', { user: userData });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, profilePicture: imageUrl }));
      onProfilePictureChange(imageUrl); // Обновляем аватарку в родительском компоненте
      logInfo('Profile picture updated');
    } else {
      logError('No file selected for profile picture update');
    }
  };

  const openProfilePictureWindow = () => {
    const profilePictureWindow = window.open("", "_blank", "width=500,height=500");
    profilePictureWindow.document.write(`
      <html>
        <head>
          <title>Profile Picture</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f0f0f0;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <img src="${userData.profilePicture}" alt="Profile Picture" />
        </body>
      </html>
    `);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <label htmlFor="profilePicture" className="profile-picture-label">
        <img
              src={userData.profilePicture}
              alt="Profile"
              className={`big-profile-picture ${isEditing ? 'editing' : ''}`}
              onClick={isEditing ? null : openProfilePictureWindow}
        />

          {isEditing && (
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
            />
          )}
        </label>
        <div className="user-info">
          <div className="user-info-name">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Имя"
                />
                <input
                  type="text"
                  name="surname"
                  value={userData.surname}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Фамилия"
                />
              </>
            ) : (
              <h2>{userData.name} {userData.surname}</h2>
            )}
          </div>
          <p>Подписки · {userData.subscriptions}</p>
          <p>Подписчики · {userData.followers}</p>
        </div>
      </div>
      {isEditing ? (
        <button
          className="save-changes-button"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      ) : (
        <button
          className="edit-profile-button"
          onClick={handleEditProfileClick}
        >
          Edit profile
        </button>
      )}
      <hr className="divider" />
      <div className="history-section">
        <h3 className="history-title">Listening History</h3>
        <div className="history-container" onScroll={() => logInfo('User scrolled through listening history')}>
          <div className="history-item">Playlist 1</div>
          <div className="history-item">Playlist 2</div>
          <div className="history-item">Playlist 3</div>
          <div className="history-item">Playlist 4</div>
          <div className="history-item">Playlist 5</div>
          <div className="history-item">Playlist 6</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

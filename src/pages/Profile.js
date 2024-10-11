import React from 'react';
import './Profile.css';  // потом добавить стили

const Profile = () => {
  const user = {
    name: "Иван",
    surname: "Иванов",
    subscriptions: 120,
    followers: 300,
    profilePicture: "/profile-picture.jpg",
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePicture} alt="Profile" className="big-profile-picture" />
        <div className="user-info">
          <h2>{user.name} {user.surname}</h2>
          <p>Подписки · {user.subscriptions}</p>
          <p>Подписчики · {user.followers}</p>
        </div>
      </div>
      <button className="edit-profile-button">Edit profile</button>

      <hr className="divider" />

      <div className="history-section">
        <h3 className="history-title">Listening History</h3>

        {/* Контейнер для элементов истории с прокруткой */}
        <div className="history-container">
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

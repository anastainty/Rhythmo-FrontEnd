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
          <p>Подписки: {user.subscriptions}</p>
          <p>Подписчики: {user.followers}</p>
        </div>
      </div>
      <button className="edit-profile-button">Edit profile</button>
    </div>
  );
};

export default Profile;

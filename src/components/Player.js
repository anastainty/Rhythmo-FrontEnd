import React from 'react';
//import './Player.css';  // Подключение стилей плеера - потом нужно будет разделитть по файлам стили

const Player = () => {
  return (
    <div className="player">
      <div className="player-info">
        <p>Now playing: Song Title</p>
      </div>
        <audio className="player-range" id="audioPlayer" controls>
            <source src="Likearec.mp3" type="audio/mp3"/>
            Your browser does not support the audio element.
        </audio>
    </div>
  );
};

export default Player;

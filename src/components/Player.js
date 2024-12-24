import React from 'react';
import './Player.scss';

const Player = ({ currentTrack }) => {
  return (
    <div className="player">
      {currentTrack && (
        <img
          src={currentTrack ? `data:image/jpeg;base64,${currentTrack.cover}` : null}
          alt={`${currentTrack.title} cover`}
          className="player-cover"
        />
      )}
      <div className="player-info">
        {currentTrack ? (
          <>
            <div className="track-title">{currentTrack.title}</div>
            <div className="track-artist">{currentTrack.artist}</div>
          </>
        ) : (
          <p>No track playing</p>
        )}
      </div>
      <audio
        className="player-range"
        id="audioPlayer"
        controls
        src={currentTrack ? `http://127.0.0.1:8000${currentTrack.file}` : null}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Player;

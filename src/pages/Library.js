import React, { useState, useEffect } from "react";
import './Library.scss';
import api from "./api";

const Library = ({ onTrackSelect }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await api.get(`/library/${username}/tracks/`); // Replace with your API endpoint
        setTracks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return <div className="library-container">Loading...</div>;
  }

  if (error) {
    return <div className="library-container">Error: {error}</div>;
  }

  return (
    <div className="library-container">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="track-item"
          onClick={() => onTrackSelect(track)} // Выбор трека
        >
          <img src={`data:image/jpeg;base64,${track.cover}`} alt={`${track.title} cover`} className="track-cover" />
          <div className="track-info">
            <div className="track-title">{track.title}</div>
            <div className="track-artist">{track.artist}</div>
          </div>
          <div className="track-album">{track.album}</div>
          <div className="track-year">{track.year}</div>
          <div className="track-duration">{track.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default Library;
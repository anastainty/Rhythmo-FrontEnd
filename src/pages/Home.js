import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-container">
      {/* Recently Played Playlists */}
      <div className="section">
        <h2>Recently Played Playlists</h2>
        <div className="horizontal-scroll">
          <div className="playlist-item">
            Playlist 1</div>
          <div className="playlist-item">Playlist 2</div>
          <div className="playlist-item">Playlist 3</div>
          <div className="playlist-item">Playlist 4</div>
          <div className="playlist-item">Playlist 5</div>
          <div className="playlist-item">Playlist 6</div>
        </div>
      </div>

      {/* Favourite Artists */}
      <div className="section">
        <h2>Favourite Artists</h2>
        <div className="horizontal-scroll">
          <div className="artist-item">Artist 1</div>
          <div className="artist-item">Artist 2</div>
          <div className="artist-item">Artist 3</div>
          <div className="artist-item">Artist 4</div>
          <div className="artist-item">Artist 5</div>
          
        </div>
      </div>

      {/* Recently Listened Podcasts */}
      <div className="section">
        <h2>Recently Listened Podcasts</h2>
        <div className="horizontal-scroll">
          <div className="podcast-item">Podcast 1</div>
          <div className="podcast-item">Podcast 2</div>
          <div className="podcast-item">Podcast 3</div>
          <div className="podcast-item">Podcast 4</div>
          <div className="podcast-item">Podcast 5</div>
         
        </div>
      </div>
    </div>
  );
};

export default Home;


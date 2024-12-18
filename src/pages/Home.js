import React, { useEffect } from 'react';
import './Home.scss';

// Функции логирования
import { logInfo, logError } from '../utils/logger';

// Подключение перевода
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation(); // Хук для перевода

  useEffect(() => {
    logInfo('Home page loaded');
    return () => {
      logInfo('Home page unloaded');
    };
  }, []);

  const handleScroll = (section) => {
    logInfo(`${section} section scrolled`);
  };

  return (
    <div className="home-container">
      {/* Recently Played Playlists */}
      <div className="section">
        <h2>{t('Recently Played Playlists')}</h2>
        <div 
          className="horizontal-scroll"
          onScroll={() => handleScroll('Recently Played Playlists')}
        >
          <div className="playlist-item">Playlist 1</div>
          <div className="playlist-item">Playlist 2</div>
          <div className="playlist-item">Playlist 3</div>
          <div className="playlist-item">Playlist 4</div>
          <div className="playlist-item">Playlist 5</div>
          <div className="playlist-item">Playlist 6</div>
        </div>
      </div>

      {/* Favourite Artists */}
      <div className="section">
        <h2>{t('Favourite Artists')}</h2>
        <div 
          className="horizontal-scroll"
          onScroll={() => handleScroll('Favourite Artists')}
        >
          <div className="artist-item">Artist 1</div>
          <div className="artist-item">Artist 2</div>
          <div className="artist-item">Artist 3</div>
          <div className="artist-item">Artist 4</div>
          <div className="artist-item">Artist 5</div>
        </div>
      </div>

      {/* Recently Listened Podcasts */}
      <div className="section">
        <h2>{t('Recently Listened Podcasts')}</h2>
        <div 
          className="horizontal-scroll"
          onScroll={() => handleScroll('Recently Listened Podcasts')}
        >
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

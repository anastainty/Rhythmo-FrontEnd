import React, { useEffect } from 'react';
import './Home.scss';
import { logInfo } from '../utils/logger';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const genres = [
    { name: 'Pop', gradient: 'linear-gradient(to bottom, rgb(225, 154, 176), rgb(156, 197, 197))', color: 'rgb(145, 94, 101)' },
    { name: 'Rock', gradient: 'linear-gradient(to bottom, rgb(166, 67, 56), rgb(203, 130, 88))', color: 'rgb(106, 41, 41)' },
    { name: 'Hip-Hop', gradient: 'linear-gradient(to bottom, rgb(132, 132, 210), rgb(60, 32, 181))', color: 'rgb(33, 19, 95)' },
    { name: 'Indie Rock', gradient: 'linear-gradient(to bottom, rgb(132, 210, 187), rgb(52, 164, 93))', color: 'rgb(34, 110, 62)' },
    { name: 'Classical', gradient: 'linear-gradient(to bottom, rgb(166, 145, 52), rgb(217, 238, 133))', color: 'rgb(144, 104, 62)' },
    { name: 'Metal', gradient: 'linear-gradient(to bottom, rgb(144, 92, 62), rgb(139, 39, 23)', color: 'rgb(255, 124, 76)' },
  ];

  useEffect(() => {
    logInfo('Home page loaded');
    return () => {
      logInfo('Home page unloaded');
    };
  }, []);

  const handleScroll = (section) => {
    logInfo(`${section} section scrolled`);
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Recently Played Playlists */}
      <div className="section explore-section">
        <div className="explore-content">
          <button
            className="explore-button"
            onClick={() => navigate('/search')}
          >
             <h1 className="button-text">{t('Start exploring new music now!')}</h1>
          </button>
          <button
            className="more-about-button"
            onClick={scrollToFooter}
          >
            {t('More about us ↓')}
          </button>
        </div>
        <div className="explore-image">
          {/* Замените на URL вашей картинки */}
          <img src="listener-to-music.png" alt="Explore Music" />
        </div>
      </div>




      <div className="section">
        <h2>{t('Recently Played Playlists')}</h2>
        <div
          className="horizontal-scroll"
          onScroll={() => handleScroll('Recently Played Playlists')}
        >
          <div className="playlist-item">Playlist 1</div>
          <div className="playlist-item">Playlist 2</div>
          <div className="playlist-item">Playlist 3</div>
        </div>
      </div>

      {/* Genres Section */}
      <div className="section genres-section">
        <h4 className="genres-heading">
          &nbsp;&nbsp;&nbsp;&nbsp;★&nbsp;&nbsp;&nbsp;&nbsp;{t('Discover new music')}
        </h4>
        <div className="genres-container">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="genre-box"
              style={{ background: genre.gradient, color: genre.color }}
            >
              {t(genre.name)}
            </div>
          ))}
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
        </div>
      </div>


      {/* Footer */}
      <hr className="divider" />
      <div id="footer" className="footer">
  <div className="left-section">
    <div className="footer-logo">
      <img src="logoRH.png" alt="Rhythmo Logo" />

    </div>
    <div>
    <p>&copy; 2024</p>
    <p >All rights reserved</p>
</div>
    <div className="contact-us">

    <p><strong>Contact us:</strong></p>
      <div className="social-icons">
          <img src="bsu-logo.png" className="social-icon" />
          <img src="Facebook_Logo.png" className="social-icon" />
          <img src="insta-logo.png" className="social-icon" />
          <img src="twitter-x-logo.png" className="social-icon" />
      </div>
    </div>
  </div>

  <div className="right-section">
    <div className="project-info">
      <h2>About us</h2>
      <p>
        Rhythmo is an educational project designed for listening to music. Explore different genres and discover your next favorite track! Rhythmo brings together people who share a love for music.Get inspired, discover, dive into music with us. Welcome to Rhythmo - a world where every chord is filled with emotion and every track tells its own story.
      </p>
      <p className="team">Team:</p>
      <p>- Intyakova Anastasia</p>
      <p>- Obukhovich Ulyana</p>
      <p>- Kisin Matvei</p>
      <p>- Tukay Irina</p>
    </div>
  </div>
</div>


    </div>
  );
};

export default Home;

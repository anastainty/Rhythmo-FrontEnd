import React, { useState, useEffect } from 'react';
import { logInfo, logError } from '../utils/logger'; 
import './Search.scss';
import { useTranslation } from 'react-i18next';
import api from "./api";

const Search = () => {
  const { t } = useTranslation(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchOptions = ['All', 'Playlists', 'Songs', 'Albums', 'Artists'];

  const genres = [
    { name: 'Pop', gradient: 'linear-gradient(to bottom, rgb(225, 154, 176), rgb(156, 197, 197))', color: 'rgb(145, 94, 101)' },
    { name: 'Rock', gradient: 'linear-gradient(to bottom, rgb(166, 67, 56), rgb(203, 130, 88))', color: 'rgb(106, 41, 41)' },
    { name: 'Hip-Hop', gradient: 'linear-gradient(to bottom, rgb(132, 132, 210), rgb(60, 32, 181))', color: 'rgb(33, 19, 95)' },
    { name: 'Indie Rock', gradient: 'linear-gradient(to bottom, rgb(132, 210, 187), rgb(52, 164, 93))', color: 'rgb(34, 110, 62)' },
    { name: 'Classical', gradient: 'linear-gradient(to bottom, rgb(166, 145, 52), rgb(217, 238, 133))', color: 'rgb(144, 104, 62)' },
    { name: 'Metal', gradient: 'linear-gradient(to bottom, rgb(144, 92, 62), rgb(139, 39, 23)', color: 'rgb(255, 124, 76)' },
  ];

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    logInfo('Search query updated', { query: newQuery });
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    logInfo('Search type changed', { type });
  };

  useEffect(() => {
    logInfo('Search component mounted');
    return () => {
      logInfo('Search component unmounted');
    };
  }, []);

  useEffect(() => {
    logInfo('Search state updated', { searchQuery, searchType });
  }, [searchQuery, searchType]);

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
          '/search/', // Базовый URL эндпоинта
          {
            query: searchQuery, // Текст поиска
            type: searchType,   // Тип поиска
          },
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error('Ошибка выполнения поиска:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
      <div className="search-page">
        <input
            type="text"
            placeholder={t('Search for a song, artist, or album...')}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown} // Обработчик нажатия клавиши
            className="search-input"
        />

        <div className="search-options">
          {searchOptions.map((option) => (
              <button
                  key={option}
                  className={`search-option ${searchType === option ? 'active' : ''}`}
                  onClick={() => handleSearchTypeChange(option)}
              >
                {t(option)}
              </button>
          ))}
        </div>

        <h4 className="genres-heading">{t('Genres')}&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;{t('Discover new music')}</h4>
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

        {searchResults.length > 0 && (
            <div className="search-results">
              <h2>{t('Search Results')}</h2>
              {searchResults.map((result) => (
                  <div key={result.id} className="search-result-item">
                    <div className="result-info">
                      <h3>{result.title}</h3>
                      <p>{result.details}</p>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {/* Если нет результатов, показываем сообщение */}
        {searchResults.length === 0 && !loading && searchQuery && (
            <div className="no-results">
              {t('No results found for')} "{searchQuery}"
            </div>
        )}
      </div>
  );
};

export default Search;

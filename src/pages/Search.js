import React, { useState } from 'react';
import './Search.css';

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('All');


  const searchOptions = ['All', 'Playlists', 'Podcasts', 'Songs', 'Albums', 'Artists', 'Profiles'];


  const genres = ['Pop', 'Rock', 'Hip-Hop', 'Indie Rock', 'Classical', 'Metal'];

  // Обработчик изменений поискового ввода
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Обработчик выбора опции поиска
  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  return (
    <div className="search-page">
      {/* Поисковая строка */}
      <input
        type="text"
        placeholder="Search for a song, artist, or album..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Опции поиска */}
      <div className="search-options">
        {searchOptions.map((option) => (
          <button
            key={option}
            className={`search-option ${searchType === option ? 'active' : ''}`}
            onClick={() => handleSearchTypeChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Жанры */}
      <h4 className="genres-heading">Genres&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Discover new music</h4>      // &nbsp;&nbsp; - это пробелы
      <div className="genres-container">
        {genres.map((genre) => (
          <div key={genre} className="genre-box">
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

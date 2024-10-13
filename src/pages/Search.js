import React, { useState } from 'react';
import './Search.css';

const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('All');


  const searchOptions = ['All', 'Playlists', 'Podcasts', 'Songs', 'Albums', 'Artists', 'Profiles'];


  const genres = [
    { name: 'Pop', gradient: 'linear-gradient(to bottom, rgb(225, 154, 176), rgb(156, 197, 197))', color: 'rgb(145, 94, 101)' }, // Вертикальный градиент для попа
    { name: 'Rock', gradient: 'linear-gradient(to bottom, rgb(166, 67, 56), rgb(203, 130, 88))', color:'rgb(106, 41, 41)'}, // Вертикальный градиент для рока
    { name: 'Hip-Hop', gradient: 'linear-gradient(to bottom, rgb(132, 132, 210), rgb(60, 32, 181))', color:'rgb(33, 19, 95)' }, // Вертикальный градиент для хип-хопа
    { name: 'Indie Rock', gradient: 'linear-gradient(to bottom, rgb(132, 210, 187), rgb(52, 164, 93))', color:'rgb(34, 110, 62)' }, // Вертикальный градиент для инди
    { name: 'Classical', gradient: 'linear-gradient(to bottom, rgb(166, 145, 52), rgb(217, 238, 133))', color: 'rgb(144, 104, 62)' }, // Вертикальный градиент для классики
    { name: 'Metal', gradient: 'linear-gradient(to bottom, rgb(144, 92, 62), rgb(139, 39, 23)', color: 'rgb(255, 124, 76)' }, // Вертикальный градиент для метала
  ];


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
      <h4 className="genres-heading">Genres&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;Discover new music</h4>
      <div className="genres-container">
      {genres.map((genre) => (
          <div
            key={genre.name}
            className="genre-box"
            style={{ background: genre.gradient, color: genre.color }} // Устанавливаем градиент как инлайн-стиль
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

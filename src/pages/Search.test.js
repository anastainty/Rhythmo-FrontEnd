import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Это добавит toBeInTheDocument и другие методы
import Search from './Search'; // Ваш компонент

// Мокируем функции из модуля logger
jest.mock('../utils/logger', () => ({
  logInfo: jest.fn(),
  logError: jest.fn(),
}));

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search for a song, artist, or album...')).toBeInTheDocument();
  });

  it('updates search query and logs the change', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search for a song, artist, or album...');
    fireEvent.change(input, { target: { value: 'Rock' } });
    expect(input.value).toBe('Rock');
    expect(require('../utils/logger').logInfo).toHaveBeenCalledWith('Search query updated', { query: 'Rock' });
  });

  it('changes search type and logs the change', () => {
    render(<Search />);
    const playlistsButton = screen.getByText('Playlists');
    fireEvent.click(playlistsButton);
    expect(playlistsButton).toHaveClass('active');
    expect(require('../utils/logger').logInfo).toHaveBeenCalledWith('Search type changed', { type: 'Playlists' });
  });

  it('logs genre click', () => {
    render(<Search />);
    const genreBox = screen.getByText('Pop');
    fireEvent.click(genreBox);
    expect(require('../utils/logger').logInfo).toHaveBeenCalledWith('Genre clicked', { genre: 'Pop' });
  });

  it('logs when the component is mounted and unmounted', () => {
    const { unmount } = render(<Search />);
    expect(require('../utils/logger').logInfo).toHaveBeenCalledWith('Search component mounted');
    unmount();
    expect(require('../utils/logger').logInfo).toHaveBeenCalledWith('Search component unmounted');
  });

  it('logs state updates for search query and type', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search for a song, artist, or album...');
    fireEvent.change(input, { target: { value: 'Hip-Hop' } });
    expect(require('../utils/logger').logInfo).toHaveBeenCalledWith('Search state updated', { searchQuery: 'Hip-Hop', searchType: 'All' });
  });
});

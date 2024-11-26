import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Адрес вашего сервера
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавление токена в заголовки авторизации
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Токен из локального хранилища
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

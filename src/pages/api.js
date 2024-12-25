import axios from 'axios';

const api = axios.create({
  baseURL: 'http://100.99.74.40:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Функция для обновления access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token is missing.');
    }

    const response = await axios.post('http://127.0.0.1:8000/token/refresh', {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem('accessToken', access);  
    return access;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed. Redirecting to login.');

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/registration';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.100:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция для получения CSRF токена из cookie
const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken || '';
};

// Функция для обновления access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token is missing.');
    }

    const response = await axios.post('http://192.168.0.100:8000/', {
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
    const csrfToken = getCSRFToken(); 

    if (!accessToken) {
      throw new Error('Access token is missing.');
    }

    config.headers.Authorization = `Bearer ${accessToken}`; 
    config.headers['X-CSRFToken'] = csrfToken;  

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
        window.location.href = 'http://192.168.0.100:8000/'; 
      }
    }

    return Promise.reject(error);
  }
);

export default api;

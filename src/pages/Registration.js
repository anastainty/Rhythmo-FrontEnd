import React, { useState } from 'react';
import api from './api';
import './Registration.scss';

const Registration = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setLoginErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'Имя не может быть пустым';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Фамилия не может быть пустой';
    }
    if (!formData.username) {
      newErrors.username = 'Имя пользователя не может быть пустым';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Некорректный e-mail. Попробуйте ещё раз.';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов, включая цифры и буквы.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают. Попробуйте ещё раз.';
    }
    return newErrors;
  };

  const validateLogin = () => {
    const loginErrors = {};
    if (!loginData.username) {
      loginErrors.username = 'Имя пользователя не может быть пустым.';
    }
    if (loginData.password.length < 6) {
      loginErrors.password = 'Пароль слишком короткий. Попробуйте ещё раз.';
    }
    return loginErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.post(`/register/`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        console.log('Registration successful:', response.data);
        alert('Вы успешно зарегистрировались!');
      } catch (error) {
        console.error('Error during registration:', error);
        setErrors({ form: 'Ошибка при регистрации. Попробуйте ещё раз.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.post(`/token/`, {
          username: loginData.username,
          password: loginData.password,
        });
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        console.log('Login successful:', response.data);
        alert('Вы успешно вошли в систему!');
      } catch (error) {
        console.error('Ошибка при входе:', error);
        setLoginErrors({ form: 'Ошибка при входе. Попробуйте ещё раз.' });
      }
    } else {
      setLoginErrors(validationErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => handleTabClick('login')}
        >
          ВХОД
        </button>
        <button
          className={`tab ${activeTab === 'registration' ? 'active' : ''}`}
          onClick={() => handleTabClick('registration')}
        >
          РЕГИСТРАЦИЯ
        </button>
      </div>

      {activeTab === 'login' ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              className="input-field"
              value={loginData.username}
              onChange={handleLoginInputChange}
            />
            {loginErrors.username && <div className="error-message">{loginErrors.username}</div>}
            <span className="icon-user"></span>
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className="input-field"
              value={loginData.password}
              onChange={handleLoginInputChange}
            />
            {loginErrors.password && <div className="error-message">{loginErrors.password}</div>}
            <span className="icon-eye"></span>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Запомнить меня</label>
          </div>

          <button type="submit" className="submit-button">ВОЙТИ</button>

          <button className="social-button">
            <img src="google-logo.png" alt="Google" className="social-icon" />
            Продолжить с Google
          </button>

          <button className="social-button">
            <img src="apple-logo.png" alt="Apple" className="social-icon" />
            Продолжить с Apple
          </button>
        </form>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder="Имя"
              className="input-field"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="lastName"
              placeholder="Фамилия"
              className="input-field"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>

          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              className="input-field"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="input-field"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              className="input-field"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="input-container">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="submit-button">РЕГИСТРАЦИЯ</button>

          <button className="social-button">
            <img src="google-logo.png" alt="Google" className="social-icon" />
            Продолжить с Google
          </button>

          <button className="social-button">
            <img src="apple-logo.png" alt="Apple" className="social-icon" />
            Продолжить с Apple
          </button>
        </form>
      )}
    </div>
  );
};

export default Registration;

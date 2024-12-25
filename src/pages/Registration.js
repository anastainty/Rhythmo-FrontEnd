import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from './api';
import axios from 'axios';
import { logInfo, logError } from '../utils/logger';
import './Registration.scss';

const Registration = () => {
  const { t } = useTranslation(); // Получаем функцию для перевода
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
    logInfo('Tab switched', { tab });
    setActiveTab(tab);
    setErrors({});
    setLoginErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    logInfo('Registration input changed', { name, value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    logInfo('Login input changed', { name, value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = t('errorFirstName');
    }
    if (!formData.lastName) {
      newErrors.lastName = t('errorLastName');
    }
    if (!formData.username) {
      newErrors.username = t('errorUsername');
    }
    if (!formData.email.includes('@')) {
      newErrors.email = t('errorEmail');
    }
    if (formData.password.length < 5) {
      newErrors.password = t('errorPassword');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('errorConfirmPassword');
    }
    return newErrors;
  };

  const validateLogin = () => {
    const loginErrors = {};
    if (!loginData.username) {
      loginErrors.username = t('errorLoginUsername');
    }
    if (loginData.password.length < 5) {
      loginErrors.password = t('errorLoginPassword');
    }
    return loginErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logInfo('Registration form submitted', { formData });
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await api.post(`/register/`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        logInfo('Registration successful', { responseData: response.data });
        console.log('Registration successful:', response.data);
        alert(t('registrationSuccess'));
      } catch (error) {
        logError('Error during registration', { error });
        console.error('Error during registration:', error);
        setErrors({ form: t('errorRegistration') });
      }
    } else {
      setErrors(validationErrors);
      logInfo('Form validation failed', { validationErrors });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    logInfo('Login form submitted', { loginData });
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`http://100.99.74.40:8000/`, {
          username: loginData.username,
          password: loginData.password,
        });
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('username', loginData.username);
        logInfo('Login successful', { responseData: response.data });
        console.log('Login successful:', response.data);
        alert(t('loginSuccess'));
      } catch (error) {
        logError('Error during login', { error });
        console.error('Error during login:', error);
        setLoginErrors({ form: t('errorLogin')});
      }
    } else {
      setLoginErrors(validationErrors);
      logInfo('Login validation failed', { validationErrors });
    }
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => handleTabClick('login')}
        >
          {t('login')}
        </button>
        <button
          className={`tab ${activeTab === 'registration' ? 'active' : ''}`}
          onClick={() => handleTabClick('registration')}
        >
          {t('registration')}
        </button>
      </div>

      {activeTab === 'login' ? (
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder={t('username')}
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
              placeholder={t('password')}
              className="input-field"
              value={loginData.password}
              onChange={handleLoginInputChange}
            />
            {loginErrors.password && <div className="error-message">{loginErrors.password}</div>}
            <span className="icon-eye"></span>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">{t('rememberMe')}</label>
          </div>

          <button type="submit" className="submit-button">{t('loginButton')}</button>

          <button className="social-button">
            <img src="google-logo.png" alt="Google" className="social-icon" />
            {t('googleLogin')}
          </button>

          <button className="social-button">
            <img src="apple-logo.png" alt="Apple" className="social-icon" />
            {t('appleLogin')}
          </button>
        </form>
      ) : (
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="firstName"
              placeholder={t('firstName')}
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
              placeholder={t('lastName')}
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
              placeholder={t('username')}
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
              placeholder={t('email')}
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
              placeholder={t('password')}
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
              placeholder={t('confirmPassword')}
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="submit-button">{t('registerButton')}</button>

          <button className="social-button">
            <img src="google-logo.png" alt="Google" className="social-icon" />
            {t('googleLogin')}
          </button>

          <button className="social-button">
            <img src="apple-logo.png" alt="Apple" className="social-icon" />
            {t('appleLogin')}
          </button>
        </form>
      )}
    </div>
  );
};

export default Registration;

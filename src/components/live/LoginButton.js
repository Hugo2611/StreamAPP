// src/components/LoginButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTwitchLogin from '../../hooks/useTwitchLogin'; // Import du hook de connexion Twitch
import './style/LoginButton.css';

const LoginButton = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, profileImageUrl } = useTwitchLogin(); // Utilisation du hook de connexion Twitch

  const handleLogin = () => {
    login().then(() => navigate('/home'));
  };

  return (
    <div className="login-button-container">
      {isLoggedIn ? (
        <img src={profileImageUrl} alt="Profile" className="profile-image" />
      ) : (
        <button onClick={handleLogin} className="login-button">
          Login with Twitch
        </button>
      )}
    </div>
  );
};

export default LoginButton;

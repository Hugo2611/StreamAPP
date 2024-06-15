// src/hooks/useTwitchLogin.js

import { useEffect, useState } from 'react';

const useTwitchLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const login = async () => {
    try {
      const accessToken = await fetchAccessTokenFromTwitch();
      localStorage.setItem('twitchToken', accessToken);

      const profileInfo = await fetchUserProfileFromTwitch(accessToken);
      setProfileImageUrl(profileInfo.profile_image_url);

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in with Twitch: ', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('twitchToken');
    if (token) {
      fetchUserProfileFromTwitch(token).then(profileInfo => {
        setProfileImageUrl(profileInfo.profile_image_url);
        setIsLoggedIn(true);
      });
    }
  }, []);

  const fetchAccessTokenFromTwitch = async () => {
    try {
      const clientId = 'x40562dcg51f5vvltqa497a2jexmps';
      const clientSecret = 'cgkpgnjoesft6jjegi7jgj7mdvuob0';

      const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to obtain access token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error fetching Twitch access token: ', error);
      throw error;
    }
  };

  const fetchUserProfileFromTwitch = async (accessToken) => {
    try {
      const response = await fetch('https://api.twitch.tv/helix/users', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Client-Id': 'x40562dcg51f5vvltqa497a2jexmps',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      return data.data[0];
    } catch (error) {
      console.error('Error fetching Twitch user profile: ', error);
      throw error;
    }
  };

  return { login, isLoggedIn, profileImageUrl };
};

export default useTwitchLogin;

// src/components/live/Sidebar.js

import React, { useState, useEffect } from 'react';
import './style/Sidebar.css';
import streamyLogo from '../../assets/streamy-logo.png';
import { fetchLiveChannels, getAccessToken } from '../../utils/api';
import FollowedChannelsList from './FollowedChannelsList';

const Sidebar = () => {
  const [followedChannels, setFollowedChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const liveChannelsData = await fetchLiveChannels(accessToken);
        setFollowedChannels(liveChannelsData);
      } catch (error) {
        console.error('Error fetching live channels:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <img src={streamyLogo} alt="Streamy Logo" className="streamy-logo" />
      </div>
      <div className="sidebar-links">
        {/* Ajoutez d'autres liens ou contenu de la barre latérale ici */}
      </div>
      {followedChannels && followedChannels.length > 0 && (
        <FollowedChannelsList followedChannels={followedChannels} />
      )}
    </div>
  );
};

export default Sidebar;

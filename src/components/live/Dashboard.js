// src/components/live/Dashboard.js

import React, { useState, useEffect } from 'react';
import './style/Dashboard.css'; // Assurez-vous d'avoir votre fichier CSS pour le dashboard
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import CategoriesButton from './CategoriesButton';
import LiveChannelsGallery from './LiveChannelsGallery';
import { getAccessToken, fetchLiveChannels } from '../../utils/api'; // Importez les fonctions d'API
import FollowedChannelsList from './FollowedChannelsList'; // Importez le composant FollowedChannelsList

const Dashboard = () => {
  const [liveChannels, setLiveChannels] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const liveChannelsData = await fetchLiveChannels(accessToken);
        setLiveChannels(liveChannelsData);

        // Exemple de données simulées pour les chaînes suivies
        const followedChannelsData = [
          {
            id: 1,
            displayName: 'Streamer 1',
            thumbnail: 'url_de_l_image',
            game: 'Jeu 1',
            viewers: 1000,
          },
          {
            id: 2,
            displayName: 'Streamer 2',
            thumbnail: 'url_de_l_image',
            game: 'Jeu 2',
            viewers: 500,
          },
          {
            id: 3,
            displayName: 'Streamer 3',
            thumbnail: 'url_de_l_image',
            game: 'Jeu 3',
            viewers: 800,
          },
        ];
        setFollowedChannels(followedChannelsData);
      } catch (error) {
        console.error('Error fetching data from Twitch API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <SearchBar />
        <CategoriesButton />
        <FollowedChannelsList followedChannels={followedChannels} />
        <div id="chaines-suivies" className="content-section">
          <h1>Chaînes suivies</h1>
          <LiveChannelsGallery liveChannels={liveChannels} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

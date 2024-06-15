// src/components/live/RecommendedChannels.js
import React, { useState, useEffect } from 'react';
import { fetchLiveChannels, getAccessToken } from '../../utils/api';
import './style/RecommendedChannels.css';

const RecommendedChannels = () => {
  const [recommendedChannels, setRecommendedChannels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const channels = await fetchLiveChannels(token);
      setRecommendedChannels(channels.slice(0, 4)); // Limite à 4 chaînes recommandées
    }

    fetchData();
  }, []);

  return (
    <div className="recommended-channels">
      {recommendedChannels.map(channel => (
        <div key={channel.id} className="recommended-channel">
          <iframe
            src={`https://player.twitch.tv/?channel=${channel.user_name}&parent=localhost&parent=localhost&parent=localhost`}
            height="180"
            width="320"
            frameBorder="0"
            scrolling="no"
            allowFullScreen={true}
          ></iframe>
          <div className="channel-info">
            <h3>{channel.user_name}</h3>
            <p>{channel.viewer_count} viewers</p>
            <p>{channel.game_name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedChannels;

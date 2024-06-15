// src/components/live/LiveChannelsGallery.js
import React, { useState, useEffect } from 'react';
import { getAccessToken, fetchLiveChannels } from '../../utils/api';
import './style/LiveChannelsGallery.css';

const LiveChannelsGallery = () => {
  const [liveChannels, setLiveChannels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessToken();
      const channels = await fetchLiveChannels(token);
      setLiveChannels(channels.slice(0, 4)); // Limite à 4 chaînes en direct
    }

    fetchData();
  }, []);

  return (
    <div className="live-channels-gallery">
      <h2>En direct</h2>
      <div className="channel-grid">
        {liveChannels.map(channel => (
          <div key={channel.id} className="live-channel">
            <iframe
              src={`https://player.twitch.tv/?channel=${channel.user_name}&parent=localhost&parent=localhost&parent=localhost`}
              height="180"
              width="300" // Réduire la largeur de l'iframe
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
    </div>
  );
};

export default LiveChannelsGallery;

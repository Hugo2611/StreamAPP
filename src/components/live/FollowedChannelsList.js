// src/components/live/FollowedChannelsList.js

import React from 'react';
import './style/FollowedChannelsList.css'; // Importer le fichier de styles

const FollowedChannelsList = ({ followedChannels }) => {
  return (
    <div className="followed-channels-list">
      <h2>Chaînes suivies</h2>
      <ul>
        {followedChannels.map(channel => (
          <li key={channel.user_id} className="channel-box">
            <a
              href={`https://twitch.tv/${channel.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-link"
            >
              {channel.profile_image_url ? (
                <img src={channel.profile_image_url} alt={channel.user_name} className="channel-avatar" />
              ) : (
                <div className="default-avatar">Avatar par défaut</div>
              )}
              <div className="channel-info">
                <p>{channel.user_name}</p>
                <p>{channel.game_name}</p>
                <p>{channel.viewer_count}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowedChannelsList;

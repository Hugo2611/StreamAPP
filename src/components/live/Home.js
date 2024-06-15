// src/components/live/Home.js
import React from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import LiveChannelsGallery from './LiveChannelsGallery';
import RecommendedChannels from './RecommendedChannels';
import RecommendedCategories from './RecommendedCategories';
import './style/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <SearchBar />
        <div className="recommended-section">
          <h1>Chaînes recommandées</h1>
          <RecommendedChannels />
        </div>
        <div className="recommended-section">
          <h1>Catégories recommandées</h1>
          <RecommendedCategories />
        </div>
        <LiveChannelsGallery />
      </div>
    </div>
  );
};

export default Home;

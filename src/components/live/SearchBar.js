// src/components/live/SearchBar.js

import React from 'react';
import './style/SearchBar.css'; // Assurez-vous d'avoir votre fichier CSS pour la barre de recherche

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher..."
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button className="search-button">
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;

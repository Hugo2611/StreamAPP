// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/live/Home';
import LoginButton from './components/live/LoginButton'; // Importer le bouton de connexion

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <LoginButton /> {/* Afficher le bouton de connexion en haut à droite */}
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

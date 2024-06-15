// src/components/live/RecommendedCategories.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style/RecommendedCategories.css';
import jeuxImage from '../../assets/categories/jeux.jpg'; // Importez vos images ici
import irlImage from '../../assets/categories/irl.jpg';
import musiqueImage from '../../assets/categories/musique.jpg';
import creatifImage from '../../assets/categories/creatif.jpg';
import esportsImage from '../../assets/categories/esports.jpg';

const categoriesData = [
  { id: '1', name: 'Jeux', thumbnail_url: jeuxImage },
  { id: '2', name: 'IRL', thumbnail_url: irlImage },
  { id: '3', name: 'Musique', thumbnail_url: musiqueImage },
  { id: '4', name: 'Créatif', thumbnail_url: creatifImage },
  { id: '5', name: 'Esports', thumbnail_url: esportsImage }
];

const RecommendedCategories = () => {
  const [categories, setCategories] = useState(categoriesData);

  useEffect(() => {
    // Vous pouvez mettre ici une requête à l'API Twitch si nécessaire
  }, []);

  return (
    <div className="recommended-categories">
      {categories.map(category => (
        <Link key={category.id} to={`/categories/${category.id}`} className="category-link">
          <div className="category">
            <img src={category.thumbnail_url} alt={category.name} className="category-image" />
            <div className="category-info">
              <h3>{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedCategories;


import React, { useState, useEffect } from 'react';
import EditFavorite from './EditFavorite';
import '../Components/css/ArticleFavorites.css';

const ArticleFavorites = () => {
  const API = import.meta.env.VITE_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3003';
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API}/news/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        console.log('Favorites data:', data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching favorites:', error);
        setLoading(false);
      });
  }, []);

  const handleUpdateFavorite = (updatedFavorite) => {
    setFavorites(prevFavorites => 
      prevFavorites.map(favorite => 
        favorite.id === updatedFavorite.id ? updatedFavorite : favorite
      )
    );
  };

  const handleDeleteFavorite = (deletedFavoriteId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(favorite => favorite.id !== deletedFavoriteId)
    );
  };

  if (loading) {
    return (
      <div className="favorites-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading your favorites...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        {/* <h1 className="favorites-title">Your Favorite Articles</h1> */}
        <p className="favorites-subtitle">
          {favorites.length > 0 
            ? `${favorites.length} article${favorites.length !== 1 ? 's' : ''} saved`
            : 'Start building your collection'
          }
        </p>
      </div>
      
      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h2 className="empty-state-title">No favorites yet</h2>
          <p className="empty-state-description">
            Start exploring the world map and save interesting articles to build your personal collection.
          </p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              {favorite.url_to_image && (
                <img 
                  src={favorite.url_to_image} 
                  alt={favorite.title}
                  className="favorite-card-image"
                />
              )}
              <div className="favorite-card-content">
                <h3 className="favorite-card-title">
                  <a 
                    href={favorite.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {favorite.title}
                  </a>
                </h3>
                <div className="favorite-card-divider"></div>
                <p className="favorite-card-memo">
                  <strong>Memo:</strong> {favorite.description}
                </p>
                <EditFavorite 
                  favorite={favorite} 
                  onUpdate={handleUpdateFavorite} 
                  onDelete={handleDeleteFavorite}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleFavorites;


import React, { useState, useEffect } from 'react';
import EditFavorite from './EditFavorite';
import "../Components/css/ArticleFavorites.css"

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
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Favorite Articles</h2>
      
      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No favorite articles yet. Start adding some!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {favorite.url_to_image && (
                <img 
                  src={favorite.url_to_image} 
                  alt={favorite.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  <a 
                    href={favorite.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {favorite.title}
                  </a>
                </h3>
                <hr className="mb-4" />
                <p className="text-gray-600 mb-4">
                  Memo: {favorite.description}
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



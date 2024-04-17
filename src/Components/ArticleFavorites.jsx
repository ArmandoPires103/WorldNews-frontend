import React, { useState, useEffect } from 'react';
import EditFavorite from './EditFavorite';
import "../Components/ArticleFavorites.css"

const ArticleFavorites = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        fetch(`${API}/news/favorites`)
            .then((res) => res.json())
            .then((data) => {
                setFavorites(data);
                console.log('Favorites data:', data);
            })
            .catch((error) => {
                console.error('Error fetching favorites:', error);
            });
    }, []);

    const handleUpdateFavorite = (updatedFavorite) => {
        // Update the favorite in the state
        setFavorites(prevFavorites => prevFavorites.map(favorite => 
            favorite.id === updatedFavorite.id ? updatedFavorite : favorite
        ));
    };

    const handleDeleteFavorite = (deletedFavoriteId) => {
        // Remove the deleted favorite from the state
        setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== deletedFavoriteId));
    };
   
    return (
        <div className='card'>
                <h2>Favorite Articles</h2>
            <div className='card__body grid-container'>
                {favorites && favorites.map((favorite, index) => (
                    <div key={favorite.id} className='favorite-card'>
                        <div className='card__header'>
                            <img src={favorite.url_to_image} alt={favorite.urlToImage} className="card__image" width="600"/>
                        </div>
                        <h3 className='card__title'><a href={favorite.url}>{favorite.title}</a></h3>
                        <hr />
                        <p>Memo: {favorite.description}</p>
                        <EditFavorite favorite={favorite} onUpdate={handleUpdateFavorite} onDelete={handleDeleteFavorite}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleFavorites;


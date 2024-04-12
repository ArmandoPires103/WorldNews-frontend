import React, { useState, useEffect } from 'react';
import EditFavorite from './EditFavorite';

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
    return (
        <div>
            <h2>Favorite Articles</h2>
            <div className='favorites-listing'>
                {favorites && favorites.map((favorite, index) => (
                    <div key={favorite.id}>
                        <h3>URL: {favorite.url}</h3>
                        <p>Description: {favorite.description}</p>
                        <EditFavorite favorite = {favorite}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticleFavorites;

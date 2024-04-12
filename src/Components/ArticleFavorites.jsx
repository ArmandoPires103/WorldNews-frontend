import React, { useState, useEffect } from 'react';

const ArticleFavorites = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(`${API}/news/favorites`)
            .then((res) => res.json())
            .then((data) => {
                setFavorites(data.favorites);
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
            {favorites && favorites.map(({ url, description }, index) => (
            <div key={index}>
                <p>URL: {url}</p>
                 <p>Description: {description}</p>
            </div>
            ))}

            </div>
        </div>
        );
    };

export default ArticleFavorites;

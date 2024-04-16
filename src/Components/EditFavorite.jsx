import React, { useState, useEffect } from 'react';

const EditFavorite = ({ favorite }) => {
    const API = import.meta.env.VITE_BASE_URL;
    const [updatedFavorite, setUpdatedFavorite] = useState({
        description: favorite.description,
        url: favorite.url,
        user_id: favorite.user_id,
        title: favorite.title,
        url_to_image: favorite.url_to_image,
        id: favorite.id
    });

    // useEffect to update the description when the component mounts or when the favorite prop changes
    useEffect(() => {
        setUpdatedFavorite({
            ...updatedFavorite,
            description: favorite.description
        });
    }, [favorite]); // Dependency array to watch for changes in the favorite prop

    const handleUpdateDescription = (event) => {
        event.preventDefault();
        fetch(`${API}/news/favorites/${favorite.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFavorite),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to update description');
            }
            // Update UI state immediately
            setUpdatedFavorite(updatedFavorite);
            window.location.reload();
        })
        .catch((error) => console.error('Error updating description:', error));
    };
    
    useEffect(() => {
        setUpdatedFavorite({
            ...updatedFavorite,
            description: favorite.description
        });
    }, [favorite]); // Dependency array to watch for changes in the favorite prop
    const handleDelete = (favoriteId, event) => {
        event.preventDefault()
        fetch(`${API}/news/favorites/${favoriteId}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to delete favorite');
            }
            window.location.reload();
        })
        .catch((error) => console.error('Error deleting favorite:', error));
    };

    return (
        <div>
            <form onSubmit={handleUpdateDescription}>
                <textarea
                    value={updatedFavorite.description}
                    onChange={(e) => setUpdatedFavorite({...updatedFavorite, description: e.target.value})}
                    placeholder="Enter new description"
                />
                <input type="submit" value='Edit' className='btn'/>
                <button onClick={(event) => handleDelete(favorite.id, event)}>Delete</button>
            </form>
        </div>
    );
}

export default EditFavorite;

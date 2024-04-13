import React from 'react'
import { useState } from 'react'

const EditFavorite = ({favorite}) => {
    const API = import.meta.env.VITE_BASE_URL;
    const [updatedFavorite, setUpdatedFavorite] = useState({
        description: favorite.description,
        url: favorite.url,
        user_id: favorite.user_id,
        id: favorite.id
    });

    const handleUpdateDescription = (favoriteId, event) => {
        event.preventDefault()
        fetch(`${API}/news/favorites/${favoriteId}`, {
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
        })
        .catch((error) => console.error('Error updating description:', error));
    };

    const handleDelete = (favoriteId, event) => {
        event.preventDefault()
        fetch(`${API}/news/favorites/${favoriteId}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to delete favorite');
            }
            // Optionally, you can handle the deletion in the UI after successful deletion
            // For example, remove the deleted favorite from the state or re-fetch the favorites list
        })
        .catch((error) => console.error('Error deleting favorite:', error));
    };
    


  return (
    <div>
        <form onSubmit={() => handleUpdateDescription(favorite.id, event)}>
            <textarea
            value={updatedFavorite.description}
            onChange={(e) => setUpdatedFavorite({...updatedFavorite, description: e.target.value})}
            placeholder="Enter new description">
            </textarea>
            <input type="submit" value='edit'/>
            <button onClick={(event) => handleDelete(favorite.id, event)}>Delete</button>
        </form>
    </div>
  )
}

export default EditFavorite
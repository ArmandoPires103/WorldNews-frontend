import React, { useState } from 'react';

const EditFavorite = ({ favorite, onUpdate, onDelete }) => {
    const API = import.meta.env.VITE_BASE_URL;

    const [displayForm, setDisplayForm] = useState(false);
    const [updatedFavorite, setUpdatedFavorite] = useState({
        description: favorite.description,
        url: favorite.url,
        user_id: favorite.user_id,
        title: favorite.title,
        url_to_image: favorite.url_to_image,
        id: favorite.id
    });

    const handleUpdateDescription = (event) => {
        event.preventDefault();
        fetch(`${API}/news/favorites/${favorite.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFavorite),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Data updated successfully:", data);
            setDisplayForm(false); // Hide the form after submitting
            onUpdate(data); // Update the favorite item in the parent component's state
        })
        .catch((error) => {
            console.error("Error updating data", error)
        })
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedFavorite({
            ...updatedFavorite,
            [name]: value
        })
    }

    const handleDelete = (event) => {
        event.preventDefault();
        fetch(`${API}/news/favorites/${favorite.id}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to delete favorite');
            }
            onDelete(favorite.id); // Remove the favorite item from the parent component's state
        })
        .catch((error) => console.error('Error deleting favorite:', error));
    };

    return (
<div>
    <button className="edit-button" onClick={() => setDisplayForm(!displayForm)}>Edit</button>
    {displayForm && (
        <form onSubmit={handleUpdateDescription}>
            <textarea
                name="description"
                value={updatedFavorite.description}
                onChange={handleInputChange}
                placeholder="Enter new description"
            />
            <input type="submit" value='Save' className='edit-button'/>
            <br />
            <br />
            <button className="edit-button" onClick={handleDelete}>Delete</button>
        </form>
    )}
</div>

    );
}

export default EditFavorite;


// Modal.js
import React from 'react';
import "../Components/Modal.css"
import { useState } from 'react';

const Modal = ({ isOpen, onClose, countryInfo, countryResources }) => {
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const submitFavorite = async (favUrl, favTitle, favUrlToImage) => {
        try {
          const newFavorite = { url: favUrl, title: favTitle, urlToImage: favUrlToImage, description: description };
          console.log(newFavorite)
          
          fetch('http://localhost:3003/news/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFavorite)
      
          }).then(res => res.json()).then(data => console.log(data))
          
          alert('Favorite added successfully!');
          setUrl('');
          setDescription('');
          
        } catch (error) {
          console.error('Error adding favorite:', error.message);
          alert('Failed to add favorite. Please try again.');
        }
      };
    
    const handleAddFavorite = (article) => {
          submitFavorite(article.url, article.title, article.urlToImage);
      };
    const handleCloseModal = () => {
        onClose(); 
      };
      if (!isOpen) return null;
      
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{countryInfo && countryInfo.country}</h5>
            <button className="close-btn" onClick={handleCloseModal}>X</button>
          </div>
          <div className="modal-body">
            {countryInfo && (
              <div className='country-info-box'>
                <h2>{countryInfo.country}</h2>
                <p>Landmarks: {countryInfo.landmarks}</p>
                <p>Cities: {countryInfo.cities}</p>
              </div>
            )}
            {/* Display country resources */}
            {countryResources.articles && countryResources.articles.map((article, index) => (
              <div className='country-info-box' key={index}>
                <img className='news-img' src={article.urlToImage}  />
                <h3>{article.title}</h3>
                <p>Author: {article.author}</p>
                {/* You can display other article information similarly */}
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                <button  onClick={() => handleAddFavorite(article)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

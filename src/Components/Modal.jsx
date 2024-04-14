// Modal.js
import React from 'react';
import "../Components/Modal.css"

const Modal = ({ isOpen, onClose, countryInfo, countryResources }) => {
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{countryInfo && countryInfo.country}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
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
                <img className='news-img' src={article.urlToImage} alt={article.title} />
                <h3>{article.title}</h3>
                <p>Author: {article.author}</p>
                {/* You can display other article information similarly */}
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                <button onClick={() => handleAddFavorite(article)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

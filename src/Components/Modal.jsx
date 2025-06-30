import React from 'react';
import '../Components/css/Modal.css';

const Modal = ({ isOpen, onClose, countryInfo, countryResources }) => {
  const handleCloseModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header with close button */}
        <div className="modal-header">
          <button 
            className="modal-close-btn" 
            onClick={handleCloseModal}
          >
            ×
          </button>
        </div>
        
        {/* Country Title - Duolingo style */}
        <div className="modal-title-section">
          <h2 className="modal-country-title">
            {countryInfo && countryInfo.country}
          </h2>
          <p className="modal-subtitle">Latest News</p>
        </div>

        {/* Articles */}
        <div className="modal-content">
          {countryResources?.results?.map((article, index) => (
            <div className="news-article" key={index}>
              {/* Image at the top - Duolingo style */}
              {article.image_url && (
                <img 
                  className="news-img" 
                  src={article.image_url} 
                  alt="Article image" 
                />
              )}
              
              {/* Title */}
              <h3 className="news-title">
                {article.title}
              </h3>
              
              {/* Description */}
              {article.description && (
                <p className="news-description">
                  {article.description}
                </p>
              )}
              
              {/* Author */}
              {article.creator && article.creator.length > 0 && (
                <p className="news-author">
                  By {article.creator.join(', ')}
                </p>
              )}
              
              {/* CTA Button - Duolingo style */}
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="news-button"
              >
                Read Article
              </a>
            </div>
          ))}
          
          {/* No articles message */}
          {(!countryResources?.results || countryResources.results.length === 0) && (
            <div className="no-articles">
              <div className="no-articles-icon">📰</div>
              <p className="no-articles-text">No articles found for this country.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;


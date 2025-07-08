
import React from 'react';
import '../Components/css/Modal.css';

const Modal = ({ isOpen, onClose, countryInfo, countryResources }) => {
  const API = import.meta.env.VITE_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3003';

  const handleCloseModal = () => {
    onClose();
  };

  const handleSaveArticle = async (article) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please login to save articles');
      return;
    }

    const favoriteData = {
      title: article.title,
      url: article.link,
      url_to_image: article.image_url || '',
      description: article.description || ''
    };

    try {
      console.log('Saving article with URL:', `${API}/news/favorites`);
      console.log('Article data:', favoriteData);
      
      const response = await fetch(`${API}/news/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(favoriteData)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Save successful:', result);
      alert('Article saved to favorites!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert(`Failed to save article: ${error.message}`);
    }
  };

  // ... keep existing code (if (!isOpen) return null and the rest of the component)
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
              
              {/* Buttons container */}
              <div className="news-buttons">
                <a 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="news-button"
                >
                  Read Article
                </a>
                <button 
                  onClick={() => handleSaveArticle(article)}
                  className="save-button"
                >
                  Save Article
                </button>
              </div>
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

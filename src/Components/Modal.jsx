import { useState } from "react";


const Modal = ({ isOpen, onClose, countryInfo, countryResources }) => {
  const API = import.meta.env.VITE_BASE_URL;
  const [description, setDescription] = useState('');

  const submitFavorite = async (url, title, url_to_image) => {
    try {
      const newFavorite = { url, title, url_to_image, description };
      
      const apiUrl = API.endsWith('/') ? API.slice(0, -1) : API;
      const response = await fetch(`${apiUrl}/news/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFavorite)
      });

      if (response.ok) {
        alert('Favorite added successfully!');
        setDescription('');
      } else {
        throw new Error('Failed to add favorite');
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
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
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h5 className="text-2xl font-bold text-gray-900">
            {countryInfo && countryInfo.country}
          </h5>
          <button 
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100" 
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
        <div className="p-6">
          {countryInfo && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{countryInfo.country}</h2>
              <p className="text-gray-700 mb-1"><strong>Landmarks:</strong> {countryInfo.landmarks}</p>
              <p className="text-gray-700"><strong>Cities:</strong> {countryInfo.cities}</p>
            </div>
          )}
          {countryResources?.articles?.map((article, index) => (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6" key={index}>
              {article.urlToImage && (
                <img className="w-full h-48 object-cover rounded-lg mb-4" src={article.urlToImage} alt="News" />
              )}
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{article.title}</h3>
              <h4 className="text-gray-600 mb-2"><strong>Author:</strong> {article.author}</h4>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline mb-3 inline-block">
                Read More
              </a>
              <div className="mt-4">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description for your favorite"
                />
                <button 
                  onClick={() => handleAddFavorite(article)} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;

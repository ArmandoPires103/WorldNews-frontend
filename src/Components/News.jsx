import React, { useState, useEffect } from 'react';

const News = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const [countryNews, setCountryNews] = useState(null);
    
    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await fetch(`${API}/news?country=us`);
                if (!response.ok) {
                    throw new Error('Failed to fetch country information');
                }
                const countryData = await response.json();
                setCountryNews(countryData);
            } catch (error) {
                console.error('Error fetching country information:', error);
            }
        };

        fetchCountryData();
    }, []);

    return (
        <div>
            {/* Render countryNews data */}
        </div>
    );
};

export default News;

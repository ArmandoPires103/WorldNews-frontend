
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MapPin, Heart, ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="hero-section">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo">
            <Globe className="h-6 w-6" />
            <span>GlobalEcho</span>
          </div>
          <div className="nav-links">
            <Link to="/map" className="nav-link">
              Explore Map
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            {!isLoggedIn ? (
              <Link to="/login">
                <button className="nav-button">
                  Sign In
                </button>
              </Link>
            ) : (
              <button onClick={handleLogout} className="nav-button" style={{background: '#dc2626'}}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap className="h-4 w-4" />
            <span>Real-time Global News</span>
          </div>
          
          <h1 className="hero-title">
            Stay Connected to the
            <span className="hero-title-gradient"> World</span>
          </h1>
          
          <p className="hero-subtitle">
            Experience breaking news as it happens. Get comprehensive coverage, insightful analysis, 
            and real-time updates from every corner of the globe.
          </p>
          
          <div className="hero-buttons">
            <Link to="/map" className="primary-button">
              <MapPin className="h-5 w-5" />
              Explore World Map
              <ArrowRight className="h-5 w-5" />
            </Link>
            {/* <Link to="/favorites" className="secondary-button">
              <Heart className="h-5 w-5" />
              My Favorites
            </Link> */}
          </div>

          {/* Feature Cards */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="feature-title">Global Coverage</h3>
              <p className="feature-description">
                Get news from every continent with our comprehensive global network of sources.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="feature-title">Real-time Updates</h3>
              <p className="feature-description">
                Breaking news delivered instantly as events unfold around the world.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="feature-title">Trending Analysis</h3>
              <p className="feature-description">
                Deep insights and analysis on the stories that matter most to you.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number" style={{color: '#3b82f6'}}>195+</div>
              <div className="stat-label">Countries Covered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{color: '#10b981'}}>24/7</div>
              <div className="stat-label">Live Updates</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{color: '#8b5cf6'}}>1M+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{color: '#f59e0b'}}>50K+</div>
              <div className="stat-label">Daily Stories</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Globe className="h-6 w-6" />
            <span>GlobalEcho</span>
          </div>
          <p className="footer-text">
            Connecting you to the world, one story at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


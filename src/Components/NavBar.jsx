
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MapPin, Heart, LogIn, LogOut } from "lucide-react";
import "../Components/css/NavBar.css";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = () => {
    if (user) {
      handleLogout();
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/">
              GlobalEcho
            </Link>
          </div>

          <div className="navbar-desktop">
            <div className="navbar-desktop-content">
              <Link to="/map" className="navbar-link">
                <MapPin size={18} />
                Map
              </Link>
              <Link to="/favorites" className="navbar-link">
                <Heart size={18} />
                Favorites
              </Link>
              {!user ? (
                <Link to="/login" className="navbar-auth-btn navbar-login-btn">
                  <LogIn size={18} />
                  Log In
                </Link>
              ) : (
                <button onClick={handleAuthClick} className="navbar-auth-btn navbar-logout-btn">
                  <LogOut size={18} />
                  Log Out
                </button>
              )}
            </div>
          </div>

          <div className="navbar-mobile-btn">
            <button onClick={toggleMenu}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-content">
            <Link to="/map" onClick={() => setIsMenuOpen(false)} className="navbar-mobile-link">
              <MapPin size={20} />
              Map
            </Link>
            <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="navbar-mobile-link">
              <Heart size={20} />
              Favorites
            </Link>
            {!user ? (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="navbar-mobile-auth-btn navbar-mobile-login-btn">
                <LogIn size={20} />
                Log In
              </Link>
            ) : (
              <button onClick={handleAuthClick} className="navbar-mobile-auth-btn navbar-mobile-logout-btn">
                <LogOut size={20} />
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;


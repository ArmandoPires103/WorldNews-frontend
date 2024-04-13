import { useEffect, useState } from "react";
import "./NavBar.css"
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

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

  return (
<nav className="nav__content">
      <div className="logo"><Link to="/">GlobalEcho</Link></div>
      <label htmlFor="check" className="checkbox">
        <i className="ri-menu-line"></i>
      </label>
      <input type="checkbox" name="check" id="check" />
      <ul>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        { !user ? (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Log Out</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

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
    <div className="nav__content">
        <Link style={{ textDecoration: "none" }} to="/">
      <h1 className="logo">GlobalEcho</h1>
          
        </Link>
        <label htmlFor="check" className="checkbox">
        <i className="ri-menu-line"></i>
      </label>
      <input type="checkbox" name="check" id="check" />
      <ul>
        <Link to={"/map"}>Map</Link>
        <Link to={"/favorites"}>Favorites</Link>
      {!toggleLogin ? (
        <Link to={"/login"}>Login</Link>
      ) : (
        <div>
          {user && <span>Hello, {user.username.toUpperCase()}? | </span>}
          <Link onClick={handleLogout}>
            <span>Logout</span>
          </Link>
        
        </div>
      )}
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;

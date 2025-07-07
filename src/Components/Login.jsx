
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Components/css/Login.css"

const URL = import.meta.env.VITE_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3003';

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function postFetch(user) {
    console.log('Attempting to login with URL:', `${URL}/api/auth/login`);
    console.log('User data:', { username: user.username });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      console.log('Response status:', res.status);
      
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Login failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToggleLogin(true);
        navigate("/home");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  async function handleDemoSignIn(e) {
    e.preventDefault();
    const demoUser = { username: "demo", password: "password" };
    postFetch(demoUser);
  }

  return (
    <div className="auth-body">
      <div className="auth-wrapper">
        <h1>Login</h1>
        
        <button 
          onClick={handleDemoSignIn} 
          className="demo-btn"
        >
          Demo User
        </button>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-box">
            <input
              id="username"
              value={user.username}
              type="text"
              placeholder="Enter username"
              autoComplete="username"
              onChange={handleChange}
            />
          </div>
          
          <div className="input-box">
            <input
              id="password"
              value={user.password}
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-btn"
          >
            Submit
          </button>
        </form>
        
        <div className="auth-link">
          <p>
            No Account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



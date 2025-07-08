
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Components/css/Login.css";

const URL = import.meta.env.VITE_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3003';

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log('Attempting to register with URL:', `${URL}/api/auth/register`);
    console.log('User data:', { username: user.username, email: user.email });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);
      console.log('Response status:', res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Registration failed' }));
        console.log('Error response:', errorData);
        alert(errorData.message || "Registration failed");
        throw new Error(errorData.message || "Registration failed");
      }
      
      const data = await res.json();
      console.log('Registration successful:', data);

      if (data.token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        setToggleLogin(true); // Update the parent state immediately
        navigate("/map");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="auth-body">
      <div className="auth-wrapper">
        <h1>Register</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-box">
            <input
              id="username"
              value={user.username}
              type="text"
              placeholder="Enter username"
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          
          <div className="input-box">
            <input
              id="email"
              value={user.email}
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              autoComplete="email"
              required
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
              required
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
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

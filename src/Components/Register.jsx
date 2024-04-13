import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", email: "" });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        // set the new user's JWT token in the browser
        localStorage.setItem("token", data.token);
        setToggleLogin(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // USE THIS FORM TO BUILD OUT YOUR FORM PROPERLY BY ADDING LABELS AND INPUTS AS WELL AS WHATEVER CSS FRAMEWORK YOU MAY USE OR VANILLA CSS. THIS IS JUST A BOILERPLATE CODE

  return (
    <div className='login-body'>
        <div className='wrapper'>
      <h1>Register</h1>
      <br />
      <form onSubmit={handleSubmit}>
      <div className='input-box'>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange={handleChange}
            autoComplete="username"
          />
        </label>
        </div>
        <br />
        <div className='input-box'>
        <label htmlFor="email">
          <input
            id="email"
            value={user.email}
            type="email"
            placeholder="email"
            onChange={handleChange}
            autoComplete="email"
          />
        </label>
        </div>
        <br />
        <div className='input-box'>
        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </label>
        </div>
        <br />
        <button type="submit" class="btn">Submit</button>
        <br />
        <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </form>
    </div>
    </div>
  );
};

export default Register;

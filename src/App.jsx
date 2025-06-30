import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import WorldMap from "./Components/Worldmap";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import ArticleFavorites from "./Components/ArticleFavorites";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  const [is3DView, setIs3DView] = useState(false); // State to manage the view

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  const handleViewSwitch = () => {
    setIs3DView((prev) => !prev); // Toggle between 2D and 3D view
  };

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />
      {/* <button onClick={handleViewSwitch} style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        Switch to {is3DView ? "2D" : "3D"} View
      </button> Button to switch views */}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/map"
          element={is3DView ? <GlobeCanvas /> : <WorldMap />} // Conditional rendering based on state
        />
        <Route
          path="/favorites"
          element={<ArticleFavorites />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;



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

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
        />

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
          element={<WorldMap/>}
          />
          <Route
          path="/favorites"
          element={<ArticleFavorites/>}
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

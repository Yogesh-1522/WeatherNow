import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  console.log(isLoggedIn);

  useEffect(() => {
    // Sync login state whenever event is fired
    const syncLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    // Listen to custom event + storage (other tabs)
    window.addEventListener("loginChange", syncLogin);
    window.addEventListener("storage", syncLogin);

    return () => {
      window.removeEventListener("loginChange", syncLogin);
      window.removeEventListener("storage", syncLogin);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

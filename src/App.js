// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);

  const toggleFavorites = () => setIsFavorites((prev) => !prev);

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggleFavorites={toggleFavorites}
          isFavorites={isFavorites}
        />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Instead of separate routes for "/" and "/car/:id", 
                we define one path with "/*" and let Home handle nested routes. */}
            <Route
              path="/*"
              element={
                <Home searchValue={searchValue} isFavorites={isFavorites} />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

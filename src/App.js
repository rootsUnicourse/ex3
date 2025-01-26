// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CarDetail from "./pages/CarDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // Move the searchValue and isFavorites states here:
  const [searchValue, setSearchValue] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);

  const toggleFavorites = () => {
    setIsFavorites((prev) => !prev);
  };

  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Pass the states & handlers to Navbar */}
        <Navbar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggleFavorites={toggleFavorites}
          isFavorites={isFavorites}
        />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Pass the same states to Home, so it can filter cars accordingly */}
            <Route
              path="/"
              element={
                <Home
                  searchValue={searchValue}
                  isFavorites={isFavorites}
                />
              }
            />
            <Route path="/car/:id" element={<CarDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import carsData from "../data/cars.json";
import FilterBar from "../components/FilterBar";
import CarGrid from "../components/CarGrid";
import Navbar from "../components/Navbar";

export default function Home() {
  // State
  const [cars, setCars] = useState([]); // All cars from JSON
  const [searchValue, setSearchValue] = useState("");
  const [isFavorites, setIsFavorites] = useState(false);

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 9999]); // [min, max]

  // Favorites state (array of car IDs)
  const [favorites, setFavorites] = useState([]);

  // We'll gather unique car types and capacities from the data
  const allCarTypes = [...new Set(cars.map((c) => c.type))];
  const capacities = [...new Set(cars.map((c) => c.capacity))];

  // Price range extremes
  const minPrice = cars.length ? Math.min(...cars.map((c) => c.dailyPrice)) : 0;
  const maxPrice = cars.length ? Math.max(...cars.map((c) => c.dailyPrice)) : 9999;

  // Load cars data once
  useEffect(() => {
    setCars(carsData);

    // Set default filter values once data is loaded
    if (carsData.length) {
      setSelectedTypes([...new Set(carsData.map((c) => c.type))]); // All types selected by default
      const uniqueCaps = [...new Set(carsData.map((c) => c.capacity))];
      setSelectedCapacities(uniqueCaps); // all capacities by default

      const minP = Math.min(...carsData.map((c) => c.dailyPrice));
      const maxP = Math.max(...carsData.map((c) => c.dailyPrice));
      setPriceRange([minP, maxP]);
    }
  }, []);

  // Toggle favorites
  const toggleFavorites = () => {
    setIsFavorites(!isFavorites);
  };

  // Toggle favorite for specific car
  const handleToggleFavorite = (carId) => {
    if (favorites.includes(carId)) {
      setFavorites(favorites.filter((id) => id !== carId));
    } else {
      setFavorites([...favorites, carId]);
    }
  };

  // Filter the cars to display
  const getFilteredCars = () => {
    // If searchValue >= 2, ignore filters, just search
    if (searchValue.length >= 2) {
      const lowerSearch = searchValue.toLowerCase();
      return cars.filter((car) => car.name.toLowerCase().includes(lowerSearch));
    }

    // If isFavorites, ignore filters, just show favorites
    if (isFavorites) {
      return cars.filter((car) => favorites.includes(car.id));
    }

    // Otherwise, apply filter by type, capacity, and price
    return cars.filter((car) => {
      const matchesType = selectedTypes.includes(car.type);
      const matchesCapacity = selectedCapacities.includes(car.capacity);
      const withinPriceRange =
        car.dailyPrice >= priceRange[0] && car.dailyPrice <= priceRange[1];

      return matchesType && matchesCapacity && withinPriceRange;
    });
  };

  const filteredCars = getFilteredCars();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Replace the NavBar in App.jsx if you want single usage, or
          remove the Navbar here if you've already put it in App.jsx. 
          For example, we can do: */}
      {/* If you have the Navbar in App, remove the line below: */}
      {/* <Navbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        toggleFavorites={toggleFavorites}
        isFavorites={isFavorites}
      /> */}

      {/* Left FilterBar */}
      <FilterBar
        allCarTypes={allCarTypes}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        capacities={capacities}
        selectedCapacities={selectedCapacities}
        setSelectedCapacities={setSelectedCapacities}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      {/* Right - Car Grid */}
      <CarGrid
        cars={filteredCars}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </Box>
  );
}

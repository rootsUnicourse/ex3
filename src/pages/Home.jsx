// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import carsData from "../data/cars.json";
import FilterBar from "../components/FilterBar";
import CarGrid from "../components/CarGrid";
import CarDetail from "./CarDetail"; // Import your detail component

export default function Home({ searchValue, isFavorites }) {
  const [cars, setCars] = useState([]); 
  const [favorites, setFavorites] = useState([]);

  // Filter states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 9999]);

  useEffect(() => {
    // Load cars data
    setCars(carsData);

    // Default filter states
    if (carsData.length) {
      const allTypes = [...new Set(carsData.map((c) => c.type))];
      setSelectedTypes(allTypes);

      const uniqueCaps = [...new Set(carsData.map((c) => c.capacity))];
      setSelectedCapacities(uniqueCaps);

      const minP = Math.min(...carsData.map((c) => c.dailyPrice));
      const maxP = Math.max(...carsData.map((c) => c.dailyPrice));
      setPriceRange([minP, maxP]);
    }
  }, []);

  // Toggle favorites for specific car
  const handleToggleFavorite = (carId) => {
    setFavorites((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  // Filter the cars to display
  const getFilteredCars = () => {
    // (1) If searchValue >= 2 => ignore other filters
    if (searchValue.length >= 2) {
      const lowerSearch = searchValue.toLowerCase();
      return cars.filter((car) => car.name.toLowerCase().includes(lowerSearch));
    }

    // (2) If isFavorites => ignore filters, show only favorites
    if (isFavorites) {
      return cars.filter((car) => favorites.includes(car.id));
    }

    // (3) Otherwise, apply selected filters
    return cars.filter((car) => {
      const matchesType = selectedTypes.includes(car.type);
      const matchesCapacity = selectedCapacities.includes(car.capacity);
      const withinPriceRange =
        car.dailyPrice >= priceRange[0] && car.dailyPrice <= priceRange[1];

      return matchesType && matchesCapacity && withinPriceRange;
    });
  };

  const filteredCars = getFilteredCars();

  // Build unique sets for FilterBar
  const allCarTypes = [...new Set(cars.map((c) => c.type))];
  const capacities = [...new Set(cars.map((c) => c.capacity))];
  const minPrice = cars.length ? Math.min(...cars.map((c) => c.dailyPrice)) : 0;
  const maxPrice = cars.length ? Math.max(...cars.map((c) => c.dailyPrice)) : 9999;

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <FilterBar
        cars={cars}
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

      {/* Nested Routes handle whether we see a CarGrid or a CarDetail */}
      <Box sx={{ flex: 1, backgroundColor: '#F6F7F9' }}>
        <Routes>
          {/* By default (index route), show the CarGrid */}
          <Route
            index
            element={
              <CarGrid
                cars={filteredCars}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />

          {/* If user visits "/car/:id", show CarDetail */}
          <Route
            path="car/:id"
            element={<CarDetail />}
          />
        </Routes>
      </Box>
    </Box>
  );
}

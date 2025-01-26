// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import carsData from "../data/cars.json";

import FilterBar from "../components/FilterBar";
import CarGrid from "../components/CarGrid";

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
    // 1) If searchValue >= 2 => ignore other filters, just match the name
    if (searchValue.length >= 2) {
      const lowerSearch = searchValue.toLowerCase();
      return cars.filter((car) => car.name.toLowerCase().includes(lowerSearch));
    }

    // 2) If isFavorites => ignore other filters, show only favorites
    if (isFavorites) {
      return cars.filter((car) => favorites.includes(car.id));
    }

    // 3) Otherwise, apply Type, Capacity, and Price Range filters
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
    <Box sx={{ display: "flex" }}>
      {/* FilterBar */}
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

      {/* CarGrid */}
      <CarGrid
        cars={filteredCars}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </Box>
  );
}

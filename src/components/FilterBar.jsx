// src/components/FilterBar.jsx
import React from "react";
import { Box, FormControlLabel, Checkbox, Slider, Typography } from "@mui/material";

export default function FilterBar({
  allCarTypes,
  selectedTypes,
  setSelectedTypes,
  capacities,
  selectedCapacities,
  setSelectedCapacities,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
}) {
  // Handle Car Type check toggles
  const handleTypeChange = (type) => {
    // if type is in selectedTypes, remove it, otherwise add it
    let updated = [];
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length === 1) {
        // We can't remove the last type, so do nothing or show an alert
        return;
      }
      updated = selectedTypes.filter((t) => t !== type);
    } else {
      updated = [...selectedTypes, type];
    }
    setSelectedTypes(updated);
  };

  // Handle capacity check toggles
  const handleCapacityChange = (cap) => {
    // if cap is in selectedCapacities, remove it, else add it
    let updated = [];
    if (selectedCapacities.includes(cap)) {
      updated = selectedCapacities.filter((c) => c !== cap);
    } else {
      updated = [...selectedCapacities, cap];
    }
    setSelectedCapacities(updated);
  };

  // Price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box sx={{ width: 250, padding: 2, borderRight: "1px solid #ccc" }}>
      {/* Car Type Filter */}
      <Typography variant="h6">Car Type</Typography>
      {allCarTypes.map((type) => (
        <FormControlLabel
          key={type}
          control={
            <Checkbox
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
          }
          label={type}
        />
      ))}

      <Box sx={{ marginTop: 2 }}>
        {/* Capacity Filter */}
        <Typography variant="h6">Capacity</Typography>
        {capacities.map((cap) => (
          <FormControlLabel
            key={cap}
            control={
              <Checkbox
                checked={selectedCapacities.includes(cap)}
                onChange={() => handleCapacityChange(cap)}
              />
            }
            label={`${cap} seats`}
          />
        ))}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {/* Price Range Slider */}
        <Typography variant="h6">Daily Price</Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
        />
        <Typography>
          {`$${priceRange[0]} - $${priceRange[1]}`}
        </Typography>
      </Box>
    </Box>
  );
}

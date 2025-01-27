import React from "react";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Divider,
} from "@mui/material";

// Helper functions to count cars
const getTypeCount = (cars, type) =>
  cars.filter((car) => car.type === type).length;

const getCapacityCount = (cars, capacity) =>
  cars.filter((car) => car.capacity === capacity).length;

export default function FilterBar({
  cars = [],
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
  // Toggle logic for Car Type
  const handleTypeChange = (type) => {
    let updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    // Prevent unchecking the last item
    if (updated.length === 0) return;
    setSelectedTypes(updated);
  };

  // Toggle logic for Capacity
  const handleCapacityChange = (cap) => {
    let updated = selectedCapacities.includes(cap)
      ? selectedCapacities.filter((c) => c !== cap)
      : [...selectedCapacities, cap];
    if (updated.length === 0) return;
    setSelectedCapacities(updated);
  };

  // Price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Box
      sx={{
        // Force the FilterBar to remain exactly 320px wide.
        // Even if text grows, it won't expand the container.
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        padding: "24px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        // Optional: prevent overflow in case text is longer than 320px
        overflow: "hidden",
      }}
    >
      {/* Car Type Filter */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: "18px",
          color: "#1A202C",
          marginBottom: "12px",
        }}
      >
        Car Type
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {allCarTypes.map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
                sx={{
                  color: "#90A3BF",
                  "&.Mui-checked": {
                    color: "#3563E9",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#596780" }}>
                {type} ({getTypeCount(cars, type)})
              </Typography>
            }
            sx={{ marginBottom: "8px" }}
          />
        ))}
      </Box>

      <Divider sx={{ marginY: "16px" }} />

      {/* Capacity Filter */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: "18px",
          color: "#1A202C",
          marginBottom: "12px",
        }}
      >
        Capacity
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {capacities.map((cap) => (
          <FormControlLabel
            key={cap}
            control={
              <Checkbox
                checked={selectedCapacities.includes(cap)}
                onChange={() => handleCapacityChange(cap)}
                sx={{
                  color: "#90A3BF",
                  "&.Mui-checked": {
                    color: "#3563E9",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#596780" }}>
                {cap} Seats ({getCapacityCount(cars, cap)})
              </Typography>
            }
            sx={{ marginBottom: "8px" }}
          />
        ))}
      </Box>

      <Divider sx={{ marginY: "16px" }} />

      {/* Price Range Slider */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: "18px",
          color: "#1A202C",
          marginBottom: "12px",
        }}
      >
        Daily Price
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="off"
        min={minPrice}
        max={maxPrice}
        sx={{
          color: "#3563E9",
          "& .MuiSlider-thumb": {
            backgroundColor: "#3563E9",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#3563E9",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#DDE3EC",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#596780",
            textAlign: "center",
            minHeight: "24px",
            minWidth: 100,   // Enough for the largest text
            maxWidth: 120,   // Prevents overgrowth if numbers are huge
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Box>
    </Box>
  );
}

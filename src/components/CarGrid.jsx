// src/components/CarGrid.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import CarCard from "./CarCard";

export default function CarGrid({ cars, favorites, onToggleFavorite }) {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Cars ({cars.length})
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3, // Adds space between cards
                    justifyContent: "center", // Center align cards within the grid
                    paddingX: 2, // Add padding to the sides to prevent sticking to edges
                }}
            >
                {cars.map((car) => {
                    const isFavorite = favorites.includes(car.id);
                    return (
                        <CarCard
                            key={car.id}
                            car={car}
                            isFavorite={isFavorite}
                            onToggleFavorite={onToggleFavorite}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}

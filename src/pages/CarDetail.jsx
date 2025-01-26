// src/pages/CarDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, IconButton, Button, CardMedia } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import carsData from "../data/cars.json";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  // In a real app, you'd probably get favorites from context or parent
  const [favorites, setFavorites] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    // find the car by id
    const found = carsData.find((c) => c.id === parseInt(id));
    if (found) {
      setCar(found);
      setSelectedImage(found.images[0]); // default
    }
  }, [id]);

  const isFavorite = car && favorites.includes(car.id);

  const handleToggleFavorite = () => {
    if (!car) return;
    if (favorites.includes(car.id)) {
      setFavorites(favorites.filter((carId) => carId !== car.id));
    } else {
      setFavorites([...favorites, car.id]);
    }
  };

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
  };

  if (!car) {
    return <Typography>Car not found</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {car.name}
      </Typography>

      {/* Large image */}
      <CardMedia
        component="img"
        image={selectedImage}
        alt={car.name}
        sx={{ width: 400, height: 300, objectFit: "cover", marginBottom: 2 }}
      />

      {/* Thumbnails */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        {car.images.map((img) => (
          <Box
            key={img}
            component="img"
            src={img}
            alt="Thumbnail"
            sx={{
              width: 80,
              height: 60,
              objectFit: "cover",
              border: selectedImage === img ? "2px solid blue" : "1px solid #ccc",
              cursor: "pointer",
            }}
            onClick={() => handleThumbnailClick(img)}
          />
        ))}
      </Box>

      {/* Car info */}
      <Typography variant="body1">Type: {car.type}</Typography>
      <Typography variant="body1">Capacity: {car.capacity}</Typography>
      <Typography variant="body1">Price: ${car.dailyPrice} / day</Typography>

      {/* Favorite + Rent */}
      <Box sx={{ mt: 2 }}>
        <IconButton onClick={handleToggleFavorite} color={isFavorite ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>

        <Button variant="contained" sx={{ ml: 2 }}>
          Now Rent
        </Button>
      </Box>
    </Box>
  );
}

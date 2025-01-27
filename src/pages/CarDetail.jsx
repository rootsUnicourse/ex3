import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Grid
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import carsData from "../data/cars.json";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  // Local favorites just for demo (in a real app, you'd use context or props)
  const [favorites, setFavorites] = useState([]);

  // Which image is currently displayed in the "big" image slot
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    // Find the car by the ID in the URL
    const foundCar = carsData.find((c) => c.id === parseInt(id));
    if (foundCar) {
      setCar(foundCar);
      setSelectedImage(foundCar.images[0]); // Show the 1st image by default
    }
  }, [id]);

  // Check if this car is in favorites
  const isFavorite = car && favorites.includes(car.id);

  const handleToggleFavorite = () => {
    if (!car) return;
    if (isFavorite) {
      setFavorites((prev) => prev.filter((carId) => carId !== car.id));
    } else {
      setFavorites((prev) => [...prev, car.id]);
    }
  };

  // Switch the big image when a thumbnail is clicked
  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
  };

  if (!car) {
    return (
      <Typography sx={{ padding: 2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Car not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        paddingX: { xs: 2, md: 6 },
        paddingY: 4,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: 24,
          color: "#1A202C",
          marginBottom: 3
        }}
      >
        Car Details
      </Typography>

      <Grid container spacing={4}>
        {/* LEFT COLUMN: Big image + thumbnails */}
        <Grid item xs={12} md={6}>
          {/* Big Image */}
          <Box
            sx={{
              width: "100%",
              height: 300,
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: 2,
            }}
          >
            <CardMedia
              component="img"
              src={selectedImage}
              alt={car.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer"
              }}
            />
          </Box>

          {/* Thumbnails */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {car.images.map((img) => (
              <Box
                key={img}
                component="img"
                src={img}
                alt="Thumbnail"
                onClick={() => handleThumbnailClick(img)}
                sx={{
                  width: 80,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 2,
                  border:
                    selectedImage === img
                      ? "2px solid #3563E9"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* RIGHT COLUMN: Car info, rating, description, specs, and rent button */}
        <Grid item xs={12} md={6}>
          {/* Car Name + Favorite Icon */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: 20,
                color: "#1A202C",
              }}
            >
              {car.name}
            </Typography>
            <IconButton
              onClick={handleToggleFavorite}
              sx={{ padding: 0, marginLeft: 2 }}
            >
              <FavoriteIcon
                sx={{
                  color: isFavorite ? "#FF4D67" : "#90A3BF",
                  fontSize: 24
                }}
              />
            </IconButton>
          </Box>

          {/* Star Rating + Review Count */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
            {/* 5 stars (or partial) based on car.rating */}
            {Array.from({ length: 5 }, (_, index) => {
              const starValue = index + 1; // 1 to 5
              return (
                <StarIcon
                  key={starValue}
                  sx={{
                    color: starValue <= car.rating ? "#FCD444" : "#E0E0E0",
                    fontSize: 20
                  }}
                />
              );
            })}
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: "#596780",
                marginLeft: 1
              }}
            >
              {car.reviews} Reviewers
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 14,
              color: "#1A202C",
              marginTop: 2,
              lineHeight: 1.6
            }}
          >
            {car.description}
          </Typography>

          {/* Specs: Row 1 (Type & Capacity) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#90A3BF",
                  fontSize: 14,
                  fontWeight: 400,
                  marginBottom: "4px"
                }}
              >
                Type
              </Typography>
              <Typography
                sx={{
                  color: "#1A202C",
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                {car.type}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#90A3BF",
                  fontSize: 14,
                  fontWeight: 400,
                  marginBottom: "4px"
                }}
              >
                Capacity
              </Typography>
              <Typography
                sx={{
                  color: "#1A202C",
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                {car.capacity} People
              </Typography>
            </Box>
          </Box>

          {/* Specs: Row 2 (Transmission & Fuel) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#90A3BF",
                  fontSize: 14,
                  fontWeight: 400,
                  marginBottom: "4px"
                }}
              >
                Steering
              </Typography>
              <Typography
                sx={{
                  color: "#1A202C",
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                {car.transmission}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  color: "#90A3BF",
                  fontSize: 14,
                  fontWeight: 400,
                  marginBottom: "4px"
                }}
              >
                Gasoline
              </Typography>
              <Typography
                sx={{
                  color: "#1A202C",
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                {car.fuel}
              </Typography>
            </Box>
          </Box>

          {/* Bottom Row: Price + Rent Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 20,
                color: "#1A202C"
              }}
            >
              ${car.dailyPrice}/day
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3563E9",
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: 700,
                paddingX: 3,
                paddingY: 1.2,
                "&:hover": {
                  backgroundColor: "#2F4ACC",
                },
              }}
            >
              Rent Now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

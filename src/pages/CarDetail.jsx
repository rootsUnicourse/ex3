import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Grid,
  Card
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import carsData from "../data/cars.json";

export default function CarDetail({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  // Which image is currently displayed in the "big" image slot
  const [selectedImage, setSelectedImage] = useState("");
  const isFavorite = car && favorites.includes(car.id);

  const handleToggleFavorite = () => {
    if (!car) return;
    onToggleFavorite(car.id); // call parent's toggler
  };

  useEffect(() => {
    const foundCar = carsData.find((c) => c.id === parseInt(id));
    if (foundCar) {
      setCar(foundCar);
      setSelectedImage(foundCar.images[0]); // Default to first image
    }
  }, [id]);

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

  // Determine if we're showing the first image or not
  const isFirstImage = selectedImage === car.images[0];

  // objectFit: "contain" if it's the first image, otherwise "cover"
  const bigImageFit = isFirstImage ? "contain" : "cover";

  return (
    <Box sx={{ paddingX: { xs: 2, md: 6 }, paddingY: 4 }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: 20,
          color: "#1A202C",
          marginBottom: 3,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        Car Details
      </Typography>

      <Grid container spacing={4} alignItems="stretch">
        {/* LEFT COLUMN: Big image + thumbnails */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Big Card */}
          <Card
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              marginBottom: 2,
              height: 350, // Fixed total height for ALL images
              display: "flex",
              flexDirection: "column",
              backgroundColor: isFirstImage ? "#3563E9" : "#FFFFFF",
            }}
          >
            {/* (1) Optional Top Box (Title + Subtitle) for the first image */}
            {isFirstImage && (
              <Box
                sx={{
                  padding: 2,
                  flex: "0 0 auto", // so it doesn't stretch
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    fontSize: 32,
                    color: "#FFFFFF",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    marginBottom: 1,
                  }}
                >
                  {car.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#FFFFFF",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {car.subTitle}
                </Typography>
              </Box>
            )}

            {/* (2) Image area - takes remaining space */}
            <Box
              sx={{
                flex: 1,            // fill all remaining height
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                src={selectedImage}
                alt={car.name}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: bigImageFit, // "contain" if first image, else "cover"
                  cursor: "pointer",
                }}
              />
            </Box>
          </Card>

          {/* Thumbnails */}
          <Box sx={{ display: "flex", gap: 2, height: 100 }}>
            {car.images.map((img, index) => (
              <Box
                key={img}
                sx={{
                  flex: 1,
                  borderRadius: 2,
                  border: selectedImage === img ? "2px solid #3563E9" : "1px solid #ccc",
                  cursor: "pointer",
                  overflow: "hidden",
                  aspectRatio: "1/1",
                  backgroundColor: index === 0 ? "#3563E9" : "transparent",
                }}
              >
                <CardMedia
                  component="img"
                  src={img}
                  alt="Thumbnail"
                  onClick={() => handleThumbnailClick(img)}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* RIGHT COLUMN: Car Details */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Card
            sx={{
              flex: 1,
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              padding: 3,
            }}
          >
            {/* Car Name + Favorite Icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: 32,
                  color: "#1A202C",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {car.name}
              </Typography>
              <IconButton onClick={handleToggleFavorite} sx={{ padding: 0, marginLeft: 2 }}>
                <FavoriteIcon
                  sx={{
                    color: isFavorite ? "#FF4D67" : "#90A3BF",
                    fontSize: 24,
                  }}
                />
              </IconButton>
            </Box>

            {/* Star Rating + Review Count */}
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
              {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                  <StarIcon
                    key={starValue}
                    sx={{
                      color: starValue <= car.rating ? "#FBAD39" : "#E0E0E0",
                      fontSize: 20,
                    }}
                  />
                );
              })}
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#596780",
                  marginLeft: 1,
                }}
              >
                {car.reviews} Reviewers
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 20,
                color: "#596780",
                marginTop: 2,
                lineHeight: 1.6,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {car.description}
            </Typography>

            {/* Row 1: (Type label, Type value, Capacity label, Capacity value) */}
            <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 3 }}>
              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#90A3BF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Type Car:
              </Typography>
              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#596780",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {car.type}
              </Typography>

              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#90A3BF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Capacity:
              </Typography>
              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#596780",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {car.capacity} People
              </Typography>
            </Box>

            {/* Row 2: (Steering label, Steering value, Gasoline label, Gasoline value) */}
            <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}>
              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#90A3BF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Steering:
              </Typography>
              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#596780",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {car.transmission}
              </Typography>

              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "#90A3BF",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                Gasoline:
              </Typography>
              <Typography
                sx={{
                  width: "25%",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#596780",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {car.fuel}
              </Typography>
            </Box>

            {/* Bottom Row: Price + Rent Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "auto",
              }}
            >
              {/* Price + day */}
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "32px",
                    color: "#1A202C",
                    lineHeight: 1,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  ${car.dailyPrice.toFixed(2)}/
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "4px",
                    color: "#90A3BF",
                    fontWeight: 700,
                    fontSize: "28px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  day
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3563E9",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  paddingX: 5,
                  paddingY: 2,
                  "&:hover": {
                    backgroundColor: "#2F4ACC",
                  },
                }}
              >
                Rent Now
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

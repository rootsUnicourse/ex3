import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useNavigate } from "react-router-dom";

export default function CarCard({ car, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/car/${car.id}`);
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(car.id);
  };

  return (
    <Card
      sx={{
        width: 315,
        height: 360,
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: 2,
      }}
    >
      {/* Top row: Car name (left), Favorite icon (right) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 1,
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Car Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#1A202C",
              lineHeight: 1.2,
              marginBottom: "4px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {car.name}
          </Typography>
          {/* Car Type */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              color: "#90A3BF",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {car.type}
          </Typography>
        </Box>

        {/* Favorite Icon */}
        <IconButton
          onClick={handleFavoriteClick}
          disableRipple
          sx={{
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            padding: 0,
          }}
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: "#FF4D67", fontSize: "24px" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "#90A3BF", fontSize: "24px" }} />
          )}
        </IconButton>
      </Box>

      {/* Car Image (center) */}
      <CardMedia
        component="img"
        image={car.images[0]}
        alt={car.name}
        onClick={handleImageClick}
        sx={{
          cursor: "pointer",
          width: "100%",
          height: "140px",
          borderRadius: "8px",
          objectFit: "cover",
          marginTop: 5,
        }}
      />

      {/* Row with Gas, Transmission, People */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        {/* Gas */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <LocalGasStationIcon sx={{ color: "#90A3BF", fontSize: 24 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "14px", color: "#90A3BF", fontFamily: "'Plus Jakarta Sans', sans-serif", }}
          >
            {car.fuel}
          </Typography>
        </Box>

        {/* Transmission */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <DirectionsCarIcon sx={{ color: "#90A3BF", fontSize: 24 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "14px", color: "#90A3BF", fontFamily: "'Plus Jakarta Sans', sans-serif", }}
          >
            {car.transmission}
          </Typography>
        </Box>

        {/* People */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <PeopleIcon sx={{ color: "#90A3BF", fontSize: 24 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontSize: "14px", color: "#90A3BF", fontFamily: "'Plus Jakarta Sans', sans-serif", }}
          >
            {car.capacity} People
          </Typography>
        </Box>
      </Box>

      {/* Bottom row: Price (left) + Rent Button (right) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto", // push this row to bottom of card
        }}
      >
        {/* Price + day */}
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
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
              fontSize: "14px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            day
          </Typography>
        </Box>

        {/* Rent Now Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3563E9",
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            paddingX: 3,
            paddingY: 1,
            "&:hover": {
              backgroundColor: "#2F4ACC",
            },
          }}
        >
          Rent Now
        </Button>
      </Box>
    </Card>
  );
}

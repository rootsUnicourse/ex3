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
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"; // or another icon for the wheel
import PeopleIcon from "@mui/icons-material/People"; // or Groups, Person, etc.

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
        fontFamily: "'Plus Jakarta Sans', sans-serif",
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
              fontSize: "16px",
              color: "#1A202C",
              lineHeight: 1.2,
              marginBottom: "4px",
            }}
          >
            {car.name}
          </Typography>
          {/* Car Type */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 400,
              fontSize: "14px",
              color: "#90A3BF",
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
          <FavoriteIcon
            sx={{
              color: isFavorite ? "#FF4D67" : "#90A3BF",
              fontSize: "20px",
            }}
          />
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
          marginBottom: 2,
        }}
      />

      {/* Row with Gas, Transmission, People */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {/* Gas */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <LocalGasStationIcon sx={{ color: "#90A3BF", fontSize: 18 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: "14px", color: "#242731" }}
          >
            {car.fuel}
          </Typography>
        </Box>

        {/* Transmission */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <DirectionsCarIcon sx={{ color: "#90A3BF", fontSize: 18 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: "14px", color: "#242731" }}
          >
            {car.transmission}
          </Typography>
        </Box>

        {/* People */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <PeopleIcon sx={{ color: "#90A3BF", fontSize: 18 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, fontSize: "14px", color: "#242731" }}
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
            variant="body1"
            sx={{
              fontWeight: 700,
              fontSize: "18px",
              color: "#1A202C",
              lineHeight: 1,
            }}
          >
            ${car.dailyPrice.toFixed(2)}
          </Typography>
          <Typography
            component="span"
            sx={{
              marginLeft: "4px",
              color: "#90A3BF",
              fontWeight: 400,
              fontSize: "14px",
            }}
          >
            /day
          </Typography>
        </Box>

        {/* Rent Now Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3563E9",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 700,
            paddingX: 2,
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

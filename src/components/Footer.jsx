// src/components/Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f2f2f2",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">© 2025 CarRental Inc.</Typography>
      <Typography variant="body2">Terms | Privacy | Contact Us</Typography>
    </Box>
  );
}

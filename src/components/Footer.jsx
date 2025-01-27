// src/components/Footer.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#1A202C",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginTop: "auto",
        paddingX: { xs: 2, md: 6 },
        paddingY: 4,
      }}
    >
      {/* Top section: Logo/description (left), Links (right) */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={3}>
          {/* Logo / Brand */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: 32, color: "#3563E9", marginBottom: 1, fontFamily: "'Plus Jakarta Sans', sans-serif", }}
          >
            ShenCarCar
          </Typography>
          {/* Description */}
          <Typography
            variant="body2"
            sx={{ color: "#717171", fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Our vision is to provide convenience and help increase your sales business.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          container
          spacing={4}
          justifyContent="flex-end" // This pushes them to the right
        >
          {/* About */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography

              sx={{ fontWeight: 600, fontSize: 20, marginBottom: 1, color: '#1A202C', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              About
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              How it works
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Featured
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Partnership
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Bussiness Relation
            </Typography>
          </Grid>

          {/* Community */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography

              sx={{ fontWeight: 600, fontSize: 20, marginBottom: 1, color: '#1A202C', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Community
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Events
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Blog
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Podcast
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Invite a friend
            </Typography>
          </Grid>

          {/* Socials */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography

              sx={{ fontWeight: 600, fontSize: 20, marginBottom: 1, color: '#1A202C', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Socials
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Discord
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Instagram
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Twitter
            </Typography>
            <Typography variant="body2" sx={{ color: "#596780", marginBottom: 0.5, fontSize: 16, fontWeight: 500, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Facebook
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Divider */}
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid #E8E8E8",
          marginBottom: 2,
        }}
      />

      {/* Bottom bar: Left -> © 2025 ShenCarCar..., Right -> Privacy & Terms */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md="auto" sx={{ marginBottom: { xs: 1, md: 0 } }}>
          <Typography variant="body2" sx={{ color: "#1A202C", fontSize: 16, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            © 2025 ShenCarCar. All rights reserved
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md="auto"
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
        >
          <Typography variant="body2" sx={{ color: "#1A202C", fontSize: 16, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Privacy & Policy
          </Typography>
          <Typography variant="body2" sx={{ color: "#1A202C", fontSize: 16, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Terms & Condition
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

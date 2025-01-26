// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar({ searchValue, setSearchValue, toggleFavorites, isFavorites }) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleFavoritesClick = () => {
        toggleFavorites();
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
                borderBottom: "1px solid #E8E8E8",
                // If the Figma has a specific height or padding, add it here
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingX: 4,  // horizontal padding
                    minHeight: 64 // or whatever height matches your Figma
                }}
            >
                {/* Logo / Brand Name */}
                <Typography
                    variant="h6"
                    onClick={handleLogoClick}
                    sx={{
                        cursor: "pointer",
                        color: "#3563E9",
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '32px'
                    }}
                >
                    DanelCarRental
                </Typography>

                {/* Centered Search Box */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#FFFFFF",
                        borderRadius: '70px',
                        paddingX: 2,
                        marginX: 4,
                        flex: 1,
                        maxWidth: 492,
                        border: "1px solid",
                        borderColor: "#C3D4E966"
                    }}

                >
                    <InputBase
                        placeholder="Search by car name"
                        value={searchValue}
                        onChange={handleSearchChange}
                        sx={{
                            width: "100%",
                            fontWeight: 500,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: "16px",
                            "& input::placeholder": {
                                color: "#596780",
                                opacity: "1",
                                fontWeight: "500",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: "16px",
                            },
                        }}
                    />
                    <SearchIcon sx={{ color: "#596780" }} />
                </Box>

                {/* Favorites Icon */}
                <IconButton onClick={handleFavoritesClick} sx={{
                    border: "1px solid #C3D4E966",
                    borderRadius: '90px',
                    opacity: 90
                }}>
                    <FavoriteIcon sx={{
                        color: isFavorites ? "red" : "#596780"
                    }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
